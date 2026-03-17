export type AppTheme = "light" | "dark";

export function setTheme(theme: AppTheme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
}

export function initTheme() {
  const saved = localStorage.getItem("theme") as AppTheme | null;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  setTheme(saved ?? (prefersDark ? "dark" : "light"));
}