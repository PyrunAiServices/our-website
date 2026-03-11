import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain, BarChart3, Code2, PieChart, ArrowRight, Play, ExternalLink,
  Cpu, Database, LineChart, Globe, Layers, GitBranch,
  Monitor, Smartphone, Server, Workflow, FileBarChart, Users, X
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

function VideoModal({ url, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} data-testid="video-modal-close" className="absolute top-3 right-3 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors">
          <X size={20} />
        </button>
        <iframe
          src={url}
          title="Service video"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </motion.div>
    </motion.div>
  );
}

const services = [
  {
    id: "ai-ml",
    icon: Brain,
    title: "AI & Machine Learning",
    tagline: "Intelligent automation at scale",
    desc: "We build custom AI models, NLP systems, computer vision pipelines, and intelligent automation solutions that transform how your business operates. From predictive analytics to conversational AI, our solutions drive measurable outcomes.",
    color: "bg-blue-50 text-blue-600",
    borderColor: "hover:border-blue-200",
    heroImg: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
    features: [
      { icon: Cpu, text: "Custom ML Model Development" },
      { icon: Workflow, text: "NLP & Text Analytics" },
      { icon: Layers, text: "Computer Vision Solutions" },
      { icon: GitBranch, text: "MLOps & Model Management" },
    ],
    projects: [
      {
        title: "AI-Powered Traffic & Conversion Prediction Tool",
        img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
        desc: "An AI-enabled system that analyzes traffic metrics, applies regression models, and forecasts user conversion behavior to support smarter digital decision-making.",
        link: "https://websitetrafficprediction-gniaputvpj5nrgwpp23xio.streamlit.app/",
      },
      {
        title: "Advanced Deepfake Image Identification Tool",
        img: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&q=80",
        desc: "Automated document extraction and classification for enterprise workflows.",
        link: null,
      },
      {
        title: "Smart Language Translation Tool",
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
        desc: "ML-based predictive system reducing equipment downtime.",
        link: null,
      },
    ],
  },
  {
    id: "data-analytics",
    icon: BarChart3,
    title: "Data Analytics",
    tagline: "From raw data to actionable insights",
    desc: "Transform your raw data into strategic assets with our end-to-end analytics solutions. We design robust ETL pipelines, build interactive dashboards, and create insight engines that empower every level of your organization.",
    color: "bg-emerald-50 text-emerald-600",
    borderColor: "hover:border-emerald-200",
    heroImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/yZvFH7B6gKI",
    features: [
      { icon: Database, text: "ETL Pipeline Design" },
      { icon: LineChart, text: "Real-time Dashboards" },
      { icon: FileBarChart, text: "Automated Reporting" },
      { icon: Layers, text: "Data Warehouse Architecture" },
    ],
    projects: [
      {
        title: "Data Science Job Salaries – Insights & Analytics Dashboard",
        img: "/images/Data Science Job Salaries – Insights & Analytics Dashboard.png",
        desc: "Using advanced coding and visualization techniques, this project analyzes 37,000+ salary records to highlight salary differences by role, experience level, company size, and employment type.",
        link: "https://datasciencejobsalariesanalysis-fyxptxm8gnktwajw6x2yvq.streamlit.app/",
      },
      {
        title: "Python-Based Stock Performance Analysis of Major Banks",
        img: "/images/Python-Based Stock Performance Analysis of Major Banks.png",
        desc: "An end-to-end financial analytics project analyzing top bank stocks and presenting key KPIs: average price growth, sharpest market drop, yearly performance metrics, and return-on-investment benchmarks. Time-series visualizations reveal actionable investment insights.",
        link: null,
      },
      {
        title: "Supply Chain Delay & Optimization Analytics",
        img: "/images/Supply Chain Delay & Optimization Analytics.png",
        desc: "An intelligence system designed to improve supply chain efficiency by analyzing delivery timelines, route dependencies, and vendor reliability. Key KPIs like average delay time, on-time delivery rate, vendor success ratio, and logistics bottleneck frequency are evaluated to uncover hidden inefficiencies and optimize planning, procurement, and scheduling.",
        link: null,
      },
    ],
  },
  {
    id: "web-dev",
    icon: Code2,
    title: "Web/App Development",
    tagline: "Modern apps built for performance",
    desc: "We create high-performing web applications, mobile apps, and APIs using modern frameworks and best practices. Our development approach prioritizes speed, scalability, and user experience for your business applications.",
    color: "bg-amber-50 text-amber-600",
    borderColor: "hover:border-amber-200",
    heroImg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8",
    features: [
      { icon: Monitor, text: "Modern Web Applications" },
      { icon: Smartphone, text: "Mobile App Development" },
      { icon: Server, text: "API Design & Integration" },
      { icon: Globe, text: "Cloud-Native Architecture" },
    ],
    projects: [
      {
        title: "Dynamic Business Website Powered by React Frontend & Node Backend",
        img: "/images/Dynamic Business Website Powered by React Frontend & Node Backend.png",
        desc: "This website is a modern, fully responsive company platform built using React for the frontend and Node.js for the backend. It showcases our IT and data analytics services with a clean UI, fast performance, and smooth navigation.",
        link: "https://www.pyrunai.com",
      },
      {
        title: "E-commerce Mobile App",
        img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
        desc: "Cross-platform mobile app with AI-powered product recommendations.",
        link: null,
      },
      {
        title: "ADA Compliance Platform",
        img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80",
        desc: "Website accessibility compliance tool ensuring WCAG standards.",
        link: "https://testpros.com/articles/ada-website-compliance/",
      },
    ],
  },
  {
    id: "power-bi",
    icon: PieChart,
    title: "Power BI Solutions",
    tagline: "Enterprise BI made simple",
    desc: "Unlock the full potential of your data with our Power BI expertise. We build interactive dashboards, complex data models, and automated reports that give executives and operators real-time visibility into business performance.",
    color: "bg-violet-50 text-violet-600",
    borderColor: "hover:border-violet-200",
    heroImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/TmhQCQr_DCA",
    features: [
      { icon: FileBarChart, text: "Interactive Dashboards" },
      { icon: Database, text: "Data Modeling & DAX" },
      { icon: Users, text: "Self-Service Analytics" },
      { icon: Workflow, text: "Automated Refresh & Distribution" },
    ],
    projects: [
      {
        title: "Applicant Tracking System Performance Dashboard",
        img: "/images/Submission Report.png",
        desc: "A powerful recruitment analytics dashboard that provides complete visibility into the hiring process. It tracks application volume, candidate quality, recruiter output, and overall hiring efficiency, helping organizations reduce hiring delays, improve talent acquisition performance, and refine sourcing strategies.",
        link: "https://app.powerbi.com/view?r=eyJrIjoiMDYwZTQyMTEtMWIzMS00NDY2LWFjMGMtZTFjNmVmZDc1YzI2IiwidCI6ImMyMTRjYThkLTA0NWUtNGFlNy1hM2M2LWQ0YzUwMDQ2NzkxMyJ9",
      },
      {
        title: "USA Real-Estate Market Analytics Dashboard",
        img: "/images/USA RealEstate.png",
        desc: "A visually rich dashboard designed to support real-estate investment decisions. It highlights pricing trends, market hotspots, inventory distribution, and investment-worthy regions across the USA, empowering businesses with accurate and actionable market intelligence.",
        link: "https://app.powerbi.com/view?r=eyJrIjoiOGE1MTIxMzYtZTQ1Ni00MjkwLWIwOWItYTBiNjYyY2IwMGM4IiwidCI6ImMyMTRjYThkLTA0NWUtNGFlNy1hM2M2LWQ0YzUwMDQ2NzkxMyJ9&pageName=9da571941c89c6b47031",
      },
      {
        title: "Customer Segmentation & Spend Analysis (Credit Cards)",
        img: "/images/CreditCard.png",
        desc: "A powerful analytics dashboard that uncovers how customers use their credit cards, revealing patterns in spending behavior, delinquency risk, credit utilization, and customer profitability. Key insights include: 42% of customers showing high utilization, 18% falling into potential delinquency, and top 12% contributing nearly 60% of total revenue.",
        link: "https://app.powerbi.com/view?r=eyJrIjoiOTVhYjMxYTAtYTE3My00NDkyLWIyYjYtMDY3Mjg4ZDdkZWRlIiwidCI6ImMyMTRjYThkLTA0NWUtNGFlNy1hM2M2LWQ0YzUwMDQ2NzkxMyJ9&embedImagePlaceholder=true",
      },
    ],
  },
];

