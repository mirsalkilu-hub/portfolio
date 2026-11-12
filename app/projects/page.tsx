import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ThemeBolt from "@/components/ThemeBolt";
import { LinkedInIcon, LinkedInLogo } from "@/components/Social";
import ProjectsDial from "@/components/ProjectsDial";
import PricingBlock from "@/components/PricingBlock";
import { sections, PHONE, PHONE_TEL, EMAIL, LINKEDIN } from "@/lib/content";
import { SHOW_PRICING } from "@/lib/flags";
import "./projects.css";

export const metadata: Metadata = SHOW_PRICING
  ? {
      title: "Selected projects & how I work | Mirsal",
      description: "Explore PINISI, LONTARA, Gameskilu and urlyu.com, with a clear way to estimate your own project.",
    }
  : {
      title: "Selected projects | Mirsal",
      description: "Explore PINISI, LONTARA, Gameskilu and urlyu.com from Mirsal's portfolio.",
    };

const featuredProjects = sections.filter((section) => ["pinisi", "lontara", "gameskilu", "urlyu"].includes(section.id));
const dialItems = [
  { id: "top", label: "Overview" },
  ...featuredProjects.map((project) => ({ id: project.id, label: project.nav })),
  ...(SHOW_PRICING ? [{ id: "pricing", label: "How I work" }] : []),
];

export default function ProjectsPage() {
  return (
    <div className="pg">
      <ProjectsDial items={dialItems} />
      <header className="pg-top">
        <div className="logo">
          <ThemeBolt />
          <Link href="/" aria-label="Home">
            kilu
          </Link>
        </div>
        <nav className="pg-nav">
          <a href="#work">Projects</a>
          {SHOW_PRICING && <a href="#pricing">How I work</a>}
          <LinkedInIcon href={LINKEDIN} />
          <Link className="pill" href="/?s=contact">
            Contact
          </Link>
        </nav>
      </header>

      <main className="pg-main">
        {/* hero */}
        <section id="top" className="pg-hero">
          <Link className="back" href="/">
            ← Back to portfolio
          </Link>
          <p className="eyebrow">Selected projects</p>
          <h1 className="title">Digital projects built around people and ideas</h1>
          <p className="lead">
            A selection of my work across digital platforms and web products. My focus is on responsive interfaces, practical features, API and database integrations, and accessible user experiences.
          </p>
          <div className="pg-jump">
            {featuredProjects.map((project) => (
              <a key={project.id} href={`#${project.id}`}>
                {project.nav}
              </a>
            ))}
            {SHOW_PRICING && (
              <a href="#pricing" className="hl">
                How I work &amp; estimator
              </a>
            )}
          </div>
        </section>

        {/* case studies */}
        <div id="work" />
        {featuredProjects.map((project, i) => {
          const card = project.cards?.[0];
          if (!card) return null;
          const href = card.href ?? project.links?.[0]?.href;
          const summary = Array.isArray(project.desc) ? project.desc.join(" ") : project.desc;

          return (
          <article key={project.id} id={project.id} className="case">
            <div className="case-head">
              <span className="case-n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="eyebrow">{project.eyebrow}</p>
                <h2>{project.nav}</h2>
              </div>
            </div>

            <div className="case-grid">
              <div className="case-visual">
                <a className="frame" href={href} target="_blank" rel="noopener noreferrer">
                  <div className="frame-bar">
                    <i />
                    <i />
                    <i />
                    <span>{href?.replace(/^https?:\/\//, "").replace(/\/$/, "").slice(0, 38)}</span>
                  </div>
                  <div className="frame-body" style={card.ratio ? { aspectRatio: card.ratio } : undefined}>
                    {card.image && <Image src={card.image} alt={`${card.title} website`} fill sizes="(max-width:900px) 92vw, 46vw" style={{ objectFit: "cover", objectPosition: "top" }} />}
                  </div>
                  <div className="frame-cap">
                    <div>
                      <h3>{card.title}</h3>
                      <p>{card.sub}</p>
                    </div>
                    <span className="arrow">↗</span>
                  </div>
                </a>
              </div>

              <div className="case-intro">
                <p className="case-sum">{project.title}</p>
                <p className="case-brief">{summary}</p>
              </div>
            </div>

            <div className="case-cols">
              <section>
                <h3>Highlights</h3>
                <div className="glass">
                  <ul>
                    {project.points?.map((point, index) => (
                      <li key={index}>{typeof point === "string" ? point : `${point.label}: ${point.text}`}</li>
                    ))}
                  </ul>
                </div>
              </section>
              <section>
                <h3>Explore the project</h3>
                <div className="glass">
                  <h4>{card.title}</h4>
                  <p>{card.sub}</p>
                  {href && (
                    <a className="btn" href={href} target="_blank" rel="noopener noreferrer">
                      Visit {card.title} <i>↗</i>
                    </a>
                  )}
                </div>
              </section>
            </div>
          </article>
          );
        })}

        {SHOW_PRICING && <PricingBlock />}

        <section className="pg-cta glass">
          <h2>Have a project in mind?</h2>
          <p>Tell me about your idea or goal, and I&apos;ll reply with practical next steps.</p>
          <div className="cta">
            <Link className="btn" href="/?s=contact">
              Contact me <i>→</i>
            </Link>
            <a className="btn ghost" href={`tel:${PHONE_TEL}`}>
              {PHONE}
            </a>
            <a className="btn ghost" href={`mailto:${EMAIL}`}>
              Email
            </a>
            <a className="btn ghost soc-btn" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              <LinkedInLogo /> Instagram
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
