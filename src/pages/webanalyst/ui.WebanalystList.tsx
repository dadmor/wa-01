// src/pages/webanalyst/ui.WebsiteAnalysisList.tsx - zaktualizowana wersja
import { BaseLayout } from "@/components/layout";
import { useFetch } from "../api/hooks";
import { EmptyState, LoadingSpinner } from "@/components/ui_shdn/basic";
import { DetailedCard, InfoText } from "@/components/uiBase/readable";
import { ErrorAlert } from "@/components/uiBase/system";
import { WebsiteAnalysisCard } from "./card.WebsiteAnalysisCard";

import { useNavigate } from "react-router-dom";
import { Lightbulb, Rocket, Tag, TrendingUp } from "lucide-react";
import { Header } from "../layout.Header";
import { Footer } from "../layout.Footer";

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
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetch<WebsiteAnalysis>(
    "website-analyses",
    "website_analyses"
  );

  const handleNewStrategy = (analysisId: string) => {
    // TODO: Implementacja tworzenia nowej strategii
    console.log("Tworzenie nowej strategii dla:", analysisId);
    // navigate(`/webanalyst/strategy/new/${analysisId}`);
  };

  const handleViewDetails = (analysisId: string) => {
    navigate(`/webanalyst/details/${analysisId}`);
  };

  const handleDelete = (analysisId: string, url: string) => {
    // TODO: Implementacja usuwania z potwierdzeniem
    if (confirm(`Czy na pewno chcesz usunąć analizę strony ${url}?`)) {
      console.log("Usuwanie analizy:", analysisId);
    }
  };

  return (
    <>
      <Header />
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
              <DetailedCard color="info" icon={<TrendingUp />}>
                <InfoText
                  title={`${data?.length || 0}`}
                  subtitle="Przeanalizowanych stron"
                  size="md"
                  reverse={true}
                />
              </DetailedCard>

              <DetailedCard color="success" icon={<Lightbulb />}>
                <InfoText
                  title="0"
                  subtitle="Strategii utworzonych"
                  size="md"
                  reverse={true}
                />
              </DetailedCard>

              <DetailedCard color="warning" icon={<Rocket />}>
                <InfoText
                  title="0"
                  subtitle="Kampanii uruchomionych"
                  size="md"
                  reverse={true}
                />
              </DetailedCard>
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
      <Footer />
    </>
  );
}