export default function ServicesPage() {
  const [videoUrl, setVideoUrl] = useState(null);

  return (
    <>
      {videoUrl && <VideoModal url={videoUrl} onClose={() => setVideoUrl(null)} />}

      {/* Hero */}
      <section data-testid="services-hero" className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 to-navy-800/80" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative">
          <motion.div {...fadeUp} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-400/20 text-green-300 rounded-full text-xs font-semibold font-mono tracking-wide border border-green-400/30 mb-8">
              Our Services
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              Expert Solutions That Drive Measurable Impact
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
              From AI and machine learning to data analytics and modern development, we deliver enterprise-grade solutions tailored to your business.
            </p>
            <Link to="/contact" data-testid="services-hero-cta" className="inline-flex items-center gap-2 bg-green-400 text-green-900 hover:bg-green-300 rounded-full px-8 py-4 font-semibold transition-all duration-300 hover:-translate-y-1 shadow-lg">
              Discuss Your Project <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Service Blocks */}
      {services.map((svc, i) => (
        <section key={svc.id} id={svc.id} data-testid={`service-detail-${svc.id}`} className={`py-20 md:py-28 ${i % 2 === 0 ? "bg-white" : "bg-surface"}`}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            {/* Service Header + Features */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
              <motion.div {...fadeUp} className={i % 2 !== 0 ? "lg:order-2" : ""}>
                <div className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl ${svc.color} mb-6`}>
                  <svc.icon size={28} />
                </div>
                <span className="text-xs font-mono font-medium tracking-wider uppercase text-slate-400 block mb-2">{svc.tagline}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-text-main tracking-tight mb-6">{svc.title}</h2>
                <p className="text-slate-500 leading-relaxed mb-8">{svc.desc}</p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {svc.features.map((feat, fi) => (
                    <motion.div key={feat.text} {...stagger} transition={{ duration: 0.3, delay: fi * 0.08 }} className={`card-hover-tilt bg-white p-5 rounded-xl border border-slate-100 ${svc.borderColor} transition-all`}>
                      <feat.icon size={20} className="text-navy-800 mb-2" />
                      <p className="text-sm font-medium text-text-main">{feat.text}</p>
                    </motion.div>
                  ))}
                </div>
                <Link to="/contact" className="inline-flex items-center gap-2 text-navy-800 font-medium hover:text-green-600 transition-colors animated-underline">
                  Get Started <ArrowRight size={16} />
                </Link>
              </motion.div>

              {/* Video / Image */}
              <motion.div {...fadeUp} className={i % 2 !== 0 ? "lg:order-1" : ""}>
                <div className="relative img-reveal rounded-2xl overflow-hidden group cursor-pointer" onClick={() => setVideoUrl(svc.videoUrl)}>
                  <img src={svc.heroImg} alt={svc.title} className="w-full aspect-video object-cover" />
                  <div className="absolute inset-0 bg-navy-900/30 group-hover:bg-navy-900/50 transition-colors flex items-center justify-center">
                    <div data-testid={`play-video-${svc.id}`} className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform play-btn-pulse">
                      <Play size={28} className="text-navy-800 ml-1" fill="#1A365B" />
                    </div>
                  </div>
                  <span className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm text-white text-xs font-mono px-3 py-1.5 rounded-full">
                    Watch Introduction
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Projects Gallery */}
            <motion.div {...fadeUp}>
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-heading text-2xl font-bold text-text-main">Featured Projects</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {svc.projects.map((proj, pi) => (
                  <motion.div key={proj.title} {...stagger} transition={{ duration: 0.4, delay: pi * 0.1 }}>
                    <div className="card-hover-tilt bg-white rounded-2xl border border-slate-100 overflow-hidden group h-full flex flex-col">
                      <div className="img-reveal h-44 relative">
                        <img src={proj.img} alt={proj.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        {proj.metric && (
                          <span className="absolute top-3 right-3 bg-navy-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                            {proj.metric}
                          </span>
                        )}
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h4 className="font-heading font-semibold text-text-main mb-2">
                          {proj.link ? (
                            <a
                              href={proj.link}
                              target="_blank"
                              rel="noreferrer"
                              className="underline hover:text-green-600 transition-colors"
                            >
                              {proj.title}
                            </a>
                          ) : (
                            proj.title
                          )}
                        </h4>
                        <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-3">{proj.desc}</p>
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noreferrer"
                            data-testid={`project-link-${svc.id}-${pi}`}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-800 hover:text-green-600 transition-colors animated-underline"
                          >
                            View Live <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
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
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">Not Sure Which Service You Need?</h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">Our team will assess your needs and recommend the right combination of services to achieve your goals.</p>
            <Link to="/contact" data-testid="services-bottom-cta" className="inline-flex items-center gap-2 bg-green-400 text-green-900 hover:bg-green-300 rounded-full px-10 py-4 font-semibold transition-all duration-300 hover:-translate-y-1">
              Schedule Free Consultation <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
