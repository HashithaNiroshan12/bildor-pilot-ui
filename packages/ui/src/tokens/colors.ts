export const colors = {
  light: {
    brand: "#1F6FEB",
    brandContrast: "#ffffff",
    brandHover: "color-mix(in srgb, #1F6FEB 88%, black)",
    brandActive: "color-mix(in srgb, #1F6FEB 76%, black)",
    brandSubtle: "color-mix(in srgb, #1F6FEB 10%, white)",

    bg: "#ffffff",
    surface: "#ffffff",
    surface2: "#f6f7fb",
    surface3: "#eff1f5",

    text: "#111827",
    textSecondary: "#374151",
    muted: "#6b7280",

    border: "#e5e7eb",
    borderStrong: "#d1d5db",

    success: "#16a34a",
    successBg: "#f0fdf4",
    successBorder: "#bbf7d0",
    successText: "#15803d",

    warning: "#d97706",
    warningBg: "#fffbeb",
    warningBorder: "#fde68a",
    warningText: "#b45309",

    danger: "#dc2626",
    dangerBg: "#fef2f2",
    dangerBorder: "#fecaca",
    dangerText: "#b91c1c",

    info: "#0284c7",
    infoBg: "#f0f9ff",
    infoBorder: "#bae6fd",
    infoText: "#0369a1",
  },

  dark: {
    brand: "#4d8ef5",
    brandContrast: "#0b1220",
    brandHover: "color-mix(in srgb, #4d8ef5 88%, white)",
    brandActive: "color-mix(in srgb, #4d8ef5 76%, white)",
    brandSubtle: "color-mix(in srgb, #4d8ef5 15%, #0b1220)",

    bg: "#0b1220",
    surface: "#0f172a",
    surface2: "#111c33",
    surface3: "#152040",

    text: "#e5e7eb",
    textSecondary: "#d1d5db",
    muted: "#9ca3af",

    border: "#24324a",
    borderStrong: "#334155",

    success: "#22c55e",
    successBg: "rgba(22, 163, 74, 0.15)",
    successBorder: "rgba(34, 197, 94, 0.3)",
    successText: "#4ade80",

    warning: "#f59e0b",
    warningBg: "rgba(217, 119, 6, 0.15)",
    warningBorder: "rgba(245, 158, 11, 0.3)",
    warningText: "#fbbf24",

    danger: "#ef4444",
    dangerBg: "rgba(220, 38, 38, 0.15)",
    dangerBorder: "rgba(239, 68, 68, 0.3)",
    dangerText: "#f87171",

    info: "#38bdf8",
    infoBg: "rgba(2, 132, 199, 0.15)",
    infoBorder: "rgba(56, 189, 248, 0.3)",
    infoText: "#7dd3fc",
  },
} as const;

export type ColorScale = typeof colors.light;
export type ColorTheme = keyof typeof colors;
