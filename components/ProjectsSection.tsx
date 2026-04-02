import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: "FinTech Dashboard",
      tags: ["Software", "Website"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      url: "#",
    },
    {
      id: 2,
      title: "E-Commerce App",
      tags: ["Mobile", "E-commerce"],
      image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=800&auto=format&fit=crop",
      url: "#",
    },
    {
      id: 3,
      title: "Real Estate Platform",
      tags: ["Website", "Software"],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
      url: "#",
    },
    {
      id: 4,
      title: "Logistics System",
      tags: ["Software", "Automation"],
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
      url: "#",
    }
  ];

  return (
    <section id="proyectos" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trabajos Recientes</h2>
          <p className="text-lg text-slate-600">
            Explora algunos de los proyectos más recientes donde hemos implementado soluciones digitales efectivas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link href={project.url} key={project.id} className="group block outline-none">
              <div className="relative rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-brand-900/0 transition-colors duration-500 group-hover:bg-brand-900/10" />
                </div>
                
                <div className="p-8 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand-800 transition-colors">{project.title}</h3>
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map((tag) => (
                         <span key={tag} className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                           {tag}
                         </span>
                      ))}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-brand-800 group-hover:text-white group-hover:border-brand-800 transition-all duration-300">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
