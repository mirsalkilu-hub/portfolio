import { SHOW_PRICING } from "./flags";

export type Card = {
  title: string;
  sub: string;
  tags?: string[];
  href?: string;
  image?: string;
  ratio?: number;
  cta?: string;
};

export type Service = { title: string; text: string; get: string };
export type SkillTab = { name: string; tiles: { name: string; benefit: string }[] };
export type AboutItem = { when?: string; title: string; sub?: string; emphasis?: string; text: string; tags?: string[]; href?: string };
export type AboutTab = { name: string; items: AboutItem[] };
export type Insight = { cat: "Full-stack" | "Business"; title: string; read: string; summary: string; bullets: string[] };

export type Section = {
  id: string;
  nav: string;
  links?: { label: string; href: string }[];
  eyebrow: string;
  title: string;
  desc: string | string[];
  points?: (string | { label: string; text: string })[];
  pointsHeading?: string;
  cta?: { label: string; goto: string };
  media: "photo" | "about" | "frames" | "services" | "skills" | "insights" | "pricing" | "form";
  aboutTabs?: AboutTab[];
  cards?: Card[];
  services?: Service[];
  process?: string[];
  tabs?: SkillTab[];
  stats?: { n: string; label: string }[];
  insights?: Insight[];
  hue: number;
};

export const EMAIL = "mirsal.kilu@gmail.com";
export const PHONE = "+62 853 9768 5933";
export const PHONE_TEL = "+6285397685933";
export const WHATSAPP_NUMBER = PHONE_TEL.replace("+", "");
export const whatsappLink = (text = "") => `https://wa.me/${WHATSAPP_NUMBER}${text ? "?text=" + encodeURIComponent(text) : ""}`;
/** Add real client or colleague quotes here and a "Kind words" tab appears in the About section. Leave empty until you have them. */
export const testimonials: { quote: string; name: string; role: string }[] = [];
export const LINKEDIN = "https://instagram.com/mirzal.kilu";
export const LINKEDIN_LABEL = "instagram.com/mirzal.kilu";

