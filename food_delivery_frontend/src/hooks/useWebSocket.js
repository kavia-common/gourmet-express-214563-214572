import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight WebSocket hook with graceful fallback to polling.
 * - Connects to REACT_APP_WS_URL when present.
 * - Exposes send and latest message state.
 * - On errors or when WS not configured, returns null socket and consumers can use polling.
 */

// PUBLIC_INTERFACE
export function useWebSocket(path = '', { onMessage, onOpen, onClose, protocols } = {}) {
  /** Establishes a WebSocket connection if REACT_APP_WS_URL is present. Returns { socket, ready, error, latestMessage, send } */
  const baseWs = (process.env.REACT_APP_WS_URL && process.env.REACT_APP_WS_URL.trim()) || null;
  const url = baseWs ? `${baseWs}${path}` : null;

  const socketRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    if (!url) {
      // No WS configured; indicate not ready and no error so caller can choose polling.
      setReady(false);
      setError(null);
      return () => {};
    }

    let ws;
    try {
      ws = new WebSocket(url, protocols);
    } catch (e) {
      setError(e);
      setReady(false);
      return () => {};
    }
    socketRef.current = ws;

    ws.addEventListener('open', (evt) => {
      setReady(true);
      if (onOpen) onOpen(evt);
    });

    ws.addEventListener('message', (evt) => {
      setLatestMessage(evt.data);
      if (onMessage) onMessage(evt.data, evt);
    });

    ws.addEventListener('error', (evt) => {
      setError(new Error('WebSocket error'));
    });

    ws.addEventListener('close', (evt) => {
      setReady(false);
      if (onClose) onClose(evt);
    });

    return () => {
      try {
        ws && ws.close();
      } catch (_e) {}
      socketRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const send = (data) => {
    const ws = socketRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(data);
      return true;
    }
    return false;
  };

  return {
    socket: socketRef.current,
    ready,
    error,
    latestMessage,
    send,
    wsUrl: url,
  };
}

// PUBLIC_INTERFACE
export function usePolling(callback, intervalMs, { enabled = true } = {}) {
  /** Simple polling helper: runs callback every intervalMs while enabled is true. */
  useEffect(() => {
    if (!enabled) return () => {};
    let active = true;
    let timer;

    const tick = async () => {
      try {
        await callback();
      } finally {
        if (active) {
          timer = setTimeout(tick, intervalMs);
        }
      }
    };
    tick();

    return () => {
      active = false;
      if (timer) clearTimeout(timer);
    };
  }, [callback, intervalMs, enabled]);
}
