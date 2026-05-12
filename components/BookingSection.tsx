"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Calendar, Clock, User, Mail, Sparkles } from "lucide-react";

export default function BookingSection({ dict }: { dict: any }) {
  const [formState, setFormState] = useState({ name: "", email: "", date: "", time: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".booking-content", {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
      gsap.from(".booking-form", {
        x: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setFormState({ name: "", email: "", date: "", time: "" });
    }, 800);
  };

  return (
    <section 
      ref={sectionRef}
      id="citas" 
      className="py-24 relative overflow-hidden bg-slate-900"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #2d5be3 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="booking-content lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nx-mid/20 text-nx-bright text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-4 h-4" />
              IA-Powered Consulting
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              {dict.booking.title}
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              {dict.booking.subtitle}
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Calendar className="w-6 h-6 text-nx-bright" />
                </div>
                <div>
                  <h4 className="font-bold">Lunes a Viernes</h4>
                  <p className="text-sm text-slate-400">9:00 AM - 6:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Clock className="w-6 h-6 text-nx-bright" />
                </div>
                <div>
                  <h4 className="font-bold">Sesión de 15 min</h4>
                  <p className="text-sm text-slate-400">Vía Google Meet o Zoom</p>
                </div>
              </div>
            </div>
          </div>

          <div className="booking-form lg:w-1/2 w-full">
            <div className="bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-20 h-20 bg-nx-bright/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-nx-bright" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{dict.booking.success}</h3>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-nx-bright font-semibold hover:underline"
                  >
                    Agendar otra cita
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 ml-1">{dict.booking.nameLabel}</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input 
                        required
                        type="text" 
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-nx-mid transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 ml-1">{dict.booking.emailLabel}</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input 
                        required
                        type="email" 
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-nx-mid transition-all"
                        placeholder="hola@tuempresa.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 ml-1">{dict.booking.dateLabel}</label>
                      <input 
                        required
                        type="date" 
                        value={formState.date}
                        onChange={(e) => setFormState({...formState, date: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-nx-mid transition-all [color-scheme:dark]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 ml-1">{dict.booking.timeLabel}</label>
                      <input 
                        required
                        type="time" 
                        value={formState.time}
                        onChange={(e) => setFormState({...formState, time: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-nx-mid transition-all [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-nx-mid hover:bg-nx-bright text-white py-5 rounded-2xl font-bold transition-all duration-300 shadow-xl shadow-nx-mid/20 flex items-center justify-center gap-2 group"
                  >
                    {dict.booking.cta}
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-nx-mid/20 blur-[120px] rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
    </section>
  );
}
