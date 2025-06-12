import { Plus, Eye, Trash2, Tag, Calendar, CalendarClock, Target, DollarSign, Users, FileText } from "lucide-react";
import { DetailedCard, InfoText } from "@/components/uiBase/readable";

interface MarketingStrategy {
  id: string;
  website_analysis_id: string;
  title: string;
  target_audience: string;
  budget_recommendation: number;
  notes: string;
  industry_override: string | null;
  created_at: string;
  updated_at: string;
}

interface MarketingStrategyCardProps {
  strategy: MarketingStrategy;
  onEdit: (strategyId: string) => void;
  onDelete: (strategyId: string, strategyTitle: string) => void;
  onViewCampaigns: (strategyId: string) => void;
}

export function MarketingStrategyCard({
  strategy,
  onEdit,
  onDelete,
  onViewCampaigns,
}: MarketingStrategyCardProps) {
  const formatBudget = (budget: number) => {
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
    }).format(budget);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <DetailedCard>
      <div className="space-y-6">
        {/* Header z tytułem */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <InfoText
            title={strategy.title}
            subtitle={strategy.industry_override || "Domyślna branża"}
            size="sm"
            align="left"
          />
          <div className="flex gap-2 flex-shrink-0">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => onViewCampaigns(strategy.id)}
              title="Zobacz kampanie"
            >
              <Eye className="w-4 h-4" />
              Kampanie
            </button>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => onEdit(strategy.id)}
              title="Edytuj strategię"
            >
              <Plus className="w-4 h-4" />
              Edytuj
            </button>
            <button
              className="btn btn-sm btn-error btn-outline"
              onClick={() => onDelete(strategy.id, strategy.title)}
              title="Usuń strategię"
            >
              <Trash2 className="w-4 h-4" />
              Usuń
            </button>
          </div>
        </div>

        {/* Grid z kluczowymi informacjami */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailedCard
            variant="border-left"
            color="info"
            icon={<Users />}
            title="Grupa docelowa"
          >
            <InfoText
              title=""
              subtitle={strategy.target_audience}
              size="sm"
            />
          </DetailedCard>

          <DetailedCard
            variant="border-left"
            color="success"
            icon={<DollarSign />}
            title="Budżet"
          >
            <InfoText
              title={formatBudget(strategy.budget_recommendation)}
              subtitle="Rekomendowany budżet"
              size="sm"
              reverse={true}
            />
          </DetailedCard>
        </div>

        {/* Notatki */}
        {strategy.notes && (
          <DetailedCard
            variant="border-left"
            color="warning"
            icon={<FileText />}
            title="Notatki"
          >
            <p className="text-sm text-base-content/80 leading-relaxed">
              {strategy.notes}
            </p>
          </DetailedCard>
        )}

        {/* Timeline */}
        <DetailedCard
          variant="gradient"
          color="neutral"
          icon={<Calendar />}
          title="Historia"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-base-content/70 mb-1">
                Utworzono
              </span>
              <span className="font-medium text-sm">
                {formatDate(strategy.created_at)}
              </span>
            </div>
            {strategy.updated_at !== strategy.created_at && (
              <div className="flex flex-col">
                <span className="text-sm text-base-content/70 mb-1">
                  Ostatnia aktualizacja
                </span>
                <span className="font-medium text-sm">
                  {formatDate(strategy.updated_at)}
                </span>
              </div>
            )}
          </div>
        </DetailedCard>
      </div>
    </DetailedCard>
  );
}