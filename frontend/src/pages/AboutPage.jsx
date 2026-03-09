import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Users, Globe, ArrowRight, Lightbulb, TrendingUp, ShieldCheck } from "lucide-react";

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

const leaders = [
  {
    name: "Niraj Bhavsar",
    role: "Founder",
    img: "https://cdn.builder.io/api/v1/image/assets%2Ffef483de79874379b17b5a8f11228bfc%2F3343258175734c8c910f67a735acc43f?format=webp&width=200",
    bio: "Leads with a strong vision for AI-driven growth. His leadership empowers teams to turn data into real business impact.",
  },
  {
    name: "Rushikesh Kunde",
    role: "Co-Founder",
    img: "https://cdn.builder.io/api/v1/image/assets%2Ffef483de79874379b17b5a8f11228bfc%2Fbef7aea6cd564fb083c4a6390d3997b6?format=webp&width=200",
    bio: "Leads with strong analytical insight. He turns data into clear, actionable business decisions.",
  },
  {
    name: "Vijay H",
    role: "Co-Founder",
    img: "https://cdn.builder.io/api/v1/image/assets%2Ffef483de79874379b17b5a8f11228bfc%2F3134e5195a08438eba3d5c3e4114944e?format=webp&width=200",
    bio: "Leads with expertise in Power BI solutions. He specializes in creating clear, impactful dashboards for smarter decisions.",
  },
  {
    name: "Piyush Kadam",
    role: "Chief Executive Officer",
    img: "https://cdn.builder.io/api/v1/image/assets%2Ffef483de79874379b17b5a8f11228bfc%2F07219d94f8a74a40af789e460df025f9?format=webp&width=200",
    bio: "Leads with expertise in Power BI and data analytics. He drives clarity, precision and insight-based decision-making.",
  },
  {
    name: "Uday Bari",
    role: "Chief Operations Officer",
    img: "https://cdn.builder.io/api/v1/image/assets%2Ffef483de79874379b17b5a8f11228bfc%2Fa9802190262b43fc905443194e138aeb?format=webp&width=200",
    bio: "Leads operations with strong cloud engineering expertise. He ensures smooth, efficient and scalable delivery.",
  },
  {
    name: "Yash Tapase",
    role: "Chief Technology Officer",
    img: "https://cdn.builder.io/api/v1/image/assets%2Ffef483de79874379b17b5a8f11228bfc%2F51a0cb2b3bed46839f135551fa05ec5e?format=webp&width=200",
    bio: "Excels in Data Science, AI/ML and software development. He drives smart, scalable tech solutions.",
  },
];

const values = [
  { icon: Lightbulb, title: "Data-Driven", desc: "Decisions powered by advanced analytics and actionable insights." },
  { icon: TrendingUp, title: "Scalable", desc: "Solutions designed to grow with your business and adapt to future needs." },
  { icon: ShieldCheck, title: "Secure", desc: "Enterprise-grade security and compliance at every level." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section data-testid="about-hero" className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 to-navy-800/80" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative">
          <motion.div {...fadeUp} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-400/20 text-green-300 rounded-full text-xs font-semibold font-mono tracking-wide border border-green-400/30 mb-8">
              About Us
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              Building Intelligent Solutions for the Modern Enterprise
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              PyrunAI Services is a technology partner focused on building intelligent, scalable, and secure solutions that drive business optimization. We help organizations reduce costs, streamline operations, and accelerate innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section data-testid="mission-section" className="py-20 md:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <span className="text-xs font-mono font-medium tracking-wider uppercase text-slate-400 mb-4 block">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-main tracking-tight mb-6">
                Creative Solutions, Lasting Relationships
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                To deliver creative and effective solutions strategies tailored to our clients' needs. To build lasting relationships with our clients through exceptional service and results. To foster a collaborative and inclusive work environment for our team.
              </p>
              <div className="grid gap-6">
                {values.map((v, i) => (
                  <motion.div
                    key={v.title}
                    {...stagger}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="h-10 w-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                      <v.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-text-main mb-1">{v.title}</h4>
                      <p className="text-sm text-slate-500">{v.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-green-400/10 to-navy-800/10 rounded-3xl blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
                alt="Team collaboration"
                className="relative rounded-2xl shadow-lg border border-slate-200 w-full object-cover aspect-[4/3]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section data-testid="global-section" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-text-main tracking-tight mb-4">Global Presence</h2>
            <p className="text-lg text-slate-500">Serving enterprises across three continents</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { flag: "IN", country: "India", city: "Nashik, Maharashtra", label: "Headquarters" },
              { flag: "US", country: "USA", city: "Manhattan, New York", label: "North America" },
              { flag: "IE", country: "Ireland", city: "Dublin", label: "Europe" },
            ].map((office, i) => (
              <motion.div
                key={office.country}
                {...stagger}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                data-testid={`office-${office.country.toLowerCase()}`}
                className="bg-surface rounded-2xl p-8 border border-slate-100 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="h-14 w-14 rounded-full bg-navy-800 text-white flex items-center justify-center mx-auto mb-5">
                  <Globe size={24} />
                </div>
                <h3 className="font-heading font-semibold text-lg text-text-main">{office.country}</h3>
                <p className="text-sm text-slate-500 mt-1">{office.city}</p>
                <span className="inline-flex mt-3 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">{office.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section data-testid="leadership-section" className="py-20 md:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="mb-16">
            <span className="text-xs font-mono font-medium tracking-wider uppercase text-slate-400 mb-3 block">Our People</span>
            <h2 className="text-3xl md:text-5xl font-bold text-text-main tracking-tight mb-4">Leadership Team</h2>
            <p className="text-lg text-slate-500 max-w-2xl">
              Industry veterans committed to transforming enterprise data and AI.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((leader, i) => (
              <motion.div
                key={leader.name}
                {...stagger}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                data-testid={`leader-card-${i}`}
                className="bg-white rounded-2xl border border-slate-100 p-7 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="mb-5">
                  <img
                    src={leader.img}
                    alt={leader.name}
                    className="h-20 w-20 rounded-2xl object-cover border-2 border-slate-100 group-hover:border-green-400 transition-colors"
                  />
                </div>
                <h3 className="font-heading font-semibold text-lg text-text-main">{leader.name}</h3>
                <p className="text-sm font-medium text-navy-800 mb-3">{leader.role}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{leader.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-navy-800">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
              Want to Join Our Journey?
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Whether you're looking for a technology partner or want to be part of our team, we'd love to hear from you.
            </p>
            <Link
              to="/contact"
              data-testid="about-cta"
              className="inline-flex items-center gap-2 bg-green-400 text-green-900 hover:bg-green-300 rounded-full px-10 py-4 font-semibold transition-all duration-200 hover:-translate-y-0.5"
            >
              Get In Touch <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
