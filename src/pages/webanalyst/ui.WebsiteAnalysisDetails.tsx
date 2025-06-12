// src/pages/webanalyst/ui.WebsiteAnalysisDetails.tsx - refactored with DetailedCard only where needed
import { BaseLayout } from "@/components/layout";
import { useFetchSingle, useFetchFiltered, useDelete } from "../api/hooks";
import { EmptyState, LoadingSpinner } from "@/components/ui_shdn/basic";
import { DetailedCard, InfoText } from "@/components/uiBase/readable";
import { ErrorAlert } from "@/components/uiBase/system";
import { MarketingStrategyCard } from "./card.MarketingStrategyCard";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Globe,
  Calendar,
  Tag,
  Building2,
  Plus,
  Target,
} from "lucide-react";
import { Header } from "../layout.Header";
import { Footer } from "../layout.Footer";

export const routeConfig = {
  path: "/webanalyst/details/:id",
  title: "Szczegóły analizy strony",
};

interface WebsiteAnalysis {
  id: string;
  url: string;
  description: string;
  keywords: string[];
  industry: string;
  created_at: string;
  updated_at: string;
}

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

export default function WebsiteAnalysisDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: analysis,
    isLoading: analysisLoading,
    error: analysisError,
  } = useFetchSingle<WebsiteAnalysis>(
    "website-analysis-detail",
    "website_analyses",
    id
  );

  const {
    data: strategies,
    isLoading: strategiesLoading,
    error: strategiesError,
  } = useFetchFiltered<MarketingStrategy>(
    "marketing-strategies",
    "marketing_strategies",
    "website_analysis_id",
    id
  );

  const deleteStrategyMutation = useDelete(
    "marketing-strategies",
    "marketing_strategies"
  );

  const handleBack = () => {
    navigate("/webanalyst/list");
  };

  const handleNewStrategy = () => {
    console.log("Tworzenie nowej strategii dla analizy:", id);
  };

  const handleEditStrategy = (strategyId: string) => {
    console.log("Edycja strategii:", strategyId);
  };

  const handleDeleteStrategy = async (
    strategyId: string,
    strategyTitle: string
  ) => {
    if (confirm(`Czy na pewno chcesz usunąć strategię "${strategyTitle}"?`)) {
      try {
        await deleteStrategyMutation.mutateAsync({ id: strategyId });
      } catch (error) {
        console.error("Błąd podczas usuwania strategii:", error);
      }
    }
  };

  const handleViewCampaigns = (strategyId: string) => {
    console.log("Wyświetlanie kampanii dla strategii:", strategyId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isLoading = analysisLoading || strategiesLoading;
  const error = analysisError || strategiesError;

  return (
    <>
      <Header />
      <BaseLayout>
        <div className="container mx-auto px-4">
          {/* Back Button - pozostawiony jak był */}
          <div className="py-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Powrót do listy
            </button>
          </div>

          {isLoading && <LoadingSpinner />}

          {error && <ErrorAlert error={error} />}

          {!analysis && !isLoading && (
            <EmptyState
              title="Nie znaleziono analizy"
              description="Analiza strony o podanym ID nie została znaleziona."
              icon={undefined}
            />
          )}

          {analysis && (
            <>
              {/* Hero Section - Analysis Details */}
              <section className="py-8 sm:py-12">
                <div className="mx-auto max-w-7xl">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                    <div className="flex-1">
                      <InfoText
                        title="Szczegóły analizy strony"
                        subtitle={analysis.description}
                        size="md"
                        align="left"
                      />

                      {/* Analysis Details - Reorganized using DetailedCard */}
                      <div className="mt-8 space-y-6">
                        {/* Słowa kluczowe - zastąpione DetailedCard */}
                        <DetailedCard
                          variant="border-left"
                          color="success"
                          icon={<Tag />}
                          title="Słowa kluczowe"
                        >
                          <div className="flex flex-wrap gap-2">
                            {analysis.keywords.map((keyword, index) => (
                              <span
                                key={index}
                                className="px-3 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200 hover:bg-green-200 transition-colors"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </DetailedCard>

                        {/* URL i Branża w jednym rzędzie - zastąpione DetailedCard */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <DetailedCard color="neutral" icon={<Globe />}>
                            <InfoText
                              title="Adres URL"
                              subtitle={analysis.url}
                              size="sm"
                            />
                          </DetailedCard>

                          <DetailedCard color="info" icon={<Building2 />}>
                            <InfoText
                              title="Branża"
                              subtitle={analysis.industry}
                              size="sm"
                            />
                          </DetailedCard>
                        </div>

                        {/* Informacje o datach - zastąpione DetailedCard */}
                        <DetailedCard
                          variant="rounded"
                          color="neutral"
                          icon={<Calendar />}
                          title="Historia zmian"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                              <span className="text-sm opacity-70 mb-1">
                                Utworzono
                              </span>
                              <span className="font-medium">
                                {formatDate(analysis.created_at)}
                              </span>
                            </div>
                            {analysis.updated_at !== analysis.created_at && (
                              <div className="flex flex-col">
                                <span className="text-sm opacity-70 mb-1">
                                  Ostatnia aktualizacja
                                </span>
                                <span className="font-medium">
                                  {formatDate(analysis.updated_at)}
                                </span>
                              </div>
                            )}
                          </div>
                        </DetailedCard>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Marketing Strategies Section */}
              <section className="pb-16">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Strategie marketingowe ({strategies?.length || 0})
                    </h2>
                    <p className="text-gray-600">
                      Lista wszystkich strategii marketingowych utworzonych dla
                      tej analizy
                    </p>
                  </div>
                  <button
                    onClick={handleNewStrategy}
                    className="btn btn-primary flex items-center gap-2 whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    Nowa strategia
                  </button>
                </div>

                {strategiesLoading && <LoadingSpinner />}

                {(!strategies || strategies.length === 0) &&
                  !strategiesLoading && (
                    <EmptyState
                      title="Brak strategii marketingowych"
                      description="Nie utworzono jeszcze żadnych strategii marketingowych dla tej analizy strony."
                      icon={<Target className="w-12 h-12" />}
                    />
                  )}

                {strategies && strategies.length > 0 && (
                  <div className="space-y-6">
                    {strategies.map((strategy) => (
                      <MarketingStrategyCard
                        key={strategy.id}
                        strategy={strategy}
                        onEdit={handleEditStrategy}
                        onDelete={handleDeleteStrategy}
                        onViewCampaigns={handleViewCampaigns}
                      />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </BaseLayout>
      <Footer />
    </>
  );
}
