// src/components/uiBase/readable/NotificationCard.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cardColors } from '@/components/uiBase/colors';

export type NotificationVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral';

interface NotificationCardProps {
  /** Wariant koloru karty */
  variant?: NotificationVariant;
  /** Ikona wyświetlana w karcie */
  icon: LucideIcon;
  /** Tytuł karty */
  title: string;
  /** Wartość liczbowa lub tekst - opcjonalna dla trybu detail */
  value?: string | number;
  /** Opcjonalny opis pod wartością */
  description?: string;
  /** Zawartość karty - dla trybu detail card */
  children?: React.ReactNode;
  /** Dodatkowe klasy CSS */
  className?: string;
  /** Handler kliknięcia */
  onClick?: () => void;
}


export const NotificationCard: React.FC<NotificationCardProps> = ({
  variant = 'neutral',
  icon: Icon,
  title,
  value,
  description,
  children,
  className = '',
  onClick
}) => {
  const colors = cardColors[variant];
  
  // Tryb detail card - gdy są children ale nie ma value
  const isDetailMode = children && !value;
  
  const cardContent = (
    <div className={`${colors.bg} border ${colors.border} rounded-lg p-6 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}>
      <div className={`flex items-${isDetailMode ? 'start' : 'center'} gap-4`}>
        <div className={`p-3 ${colors.iconBg} rounded-lg flex-shrink-0`}>
          <Icon className={`w-6 h-6 ${colors.iconColor}`} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={`text-lg font-semibold ${colors.titleColor} ${isDetailMode ? 'mb-2' : 'mb-1'}`}>
            {title}
          </h3>
          
          {/* Tryb stats card - gdy jest value */}
          {value && (
            <p className={`text-2xl font-bold ${colors.valueColor}`}>
              {value}
            </p>
          )}
          
          {/* Opis pod wartością */}
          {description && (
            <p className={`text-sm ${colors.valueColor} opacity-75 mt-1`}>
              {description}
            </p>
          )}
          
          {/* Tryb detail card - gdy są children */}
          {children && (
            <div className={`${colors.valueColor}`}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full text-left">
        {cardContent}
      </button>
    );
  }

  return cardContent;
};

// Pomocniczy komponent dla siatki kart
interface CardsGridProps {
  cards: Array<{
    id: string;
    variant?: NotificationVariant;
    icon: LucideIcon;
    title: string;
    value?: string | number;
    description?: string;
    children?: React.ReactNode;
    onClick?: () => void;
  }>;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export const CardsGrid: React.FC<CardsGridProps> = ({
  cards,
  columns = 3,
  className = ''
}) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-6 ${className}`}>
      {cards.map((card) => (
        <NotificationCard
          key={card.id}
          variant={card.variant}
          icon={card.icon}
          title={card.title}
          value={card.value}
          description={card.description}
          children={card.children}
          onClick={card.onClick}
        />
      ))}
    </div>
  );
};