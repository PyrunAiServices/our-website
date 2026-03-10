import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, ArrowUpRight } from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_5a814ac5-8809-40fc-9b70-23556389f011/artifacts/hvex155g_PyrunAi_FullLogo.png";

const footerLinks = {
  company: [
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Contact", path: "/contact" },
  ],
  services: [
    { name: "AI & Machine Learning", path: "/services#ai-ml" },
    { name: "Data Analytics", path: "/services#data-analytics" },
    { name: "Web/App Development", path: "/services#web-dev" },
    { name: "Power BI Solutions", path: "/services#power-bi" },
  ],
};

export default function Footer() {
  return (
    <footer data-testid="main-footer" className="bg-navy-800 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <img src={LOGO_URL} alt="PyrunAi" className="h-12 w-auto brightness-0 invert mb-4" />
            <p className="text-slate-300 text-sm leading-relaxed mt-4 max-w-xs">
              Smart services. Balanced lives. Building intelligent solutions that drive business optimization.
            </p>
            <a
              href="https://www.linkedin.com/company/109349964/"
              target="_blank"
              rel="noreferrer"
              data-testid="footer-linkedin"
              className="inline-flex items-center gap-2 mt-6 text-slate-300 hover:text-green-400 transition-colors text-sm"
            >
              <Linkedin size={18} />
              Follow us on LinkedIn
            </a>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-slate-400 mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-300 hover:text-white transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-slate-400 mb-5">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-300 hover:text-white transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-slate-400 mb-5">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:info@pyrunai.com" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors text-sm">
                  <Mail size={16} className="text-green-400 shrink-0" />
                  info@pyrunai.com
                </a>
              </li>
              <li>
                <a href="tel:+918180907138" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors text-sm">
                  <Phone size={16} className="text-green-400 shrink-0" />
                  +91 8180907138
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-300 text-sm">
                <MapPin size={16} className="text-green-400 shrink-0 mt-0.5" />
                <span>Nashik, India &middot; New York, USA &middot; Dublin, Ireland</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} PyrunAi Services LLP. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs">
            Smart services. Balanced lives.
          </p>
        </div>
      </div>
    </footer>
  );
}
