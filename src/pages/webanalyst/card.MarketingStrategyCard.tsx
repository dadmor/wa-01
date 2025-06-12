// src/pages/webanalyst/card.MarketingStrategyCard.tsx
import { 
    Edit3, 
    Trash2, 
    Eye, 
    Calendar,
    Users,
    DollarSign,
    FileText,
    Building2,
    Play
  } from "lucide-react";
  import { cardColors } from "@/components/uiBase/colors";
  
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
    onViewCampaigns 
  }: MarketingStrategyCardProps) {
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };
  
    const formatBudget = (amount: number) => {
      return new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    };
  
    const truncateText = (text: string, maxLength: number = 150) => {
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + '...';
    };
  
    return (
      <div className={`${cardColors.neutral.bg} border ${cardColors.neutral.border} rounded-lg p-6 hover:shadow-md transition-shadow`}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">
              {strategy.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Utworzono: {formatDate(strategy.created_at)}</span>
              </div>
              {strategy.updated_at !== strategy.created_at && (
                <div className="flex items-center gap-1">
                  <span>•</span>
                  <span>Zaktualizowano: {formatDate(strategy.updated_at)}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onViewCampaigns(strategy.id)}
              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
              title="Zobacz kampanie Google Ads"
            >
              <Play className="w-4 h-4" />
            </button>
            <button
              onClick={() => onEdit(strategy.id)}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
              title="Edytuj strategię"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(strategy.id, strategy.title)}
              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
              title="Usuń strategię"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
  
        {/* Strategy Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Target Audience */}
          <div className={`${cardColors.info.bg} border ${cardColors.info.border} rounded-lg p-4`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 ${cardColors.info.iconBg} rounded-lg`}>
                <Users className={`w-4 h-4 ${cardColors.info.iconColor}`} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className={`text-sm font-medium ${cardColors.info.titleColor} mb-1`}>
                  Grupa docelowa
                </h4>
                <p className={`text-sm ${cardColors.info.valueColor} truncate`}>
                  {strategy.target_audience}
                </p>
              </div>
            </div>
          </div>
  
          {/* Budget Recommendation */}
          <div className={`${cardColors.success.bg} border ${cardColors.success.border} rounded-lg p-4`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 ${cardColors.success.iconBg} rounded-lg`}>
                <DollarSign className={`w-4 h-4 ${cardColors.success.iconColor}`} />
              </div>
              <div>
                <h4 className={`text-sm font-medium ${cardColors.success.titleColor} mb-1`}>
                  Budżet
                </h4>
                <p className={`text-sm font-bold ${cardColors.success.valueColor}`}>
                  {formatBudget(strategy.budget_recommendation)}
                </p>
              </div>
            </div>
          </div>
  
          {/* Industry Override */}
          <div className={`${cardColors.warning.bg} border ${cardColors.warning.border} rounded-lg p-4`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 ${cardColors.warning.iconBg} rounded-lg`}>
                <Building2 className={`w-4 h-4 ${cardColors.warning.iconColor}`} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className={`text-sm font-medium ${cardColors.warning.titleColor} mb-1`}>
                  Branża
                </h4>
                <p className={`text-sm ${cardColors.warning.valueColor} truncate capitalize`}>
                  {strategy.industry_override || 'Domyślna'}
                </p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Notes Section */}
        {strategy.notes && (
          <div className="border-t pt-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                <FileText className="w-4 h-4 text-gray-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Notatki strategii
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {truncateText(strategy.notes)}
                </p>
                {strategy.notes.length > 150 && (
                  <button 
                    onClick={() => onEdit(strategy.id)}
                    className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                  >
                    Zobacz więcej...
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
  
        {/* Footer with Action Button */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <div className="text-xs text-gray-500">
            ID: {strategy.id.substring(0, 8)}...
          </div>
          <button
            onClick={() => onViewCampaigns(strategy.id)}
            className="btn btn-outline btn-sm flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Zobacz kampanie
          </button>
        </div>
      </div>
    );
  }