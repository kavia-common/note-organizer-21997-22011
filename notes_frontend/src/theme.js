//
// Ocean Professional Theme Tokens and helpers
//

// PUBLIC_INTERFACE
export const theme = {
  name: "Ocean Professional",
  colors: {
    primary: "#2563EB",      // Blue
    secondary: "#F59E0B",    // Amber (also success)
    success: "#F59E0B",
    error: "#EF4444",
    background: "#f9fafb",
    surface: "#ffffff",
    text: "#111827",
    textMuted: "#6b7280",
    border: "rgba(17, 24, 39, 0.08)",
    shadow: "rgba(17, 24, 39, 0.08)"
  },
  radii: {
    sm: "6px",
    md: "10px",
    lg: "14px",
    pill: "999px"
  },
  shadow: {
    sm: "0 1px 2px rgba(17, 24, 39, 0.05)",
    md: "0 6px 20px rgba(17, 24, 39, 0.08)",
    lg: "0 12px 30px rgba(17, 24, 39, 0.12)"
  },
  // Subtle diagonal gradient wash
  gradient: "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(249,250,251,1))"
};

// PUBLIC_INTERFACE
export const cls = {
  focusRing: `outline-none ring-2`,
};

// PUBLIC_INTERFACE
export function px(value) {
  return typeof value === "number" ? `${value}px` : value;
}
