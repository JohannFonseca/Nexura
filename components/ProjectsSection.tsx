import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function ProjectsSection({ dict }: { dict: any }) {
  const projects = [
    {
      id: 1,
      title: "Pura Vida Quiz",
      tags: ["Website", "Juego Interactivo"],
      image: "/pura-vida-quiz.png",
      url: "https://pura-vida-quiz.vercel.app/",
    }
  ];

  return (
    <section id="proyectos" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{dict.projects.title}</h2>
          <p className="text-lg text-slate-600">
            {dict.projects.subtitle}
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
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
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
