export default function AboutSection({ dict }: { dict: any }) {
  return (
    <section id="nosotros" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-brand-100 rounded-full blur-[100px] opacity-70"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-brand-600 font-semibold tracking-wide uppercase mb-4">{dict.about.label}</p>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
            {dict.about.titleStart} <span className="text-brand-800">{dict.about.titleHighlight}</span>.
          </h2>
          <div className="text-lg text-slate-600 space-y-6">
            <p>{dict.about.p1}</p>
            <p>{dict.about.p2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
