import { Code2, MessageSquare, Database, Smartphone } from "lucide-react";

export default function ServicesSection({ dict }: { dict: any }) {
  const services = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: dict.services.s1Title,
      description: dict.services.s1Desc
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: dict.services.s2Title,
      description: dict.services.s2Desc
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: dict.services.s3Title,
      description: dict.services.s3Desc
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: dict.services.s4Title,
      description: dict.services.s4Desc
    }
  ];

  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{dict.services.title}</h2>
          <p className="text-lg text-slate-600">
            {dict.services.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
