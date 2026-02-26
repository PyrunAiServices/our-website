import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_5a814ac5-8809-40fc-9b70-23556389f011/artifacts/hvex155g_PyrunAi_FullLogo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Case Studies", path: "/case-studies" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav
      data-testid="main-navbar"
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-50 rounded-full px-5 py-2.5 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200/60"
          : "bg-white/70 backdrop-blur-lg border border-white/40"
      }`}
    >
      <Link to="/" className="flex items-center gap-2 shrink-0" data-testid="navbar-logo">
        <img src={LOGO_URL} alt="PyrunAi" className="h-9 w-auto" />
      </Link>

      <div className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            data-testid={`nav-link-${link.name.toLowerCase().replace(/\s/g, "-")}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              location.pathname === link.path
                ? "bg-navy-800 text-white"
                : "text-slate-600 hover:text-navy-800 hover:bg-slate-100"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <Link
        to="/contact"
        data-testid="navbar-cta"
        className="hidden md:inline-flex bg-green-400 text-green-900 hover:bg-green-300 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      >
        Book a Demo
      </Link>

      <button
        data-testid="mobile-menu-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden p-2 text-navy-800"
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {mobileOpen && (
        <div
          data-testid="mobile-menu"
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "bg-navy-50 text-navy-800"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="block mt-2 bg-green-400 text-green-900 rounded-xl px-4 py-3 text-sm font-semibold text-center"
          >
            Book a Demo
          </Link>
        </div>
      )}
    </nav>
  );
}
