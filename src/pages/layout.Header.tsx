// @/components/layout/Header.tsx
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">Logotype</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors">
                Dashboard
              </a>
              <div className="relative group">
                <button className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 hover:bg-gray-800 transition-colors">
                  Analiza stron
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700">Lista analiz</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700">Nowa analiza</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700">Raporty</a>
                  </div>
                </div>
              </div>
              <a href="#" className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                Strategie
              </a>
              <a href="#" className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                Kampanie
              </a>
              <a href="#" className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                Ustawienia
              </a>
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative group">
                <button className="bg-gray-800 flex text-sm rounded-full text-white hover:bg-gray-700 transition-colors px-4 py-2">
                  <span>Jan Kowalski</span>
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700">Profil</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700">Ustawienia konta</a>
                    <hr className="my-1 border-gray-700" />
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700">Wyloguj</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 rounded-b-lg">
              <a href="#" className="bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                Dashboard
              </a>
              <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                Analiza stron
              </a>
              <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                Strategie
              </a>
              <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                Kampanie
              </a>
              <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                Ustawienia
              </a>
              <hr className="my-2 border-gray-700" />
              <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                Jan Kowalski - Profil
              </a>
              <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                Wyloguj
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};