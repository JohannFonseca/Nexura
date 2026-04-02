export default function AboutSection() {
  return (
    <section id="nosotros" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-brand-100 rounded-full blur-[100px] opacity-70"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-brand-600 font-semibold tracking-wide uppercase mb-4">Sobre Nosotros</p>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
            Más que una agencia digital, somos tu <span className="text-brand-800">socio tecnológico</span>.
          </h2>
          <div className="text-lg text-slate-600 space-y-6">
            <p>
              En Nexura entendemos que las empresas locales necesitan herramientas modernas para competir y destacar. Nacimos con la misión de democratizar la tecnología y llevar soluciones efectivas a negocios en crecimiento.
            </p>
            <p>
              No solo creamos páginas web o sistemas; diseñamos estrategias digitales. Ayudamos a automatizar procesos, mejorar la comunicación con tus clientes y construir una presencia profesional sólida. Si quieres escalar, nosotros ponemos la tecnología.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
