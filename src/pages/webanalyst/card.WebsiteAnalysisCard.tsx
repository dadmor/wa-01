import { Plus, Eye, Trash2, Tag, Calendar, CalendarClock } from "lucide-react";

interface WebsiteAnalysis {
  id: string;
  url: string;
  description: string;
  keywords: string[];
  industry: string;
  created_at: string;
  updated_at: string;
}

interface WebsiteAnalysisCardProps {
  analysis: WebsiteAnalysis;
  onNewStrategy: (analysisId: string) => void;
  onViewDetails: (analysisId: string) => void;
  onDelete: (analysisId: string, url: string) => void;
}

export function WebsiteAnalysisCard({
  analysis,
  onNewStrategy,
  onViewDetails,
  onDelete,
}: WebsiteAnalysisCardProps) {
  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="card-body p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1">
              <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
                <a
                  href={analysis.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary hover:no-underline"
                >
                  {analysis.url}
                </a>
              </h2>
            </div>
            <div className="badge badge-ghost text-xs font-medium">
              {analysis.industry}
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            {analysis.description}
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Słowa kluczowe</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.map((keyword, index) => (
                <div
                  key={index}
                  className="badge badge-primary badge-outline badge-sm"
                >
                  {keyword}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-base-300">
            <div className="flex justify-between items-center">
              <div className="flex gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>
                    Utworzono{" "}
                    {new Date(analysis.created_at).toLocaleDateString("pl-PL")}
                  </span>
                </div>
                {analysis.updated_at !== analysis.created_at && (
                  <div className="flex items-center gap-1">
                    <CalendarClock className="w-3 h-3" />
                    <span>
                      Zaktualizowano{" "}
                      {new Date(analysis.updated_at).toLocaleDateString(
                        "pl-PL"
                      )}
                    </span>
                  </div>
                )}
              </div>

              {/* Guziki akcji */}
              <div className="flex gap-2">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => onNewStrategy(analysis.id)}
                  title="Utwórz nową strategię"
                >
                  <Plus className="w-4 h-4" />
                  Nowa strategia
                </button>

                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => onViewDetails(analysis.id)}
                  title="Zobacz szczegóły analizy"
                >
                  <Eye className="w-4 h-4" />
                  Szczegóły
                </button>

                <button
                  className="btn btn-sm btn-error btn-outline"
                  onClick={() => onDelete(analysis.id, analysis.url)}
                  title="Usuń analizę"
                >
                  <Trash2 className="w-4 h-4" />
                  Usuń
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
