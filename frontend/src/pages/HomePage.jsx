import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Brain, BarChart3, Code2, PieChart, CheckCircle2, ArrowRight,
  Zap, Shield, Clock, Headphones, ChevronDown, Star, Quote,
  Play, ExternalLink, TrendingUp, Users, Globe
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
};

const stagger = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

/* ── Animated Counter ── */
function AnimatedCounter({ target, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target);
    const duration = 1800;
    const steps = 40;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="counter-number">
      {prefix}{count}{suffix}
    </span>
  );
}

/* ── Hero Slides Data (matching current pyrunai.com exactly) ── */
const heroSlides = [
  {
    tag: "Power BI & Data Analytics",
    heading: "Transform Data Into Decisions",
    desc: "Enterprise-grade BI and analytics solutions built to visualize data, automate reporting and empower smarter business decisions.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=90",
  },
  {
    tag: "App & Web Development",
    heading: "Build Smart, Scalable Digital Solutions",
    desc: "Create high-performing apps and dynamic websites that deliver seamless experiences, optimize performance and accelerate business growth.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=90",
  },
  {
    tag: "AI/ML Development",
    heading: "Predict the Future. Automate the Present",
    desc: "AI/ML models engineered to forecast outcomes, eliminate manual work and unlock unstoppable performance.",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=90",
  },
];

/* ── Services Data ── */
const services = [
  {
    icon: Brain, title: "AI & Machine Learning", tag: "AI/ML",
    desc: "Custom AI models, NLP, computer vision, and automation to accelerate outcomes.",
    color: "bg-blue-50 text-blue-600", hoverBg: "group-hover:bg-blue-600 group-hover:text-white",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
    span: "",
  },
  {
    icon: BarChart3, title: "Data Analytics", tag: "Analytics",
    desc: "ETL, dashboards, and insight pipelines to power better decisions.",
    color: "bg-emerald-50 text-emerald-600", hoverBg: "group-hover:bg-emerald-600 group-hover:text-white",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    span: "",
  },
  {
    icon: Code2, title: "Web/App Development", tag: "Development",
    desc: "Modern, fast web apps and APIs tailored to your business.",
    color: "bg-amber-50 text-amber-600", hoverBg: "group-hover:bg-amber-600 group-hover:text-white",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
    span: "",
  },
  {
    icon: PieChart, title: "Power BI Solutions", tag: "Business Intelligence",
    desc: "Interactive BI dashboards and data models for clarity and scale.",
    color: "bg-violet-50 text-violet-600", hoverBg: "group-hover:bg-violet-600 group-hover:text-white",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    span: "",
  },
];

const trustPoints = [
  { icon: CheckCircle2, title: "Proven Expertise", desc: "Certified AI/ML engineers, BI specialists and full-stack developers with deep industry experience." },
  { icon: Shield, title: "Enterprise Grade", desc: "Secure, scalable platforms for mission-critical operations and future-ready architectures." },
  { icon: Zap, title: "Fast Implementation", desc: "Accelerated implementation with minimal disruption to your existing workflows." },
  { icon: Headphones, title: "24/7 Support", desc: "Round-the-clock monitoring and dedicated assistance for peak performance." },
];

const testimonials = [
  {
    quote: "PyrunAi Services revolutionized our operations with their AI-driven strategies and healthcare dashboard, delivering efficiency and milestones we never imagined.",
    name: "Kelsey Allen",
    role: "The EXP Firm",
    img: "/images/KelseyAllen.png"
  },
  {
    quote: "PyrunAi's ATS dashboard made hiring effortless and strategic. I gained clarity and confidence in recruitment decisions like never before.",
    name: "Shaun Ram",
    role: "Malaysia",
    img: "/images/ShaunRam.png"
  },
  {
    quote: "PyrunAi empowered us to dream big and provided the financial intelligence tools to make those dreams a reality. We feel more confident and inspired than ever.",
    name: "Tony",
    role: "Business Owner",
    img: "/images/Tony.png"
  }
];

const stats = [
  { value: "98", suffix: "%", label: "Client Satisfaction" },
  { value: "50", suffix: "+", label: "Projects Delivered" },
  { value: "3", suffix: "x", label: "Faster Insights" },
  { value: "24", suffix: "/7", label: "Global Support" },
];

