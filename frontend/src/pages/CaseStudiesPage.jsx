import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, TrendingUp, Clock, Users, Target, Award } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" },
};

const stagger = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const caseStudies = [
  {
    tag: "Healthcare",
    title: "Healthcare Operations Dashboard",
    client: "The EXP Firm",
    challenge: "The client needed a unified view of patient outcomes, resource allocation, and operational efficiency across multiple departments. Manual reporting was slow and prone to errors.",
    solution: "We built a real-time healthcare analytics dashboard powered by AI-driven data pipelines and Power BI visualizations. The system automatically aggregates data from multiple sources and delivers actionable insights.",
    results: [
      { icon: Clock, metric: "40%", label: "Faster Reporting" },
      { icon: TrendingUp, metric: "25%", label: "Improved Efficiency" },
      { icon: BarChart3, metric: "Real-time", label: "Data Visibility" },
    ],
    testimonial: {
      quote: "PyrunAi Services revolutionized our operations with their AI-driven strategies and healthcare dashboard, delivering efficiency and milestones we never imagined.",
      name: "Kelsey Allen",
      role: "The EXP Firm",
      img: "https://www.pyrunai.com/images/kelsy.png",
    },
    services: ["AI/ML", "Power BI", "Data Analytics"],
  },
  {
    tag: "HR Tech",
    title: "ATS Recruitment Intelligence Platform",
    client: "Enterprise HR Team",
    challenge: "A growing company struggled with inefficient hiring processes. The HR team lacked visibility into recruitment pipeline performance and candidate quality metrics.",
    solution: "We developed an AI-powered Applicant Tracking System (ATS) with predictive analytics for candidate scoring, automated screening workflows, and comprehensive recruitment dashboards.",
    results: [
      { icon: TrendingUp, metric: "3x", label: "Hiring Efficiency" },
      { icon: Users, metric: "60%", label: "Less Manual Screening" },
      { icon: Target, metric: "85%", label: "Candidate Fit Rate" },
    ],
    testimonial: {
      quote: "PyrunAi's ATS dashboard made hiring effortless and strategic. I gained clarity and confidence in recruitment decisions like never before.",
      name: "Shaun Ram",
      role: "Malaysia",
      img: "https://www.pyrunai.com/images/ke2.png",
    },
    services: ["AI/ML", "Web Development", "Data Analytics"],
  },
  {
    tag: "FinTech",
    title: "Financial Intelligence & Forecasting",
    client: "Growing Business",
    challenge: "The business owner needed better financial visibility and forecasting capabilities to make confident growth decisions. Existing tools were fragmented and didn't provide the insights needed.",
    solution: "We created a comprehensive financial intelligence platform with automated reporting, cash flow forecasting, and interactive Power BI dashboards that provide real-time financial health metrics.",
    results: [
      { icon: BarChart3, metric: "60%", label: "Cost Reduction" },
      { icon: Award, metric: "95%", label: "Forecast Accuracy" },
      { icon: Clock, metric: "10hrs/week", label: "Time Saved" },
    ],
    testimonial: {
      quote: "PyrunAi empowered us to dream big and provided the financial intelligence tools to make those dreams a reality. We feel more confident and inspired than ever.",
      name: "Tony",
      role: "Business Owner",
      img: "https://www.pyrunai.com/images/tony.png",
    },
    services: ["Power BI", "Data Analytics", "AI/ML"],
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section data-testid="case-studies-hero" className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1400&q=80)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 to-navy-800/80" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative">
          <motion.div {...fadeUp} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-400/20 text-green-300 rounded-full text-xs font-semibold font-mono tracking-wide border border-green-400/30 mb-8">
              Case Studies
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              Real Results, Real Impact
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              Discover how we've helped enterprises transform their operations with intelligent solutions that deliver measurable business outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      {caseStudies.map((cs, i) => (
        <section
          key={cs.title}
          data-testid={`case-study-${i}`}
          className={`py-20 md:py-28 ${i % 2 === 0 ? "bg-surface" : "bg-white"}`}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <motion.div {...fadeUp}>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold">{cs.tag}</span>
                {cs.services.map((s) => (
                  <span key={s} className="px-3 py-1 bg-navy-50 text-navy-800 rounded-full text-xs font-medium">{s}</span>
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-main tracking-tight mb-2">{cs.title}</h2>
              <p className="text-sm text-slate-400 mb-10">Client: {cs.client}</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <motion.div {...stagger} transition={{ duration: 0.4, delay: 0.1 }} className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-slate-100 p-7 h-full">
                  <h3 className="font-heading font-semibold text-navy-800 mb-3 text-sm uppercase tracking-wide">The Challenge</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{cs.challenge}</p>
                </div>
              </motion.div>
              <motion.div {...stagger} transition={{ duration: 0.4, delay: 0.2 }} className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-slate-100 p-7 h-full">
                  <h3 className="font-heading font-semibold text-navy-800 mb-3 text-sm uppercase tracking-wide">Our Solution</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{cs.solution}</p>
                </div>
              </motion.div>
            </div>

            {/* Results */}
            <motion.div {...fadeUp} className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cs.results.map((r, ri) => (
                  <motion.div
                    key={r.label}
                    {...stagger}
                    transition={{ duration: 0.4, delay: ri * 0.1 }}
                    className="bg-navy-800 rounded-2xl p-7 text-center"
                  >
                    <r.icon size={24} className="text-green-400 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-white mb-1">{r.metric}</p>
                    <p className="text-sm text-slate-300">{r.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Testimonial */}
            <motion.div {...fadeUp}>
              <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col md:flex-row items-start gap-6">
                <img
                  src={cs.testimonial.img}
                  alt={cs.testimonial.name}
                  className="h-16 w-16 rounded-2xl object-cover border-2 border-slate-100 shrink-0"
                />
                <div>
                  <p className="text-slate-600 leading-relaxed italic mb-4">"{cs.testimonial.quote}"</p>
                  <p className="font-heading font-semibold text-text-main">{cs.testimonial.name}</p>
                  <p className="text-sm text-slate-400">{cs.testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 md:py-28 bg-navy-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
              Ready to Be Our Next Success Story?
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business operations with intelligent, data-driven solutions.
            </p>
            <Link
              to="/contact"
              data-testid="case-studies-cta"
              className="inline-flex items-center gap-2 bg-green-400 text-green-900 hover:bg-green-300 rounded-full px-10 py-4 font-semibold transition-all duration-300 hover:-translate-y-1"
            >
              Start Your Project <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
