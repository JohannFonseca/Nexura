export interface TranslationSet {
  nav: {
    services: string;
    projects: string;
    pricing: string;
    contact: string;
    ctaButton: string;
  };
  hero: {
    label: string;
    headline: string;
    subtext: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: {
    label: string;
    headline: string;
    subtext: string;
    cardATag: string;
    cardATitle: string;
    cardADesc: string;
    cardBTag: string;
    cardBTitle: string;
    cardBDesc: string;
    cardCTag: string;
    cardCTitle: string;
    cardCDesc: string;
  };
  projects: {
    label: string;
    headline: string;
    subtext: string;
    viewCta: string;
    items: {
      t1Tag: string;
      t1Title: string;
      t1Desc: string;
      t2Tag: string;
      t2Title: string;
      t2Desc: string;
      t3Tag: string;
      t3Title: string;
      t3Desc: string;
      t4Tag: string;
      t4Title: string;
      t4Desc: string;
    };
  };
  differentiators: {
    label: string;
    headline: string;
    subtext: string;
    items: {
      i1Label: string;
      i1Desc: string;
      i2Label: string;
      i2Desc: string;
      i3Label: string;
      i3Desc: string;
      i4Label: string;
      i4Desc: string;
      i5Label: string;
      i5Desc: string;
      i6Label: string;
      i6Desc: string;
    };
  };
  pricing: {
    label: string;
    headline: string;
    subtext: string;
    starterTitle: string;
    starterFeatures: string[];
    starterCta: string;
    proTitle: string;
    proFeatures: string[];
    proCta: string;
    enterpriseTitle: string;
    enterprisePriceSuffix: string;
    enterpriseFeatures: string[];
    enterpriseCta: string;
  };
  finalCta: {
    headline: string;
    subtext: string;
    cta: string;
  };
  footer: {
    marquee: string;
    rights: string;
  };
}

export const translations = {
  es: {
    nav: {
      services: "Servicios",
      projects: "Proyectos",
      pricing: "Precios",
      contact: "Contacto",
      ctaButton: "Contactar",
    },
    hero: {
      label: "Estudio de software · Costa Rica",
      headline: "Construimos el software que escala tu negocio.",
      subtext: "SaaS · CRM · Plataformas web a medida. Sin plantillas, sin atajos. Solo trabajo bien hecho.",
      ctaPrimary: "Ver proyectos",
      ctaSecondary: "Escribir por WhatsApp",
    },
    services: {
      label: "Especialidades",
      headline: "Artesanía en software digital",
      subtext: "Soluciones de ingeniería premium hechas a mano, optimizadas para el rendimiento y la escalabilidad.",
      cardATag: "WEB",
      cardATitle: "Sitios que convierten",
      cardADesc: "Diseños únicos y optimizados construidos desde cero para cada cliente. Rápidos, responsivos, efectivos.",
      cardBTag: "SAAS",
      cardBTitle: "Plataformas que escalan",
      cardBDesc: "Aplicaciones web completas con bases de datos, paneles de administración y lógica personalizada.",
      cardCTag: "CRM",
      cardCTitle: "Tu proceso de ventas, digitalizado",
      cardCDesc: "Sistemas de gestión de clientes construidos exactamente para como trabaja tu equipo.",
    },
    projects: {
      label: "Portafolio",
      headline: "Nuestros Proyectos",
      subtext: "Explora una muestra selecta de software a medida y plataformas web premium que hemos entregado.",
      viewCta: "→ Ver",
      items: {
        t1Tag: "WEB",
        t1Title: "Pura Vida Quiz",
        t1Desc: "Plataforma interactiva de trivia y juego educativo costarricense.",
        t2Tag: "CRM",
        t2Title: "CRM Lite",
        t2Desc: "Estructura de gestión de clientes ágil y automatizaciones para PYMEs.",
        t3Tag: "SAAS",
        t3Title: "Librería Crayola",
        t3Desc: "E-commerce y sistema de control de catálogo para ventas minoristas.",
        t4Tag: "WEB",
        t4Title: "CF Trainer",
        t4Desc: "Landing page de marca personal y plataforma de entrenamiento para coach de fitness.",
      },
    },
    differentiators: {
      label: "Filosofía",
      headline: "Por qué Nexuracr.dev",
      subtext: "Nos alejamos del desarrollo genérico para ofrecer resultados excepcionales con ingeniería meticulosa.",
      items: {
        i1Label: "Entrega rápida",
        i1Desc: "Sin meses de espera. Hitos claros y releases continuos.",
        i2Label: "Código a medida",
        i2Desc: "Construido para tu negocio específicamente. Sin atajos.",
        i3Label: "Diseño responsivo",
        i3Desc: "Perfecto en cualquier dispositivo y tamaño de pantalla.",
        i4Label: "Deploy en Vercel",
        i4Desc: "Infraestructura robusta y rápida como debe ser desde el primer día.",
        i5Label: "Desde Costa Rica",
        i5Desc: "Zona horaria alineada, comunicación directa y contexto local.",
        i6Label: "Soporte post-entrega",
        i6Desc: "No desaparecemos al terminar. Acompañamos tu escalabilidad.",
      },
    },
    pricing: {
      label: "Inversión",
      headline: "Tarifas transparentes",
      subtext: "Planes claros adaptados al alcance de tu negocio, con resultados excepcionales garantizados.",
      starterTitle: "Landing Page",
      starterFeatures: [
        "Diseño personalizado",
        "Responsive (móvil + desktop)",
        "Deploy en Vercel incluido",
        "SEO técnico básico",
        "Entrega en ~7 días"
      ],
      starterCta: "Solicitar",
      proTitle: "Landing + Base de Datos",
      proFeatures: [
        "Todo lo del plan Starter",
        "Panel de administración",
        "Formularios con backend real",
        "Autenticación de usuarios",
        "Lógica personalizada",
        "Entrega en ~14 días"
      ],
      proCta: "Empezar ahora",
      enterpriseTitle: "CRM Personalizado",
      enterprisePriceSuffix: "/mes*",
      enterpriseFeatures: [
        "Sistema completo de clientes",
        "Módulos a la medida",
        "Reportes y dashboards",
        "Soporte y mejoras continuas",
        "*Precio según requerimientos"
      ],
      enterpriseCta: "Cotizar proyecto",
    },
    finalCta: {
      headline: "¿Listo para construir algo que funcione de verdad?",
      subtext: "Hablemos de tu proyecto.",
      cta: "Escribir por WhatsApp →",
    },
    footer: {
      marquee: "SaaS · CRM · Web Development · Costa Rica · Fast Delivery · Custom Platforms · Nexuracr.dev · ",
      rights: "© 2025 Nexuracr.dev · Todos los derechos reservados",
    },
  },
  en: {
    nav: {
      services: "Services",
      projects: "Projects",
      pricing: "Pricing",
      contact: "Contact",
      ctaButton: "Contact",
    },
    hero: {
      label: "Software Studio · Costa Rica",
      headline: "We build the software that scales your business.",
      subtext: "SaaS · CRM · Custom web platforms. No templates, no shortcuts. Just work done right.",
      ctaPrimary: "View projects",
      ctaSecondary: "Chat on WhatsApp",
    },
    services: {
      label: "Expertise",
      headline: "Digital Craftsmanship",
      subtext: "Premium, handcrafted engineering solutions optimized for extreme performance and scalability.",
      cardATag: "WEB",
      cardATitle: "Sites that convert",
      cardADesc: "Unique, optimized designs built from scratch for each client. Fast, responsive, effective.",
      cardBTag: "SAAS",
      cardBTitle: "Platforms that scale",
      cardBDesc: "Full web applications with databases, admin panels, and custom business logic.",
      cardCTag: "CRM",
      cardCTitle: "Your sales process, digitized",
      cardCDesc: "Client management systems built exactly for how your team operates.",
    },
    projects: {
      label: "Portfolio",
      headline: "Selected Works",
      subtext: "Explore a curated showcase of custom software and premium web platforms we have delivered.",
      viewCta: "→ View",
      items: {
        t1Tag: "WEB",
        t1Title: "Pura Vida Quiz",
        t1Desc: "Interactive trivia platform and educational Costa Rican game.",
        t2Tag: "CRM",
        t2Title: "CRM Lite",
        t2Desc: "Agile client management framework and automation tools for SMBs.",
        t3Tag: "SAAS",
        t3Title: "Librería Crayola",
        t3Desc: "E-commerce and catalog management system for retail store sales.",
        t4Tag: "WEB",
        t4Title: "CF Trainer",
        t4Desc: "Premium personal branding landing page and training platform for fitness coaching.",
      },
    },
    differentiators: {
      label: "Philosophy",
      headline: "Why Nexuracr.dev",
      subtext: "We avoid generic shortcuts, choosing meticulous engineering and absolute dedication to results.",
      items: {
        i1Label: "Fast delivery",
        i1Desc: "No waiting months. Clean milestones and continuous production releases.",
        i2Label: "Custom code",
        i2Desc: "Built specifically for your business. Zero structural shortcuts.",
        i3Label: "Responsive design",
        i3Desc: "Stunning experience across every device and viewport width.",
        i4Label: "Vercel deployment",
        i4Desc: "Robust, lightning-fast edge infrastructure from day one.",
        i5Label: "Based in Costa Rica",
        i5Desc: "Aligned timezone, fluid communications, and immediate context.",
        i6Label: "Post-launch support",
        i6Desc: "We don't disappear after launching. We actively support your scale.",
      },
    },
    pricing: {
      label: "Investment",
      headline: "Transparent pricing",
      subtext: "Clear, scope-based packages designed to match your goals with exceptional guarantees.",
      starterTitle: "Landing Page",
      starterFeatures: [
        "Custom design",
        "Responsive (mobile + desktop)",
        "Vercel deploy included",
        "Basic technical SEO",
        "Delivered in ~7 days"
      ],
      starterCta: "Get started",
      proTitle: "Landing + Database",
      proFeatures: [
        "Everything in Starter",
        "Admin dashboard",
        "Forms with real backend",
        "User authentication",
        "Custom business logic",
        "Delivered in ~14 days"
      ],
      proCta: "Start now",
      enterpriseTitle: "Custom CRM",
      enterprisePriceSuffix: "/mo*",
      enterpriseFeatures: [
        "Full client management system",
        "Custom modules",
        "Reports and dashboards",
        "Ongoing support and improvements",
        "*Price varies by requirements"
      ],
      enterpriseCta: "Request quote",
    },
    finalCta: {
      headline: "Ready to build something that actually works?",
      subtext: "Let's talk about your project.",
      cta: "Chat on WhatsApp →",
    },
    footer: {
      marquee: "SaaS · CRM · Web Development · Costa Rica · Fast Delivery · Custom Platforms · Nexuracr.dev · ",
      rights: "© 2025 Nexuracr.dev · All rights reserved",
    },
  },
};
export type Locale = "es" | "en";
export type TranslationKey = keyof typeof translations;
