// @/components/layout/Footer.tsx
import { Heart, Mail, Phone, MapPin, Github, Twitter, Linkedin, Globe } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-10">
      {/* Main Footer Content */}
      <div className="p-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Company Info */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-primary-content" />
            </div>
            <span className="text-2xl font-bold">Logotype</span>
          </div>
          <p className="max-w-xs text-base-content/70 mb-4">
            Profesjonalna analiza stron internetowych i optymalizacja SEO. 
            Pomagamy Twoim stronom osiągnąć lepsze pozycje w wyszukiwarkach.
          </p>
          <div className="flex gap-4">
            <a href="#" className="btn btn-ghost btn-sm btn-circle hover:btn-primary">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="btn btn-ghost btn-sm btn-circle hover:btn-primary">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="btn btn-ghost btn-sm btn-circle hover:btn-primary">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h6 className="footer-title">Usługi</h6>
          <div className="flex flex-col gap-2">
            <a className="link link-hover">Analiza SEO</a>
            <a className="link link-hover">Audyt strony</a>
            <a className="link link-hover">Optymalizacja treści</a>
            <a className="link link-hover">Monitoring pozycji</a>
            <a className="link link-hover">Analiza konkurencji</a>
            <a className="link link-hover">Raporty wydajności</a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h6 className="footer-title">Firma</h6>
          <div className="flex flex-col gap-2">
            <a className="link link-hover">O nas</a>
            <a className="link link-hover">Cennik</a>
            <a className="link link-hover">Blog</a>
            <a className="link link-hover">Kariera</a>
            <a className="link link-hover">Kontakt</a>
            <a className="link link-hover">Pomoc</a>
          </div>
        </div>

        {/* Contact & Newsletter */}
        <div>
          <h6 className="footer-title">Kontakt</h6>
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-primary" />
              <a href="mailto:kontakt@logotype.pl" className="link link-hover">
                kontakt@logotype.pl
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-primary" />
              <a href="tel:+48123456789" className="link link-hover">
                +48 123 456 789
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Warszawa, Polska</span>
            </div>
          </div>
          
          {/* Newsletter */}
          <div>
            <h6 className="font-semibold mb-2">Newsletter</h6>
            <div className="join w-full">
              <input 
                className="input input-bordered join-item input-sm flex-1" 
                placeholder="Twój email"
                type="email"
              />
              <button className="btn btn-primary join-item btn-sm">
                Zapisz
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

     

      {/* Bottom Footer */}
      <div className="mt-20 footer-center p-6 bg-base-300 text-base-content border-t border-neutral-300" >
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-1 text-sm">
            <span>© 2025 Logotype. Wszystkie prawa zastrzeżone.</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm mt-2 md:mt-0">
            <span>Stworzone</span>
            <Heart className="w-4 h-4 text-error fill-current" />
            <span>w Polsce</span>
          </div>
          
          <div className="flex gap-4 text-sm mt-2 md:mt-0">
            <a href="#" className="link link-hover">Mapa strony</a>
            <a href="#" className="link link-hover">Status</a>
            <a href="#" className="link link-hover">API</a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="fixed bottom-3.5 right-6 z-40">
        <button 
          className="btn btn-primary btn-circle shadow-lg"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Przewiń do góry"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </footer>
  );
};