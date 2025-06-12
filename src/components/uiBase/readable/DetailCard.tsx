// src/components/uiBase/readable/DetailedCard.tsx
import React from "react";
import { getThemeColors, ThemeColor } from "../colors";

// Funkcja do generowania klas gradientowych dla Daisy UI
const getGradientClasses = (color: ThemeColor): string => {
  const gradientMap = {
    primary: "bg-gradient-to-br from-primary/5 to-primary/20 border border-primary/20 rounded-lg p-4",
    secondary: "bg-gradient-to-br from-secondary/5 to-secondary/20 border border-secondary/20 rounded-lg p-4", 
    accent: "bg-gradient-to-br from-accent/5 to-accent/20 border border-accent/20 rounded-lg p-4",
    info: "bg-gradient-to-br from-info/5 to-info/20 border border-info/20 rounded-lg p-4",
    success: "bg-gradient-to-br from-success/5 to-success/20 border border-success/20 rounded-lg p-4",
    warning: "bg-gradient-to-br from-warning/5 to-warning/20 border border-warning/20 rounded-lg p-4",
    error: "bg-gradient-to-br from-error/5 to-error/20 border border-error/20 rounded-lg p-4",
    neutral: "bg-gradient-to-br from-base-200/20 to-base-300/40 border border-base-300 rounded-lg p-4",
};
  return gradientMap[color];
};

export type DetailedCardVariant = "rounded" | "border-left" | "gradient";

interface DetailedCardProps {
  /** Wariant karty - kształt i styl */
  variant?: DetailedCardVariant;
  /** Kolor karty */
  color?: ThemeColor;
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
  const colors = getThemeColors(color);

  // Klasy bazowe dla każdego wariantu
  const variantClasses = {
    rounded: `${colors.bg} border ${colors.border} rounded-lg p-6`,
    "border-left": `${colors.bg} border-l-4 ${colors.border} rounded-r-lg pl-4 py-4`,
    gradient: getGradientClasses(color),
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

  // Specjalne kolory dla wariantu gradient
  const getGradientTextColors = (color: ThemeColor) => {
    const textColorMap = {
      primary: { iconColor: "text-primary", titleColor: "text-primary", valueColor: "text-primary/80" },
      secondary: { iconColor: "text-secondary", titleColor: "text-secondary", valueColor: "text-secondary/80" },
      accent: { iconColor: "text-accent", titleColor: "text-accent", valueColor: "text-accent/80" },
      info: { iconColor: "text-info", titleColor: "text-info", valueColor: "text-info/80" },
      success: { iconColor: "text-success", titleColor: "text-success", valueColor: "text-success/80" },
      warning: { iconColor: "text-warning", titleColor: "text-warning", valueColor: "text-warning/80" },
      error: { iconColor: "text-error", titleColor: "text-error", valueColor: "text-error/80" },
      neutral: { iconColor: "text-base-content/70", titleColor: "text-base-content", valueColor: "text-base-content/80" },
    };
    return textColorMap[color];
  };

  const textColors = variant === "gradient" ? getGradientTextColors(color) : colors;

  const cardContent = (
    <div className={cardClasses}>
      {title ? (
        // Layout z tytułem - ikona i tytuł w jednej linii
        <>
          <div className="flex items-center gap-2 mb-4">
            {/* Ikona - jeśli podana */}
            {icon && (
              <div
                className={`w-5 h-5 ${textColors.iconColor} [&>*]:w-5 [&>*]:h-5`}
              >
                {icon}
              </div>
            )}

            {/* Tytuł */}
            <h3 className={`font-semibold ${textColors.titleColor} text-lg`}>
              {title}
            </h3>
          </div>

          {/* Główna zawartość */}
          <div className={textColors.valueColor}>{children}</div>
        </>
      ) : (
        // Layout bez tytułu - ikona po lewej z tłem, zawartość po prawej
        <div className="flex items-start gap-4">
          {/* Ikona - jeśli podana */}
          {icon && (
            <div className={`p-3 ${variant === "gradient" ? textColors.iconColor + "/20" : colors.iconBg} rounded-lg flex-shrink-0`}>
              <div className={`w-6 h-6 ${textColors.iconColor}`}>{icon}</div>
            </div>
          )}

          {/* Zawartość */}
          <div className="min-w-0 flex-1">
            <div className={textColors.valueColor}>{children}</div>
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