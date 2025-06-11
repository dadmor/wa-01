// src/components/StatCard.tsx

import { Card } from "./Card";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  color?: "blue" | "green" | "purple" | "red" | "yellow";
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  color = "blue",
}) => {
  // Każdy wpis to [bgClass, textClass]
  const colorMap: Record<Required<StatCardProps>["color"], [string, string]> = {
    blue: ["bg-blue-100", "text-blue-600"],
    green: ["bg-green-100", "text-green-600"],
    purple: ["bg-purple-100", "text-purple-600"],
    red: ["bg-red-100", "text-red-600"],
    yellow: ["bg-yellow-100", "text-yellow-600"],
  };

  // Jeśli ktoś przekaże nieprawidłowy kolor, zawsze fallback do blue
  const [bgClass, textClass] = colorMap[color] || colorMap.blue;

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${bgClass} ${textClass}`}
          >
            {icon}
          </div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        </div>

        <div className="text-center space-y-2">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${bgClass} bg-opacity-20`}
          >
            <span className={`text-2xl font-bold ${textClass}`}>{value}</span>
          </div>
          {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
        </div>
      </div>
    </Card>
  );
};
