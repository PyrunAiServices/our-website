import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import axios from "axios";
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle,
  Linkedin, ChevronLeft, ChevronRight, Calendar
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
};

const offices = [
  { country: "India", city: "Nashik, Maharashtra", type: "Headquarters" },
  { country: "USA", city: "Manhattan, New York", type: "North America" },
  { country: "Ireland", city: "Dublin", type: "Europe" },
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function generateTimeSlots() {
  const slots = [];
  for (let h = 9; h < 18; h++) {
    slots.push(`${h.toString().padStart(2,"0")}:00`);
    slots.push(`${h.toString().padStart(2,"0")}:30`);
  }
  return slots;
}

function CalendarPicker({ selectedDate, onSelectDate }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const isDisabled = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    return d < today || d.getDay() === 0 || d.getDay() === 6;
  };

  const isToday = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    const d = new Date(viewYear, viewMonth, day);
    return d.toDateString() === selectedDate.toDateString();
  };

  const canGoPrev = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  return (
    <div data-testid="calendar-picker">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          data-testid="calendar-prev"
          className="p-2 rounded-lg hover:bg-surface transition-colors disabled:opacity-30"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="font-heading font-semibold text-text-main">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button onClick={nextMonth} data-testid="calendar-next" className="p-2 rounded-lg hover:bg-surface transition-colors">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-slate-400 py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const disabled = isDisabled(day);
          const selected = isSelected(day);
          const todayDate = isToday(day);
          return (
            <button
              key={day}
              onClick={() => {
                if (!disabled) onSelectDate(new Date(viewYear, viewMonth, day));
              }}
              disabled={disabled}
              data-testid={`calendar-day-${day}`}
              className={`calendar-day h-10 w-full rounded-lg text-sm font-medium flex items-center justify-center
                ${disabled ? "calendar-day-disabled text-slate-300" : "text-text-main hover:bg-green-50 cursor-pointer"}
                ${selected ? "calendar-day-selected" : ""}
                ${todayDate && !selected ? "calendar-day-today" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const timeSlots = useMemo(() => generateTimeSlots(), []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
  e.preventDefault();

const templateParams = {
  name: form.name,
  email: form.email,
  message: form.message,
  consultation_date: formattedDate,
  consultation_time: `${selectedTime} IST (UTC+05:30)`
};

  setLoading(true);

  // Send email to admin
  emailjs
    .send(
      "service_2r6eima",
      "template_pf7ebav",
      templateParams,
      "EiQBjR9U_D0h5Auvx"
    )
    .then(() => {
      console.log("Admin email sent");
    })
    .catch((error) => {
      console.error("Admin email error:", error);
    });

  // Send auto reply to user
  emailjs
    .send(
      "service_2r6eima",
      "template_v2v24xg",
      templateParams,
      "EiQBjR9U_D0h5Auvx"
    )
    .then(() => {
      console.log("User confirmation email sent");
    })
    .catch((error) => {
      console.error("User email error:", error);
    });

  setLoading(false);

  setStatus({
    type: "success",
    message: "Your consultation booking request has been sent successfully!",
  });

  setForm({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  setStep(3);
};

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : null;

  return (
    <>
      {/* Hero */}
      <section data-testid="contact-hero" className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 to-navy-800/80" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative">
          <motion.div {...fadeUp} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-400/20 text-green-300 rounded-full text-xs font-semibold font-mono tracking-wide border border-green-400/30 mb-8">
              <Calendar size={14} /> Book a Consultation
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              Let's Build Something Great Together
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Pick a date and time that works for you, and our team will be ready to discuss your project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking + Contact */}
      <section data-testid="contact-form-section" className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Main form area */}
            <motion.div {...fadeUp} className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Progress Steps */}
                <div className="flex border-b border-slate-200">
                  {[
                    { num: 1, label: "Select Date & Time" },
                    { num: 2, label: "Your Details" },
                  ].map((s) => (
                    <button
                      key={s.num}
                      onClick={() => {
                        if (s.num === 1) setStep(1);
                        if (s.num === 2 && selectedDate && selectedTime) setStep(2);
                      }}
                      data-testid={`booking-step-${s.num}`}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors
                        ${step === s.num ? "bg-navy-800 text-white" : step > s.num ? "bg-green-50 text-green-700" : "text-slate-400"}
                      `}
                    >
                      <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold
                        ${step === s.num ? "bg-white text-navy-800" : step > s.num ? "bg-green-600 text-white" : "bg-slate-200 text-slate-500"}
                      `}>
                        {step > s.num ? <CheckCircle2 size={14} /> : s.num}
                      </span>
                      {s.label}
                    </button>
                  ))}
                </div>

                <div className="p-6 md:p-8">
                  {step === 1 && (
                    <div>
                      <h2 className="font-heading text-xl font-bold text-text-main mb-2">Choose Your Preferred Time</h2>
                      <p className="text-sm text-slate-500 mb-6">Select a date and a 30-minute slot. All times are in IST (GMT+5:30).</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Calendar */}
                        <CalendarPicker selectedDate={selectedDate} onSelectDate={(d) => { setSelectedDate(d); setSelectedTime(null); }} />

                        {/* Time Slots */}
                        <div>
                          <p className="text-sm font-medium text-text-main mb-3">
                            {formattedDate || "Select a date to see available slots"}
                          </p>
                          {selectedDate ? (
                            <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-2">
                              {timeSlots.map((slot) => (
                                <button
                                  key={slot}
                                  onClick={() => setSelectedTime(slot)}
                                  data-testid={`time-slot-${slot}`}
                                  className={`time-slot py-2.5 px-3 rounded-lg border text-sm font-medium transition-all
                                    ${selectedTime === slot ? "time-slot-selected" : "border-slate-200 text-slate-600 bg-white"}
                                  `}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-48 text-slate-300">
                              <Calendar size={40} />
                              <p className="text-sm mt-3">Pick a date first</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {selectedDate && selectedTime && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-4">
                          <div>
                            <p className="text-sm font-medium text-green-800">
                              {formattedDate} at {selectedTime} IST
                            </p>
                            <p className="text-xs text-green-600">30-minute consultation</p>
                          </div>
                          <button
                            onClick={() => setStep(2)}
                            data-testid="continue-to-details"
                            className="bg-navy-800 text-white rounded-full px-6 py-2.5 text-sm font-medium hover:bg-teal transition-all hover:-translate-y-0.5"
                          >
                            Continue
                          </button>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {step === 2 && (
                    <form onSubmit={handleSubmit}>
                      <h2 className="font-heading text-xl font-bold text-text-main mb-2">Your Details</h2>
                      {selectedDate && selectedTime && (
                        <div className="flex items-center gap-2 mb-6 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl p-3">
                          <Clock size={16} />
                          <span className="font-medium">{formattedDate} at {selectedTime} IST</span>
                          <button type="button" onClick={() => setStep(1)} className="ml-auto text-xs text-green-600 hover:text-green-800 underline">Change</button>
                        </div>
                      )}

                      <div className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-text-main mb-2">Full Name *</label>
                            <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="John Doe" data-testid="contact-name-input" className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-text-main placeholder-slate-400 outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition-all" />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-text-main mb-2">Company Email *</label>
                            <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="john@company.com" data-testid="contact-email-input" className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-text-main placeholder-slate-400 outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition-all" />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-text-main mb-2">Company</label>
                          <input id="company" name="company" type="text" value={form.company} onChange={handleChange} placeholder="Company Name" data-testid="contact-company-input" className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-text-main placeholder-slate-400 outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition-all" />
                        </div>
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-text-main mb-2">Message *</label>
                          <textarea id="message" name="message" required rows={4} value={form.message} onChange={handleChange} placeholder="Tell us about your project..." data-testid="contact-message-input" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-text-main placeholder-slate-400 outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition-all resize-none" />
                        </div>

                        <button type="submit" disabled={loading} data-testid="contact-submit-button" className="inline-flex items-center justify-center gap-2 bg-navy-800 text-white hover:bg-teal rounded-full px-8 py-4 font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto">
                          {loading ? (
                            <><div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Booking...</>
                          ) : (
                            <><Send size={16} /> Confirm Booking</>
                          )}
                        </button>

                        {status && status.type === "error" && (
                          <div data-testid="contact-form-status" className="flex items-start gap-3 p-4 rounded-xl bg-red-50 text-red-800 border border-red-200">
                            <AlertCircle size={20} className="shrink-0 mt-0.5" />
                            <p className="text-sm">{status.message}</p>
                          </div>
                        )}
                      </div>
                    </form>
                  )}

                  {step === 3 && status && status.type === "success" && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10" data-testid="booking-success">
                      <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-green-600" />
                      </div>
                      <h2 className="font-heading text-2xl font-bold text-text-main mb-3">Booking Confirmed!</h2>
                      <p className="text-slate-500 mb-2">{status.message}</p>
                      {selectedDate && selectedTime && (
                        <p className="text-sm font-medium text-navy-800 bg-navy-50 inline-flex items-center gap-2 px-4 py-2 rounded-full mt-2">
                          <Calendar size={16} /> {formattedDate} at {selectedTime} IST
                        </p>
                      )}
                      <div className="mt-8">
                        <button
                          onClick={() => { setStep(1); setSelectedDate(null); setSelectedTime(null); setStatus(null); }}
                          data-testid="book-another"
                          className="text-sm text-navy-800 hover:text-green-600 font-medium transition-colors animated-underline"
                        >
                          Book Another Consultation
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div {...fadeUp} className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
                <h3 className="font-heading font-semibold text-lg text-text-main mb-6">Contact Information</h3>
                <div className="space-y-5">
                  <a href="mailto:info@pyrunai.com" data-testid="contact-email-link" className="flex items-center gap-4 group">
                    <div className="h-10 w-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 group-hover:bg-green-400 group-hover:text-white transition-colors">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Email</p>
                      <p className="text-sm font-medium text-navy-800">info@pyrunai.com</p>
                    </div>
                  </a>
                  <a href="tel:+918180907138" data-testid="contact-phone-link" className="flex items-center gap-4 group">
                    <div className="h-10 w-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 group-hover:bg-green-400 group-hover:text-white transition-colors">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Phone</p>
                      <p className="text-sm font-medium text-navy-800">+91 8180907138</p>
                    </div>
                  </a>
                  <a href="https://www.linkedin.com/company/109349964/" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                    <div className="h-10 w-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 group-hover:bg-green-400 group-hover:text-white transition-colors">
                      <Linkedin size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">LinkedIn</p>
                      <p className="text-sm font-medium text-navy-800">PyrunAi Services</p>
                    </div>
                  </a>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-3">
                  <Clock size={16} className="text-green-600" />
                  <p className="text-sm text-slate-500">Response time: <span className="font-medium text-text-main">Within 24 hours</span></p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
                <h3 className="font-heading font-semibold text-lg text-text-main mb-6">Our Offices</h3>
                <div className="space-y-4">
                  {offices.map((o) => (
                    <div key={o.country} data-testid={`contact-office-${o.country.toLowerCase()}`} className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface transition-colors">
                      <div className="h-10 w-10 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center shrink-0">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-main">{o.country}</p>
                        <p className="text-xs text-slate-400">{o.city}</p>
                        <span className="inline-flex mt-1 px-2 py-0.5 bg-green-50 text-green-700 rounded text-[10px] font-semibold">{o.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick info */}
              <div className="bg-navy-800 rounded-2xl p-7 text-white">
                <h3 className="font-heading font-semibold text-lg mb-4">What to Expect</h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-3"><CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" /> 30-minute free consultation call</li>
                  <li className="flex items-start gap-3"><CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" /> Discuss your business needs and goals</li>
                  <li className="flex items-start gap-3"><CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" /> Get a custom solution recommendation</li>
                  <li className="flex items-start gap-3"><CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" /> No obligation, no pressure</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
