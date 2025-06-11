// src/refinery/router/AutoPage.tsx
import React, { useEffect, useMemo } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { collectRoutes, getComponentForRoute } from "./routeCollector";
import { ProtectedRoute } from "./ProtectedRoute";

// Funkcja do dopasowywania ścieżki z parametrami
function matchRoute(pathname: string, routePath: string): boolean {
  const pathSegments = pathname.split('/').filter(Boolean);
  const routeSegments = routePath.split('/').filter(Boolean);
  
  if (pathSegments.length !== routeSegments.length) {
    return false;
  }
  
  return routeSegments.every((segment, index) => {
    return segment.startsWith(':') || segment === pathSegments[index];
  });
}

// Funkcja do znajdowania konfiguracji route'a
function findRouteConfig(pathname: string, routes: Record<string, any>) {
  // Najpierw spróbuj dokładnego dopasowania
  if (routes[pathname]) {
    return routes[pathname];
  }
  
  // Następnie spróbuj dopasowania z parametrami
  for (const [routePath, config] of Object.entries(routes)) {
    if (matchRoute(pathname, routePath)) {
      return config;
    }
  }
  
  return null;
}

export const AutoPage: React.FC = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  
  // Pobierz agentMode z URL params zamiast useLoaderData
  const agentMode = searchParams.get("agentMode") === "true";

  console.log('=== AutoPage Debug ===');
  console.log('pathname:', pathname);
  console.log('agentMode:', agentMode);

  // Memoizuj routes żeby nie zbierać ich przy każdym renderze
  const routes = useMemo(() => collectRoutes(agentMode), [agentMode]);
  console.log('dostępne routes:', Object.keys(routes));
  console.log('wszystkie routes:', routes);
  
  const config = findRouteConfig(pathname, routes);
  console.log('znaleziona config dla', pathname, ':', config);
  
  if (!config) {
    console.log('BRAK CONFIG - pokazuję 404');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">404 – Strona nie znaleziona</h1>
          <p className="text-gray-600">Ścieżka: {pathname}</p>
          <div className="mt-4 text-sm text-gray-500">
            <p>Tryb: {agentMode ? 'Agent' : 'UI'}</p>
            <p>Dostępne ścieżki:</p>
            <ul className="list-disc list-inside">
              {Object.keys(routes).map(path => (
                <li key={path}>{path}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  console.log('config.roles:', config.roles);
  console.log('czy ma role?', config.roles !== undefined);
  console.log('czy pusta tablica?', Array.isArray(config.roles) && config.roles.length === 0);

  useEffect(() => {
    if (config.title) {
      document.title = config.title;
    }
  }, [config.title]);

  // Pobierz komponent bezpośrednio z załadowanych modułów
  const Component = getComponentForRoute(config.modulePath!, agentMode);
  console.log('Component loaded:', !!Component);

  if (!Component) {
    console.log('BRAK KOMPONENTU');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Błąd ładowania komponentu</h1>
          <p className="text-gray-600">Nie można załadować komponentu dla: {pathname}</p>
        </div>
      </div>
    );
  }

  const page = <Component key={pathname} />;

  // Sprawdź czy używać ProtectedRoute
  const shouldProtect = config.roles !== undefined && config.roles.length > 0;
  console.log('shouldProtect:', shouldProtect);
  console.log('używam ProtectedRoute?', shouldProtect);

  if (shouldProtect) {
    console.log('CHRONIĘ STRONĘ ProtectedRoute z rolami:', config.roles);
    return <ProtectedRoute roles={config.roles}>{page}</ProtectedRoute>;
  } else {
    console.log('STRONA PUBLICZNA - bez ProtectedRoute');
    return page;
  }
};