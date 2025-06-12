// src/utils/theme/colors.ts
export type ThemeColor =
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "neutral";

export interface ColorScheme {
  bg: string;
  border: string;
  iconBg: string;
  iconColor: string;
  titleColor: string;
  valueColor: string;
}

// Kolory używające systemu Daisy UI z spójnym stylem
export const daisyThemeColors: Record<ThemeColor, ColorScheme> = {
  primary: {
    bg: "bg-primary-content/5",
    border: "border-primary/20",
    iconBg: "bg-primary-content/20",
    iconColor: "text-primary",
    titleColor: "text-primary",
    valueColor: "text-primary/80",
  },
  secondary: {
    bg: "bg-secondary-content/5",
    border: "border-secondary/20",
    iconBg: "bg-secondary-content/20",
    iconColor: "text-secondary",
    titleColor: "text-secondary",
    valueColor: "text-secondary/80",
  },
  accent: {
    bg: "bg-accent-content/5",
    border: "border-accent/20",
    iconBg: "bg-accent-content/20",
    iconColor: "text-accent",
    titleColor: "text-accent",
    valueColor: "text-accent/80",
  },
  info: {
    bg: "bg-info-content/5",
    border: "border-info/20",
    iconBg: "bg-info-content/20",
    iconColor: "text-info",
    titleColor: "text-info",
    valueColor: "text-info/80",
  },
  success: {
    bg: "bg-success-content/5",
    border: "border-success/20",
    iconBg: "bg-success-content/20",
    iconColor: "text-success",
    titleColor: "text-success",
    valueColor: "text-success/80",
  },
  warning: {
    bg: "bg-warning-content/5",
    border: "border-warning/20",
    iconBg: "bg-warning-content/20",
    iconColor: "text-warning",
    titleColor: "text-warning",
    valueColor: "text-warning/80",
  },
  error: {
    bg: "bg-error-content/5",
    border: "border-error/20",
    iconBg: "bg-error-content/20",
    iconColor: "text-error",
    titleColor: "text-error",
    valueColor: "text-error/80",
  },
  neutral: {
    bg: "bg-base-200/30",
    border: "border-base-300",
    iconBg: "bg-base-300/70",
    iconColor: "text-base-content/70",
    titleColor: "text-base-content",
    valueColor: "text-base-content/80",
  },
};

// Funkcja pomocnicza do pobierania kolorów
export const getThemeColors = (color: ThemeColor): ColorScheme => {
  return daisyThemeColors[color];
};