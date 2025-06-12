// src/components/uiBase/readable/DetailedCard.tsx
import React from "react";
import { getThemeColors, ThemeColor } from "../colors";


export type DetailedCardVariant = "rounded" | "border-left";

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