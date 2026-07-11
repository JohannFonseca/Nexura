export interface TranslationSet {
  nav: {
    services: string;
    projects: string;
    pricing: string;
    contact: string;
    ctaButton: string;
    aiDemo: string;
    cases: string; // new
    cta: string; // new
    about: string; // new
  };
  hero: {
    label: string;
    headline: string;
    subtext: string;
    ctaPrimary: string;
    ctaSecondary: string;
    eyebrow: string; // new
    title1: string; // new
    title2: string; // new
    titleAccent: string; // new
    subtitle: string; // new
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
    eyebrow: string; // new
    title: string; // new
    saasTag: string; // new
    saasTitle: string; // new
    saasDesc: string; // new
    webTag: string; // new
    webTitle: string; // new
    webDesc: string; // new
    posTag: string; // new
    posTitle: string; // new
    posDesc: string; // new
    crmTag: string; // new
    crmTitle: string; // new
    crmDesc: string; // new
  };
  projects: {
    label: string;
    headline: string;
    subtext: string;
    viewCta: string;
    showMore: string;
    showLess: string;
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
      t5Tag: string;
      t5Title: string;
      t5Desc: string;
      tag1: string; // new
      desc1: string; // new
      metric1Num1: string; // new
      metric1Tag1: string; // new
      metric1Num2: string; // new
      metric1Tag2: string; // new
      tag2: string; // new
      desc2: string; // new
      metric2Num1: string; // new
      metric2Tag1: string; // new
      metric2Num2: string; // new
      metric2Tag2: string; // new
      tag3: string; // new
      desc3: string; // new
      metric3Num1: string; // new
      metric3Tag1: string; // new
      metric3Num2: string; // new
      metric3Tag2: string; // new
    };
    eyebrow: string; // new
    title: string; // new
    subtitle: string; // new
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
  aiDemo: {
    label: string;
    headline: string;
    subtext: string;
    testInstructions: string;
    samplePhrasesTitle: string;
    samplePhrases: string[];
    phoneIdleText: string;
    phoneCallingText: string;
    phoneBtnCall: string;
    phoneBtnHangup: string;
  };
  monitor: { // new
    title: string;
    status: string;
    checked: string;
    saas: string;
    saasDesc: string;
    web: string;
    webDesc: string;
    pos: string;
    posDesc: string;
    crm: string;
    crmDesc: string;
  };
  about: { // new
    eyebrow: string;
    title: string;
    p1Start: string;
    p1Bold: string;
    p1End: string;
    p2: string;
    row1Label: string;
    row1Val: string;
    row2Label: string;
    row2Val: string;
    row3Label: string;
    row3Val: string;
    row4Label: string;
    row4Val: string;
  };
  cta: { // new
    eyebrow: string;
    title: string;
    subtitle: string;
    button: string;
    subButton: string;
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
      aiDemo: "Demo IA",
      cases: "Casos",
      cta: "Hablar por WhatsApp",
      about: "Nosotros",
    },
    hero: {
      label: "Estudio de software · Costa Rica",
      headline: "Construimos el software que escala tu negocio.",
      subtext: "SaaS · CRM · Plataformas web a medida. Sin plantillas, sin atajos. Solo trabajo bien hecho.",
      ctaPrimary: "Ver proyectos",
      ctaSecondary: "Escribir por WhatsApp",
      eyebrow: "SISTEMAS EN PRODUCCIÓN — CR",
      title1: "Negocios que no pueden",
      title2: "darse el lujo de que su",
      titleAccent: "falle.",
      subtitle: "Diseñamos y construimos el software que corre tu operación todos los días: ventas, clientes, inventario. A la medida, sin plantillas y sin sorpresas en producción.",
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
      eyebrow: "SERVICIOS",
      title: "Cuatro formas de resolver el mismo problema: que tu operación funcione.",
      saasTag: "MOD.SAAS",
      saasTitle: "SaaS",
      saasDesc: "Software por suscripción, construido para escalar desde el primer cliente hasta el negocio de tus sueños.",
      webTag: "MOD.WEB",
      webTitle: "Sistemas web",
      webDesc: "Plataformas a medida para tu operación diaria: reservas, pedidos, inventario, lo que tu negocio necesite.",
      posTag: "MOD.POS",
      posTitle: "Punto de venta",
      posDesc: "Cobro y ventas que no se caen en hora pico, con SINPE Móvil y control de caja integrados.",
      crmTag: "MOD.CRM",
      crmTitle: "CRM",
      crmDesc: "Todo el pipeline de clientes en un solo lugar, sin hojas de cálculo perdidas entre WhatsApp y correo.",
    },
    projects: {
      label: "Portafolio",
      headline: "Nuestros Proyectos",
      subtext: "Explora una muestra selecta de software a medida y plataformas web premium que hemos entregado.",
      viewCta: "→ Ver",
      showMore: "Ver más",
      showLess: "Ver menos",
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
        t5Tag: "SAAS",
        t5Title: "Punto de Venta Restaurante",
        t5Desc: "Sistema integral de punto de venta, facturación y gestión de inventario para restaurantes.",
        tag1: "Taller mecánico · Sistema web + POS",
        desc1: "Pasaron de agendar citas por WhatsApp a mano a un sistema que controla órdenes, repuestos y cobro en un solo lugar.",
        metric1Num1: "38",
        metric1Tag1: "más órdenes cerradas",
        metric1Num2: "2",
        metric1Tag2: "h/día menos tareas manuales",
        tag2: "Restaurante · Automatización con IA de voz",
        desc2: "Los pedidos por teléfono ahora los toma un agente de voz conectado al panel de cocina, sin perder llamadas en hora pico.",
        metric2Num1: "0",
        metric2Tag1: "llamadas perdidas",
        metric2Num2: "24/7",
        metric2Tag2: "atención activa",
        tag3: "Comercio · CRM a medida",
        desc3: "Todo el historial de clientes y seguimiento de ventas migró de hojas de cálculo sueltas a un CRM que su equipo realmente usa.",
        metric3Num1: "3",
        metric3Tag1: "x seguimiento a leads",
        metric3Num2: "100",
        metric3Tag2: "% datos en un solo lugar",
      },
      eyebrow: "CASOS DE ÉXITO",
      title: "Sistemas reales, corriendo con negocios reales.",
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
        "Lista en 2 a 5 días hábiles"
      ],
      starterCta: "Solicitar",
      proTitle: "Landing + Base de Datos",
      proFeatures: [
        "Todo lo del plan Starter",
        "Panel de administración",
        "Formularios con backend real",
        "Autenticación de usuarios",
        "Lógica personalizada",
        "Lista en 3 a 7 días hábiles"
      ],
      proCta: "Empezar ahora",
      enterpriseTitle: "CRM Personalizado",
      enterprisePriceSuffix: "/mes*",
      enterpriseFeatures: [
        "Sistema completo de clientes",
        "Módulos a la medida",
        "Reportes y dashboards",
        "Soporte y mejoras continuas",
        "*Mantenimiento aprox: ₡35,000/mes ($70/mo)"
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
    aiDemo: {
      label: "Tecnología de Voz Avanzada",
      headline: "Prueba nuestro Agente de Reservas con IA",
      subtext: "Llama a nuestra Inteligencia Artificial entrenada para gestionar reservas de restaurantes en tiempo real de manera fluida y humana.",
      testInstructions: "Usa el simulador de la derecha para iniciar una llamada de voz interactiva.",
      samplePhrasesTitle: "Temas de prueba recomendados:",
      samplePhrases: [
        "«Consultar Horario»",
        "«Preguntar por el Menú»",
        "«Disponibilidad de Mesas»",
        "«Pedir Postres»"
      ],
      phoneIdleText: "Bistró Nexura — Listo para recibir tu llamada. Presiona el botón verde para hablar con nuestro agente de reservas de IA.",
      phoneCallingText: "Llamada Activa con Asistente Nexura",
      phoneBtnCall: "Llamar Asistente de Voz",
      phoneBtnHangup: "Colgar Llamada"
    },
    monitor: {
      title: "NEXURA / STATUS",
      status: "Todos los sistemas operativos",
      checked: "verificado hace",
      saas: "SAAS",
      saasDesc: "uptime real",
      web: "SISTEMAS WEB",
      webDesc: "tiempo de carga",
      pos: "POS",
      posDesc: "transacciones / día",
      crm: "CRM",
      crmDesc: "leads en seguimiento",
    },
    about: {
      eyebrow: "NOSOTROS",
      title: "Un estudio, no una fábrica de plantillas.",
      p1Start: "Nexura construye software para negocios costarricenses que están cansados de forzar su operación a caber en herramientas genéricas. ",
      p1Bold: "Cada sistema se diseña para cómo trabaja tu equipo",
      p1End: ", no al revés.",
      p2: "Trabajamos directo contigo, de la idea al sistema en producción, con el mismo nivel de detalle que le pondríamos a nuestros propios productos.",
      row1Label: "Con base en",
      row1Val: "Costa Rica",
      row2Label: "Stack principal",
      row2Val: "Next.js / Laravel",
      row3Label: "Modelo",
      row3Val: "A medida + SaaS",
      row4Label: "Contacto",
      row4Val: "WhatsApp directo",
    },
    cta: {
      eyebrow: "HABLEMOS",
      title: "Cuéntame qué sistema necesitas.",
      subtitle: "Una llamada de 15 minutos por WhatsApp es suficiente para saber si podemos ayudarte.",
      button: "Hablar por WhatsApp",
      subButton: "Ver servicios",
    },
  },
  en: {
    nav: {
      services: "Services",
      projects: "Projects",
      pricing: "Pricing",
      contact: "Contact",
      ctaButton: "Contact",
      aiDemo: "AI Demo",
      cases: "Cases",
      cta: "Chat on WhatsApp",
      about: "About Us",
    },
    hero: {
      label: "Software Studio · Costa Rica",
      headline: "We build the software that scales your business.",
      subtext: "SaaS · CRM · Custom web platforms. No templates, no shortcuts. Just work done right.",
      ctaPrimary: "View projects",
      ctaSecondary: "Chat on WhatsApp",
      eyebrow: "PRODUCTION SYSTEMS — CR",
      title1: "Businesses that cannot",
      title2: "afford to have their",
      titleAccent: "fail.",
      subtitle: "We design and build the software that runs your daily operation: sales, clients, inventory. Tailor-made, template-free, and with no surprises in production.",
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
      eyebrow: "SERVICES",
      title: "Four ways to solve the same problem: making your operations work.",
      saasTag: "MOD.SAAS",
      saasTitle: "SaaS",
      saasDesc: "Subscription software, built to scale from the first customer to the business of your dreams.",
      webTag: "MOD.WEB",
      webTitle: "Web systems",
      webDesc: "Tailor-made platforms for your daily operation: bookings, orders, inventory, whatever your business needs.",
      posTag: "MOD.POS",
      posTitle: "Point of sale",
      posDesc: "Checkout and sales that do not crash during peak hours, with SINPE Móvil and cash register control integrated.",
      crmTag: "MOD.CRM",
      crmTitle: "CRM",
      crmDesc: "The entire customer pipeline in one place, without lost spreadsheets between WhatsApp and email.",
    },
    projects: {
      label: "Portfolio",
      headline: "Selected Works",
      subtext: "Explore a curated showcase of custom software and premium web platforms we have delivered.",
      viewCta: "→ View",
      showMore: "Show more",
      showLess: "Show less",
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
        t5Tag: "SAAS",
        t5Title: "Restaurant POS System",
        t5Desc: "Comprehensive point of sale, inventory control, and billing system for restaurants.",
        tag1: "Mechanic Shop · Web System + POS",
        desc1: "Went from scheduling WhatsApp appointments by hand to a system that controls orders, spare parts, and checkout in one place.",
        metric1Num1: "38",
        metric1Tag1: "more orders closed",
        metric1Num2: "2",
        metric1Tag2: "h/day less manual tasks",
        tag2: "Restaurant · Voice AI Automation",
        desc2: "Phone orders are now taken by a voice assistant connected to the kitchen display, never missing a call during peak hours.",
        metric2Num1: "0",
        metric2Tag1: "missed calls",
        metric2Num2: "24/7",
        metric2Tag2: "active support",
        tag3: "Retail · Custom CRM",
        desc3: "The entire customer history and sales pipeline migrated from scattered spreadsheets to a CRM their team actually uses.",
        metric3Num1: "3",
        metric3Tag1: "x lead tracking",
        metric3Num2: "100",
        metric3Tag2: "% data in one place",
      },
      eyebrow: "SUCCESS STORIES",
      title: "Real systems, running with real businesses.",
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
        "Ready in 2 to 5 business days"
      ],
      starterCta: "Get started",
      proTitle: "Landing + Database",
      proFeatures: [
        "Everything in Starter",
        "Admin dashboard",
        "Forms with real backend",
        "User authentication",
        "Custom business logic",
        "Ready in 3 to 7 business days"
      ],
      proCta: "Start now",
      enterpriseTitle: "Custom CRM",
      enterprisePriceSuffix: "/mo*",
      enterpriseFeatures: [
        "Full client management system",
        "Custom modules",
        "Reports and dashboards",
        "Ongoing support and improvements",
        "*Maintenance approx: $70/mo (₡35,000/mo)"
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
    aiDemo: {
      label: "Advanced Voice Technology",
      headline: "Test Our AI Restaurant Booking Agent",
      subtext: "Call our AI assistant trained to handle restaurant reservations in real-time with a fluid and natural human tone.",
      testInstructions: "Use the simulator on the right to start an interactive voice call.",
      samplePhrasesTitle: "Recommended test topics:",
      samplePhrases: [
        "\"Check Opening Hours\"",
        "\"Ask for the Menu\"",
        "\"Table Availability\"",
        "\"Order Desserts\""
      ],
      phoneIdleText: "Nexura Bistro — Ready to receive your call. Press the green button to speak with our AI reservation agent.",
      phoneCallingText: "Active Call with Nexura Assistant",
      phoneBtnCall: "Call Voice Assistant",
      phoneBtnHangup: "Hang Up Call"
    },
    monitor: {
      title: "NEXURA / STATUS",
      status: "All systems operational",
      checked: "verified",
      saas: "SAAS",
      saasDesc: "real uptime",
      web: "WEB SYSTEMS",
      webDesc: "load time",
      pos: "POS",
      posDesc: "transactions / day",
      crm: "CRM",
      crmDesc: "leads tracked",
    },
    about: {
      eyebrow: "ABOUT US",
      title: "A studio, not a template factory.",
      p1Start: "Nexura builds software for Costa Rican businesses tired of forcing their operations into generic tools. ",
      p1Bold: "Every system is designed for how your team works",
      p1End: ", not the other way around.",
      p2: "We work directly with you, from the idea to the production system, with the same level of detail we would put into our own products.",
      row1Label: "Based in",
      row1Val: "Costa Rica",
      row2Label: "Main stack",
      row2Val: "Next.js / Laravel",
      row3Label: "Model",
      row3Val: "Custom + SaaS",
      row4Label: "Contact",
      row4Val: "Direct WhatsApp",
    },
    cta: {
      eyebrow: "LET'S TALK",
      title: "Tell me what system you need.",
      subtitle: "A 15-minute WhatsApp call is enough to know if we can help.",
      button: "Chat on WhatsApp",
      subButton: "View services",
    },
  },
};

export type Locale = "es" | "en";
export type TranslationSetKey = keyof typeof translations;
