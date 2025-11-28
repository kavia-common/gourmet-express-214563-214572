/**
 * Ocean Professional Theme Tokens and helpers.
 * Provides CSS variables injection and JS-accessible palette.
 */
export const oceanTheme = {
  name: 'Ocean Professional',
  colors: {
    primary: '#2563EB',     // blue-600
    secondary: '#F59E0B',   // amber-500
    success: '#10B981',     // emerald-500 (using success more appropriately)
    warning: '#F59E0B',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    muted: '#6B7280',
    border: '#E5E7EB',
    gradientFrom: 'rgba(59,130,246,0.10)', // blue-500/10
    gradientTo: '#f9fafb'
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    pill: '999px'
  },
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 10px rgba(0,0,0,0.08)',
    lg: '0 10px 25px rgba(0,0,0,0.10)'
  },
  transition: 'all 180ms ease'
};

// PUBLIC_INTERFACE
export function injectThemeCSS(theme = oceanTheme) {
  /** Injects CSS variables into :root for theming */
  const root = document.documentElement;
  const { colors, radius, shadow } = theme;
  root.style.setProperty('--color-primary', colors.primary);
  root.style.setProperty('--color-secondary', colors.secondary);
  root.style.setProperty('--color-success', colors.success);
  root.style.setProperty('--color-warning', colors.warning);
  root.style.setProperty('--color-error', colors.error);
  root.style.setProperty('--color-bg', colors.background);
  root.style.setProperty('--color-surface', colors.surface);
  root.style.setProperty('--color-text', colors.text);
  root.style.setProperty('--color-muted', colors.muted);
  root.style.setProperty('--color-border', colors.border);
  root.style.setProperty('--gradient-from', colors.gradientFrom);
  root.style.setProperty('--gradient-to', colors.gradientTo);

  root.style.setProperty('--radius-sm', radius.sm);
  root.style.setProperty('--radius-md', radius.md);
  root.style.setProperty('--radius-lg', radius.lg);
  root.style.setProperty('--radius-pill', radius.pill);

  root.style.setProperty('--shadow-sm', shadow.sm);
  root.style.setProperty('--shadow-md', shadow.md);
  root.style.setProperty('--shadow-lg', shadow.lg);

  root.style.setProperty('--transition', theme.transition);
}
