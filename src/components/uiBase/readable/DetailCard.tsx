// src/components/uiBase/readable/DetailedCard.tsx
import React from "react";

export type DetailedCardVariant = "rounded" | "border-left";
export type DetailedCardColor =
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "neutral";

interface DetailedCardProps {
  /** Wariant karty - kształt i styl */
  variant?: DetailedCardVariant;
  /** Kolor karty */
  color?: DetailedCardColor;
  /** Ikona wyświetlana w karcie */
  icon?: React.ReactNode;
  /** Tytuł karty (opcjonalny) */
  title?: string;
  /** Zawartość karty */
  children: React.ReactNode;
  /** Dodatkowe klasy CSS */
  className?: string;
  /** Handler kliknięcia */
  onClick?: () => void;
}

// Kolory używające systemu Daisy UI z spójnym stylem
export const daisyCardColors = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary/20",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    titleColor: "text-primary",
    valueColor: "text-primary/80",
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary/20",
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
    titleColor: "text-secondary",
    valueColor: "text-secondary/80",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent/20",
    iconBg: "bg-accent/20",
    iconColor: "text-accent",
    titleColor: "text-accent",
    valueColor: "text-accent/80",
  },
  info: {
    bg: "bg-info/10",
    border: "border-info/20",
    iconBg: "bg-info/20",
    iconColor: "text-info",
    titleColor: "text-info",
    valueColor: "text-info/80",
  },
  success: {
    bg: "bg-success/10",
    border: "border-success/20",
    iconBg: "bg-success/20",
    iconColor: "text-success",
    titleColor: "text-success",
    valueColor: "text-success/80",
  },
  warning: {
    bg: "bg-warning/10",
    border: "border-warning/20",
    iconBg: "bg-warning/20",
    iconColor: "text-warning",
    titleColor: "text-warning",
    valueColor: "text-warning/80",
  },
  error: {
    bg: "bg-error/10",
    border: "border-error/20",
    iconBg: "bg-error/20",
    iconColor: "text-error",
    titleColor: "text-error",
    valueColor: "text-error/80",
  },
  neutral: {
    bg: "bg-base-200",
    border: "border-base-300",
    iconBg: "bg-base-300",
    iconColor: "text-base-content/70",
    titleColor: "text-base-content",
    valueColor: "text-base-content/80",
  },
};

export const DetailedCard: React.FC<DetailedCardProps> = ({
  variant = "rounded",
  color = "neutral",
  icon,
  title,
  children,
  className = "",
  onClick,
}) => {
  // Pobierz kolory z systemu Daisy UI
  const colors = daisyCardColors[color];

  // Klasy bazowe dla każdego wariantu
  const variantClasses = {
    rounded: `${colors.bg} border ${colors.border} rounded-lg p-6`,
    "border-left": `${colors.bg} border-l-4 ${colors.border} rounded-r-lg pl-4 py-4`,
  };

  const cardClasses = `
    ${variantClasses[variant]}
    ${
      onClick
        ? "cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
        : ""
    }
    ${className}
  `.trim();

  const cardContent = (
    <div className={cardClasses}>
      {title ? (
        // Layout z tytułem - ikona i tytuł w jednej linii
        <>
          <div className="flex items-center gap-2 mb-4">
            {/* Ikona - jeśli podana */}
            {icon && (
              <div
                className={`w-5 h-5 ${colors.iconColor} [&>*]:w-5 [&>*]:h-5`}
              >
                {icon}
              </div>
            )}

            {/* Tytuł */}
            <h3 className={`font-semibold ${colors.titleColor} text-lg`}>
              {title}
            </h3>
          </div>

          {/* Główna zawartość */}
          <div className={colors.valueColor}>{children}</div>
        </>
      ) : (
        // Layout bez tytułu - ikona po lewej z tłem, zawartość po prawej
        <div className="flex items-start gap-4">
          {/* Ikona - jeśli podana */}
          {icon && (
            <div className={`p-3 ${colors.iconBg} rounded-lg flex-shrink-0`}>
              <div className={`w-6 h-6 ${colors.iconColor}`}>{icon}</div>
            </div>
          )}

          {/* Zawartość */}
          <div className="min-w-0 flex-1">
            <div className={colors.valueColor}>{children}</div>
          </div>
        </div>
      )}
    </div>
  );

  // Jeśli jest onClick, opakowujemy w button
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg"
      >
        {cardContent}
      </button>
    );
  }

  return cardContent;
};