const faqs = [
  { q: "What industries do you serve?", a: "We serve enterprises across healthcare, finance, HR/recruitment, retail, and technology sectors. Our solutions are tailored to fit any industry that relies on data-driven decision making." },
  { q: "How long does a typical project take?", a: "Project timelines vary based on scope. A standard BI dashboard takes 4-6 weeks, while comprehensive AI solutions may take 8-12 weeks. We provide detailed timelines during our initial consultation." },
  { q: "Do you offer ongoing support after project delivery?", a: "Yes, we provide 24/7 monitoring and dedicated support packages. Our team ensures your solutions continue to perform optimally with regular maintenance and updates." },
  { q: "Can you integrate with our existing systems?", a: "Absolutely. We specialize in integrating with existing ERP, CRM, and data systems. Our solutions are designed to complement and enhance your current infrastructure." },
  { q: "What makes PyrunAi different from other tech consultancies?", a: "Our unique combination of AI expertise, data analytics depth, and modern development practices sets us apart. We focus on measurable business impact, not just technology delivery." },
];

const techLogos = [
  "Python", "TensorFlow", "Power BI", "React", "Azure", "AWS",
  "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "Tableau", "Spark",
];

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div {...stagger} transition={{ duration: 0.4, delay: index * 0.05 }} className="border-b border-slate-200 last:border-0">
      <button data-testid={`faq-item-${index}`} onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="font-heading font-medium text-text-main group-hover:text-navy-800 transition-colors pr-4">{q}</span>
        <ChevronDown size={20} className={`text-slate-400 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-out ${open ? "max-h-40 pb-5" : "max-h-0"}`}>
        <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [textKey, setTextKey] = useState(0);

  const goToSlide = (idx) => {
    setHeroIdx(idx);
    setTextKey((k) => k + 1);
  };
  const prevSlide = () => goToSlide((heroIdx - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () => goToSlide((heroIdx + 1) % heroSlides.length);

  useEffect(() => {
    const t = setInterval(() => goToSlide((heroIdx + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, [heroIdx]);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[heroIdx];

  return (
    <>
      {/* ═══════════════ HERO SLIDER ═══════════════ */}
      <section data-testid="hero-section" className="relative overflow-hidden min-h-[92vh] flex items-center">
        {/* Full-bleed background images with crossfade */}
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${s.img})`,
              backgroundAttachment: "scroll",
              opacity: heroIdx === i ? 1 : 0,
              zIndex: 0,
            }}
          />
        ))}
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-[1]" />

        {/* Prev / Next arrows */}
        <button
          onClick={prevSlide}
          data-testid="hero-prev"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 text-green-400 hover:text-green-300 transition-colors"
          aria-label="Previous slide"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button
          onClick={nextSlide}
          data-testid="hero-next"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 text-green-400 hover:text-green-300 transition-colors"
          aria-label="Next slide"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              data-testid={`hero-indicator-${i}`}
              className={`rounded-full transition-all duration-500 ${heroIdx === i ? "w-10 h-2.5 bg-green-400" : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"}`}
            />
          ))}
        </div>

        {/* Slide content */}
        <div className="relative z-[5] max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-28 w-full">
          <div className="max-w-2xl">
            <motion.div
              key={`tag-${textKey}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex px-4 py-1.5 bg-green-500 text-white rounded text-xs font-semibold font-mono tracking-wide mb-8">
                {slide.tag}
              </span>
            </motion.div>

            <motion.h1
              key={`heading-${textKey}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-white mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
            >
              {slide.heading}
            </motion.h1>

            <motion.p
              key={`desc-${textKey}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-base md:text-lg text-gray-200 leading-relaxed max-w-lg mb-10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]"
            >
              {slide.desc}
            </motion.p>

            <motion.div
              key={`cta-${textKey}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/contact"
                data-testid="hero-cta-primary"
                className="inline-flex items-center justify-center gap-2 bg-green-500 text-white hover:bg-green-400 rounded-lg px-8 py-4 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 text-sm md:text-base"
              >
                Schedule Free Consultation
              </Link>
              <Link
                to="/services"
                data-testid="hero-cta-secondary"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-600 hover:bg-gray-100 border-2 border-white rounded-lg px-8 py-4 font-semibold transition-all duration-300 text-sm md:text-base"
              >
                Explore Solutions
              </Link>
            </motion.div>

            <motion.p
              key={`trust-${textKey}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-sm text-gray-300 mt-10 font-light italic"
            >
              Trusted by leading enterprises for data-driven transformation
            </motion.p>
          </div>
        </div>
      </section>

      {/* ═══════════════ TECH TICKER ═══════════════ */}
      <section className="py-6 bg-surface border-y border-slate-100 overflow-hidden">
        <div className="ticker-track">
          {[...techLogos, ...techLogos].map((logo, i) => (
            <div key={i} className="flex items-center gap-3 px-8 shrink-0">
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <span className="text-sm font-mono text-slate-400 whitespace-nowrap">{logo}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ STATS COUNTER ═══════════════ */}
      <section data-testid="stats-section" className="py-20 md:py-24 bg-navy-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.label} {...stagger} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm text-slate-300 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TRUST SECTION ═══════════════ */}
      <section data-testid="trust-section" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono font-medium tracking-wider uppercase text-green-600 mb-3 block">Why Choose Us</span>
              <h2 className="text-3xl md:text-5xl font-bold text-text-main tracking-tight">
                Why Enterprises Trust PyrunAi
              </h2>
            </div>
            <p className="text-lg text-slate-500 max-w-md">
              We deliver intelligent, scalable solutions that transform businesses through AI, analytics, and modern development.
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((item, i) => (
              <motion.div key={item.title} {...stagger} transition={{ duration: 0.4, delay: i * 0.1 }} className="card-hover-tilt bg-white p-7 rounded-2xl border border-slate-100 group">
                <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${item.icon === CheckCircle2 ? "bg-green-50 text-green-600" : item.icon === Shield ? "bg-blue-50 text-blue-600" : item.icon === Zap ? "bg-amber-50 text-amber-600" : "bg-violet-50 text-violet-600"} mb-5 transition-all duration-300 ${item.icon === CheckCircle2 ? "group-hover:bg-green-600" : item.icon === Shield ? "group-hover:bg-blue-600" : item.icon === Zap ? "group-hover:bg-amber-600" : "group-hover:bg-violet-600"} group-hover:text-white group-hover:scale-110`}>
                  <item.icon size={24} />
                </div>
                <h3 className="font-heading font-semibold text-text-main mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES BENTO GRID ═══════════════ */}
      <section data-testid="services-section" className="py-20 md:py-32 bg-surface relative">
        <div className="absolute inset-0 bg-grid-pattern" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative">
          <motion.div {...fadeUp} className="mb-16">
            <span className="text-xs font-mono font-medium tracking-wider uppercase text-green-600 mb-3 block">What We Do</span>
            <h2 className="text-3xl md:text-5xl font-bold text-text-main tracking-tight mb-4">Our Services</h2>
            <p className="text-lg text-slate-500 max-w-2xl">Expert solutions across AI, data, web, and BI to drive measurable impact.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-auto">
            {services.map((svc, i) => (
              <motion.div key={svc.title} {...stagger} transition={{ duration: 0.5, delay: i * 0.1 }} className={`${svc.span}`}>
                <Link
                  to={`/services#${svc.id === 'ai-ml' ? 'ai-automation' : svc.id === 'data-analytics' ? 'data-analytics' : svc.id === 'web-dev' ? 'ai-agents' : svc.id === 'power-bi' ? 'consulting' : ''}`}
                  data-testid={`service-card-${i}`}
                  className="block bg-white rounded-2xl border border-slate-100 overflow-hidden group hover:shadow-xl hover:border-green-400/30 transition-all duration-300 h-full"
                >
                  <div className="img-reveal h-40 md:h-48 relative">
                    <img src={svc.img} alt={svc.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-xs font-mono font-medium tracking-wider text-white/90 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">{svc.tag}</span>
                  </div>
                  <div className="p-6">
                    <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl ${svc.color} mb-4 transition-all duration-300 ${svc.hoverBg}`}>
                      <svc.icon size={20} />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-text-main mb-2">{svc.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{svc.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-navy-800 group-hover:text-green-600 transition-colors animated-underline">
                      Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED WORK SHOWCASE ═══════════════ */}
      <section data-testid="featured-work-section" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <span className="text-xs font-mono font-medium tracking-wider uppercase text-green-600 mb-3 block">Portfolio</span>
              <h2 className="text-3xl md:text-5xl font-bold text-text-main tracking-tight">Featured Work</h2>
            </div>
            <Link to="/case-studies" data-testid="view-all-case-studies" className="inline-flex items-center gap-2 text-navy-800 font-medium hover:text-green-600 transition-colors mt-4 md:mt-0 animated-underline">
              View All Case Studies <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
            {/* Featured Project 1 - Uniform */}
            <motion.div {...stagger} transition={{ duration: 0.5 }}>
              <Link to="/case-studies" className="block group">
                <div className="img-reveal rounded-2xl overflow-hidden relative h-[240px]">
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" alt="Healthcare Analytics Dashboard" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-flex px-3 py-1 bg-green-400/90 text-green-900 rounded-full text-xs font-semibold mb-2">Healthcare</span>
                    <h3 className="font-heading font-bold text-lg text-white mb-1">Healthcare Operations Dashboard</h3>
                    <span className="text-green-400 font-bold">40% faster reporting</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Featured Project 2 */}
            <motion.div {...stagger} transition={{ duration: 0.5, delay: 0.1 }}>
              <Link to="/case-studies" className="block group">
                <div className="img-reveal rounded-2xl overflow-hidden relative h-[240px]">
                  <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80" alt="ATS Recruitment Platform" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-flex px-3 py-1 bg-blue-400/90 text-blue-900 rounded-full text-xs font-semibold mb-2">HR Tech</span>
                    <h3 className="font-heading font-bold text-lg text-white mb-1">ATS Recruitment Intelligence</h3>
                    <span className="text-green-400 font-bold">3x hiring efficiency</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Featured Project 3 */}
            <motion.div {...stagger} transition={{ duration: 0.5, delay: 0.2 }}>
              <Link to="/case-studies" className="block group">
                <div className="img-reveal rounded-2xl overflow-hidden relative h-[240px]">
                  <img src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80" alt="Financial Intelligence Platform" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-flex px-3 py-1 bg-amber-400/90 text-amber-900 rounded-full text-xs font-semibold mb-2">FinTech</span>
                    <h3 className="font-heading font-bold text-lg text-white mb-1">Financial Intelligence Platform</h3>
                    <span className="text-green-400 font-bold">60% cost reduction</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section data-testid="testimonials-section" className="py-20 md:py-32 bg-surface relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative">
          <motion.div {...fadeUp} className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-text-main tracking-tight mb-4">Trusted by Leading Enterprises</h2>
            <p className="text-lg text-slate-500 max-w-2xl">See how organizations are transforming their operations with our platform.</p>
          </motion.div>

          {/* Desktop grid */}
          <div className="hidden md:grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} {...stagger} transition={{ duration: 0.4, delay: i * 0.1 }} data-testid={`testimonial-card-${i}`} className="card-hover-tilt bg-white rounded-2xl border border-slate-100 p-8 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <Quote size={24} className="text-green-400/40 mb-3" />
                <p className="text-slate-600 leading-relaxed flex-1 mb-6">{t.quote}</p>
                <div className="flex items-center gap-4 pt-5 border-t border-slate-100">
                  <img src={t.img} alt={t.name} className="h-12 w-12 rounded-full object-cover border-2 border-slate-100" />
                  <div>
                    <p className="font-heading font-semibold text-sm text-text-main">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden">
            <div className="bg-white rounded-2xl border border-slate-100 p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, si) => (
                  <Star key={si} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <Quote size={24} className="text-green-400/40 mb-3" />
              <p className="text-slate-600 leading-relaxed mb-6 min-h-[100px]">{testimonials[activeTestimonial].quote}</p>
              <div className="flex items-center gap-4 pt-5 border-t border-slate-100">
                <img src={testimonials[activeTestimonial].img} alt={testimonials[activeTestimonial].name} className="h-12 w-12 rounded-full object-cover border-2 border-slate-100" />
                <div>
                  <p className="font-heading font-semibold text-sm text-text-main">{testimonials[activeTestimonial].name}</p>
                  <p className="text-xs text-slate-400">{testimonials[activeTestimonial].role}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-center mt-4">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} className={`h-2 rounded-full transition-all duration-300 ${activeTestimonial === i ? "w-8 bg-navy-800" : "w-2 bg-slate-300"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section data-testid="faq-section" className="py-20 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-text-main tracking-tight mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-500">Everything you need to know about working with PyrunAi.</p>
          </motion.div>
          <div className="bg-surface rounded-2xl border border-slate-200 p-6 md:p-8">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section data-testid="cta-section" className="py-20 md:py-28 bg-navy-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-400/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">Ready to Transform Your Data?</h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">Schedule a free consultation to discover how our AI and analytics solutions can drive measurable impact for your business.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" data-testid="cta-book-demo" className="inline-flex items-center justify-center gap-2 bg-green-400 text-green-900 hover:bg-green-300 rounded-full px-10 py-4 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg play-btn-pulse">
                Book a Demo <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-10 py-4 font-medium transition-all duration-300">
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