const allSections: Section[] = [
  {
    id: "intro",
    nav: "Home",
    eyebrow: "Mirsal · Senior Frontend Developer",
    title: "Websites & web apps that grow your business",
    desc: "Every great website starts with a simple conversation. Bring me a clear idea and I'll bring it to life, or bring me just a goal and I'll help you shape the right plan. With 10+ years as a Senior Frontend and Full-Stack Developer and consultant, I take care of everything from design and development to the database and hosting, until your website is live and working for your business.",
    points: ["Have an idea? I design and build it, end to end", "Want guidance? I help you shape the right website for your business"],
    media: "photo",
    hue: 0,
  },
  {
    id: "about",
    nav: "About",
    eyebrow: "About me",
    title: "Building Digital Experiences That Matter.",
    desc: [
      "I'm a Senior Frontend Developer & IT Consultant in Makassar with 10+ years in web, full-stack, and networking.",
      "With government-sector experience, I build fast, accessible, scalable, user-centered digital solutions.",
      "I turn complex challenges into practical, high-performance results.",
    ],
    pointsHeading: "What I Bring to the Table:",
    points: [
      { label: "Based in", text: "Makassar, Indonesia." },
      { label: "Experience", text: "10+ years in IT and digital development." },
      { label: "Industry", text: "Government & IT." },
      { label: "Expertise", text: "Frontend, Full-Stack & Network Infrastructure." },
      { label: "Focus", text: "Performance, accessibility, responsive design & scalability." },
      { label: "My Approach", text: "I build your idea or help you shape it." },
    ],
    media: "about",
    aboutTabs: [
      {
        name: "Experience",
        items: [
          {
            when: "JUL 2018 – PRESENT",
            title: "Senior Frontend Developer",
            text: "Design and develop modern, responsive, and high-performance web applications using scalable architecture and reusable components. Focus on performance optimization, seamless user experiences, and delivering efficient, maintainable digital solutions.",
            tags: ["Responsive Web Design", "Web Development"],
          },
          {
            title: "Production Quality & Reliability",
            text: "I ensure production readiness through structured release checks, proactive issue resolution, and thorough quality validation, helping deliver stable, reliable user experiences.",
            tags: ["Release Readiness", "Issue Resolution", "Quality Assurance"],
          },
          {
            title: "Frontend applications",
            text: "I develop responsive React and JavaScript applications, integrating APIs and optimizing performance to deliver reliable, maintainable user experiences.",
            tags: ["React", "JavaScript"],
          },
        ],
      },
      {
        name: "Projects",
        items: [
          {
            title: "Gameskilu.com",
            sub: "Gaming news · Hardware reviews · PC game downloads",
            text: "A gaming portal featuring the latest gaming news, hardware reviews, and safe, verified PC game downloads.",
            href: "https://gameskilu.com",
          },
          {
            title: "urlyu.com",
            sub: "Link shortener · Bio page platform",
            text: "Create clean, professional links that are easy to share, with real-time analytics and instant QR codes.",
            href: "https://urlyu.com/",
          },
          {
            title: "Lontara IoT & Robotics Bootcamp",
            sub: "Education · Internet of Things · Robotics",
            text: "A hands-on technology program for South Sulawesi students, introducing IoT and robotics through practical learning, prototyping, and innovation challenges.",
            href: "https://lontaraiot.digitalgov.id",
          },
          {
            title: "PINISI — Pusat Ilmu dan Informasi Bersinergi",
            sub: "Education · Contributor platform",
            text: "A collaborative platform for sharing educational ideas and teaching practices, helping contributors extend the impact of learning resources.",
            href: "https://pinisi.digitalgov.id",
          },
        ],
      },
      {
        name: "Education",
        items: [
          {
            when: "2008 – 2014",
            title: "Bachelor's Degree in Informatics Engineering",
            sub: "STMIK Dipanegara Makassar",
            emphasis: "Specialization: Programming and Computer Networking",
            text: "Built a strong academic foundation in informatics engineering, specializing in software development, programming languages, and computer networking. My passion for technology began at the age of 10 through self-directed learning, which later evolved into professional technical expertise through formal education and hands-on experience.",
          },
        ],
      },
      {
        name: "Exploring",
        items: [
          { title: "Cloudflare Edge Workers", text: "Exploring how fund pages can be generated and rendered at the edge, to show what edge-based delivery makes possible." },
          { title: "Full-stack with Next.js", text: "Building complete products end to end, such as the Vaymora Foods store with its storefront, admin dashboard and database." },
        ],
      },
      ...(testimonials.length
        ? [{ name: "Kind words", items: testimonials.map((t) => ({ title: t.name, sub: t.role, text: t.quote })) }]
        : []),
    ],
    hue: -10,
  },
  {
    id: "consulting",
    nav: "Consulting",
    eyebrow: "Developer and consultant",
    title: "Bring your idea, or let's shape it together",
    desc: "Some clients arrive with a clear idea, and others simply know they want their business to grow. Both are a good place to start. If you already know what you need, I will build it. If you would like guidance first, we look at how your business works, who your customers are and what could help most, and I design the website around that.",
    points: [
      "Have a clear idea? I design and build it",
      "Want advice first? We look at your goals and customers together",
      "Either way, you get practical growth ideas you can act on",
    ],
    cta: { label: "Share your idea or goal", goto: "contact" },
    media: "about",
    aboutTabs: [
      {
        name: "Ways to start",
        items: [
          { title: "I have an idea", text: "Tell me what you want to build. I confirm the scope, then design and build it end to end, including the database and hosting." },
          { title: "I have a goal", text: "Tell me what you want to achieve, such as more enquiries or more sales, and we work out together what the website should do." },
          { title: "I have an existing site", text: "I can review it with you, suggest improvements, or migrate it, for example to AEM EDS." },
        ],
      },
      {
        name: "Where to focus",
        items: [
          { title: "A clear offer", text: "Visitors should understand within seconds what you do, who it is for and why they should choose you." },
          { title: "An obvious next step", text: "Call, WhatsApp, enquire or buy: every page can guide visitors to what to do next." },
          { title: "Proof that builds trust", text: "Case studies, reviews and results help new visitors feel confident about choosing you." },
          { title: "A fast mobile experience", text: "Most visitors arrive on a phone, so speed and clear layouts make a real difference." },
          { title: "Insight into what visitors do", text: "Analytics shows where visitors come from and what they do, so decisions are based on facts." },
          { title: "Easy updating for your team", text: "When your team can update the site themselves, it stays fresh without waiting for a developer." },
        ],
      },
      {
        name: "Growth ideas",
        items: [
          { title: "Capture more enquiries", text: "Clear calls to action, short forms and click-to-chat on WhatsApp make it easy for interested visitors to reach you.", tags: ["Forms", "WhatsApp", "Calls to action"] },
          { title: "Turn visitors into customers", text: "A simple journey, proof of quality and a smooth checkout or booking flow help visitors decide.", tags: ["Trust", "Speed", "Checkout"] },
          { title: "Bring customers back", text: "Offers such as a first-order gift, membership or gifting give people a reason to return, as on the Vaymora store.", tags: ["Offers", "Membership", "Gifting"] },
          { title: "Be found online", text: "Clean structure, good metadata and fast pages help search engines understand and rank your content.", tags: ["SEO", "Structure", "Speed"] },
          { title: "Know what works", text: "Analytics shows which pages and campaigns bring results, so decisions come from data, not guesswork.", tags: ["Google Analytics", "Reports"] },
          { title: "Save your team time", text: "An admin dashboard or easy authoring, plus integrations with the tools you already use, removes manual work.", tags: ["Admin", "Authoring", "Integrations"] },
        ],
      },
      {
        name: "By business",
        items: [
          { title: "Local and service businesses", text: "Show your services and areas clearly, make it easy to request a quote or booking, and keep contact details one tap away.", tags: ["Quote requests", "Clear services", "Mobile-first"] },
          { title: "Online stores", text: "Make products easy to find, remove friction at checkout, and add offers and accounts that encourage repeat purchases.", tags: ["Catalogue", "Checkout", "Accounts"] },
          { title: "Enterprise and content teams", text: "Use reusable components and easy authoring so teams publish quickly and consistently, with speed and accessibility built in.", tags: ["AEM EDS", "Authoring", "Performance"] },
          { title: "Logistics and B2B companies", text: "Explain the service and the process clearly, show credibility, and make it simple for a business buyer to make contact.", tags: ["Credibility", "Clear process", "Enquiries"] },
        ],
      },
    ],
    hue: -25,
  },
  {
    id: "services",
    nav: "Services",
    eyebrow: "What I do for your business",
    title: "Design to launch, end to end",
    desc: "One experienced developer and consultant for the whole journey. Bring your idea, or let's shape it together. I handle design, development, the database connection, hosting and support, so there are no hand-offs and nothing gets lost in translation.",
    points: ["Clear scope, a clear plan and regular updates", "Mobile-first, fast and search-friendly by default", "Database connected and the site hosted for you, end to end"],
    cta: { label: "Start a project", goto: "contact" },
    media: "services",
    services: [
      { title: "Business consulting", text: "Not sure where to start? We look at your goals and customers together and plan a website that helps your business grow.", get: "Your goals · growth ideas · clear next steps" },
      { title: "Design & frontend development", text: "Modern, brand-aligned and accessible interfaces built with React and Next.js.", get: "UI concept · responsive layouts · reusable components" },
      { title: "Full-stack development", text: "APIs, databases, authentication and admin panels that work together.", get: "REST/GraphQL · databases · secure admin" },
      { title: "E-commerce, end to end", text: "Storefront, catalogue, orders and a back-office you can run yourself.", get: "Product & order management · integrations" },
      { title: "AEM EDS delivery", text: "Adobe Edge Delivery Services sites with custom blocks and easy authoring.", get: "Blocks · Universal Editor · migrations" },
      { title: "Database, hosting & support", text: "After building, I connect your database, host the site and keep it fast, with reliable help after launch.", get: "Database setup · hosting · Lighthouse · fixes" },
    ],
    process: ["Discover", "Design", "Build", "Launch", "Support"],
    hue: -20,
  },
  {
    id: "pinisi",
    nav: "PINISI",
    eyebrow: "Education · Contributor platform",
    title: "Ideas grow when shared",
    desc: "PINISI (Pusat Ilmu dan Informasi Bersinergi) is a collaborative space for sharing ideas, teaching practices, and learning resources.",
    points: ["Share ideas and teaching practices", "Showcase contributor-created educational work", "Broaden the impact of learning through collaboration"],
    links: [{ label: "Visit the PINISI site", href: "https://pinisi.digitalgov.id" }],
    media: "frames",
    cards: [{ title: "PINISI", sub: "Pusat Ilmu dan Informasi Bersinergi", href: "https://pinisi.digitalgov.id", image: "/projects/pinisi.webp", ratio: 2.1 }],
    hue: 25,
  },
  {
    id: "lontara",
    nav: "LONTARA",
    eyebrow: "LONTARA · IoT & Robotics Bootcamp 2026",
    title: "Think. Build. Innovate.",
    desc: "A hands-on bootcamp for South Sulawesi vocational students to explore IoT and robotics, build prototypes, and turn ideas into innovation.",
    points: ["Learn through hands-on projects", "Explore IoT, sensors, microcontrollers, and robotics", "Build prototypes that respond to real-world challenges"],
    links: [{ label: "Visit the LONTARA site", href: "https://lontaraiot.digitalgov.id" }],
    media: "frames",
    cards: [{ title: "LONTARA IoT & Robotics Bootcamp", sub: "Digital Government · South Sulawesi", href: "https://lontaraiot.digitalgov.id", image: "/projects/lontara.webp", ratio: 2.1 }],
    hue: 40,
  },
  {
    id: "gameskilu",
    nav: "Gameskilu",
    eyebrow: "gameskilu.com · Gaming platform",
    title: "Gaming News & PC Game Downloads",
    desc: "The latest gaming news, hardware reviews, and safe, verified PC game downloads.",
    points: ["Browse gaming news and hardware reviews", "Explore RPG and FPS game categories", "Find safe, verified PC game downloads"],
    links: [{ label: "Visit gameskilu.com", href: "https://gameskilu.com" }],
    media: "frames",
    cards: [{ title: "gameskilu.com", sub: "Gaming news · Hardware reviews · PC game downloads", href: "https://gameskilu.com", image: "/projects/gameskilu.webp", ratio: 2.1 }],
    hue: 195,
  },
  {
    id: "urlyu",
    nav: "urlyu.com",
    eyebrow: "Link shortener · Bio page platform",
    title: "Shorten long links in seconds.",
    desc: "Create clean, professional links that are easy to share anywhere.",
    points: ["Free link shortening", "Real-time analytics", "Instant QR codes"],
    links: [{ label: "Visit urlyu.com", href: "https://urlyu.com/" }],
    media: "frames",
    cards: [{ title: "urlyu.com", sub: "Short links · Analytics · QR codes", href: "https://urlyu.com/", image: "/projects/urlyu.webp", ratio: 2.1 }],
    hue: 275,
  },
  {
    id: "skills",
    nav: "Skills",
    eyebrow: "Skills & stack",
    title: "The skills behind the results",
    desc: "I choose tools that make websites faster, easier to manage and ready to grow. Explore each category to see how my skills can support your project.",
    points: ["10+ years building frontend experiences", "Led a team of four through planning, code reviews and delivery", "Exploring edge computing with Cloudflare Workers and Adobe App Builder"],
    media: "skills",
    stats: [
      { n: "10+", label: "years experience" },
      { n: "5+", label: "years in government" },
      { n: "4", label: "developers led" },
      { n: "6+", label: "projects delivered" },
    ],
    tabs: [
      {
        name: "Frontend",
        tiles: [
          { name: "React & Next.js", benefit: "Build fast, interactive websites with search visibility in mind." },
          { name: "JavaScript (ES6+)", benefit: "Write clear, maintainable code that is easy to extend." },
          { name: "Redux", benefit: "Manage application state predictably as a product grows." },
          { name: "HTML5, CSS3, SCSS", benefit: "Create accessible pages with consistent styling across devices." },
          { name: "Tailwind CSS", benefit: "Build consistent interfaces quickly without growing stylesheets." },
          { name: "GSAP animation", benefit: "Add purposeful motion and polish without distracting visitors." },
        ],
      },
      {
        name: "Full-stack",
        tiles: [
          { name: "REST APIs", benefit: "Connect your website to other services with clear loading and error handling." },
          { name: "GraphQL", benefit: "Request only the data each page or feature needs." },
          { name: "Database design & connectivity", benefit: "Shape a database around your needs and connect it securely." },
          { name: "File & image storage", benefit: "Upload and manage media through your admin tools." },
          { name: "Admin dashboards", benefit: "Manage products, orders and content without editing code." },
          { name: "Adobe App Builder", benefit: "Automate workflows with event-driven integrations." },
          { name: "Hosting & deployment", benefit: "Deploy your site with reliable hosting and a clear path to launch." },
          { name: "Domain setup", benefit: "Connect your custom domain so visitors can find your site at your web address." },
        ],
      },
      {
        name: "Delivery",
        tiles: [
          { name: "Lighthouse audits", benefit: "Measure website performance and quality with real audits." },
          { name: "Accessibility", benefit: "Create experiences that more people can use." },
          { name: "Code reviews", benefit: "Catch issues early and keep the codebase maintainable." },
          { name: "Agile / Scrum", benefit: "Review progress regularly and adjust priorities as needed." },
          { name: "Go-live checklist", benefit: "Prepare each launch with clear, repeatable checks." },
          { name: "Production support", benefit: "Troubleshoot and resolve issues after release." },
          { name: "Google Analytics & tracking", benefit: "Understand where visitors come from and how they use your site." },
          { name: "SEO fundamentals", benefit: "Use clear page structure and metadata to help search engines understand your content." },
        ],
      },
    ],
    hue: -80,
  },
  {
    id: "insights",
    nav: "Insights",
    eyebrow: "Practical insights for business owners",
    title: "Build with clarity and confidence",
    desc: "Clear, practical guidance on websites, online stores and digital growth. Choose a topic to find ideas you can put to work.",
    points: ["Make technology decisions that fit your business", "Focus on useful steps, not unnecessary complexity", "Advice for business owners and growing teams"],
    cta: { label: "Discuss your project", goto: "contact" },
    media: "insights",
    insights: [
      {
        "cat": "Full-stack",
        "title": "Why choose Next.js for a website or app?",
        "read": "3 min read",
        "summary": "Next.js brings website pages and app features together, helping teams build fast, search-friendly digital products.",
        "bullets": [
          "Pages can be rendered on the server to support fast loading and search visibility.",
          "Website features and APIs can live in one project, reducing handoffs and complexity.",
          "Its broad ecosystem makes it easier to build features such as forms and dashboards."
        ]
      },
      {
        "cat": "Full-stack",
        "title": "Choosing the right database for your project",
        "read": "3 min read",
        "summary": "There is no single best database. The right choice depends on your data, expected traffic and business needs.",
        "bullets": [
          "Relational databases such as Postgres work well when records connect, like products, customers and orders.",
          "Choose a setup that protects your data and leaves room for the business to grow.",
          "One store project pairs managed Postgres with cloud image storage; other projects may need a different approach."
        ]
      },
      {
        "cat": "Full-stack",
        "title": "Give your team control of everyday updates",
        "read": "2 min read",
        "summary": "A clear admin dashboard helps your team manage products and orders without waiting for a developer.",
        "bullets": [
          "Manage products, images and orders in one place.",
          "Role-based access helps keep important actions in the right hands.",
          "Faster routine updates leave more time for improvements that need development."
        ]
      },
      {
        "cat": "Full-stack",
        "title": "Connect your systems with APIs",
        "read": "3 min read",
        "summary": "Well-planned integrations reduce repeated work and help your business systems stay in sync.",
        "bullets": [
          "Clear loading and error messages help people when a connected service is delayed.",
          "APIs can connect forms, customer updates and other business systems.",
          "A well-organized integration layer makes future connections easier to maintain."
        ]
      },
      {
        "cat": "Business",
        "title": "Custom online store or hosted platform?",
        "read": "3 min read",
        "summary": "Hosted platforms are quick to launch. A custom store offers more flexibility when your needs go beyond standard features.",
        "bullets": [
          "Consider a custom store when you need tailored workflows, integrations or an admin built around your team.",
          "Start with the features you need now and add to them as the business grows.",
          "One store project brings the storefront, admin dashboard, database and image storage together."
        ]
      },
      {
        "cat": "Business",
        "title": "Make your website faster and easier to use",
        "read": "2 min read",
        "summary": "A fast, accessible website is easier to use across devices and helps more people reach your services.",
        "bullets": [
          "Measure performance before and after changes with tools such as Lighthouse.",
          "Accessible design makes your content usable for more people.",
          "Clear structure makes future updates easier to deliver."
        ]
      },
      {
        "cat": "Business",
        "title": "Launch your website with confidence",
        "read": "2 min read",
        "summary": "A reliable launch starts with careful checks before the website goes live.",
        "bullets": [
          "Check performance, accessibility, forms and redirects before launch.",
          "Set up and test analytics so you can understand how visitors use the site.",
          "Plan for support after launch so issues can be resolved promptly."
        ]
      },
      {
        "cat": "Business",
        "title": "One partner from the first build to launch",
        "read": "2 min read",
        "summary": "Bringing development, database setup and hosting together can reduce handoffs and make support simpler.",
        "bullets": [
          "Coordinate the design, development, database and hosting as one project.",
          "Keep one point of contact for questions and support.",
          "Resolve issues more directly, without waiting for separate vendors to coordinate."
        ]
      },
      {
        "cat": "Business",
        "title": "Start with your business goals",
        "read": "2 min read",
        "summary": "A useful website starts with what your business needs to achieve—not with colors or layouts.",
        "bullets": [
          "Begin with your customers and the results you want to achieve.",
          "Choose the features and content that support those goals.",
          "Then design each page around a clear purpose."
        ]
      },
      {
        "cat": "Business",
        "title": "Small website improvements that support growth",
        "read": "3 min read",
        "summary": "Practical improvements can make a real difference without requiring a full redesign.",
        "bullets": [
          "Make the next step clear on every page.",
          "Build trust with case studies, reviews and results.",
          "Use visitor data to decide what to improve next."
        ]
      }
    ],
    hue: 15,
  },
  ...(SHOW_PRICING
    ? ([
    {
      id: "pricing",
      nav: "How I work",
      eyebrow: "How I work with you",
      title: "Know what to expect upfront",
      desc: "No surprises. Your estimate depends on four things: the functionality you need, how complex it is, what you can provide, and what I need to do. Pricing is negotiable and shared after a short call.",
      points: [
        "Scope and estimate in writing before I start",
        "Fixed price or hourly, your choice, and prices are negotiable",
        "Based on real projects: two sites in about 7 hours each, a full store in 9 days",
      ],
      links: [{ label: "Open the estimator", href: "/projects#pricing" }],
      media: "pricing",
      hue: 20,
    },
      ] as Section[])
    : []),
  {
    id: "contact",
    nav: "Contact",
    eyebrow: "Let's work together",
    title: "Tell me about your idea or goal",
    desc: "Have an idea or a goal for your business? Share a few details, and I'll reply with practical next steps. You can also call, email or message me on WhatsApp.",
    media: "form",
    hue: -45,
  },
];

/** the sections shown on the home page (the pricing section is only included when SHOW_PRICING is on) */
export const sections: Section[] = allSections;
