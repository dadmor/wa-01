import { BaseLayout } from "@/components/layout";

import { useFetch } from "../api/hooks";
import { EmptyState, LoadingSpinner } from "@/components/ui_shdn/basic";
import { InfoText } from "@/components/uiBase/readable";
import { ErrorAlert } from "@/components/uiBase/system";
import { WebsiteAnalysisCard } from "./card.WebsiteAnalysisCard";
import { Lightbulb, Rocket, TrendingUp } from "lucide-react";
import { cardColors } from "@/components/uiBase/colors";

export const routeConfig = {
  path: "/webanalyst/list",
  title: "Lista analizowanych stron www",
};

// Typ dla rekordu website_analyses
interface WebsiteAnalysis {
  id: string;
  url: string;
  description: string;
  keywords: string[];
  industry: string;
  created_at: string;
  updated_at: string;
}

export default function WebsiteAnalysisList() {
  const { data, isLoading, error } = useFetch<WebsiteAnalysis>(
    "website-analyses",
    "website_analyses"
  );

  const handleNewStrategy = (analysisId: string) => {
    // TODO: Implementacja tworzenia nowej strategii
    console.log("Tworzenie nowej strategii dla:", analysisId);
  };

  const handleViewDetails = (analysisId: string) => {
    // TODO: Implementacja przejścia do szczegółów
    console.log("Wyświetlanie szczegółów dla:", analysisId);
  };

  const handleDelete = (analysisId: string, url: string) => {
    // TODO: Implementacja usuwania z potwierdzeniem
    if (confirm(`Czy na pewno chcesz usunąć analizę strony ${url}?`)) {
      console.log("Usuwanie analizy:", analysisId);
    }
  };

  return (
    <BaseLayout>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
              <div className="flex-1 max-w-3xl">
                <InfoText
                  title="Lista analizowanych stron www"
                  subtitle="Przegląd wszystkich stron internetowych które zostały poddane analizie SEO i marketingowej. Monitoruj swoje projekty i śledź postępy w optymalizacji."
                  size="md"
                  align="left"
                />
              </div>
              <div className="flex-shrink-0">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <button className="btn btn-primary btn-lg sm:btn-md whitespace-nowrap">
                    Dodaj nową stronę
                  </button>
                  <button className="btn btn-outline btn-lg sm:btn-md whitespace-nowrap">
                    Eksportuj raport
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`${cardColors.info.bg} border ${cardColors.info.border} rounded-lg p-6`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 ${cardColors.info.iconBg} rounded-lg`}>
                  <TrendingUp className={`w-6 h-6 ${cardColors.info.iconColor}`} />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${cardColors.info.titleColor}`}>Analizowanych stron</h3>
                  <p className={`text-2xl font-bold ${cardColors.info.valueColor}`}>{data?.length || 0}</p>
                </div>
              </div>
            </div>

            <div className={`${cardColors.success.bg} border ${cardColors.success.border} rounded-lg p-6`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 ${cardColors.success.iconBg} rounded-lg`}>
                  <Lightbulb className={`w-6 h-6 ${cardColors.success.iconColor}`} />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${cardColors.success.titleColor}`}>Strategii utworzonych</h3>
                  <p className={`text-2xl font-bold ${cardColors.success.valueColor}`}>0</p>
                </div>
              </div>
            </div>

            <div className={`${cardColors.warning.bg} border ${cardColors.warning.border} rounded-lg p-6`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 ${cardColors.warning.iconBg} rounded-lg`}>
                  <Rocket className={`w-6 h-6 ${cardColors.warning.iconColor}`} />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${cardColors.warning.titleColor}`}>Kampanii uruchomionych</h3>
                  <p className={`text-2xl font-bold ${cardColors.warning.valueColor}`}>0</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="pb-16">
          {isLoading && <LoadingSpinner />}

          {error && <ErrorAlert error={error} />}

          {data && data.length === 0 && (
            <EmptyState
              title="Brak analizowanych stron"
              description="Nie znaleziono żadnych analizowanych stron www w systemie."
              icon={undefined}
            />
          )}

          {data && data.length > 0 && (
            <div className="space-y-6">
              {data.map((analysis) => (
                <WebsiteAnalysisCard
                  key={analysis.id}
                  analysis={analysis}
                  onNewStrategy={handleNewStrategy}
                  onViewDetails={handleViewDetails}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </BaseLayout>
  );
}
