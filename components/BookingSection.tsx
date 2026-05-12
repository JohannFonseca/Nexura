"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Calendar, Clock, User, Mail, Sparkles, Send } from "lucide-react";

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
    
    // Prepare WhatsApp message
    const message = `Hola Nexura! Me gustaría agendar una cita.%0A%0A*Detalles:*%0A- Nombre: ${formState.name}%0A- Email: ${formState.email}%0A- Fecha: ${formState.date}%0A- Hora: ${formState.time}%0A%0A_Enviado desde el sitio web._`;
    
    // WhatsApp Number (using the one from other links)
    const whatsappUrl = `https://wa.me/50672018610?text=${message}`;
    
    window.open(whatsappUrl, "_blank");
    setIsSubmitted(true);
  };

  return (
    <section 
      ref={sectionRef}
      id="citas" 
      className="py-32 relative overflow-hidden bg-[#05091a]"
    >
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #2d5be3 1px, transparent 0)', backgroundSize: '60px 60px' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="booking-content lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nx-mid/20 text-nx-bright text-xs font-bold uppercase tracking-widest mb-10">
              <Sparkles className="w-4 h-4" />
              IA-Powered Strategy
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white mb-10 leading-[1.1]">
              {dict.booking.title}
            </h2>
            <p className="text-xl text-white/45 leading-relaxed mb-12">
              {dict.booking.subtitle}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-center gap-5 text-white">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/10 group hover:border-nx-mid transition-colors duration-500">
                  <Calendar className="w-6 h-6 text-nx-bright group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Lunes a Viernes</h4>
                  <p className="text-sm text-white/30">Horario de oficina</p>
                </div>
              </div>
              <div className="flex items-center gap-5 text-white">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/10 group hover:border-nx-mid transition-colors duration-500">
                  <Clock className="w-6 h-6 text-nx-bright group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Consultoría 15 min</h4>
                  <p className="text-sm text-white/30">Vía WhatsApp / Meet</p>
                </div>
              </div>
            </div>
          </div>

          <div className="booking-form lg:w-1/2 w-full">
            <div className="bg-white/[0.02] backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] border border-white/[0.06] shadow-2xl relative">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-nx-mid/20 blur-[60px] rounded-full" />
              
              {isSubmitted ? (
                <div className="py-16 text-center">
                  <div className="w-24 h-24 bg-nx-bright/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-nx-bright/20">
                    <Send className="w-10 h-10 text-nx-bright" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-6">¡Mensaje Preparado!</h3>
                  <p className="text-white/45 mb-10 leading-relaxed">Se ha abierto una ventana de WhatsApp para confirmar tu cita.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-nx-bright font-bold hover:underline"
                  >
                    Volver a intentar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[13px] font-bold text-white/40 uppercase tracking-widest ml-1">{dict.booking.nameLabel}</label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                      <input 
                        required
                        type="text" 
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-5 text-white focus:outline-none focus:border-nx-mid/50 focus:bg-white/[0.06] transition-all"
                        placeholder="Tu nombre"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[13px] font-bold text-white/40 uppercase tracking-widest ml-1">{dict.booking.emailLabel}</label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                      <input 
                        required
                        type="email" 
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-5 text-white focus:outline-none focus:border-nx-mid/50 focus:bg-white/[0.06] transition-all"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[13px] font-bold text-white/40 uppercase tracking-widest ml-1">{dict.booking.dateLabel}</label>
                      <input 
                        required
                        type="date" 
                        value={formState.date}
                        onChange={(e) => setFormState({...formState, date: e.target.value})}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-6 text-white focus:outline-none focus:border-nx-mid/50 focus:bg-white/[0.06] transition-all [color-scheme:dark]"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[13px] font-bold text-white/40 uppercase tracking-widest ml-1">{dict.booking.timeLabel}</label>
                      <input 
                        required
                        type="time" 
                        value={formState.time}
                        onChange={(e) => setFormState({...formState, time: e.target.value})}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-6 text-white focus:outline-none focus:border-nx-mid/50 focus:bg-white/[0.06] transition-all [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-nx-mid hover:bg-nx-bright text-white py-6 rounded-2xl font-black text-lg transition-all duration-300 shadow-2xl shadow-nx-mid/30 flex items-center justify-center gap-3 group mt-4"
                  >
                    {dict.booking.cta}
                    <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="rule mt-32" />
    </section>
  );
}
