"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { sections, EMAIL, PHONE, PHONE_TEL, whatsappLink, LINKEDIN, LINKEDIN_LABEL, type Section } from "@/lib/content";
import { hasRate, rateLabel, costOf, plans } from "@/lib/pricing";
import { LinkedInIcon, LinkedInLogo } from "./Social";
import { SHOW_PRICING } from "@/lib/flags";
import { Bolt } from "./Bolt";
import ThemeBolt from "./ThemeBolt";

gsap.registerPlugin(Observer);

const STEP = 16; // degrees between markers
const THRESH = 260; // wheel delta needed to "turn the wheel"
const N = sections.length;
const pad = (n: number) => String(n + 1).padStart(2, "0");
const IDX: Record<string, number> = Object.fromEntries(sections.map((s, i) => [s.id, i]));

function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [via, setVia] = useState<"email" | "mailto">("email");
  const [wa, setWa] = useState("");
  const web3 = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  // WhatsApp is only available once the form is filled in: validate, open WhatsApp with the details, and also email them
  function onWhatsApp(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.form;
    if (!form || !form.reportValidity()) return; // shows the browser's "please fill this in" hints
    const d = new FormData(form);
    const text = `Hi Mirsal, I'm ${d.get("name")}. I'd like to discuss a project.\n\n${d.get("message")}\n\nPhone: ${d.get("phone")}\nEmail: ${d.get("email")}`.slice(0, 900);
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer"); // opened straight from the click so it is not blocked
    form.requestSubmit(); // also sends the enquiry by email
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const name = String(d.get("name") || "");
    const email = String(d.get("email") || "");
    const message = String(d.get("message") || "");
    const phone = String(d.get("phone") || "");
    const spam = !!d.get("botcheck");
    const payload = { name, email, phone, message, botcheck: spam ? "1" : "" };

    // a prefilled WhatsApp message the visitor can send to me with one tap
    const waText = `Hi Mirsal, I'm ${name}. I just sent an enquiry from your portfolio.\n\n${message}\n\nPhone: ${phone}\nEmail: ${email}`.slice(0, 900);
    const done = (v: "email" | "mailto") => {
      setVia(v);
      setWa(whatsappLink(waText));
      setState("sent");
    };

    // optional instant WhatsApp alert to me (server route, only active when configured)
    if (!spam) {
      fetch("/api/notify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(() => {});
    }

    setState("sending");

    // 1) preferred: my own SMTP route (email arrives in my inbox, replies go to the visitor)
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) {
        form.reset();
        return done("email");
      }
      if (res.status !== 501 && res.status !== 404) {
        setState("error");
        return;
      }
    } catch {
      /* no server route available (static hosting): fall through */
    }

    // 2) fallback: Web3Forms access key
    if (web3) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ access_key: web3, subject: `Portfolio enquiry from ${name}`, name, email, phone, message, botcheck: spam ? true : "" }),
        });
        const json = await res.json();
        if (json.success) {
          form.reset();
          return done("email");
        }
      } catch {
        /* fall through */
      }
      setState("error");
      return;
    }

    // 3) last resort: open the visitor's mail app, prefilled
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}\n${phone}`);
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Portfolio enquiry from " + name)}&body=${body}`;
    done("mailto");
  }

  if (state === "sent")
    return (
      <div className="form-card form-done">
        <div className="tick">✓</div>
        <h3>{via === "email" ? "Message sent" : "Almost there"}</h3>
        <p>
          {via === "email"
            ? "Thanks for reaching out. I'll reply by email or phone soon."
            : "Your email app should have opened with the message ready to send."}{" "}
          Want a faster reply? Message me on WhatsApp.
        </p>
        <div className="cta">
          <a className="btn wa" href={wa} target="_blank" rel="noopener noreferrer">
            Message on WhatsApp <i>↗</i>
          </a>
          <button className="btn ghost" onClick={() => setState("idle")}>
            Send another
          </button>
        </div>
      </div>
    );

  return (
    <form className="form-card" onSubmit={onSubmit}>
      <div className="row2">
        <label>
          <span>Name</span>
          <input name="name" required placeholder="Your name" autoComplete="name" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" required placeholder="you@company.com" autoComplete="email" />
        </label>
      </div>
      <label>
        <span>Phone / WhatsApp (include country code)</span>
        <input name="phone" type="tel" required placeholder="+62 812 3456 7890" autoComplete="tel" pattern="[0-9+()\-\s]{7,20}" />
      </label>
      <label>
        <span>Project details</span>
        <textarea name="message" required rows={4} placeholder="Tell me what you're building..." />
      </label>
      <input name="botcheck" type="checkbox" className="hp" tabIndex={-1} autoComplete="off" />
      <div className="form-foot">
        <button className="btn" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending..." : "Send message"} <i>→</i>
        </button>
        <button type="button" className="wa-link" onClick={onWhatsApp}>
          or send &amp; continue on WhatsApp
        </button>
        {state === "error" && <em className="err">Couldn&apos;t send. Please email or WhatsApp me directly.</em>}
      </div>
    </form>
  );
}

function Frame({ c, className = "", style }: { c: NonNullable<Section["cards"]>[number]; className?: string; style?: React.CSSProperties }) {
  const host = c.href ? c.href.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";
  return (
    <a className={`frame ${className}`} style={style} href={c.href} target="_blank" rel="noopener noreferrer">
      <div className="frame-bar">
        <i />
        <i />
        <i />
        <span>{host.length > 34 ? host.slice(0, 34) + "…" : host}</span>
      </div>
      <div className="frame-body" style={c.ratio ? { aspectRatio: c.ratio } : undefined}>
        {c.image ? (
          <Image src={c.image} alt={`${c.title} website`} fill sizes="(max-width:860px) 90vw, 40vw" style={{ objectFit: "cover", objectPosition: "top" }} />
        ) : (
          <div className="frame-fallback">
            <b>{c.title}</b>
            <span>{c.sub}</span>
          </div>
        )}
      </div>
      <div className="frame-cap">
        <div>
          <h3>{c.title}</h3>
          <p>{c.sub}</p>
        </div>
        <span className="arrow">↗</span>
      </div>
    </a>
  );
}

/** true on phone-width screens (client only; false while rendering on the server) */
function useMobile() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia("(max-width: 860px)");
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia("(max-width: 860px)").matches,
    () => false
  );
}

/** arrows + dots under a paged group of cards, so cards are always shown whole, never cut off */
function MiniPager({ page, pages, onChange }: { page: number; pages: number; onChange: (n: number) => void }) {
  if (pages < 2) return null;
  return (
    <div className="ins-pager">
      <button onClick={() => onChange(Math.max(0, page - 1))} disabled={page === 0} aria-label="Previous">
        ←
      </button>
      <div className="dots">
        {Array.from({ length: pages }).map((_, n) => (
          <button key={n} className={n === page ? "on" : ""} onClick={() => onChange(n)} aria-label={`Page ${n + 1}`} />
        ))}
      </div>
      <span>
        {page + 1} of {pages}
      </span>
      <button onClick={() => onChange(Math.min(pages - 1, page + 1))} disabled={page === pages - 1} aria-label="Next">
        →
      </button>
    </div>
  );
}

function Services({ s }: { s: Section }) {
  const mobile = useMobile();
  const [page, setPage] = useState(0);
  const all = s.services!;
  const per = mobile ? 2 : all.length;
  const pages = Math.ceil(all.length / per);
  const cur = Math.min(page, pages - 1);
  return (
    <div className="vis vis-services">
      <div className="svc-grid" key={cur}>
        {all.slice(cur * per, cur * per + per).map((v, i) => (
          <div key={v.title} className="svc" tabIndex={0} style={{ ["--d" as string]: `${i * 60}ms` }}>
            <span className="svc-n">{String(cur * per + i + 1).padStart(2, "0")}</span>
            <h3>{v.title}</h3>
            <p>{v.text}</p>
            <em>{v.get}</em>
          </div>
        ))}
      </div>
      <MiniPager page={cur} pages={pages} onChange={setPage} />
      <ol className="process">
        {s.process!.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ol>
    </div>
  );
}

function About({ s }: { s: Section }) {
  const tabs = s.aboutTabs!;
  const mobile = useMobile();
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(0);
  const t = tabs[tab];
  const per = mobile ? 2 : 3;
  const pages = Math.ceil(t.items.length / per);
  const cur = Math.min(page, pages - 1);
  return (
    <div className="vis vis-about">
      <div className="tabs" role="tablist">
        {tabs.map((x, i) => (
          <button
            key={x.name}
            role="tab"
            aria-selected={i === tab}
            className={i === tab ? "on" : ""}
            onClick={() => {
              setTab(i);
              setPage(0);
            }}
          >
            {x.name}
          </button>
        ))}
      </div>
      <ol className={`tl${s.id === "consulting" ? " cards" : ""}`} key={`${tab}-${cur}`}>
        {t.items.slice(cur * per, cur * per + per).map((x, i) => (
          <li key={x.title} style={{ ["--d" as string]: `${i * 70}ms` }}>
            {x.when && <span className="tl-when">{x.when}</span>}
            <h4>
              {x.href ? (
                <a href={x.href} target="_blank" rel="noopener noreferrer">
                  {x.title}
                </a>
              ) : (
                x.title
              )}
            </h4>
            {x.emphasis && <p className="tl-sub"><strong>{x.emphasis}</strong></p>}
            {x.sub && <p className="tl-sub">{x.sub}</p>}
            <p>{x.text}</p>
            {x.tags && (
              <div className="tags">
                {x.tags.map((g) => (
                  <span key={g}>{g}</span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
      <MiniPager page={cur} pages={pages} onChange={setPage} />
    </div>
  );
}

function Skills({ s }: { s: Section }) {
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(0);
  const mobile = useMobile();
  const t = s.tabs![tab];
  const per = mobile ? 2 : t.tiles.length;
  const pages = Math.ceil(t.tiles.length / per);
  const cur = Math.min(page, pages - 1);
  return (
    <div className="vis vis-skills">
      <div className="stats-row">
        {s.stats!.map((x) => (
          <div key={x.label}>
            <b>{x.n}</b>
            <span>{x.label}</span>
          </div>
        ))}
      </div>
      <div className="tabs" role="tablist">
        {s.tabs!.map((x, i) => (
          <button key={x.name} role="tab" aria-selected={i === tab} className={i === tab ? "on" : ""} onClick={() => {
              setTab(i);
              setPage(0);
            }}>
            {x.name}
          </button>
        ))}
      </div>
      <div className="tiles" key={`${tab}-${cur}`}>
        {t.tiles.slice(cur * per, cur * per + per).map((x, i) => (
          <div key={x.name} className="tile" tabIndex={0} style={{ ["--d" as string]: `${i * 50}ms` }}>
            <span className="tile-n">{String(cur * per + i + 1).padStart(2, "0")}</span>
            <h4>{x.name}</h4>
            <p>{x.benefit}</p>
          </div>
        ))}
      </div>
      <MiniPager page={cur} pages={pages} onChange={setPage} />
    </div>
  );
}

function Insights({ s }: { s: Section }) {
  const all = s.insights!;
  const cats = ["All", ...Array.from(new Set(all.map((x) => x.cat)))];
  const [cat, setCat] = useState("All");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(0);
  const [perPage, setPerPage] = useState(4);

  // fewer rows per page on short screens so an opened item always fits
  useEffect(() => {
    const fit = () => setPerPage(window.innerHeight < 780 ? 3 : 4);
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const list = cat === "All" ? all : all.filter((x) => x.cat === cat);
  const pages = Math.max(1, Math.ceil(list.length / perPage));
  const cur = Math.min(page, pages - 1);
  const slice = list.slice(cur * perPage, cur * perPage + perPage);
  const pick = (c: string) => {
    setCat(c);
    setPage(0);
    setOpen(0);
  };
  const go = (n: number) => {
    setPage(n);
    setOpen(0);
  };

  return (
    <div className="vis vis-insights">
      <div className="ins-bar">
        <div className="tabs" role="tablist">
          {cats.map((c) => (
            <button key={c} role="tab" aria-selected={c === cat} className={c === cat ? "on" : ""} onClick={() => pick(c)}>
              {c}
              <sup>{c === "All" ? all.length : all.filter((x) => x.cat === c).length}</sup>
            </button>
          ))}
        </div>
      </div>

      <div className="ins-list" key={cat + cur}>
        {slice.map((x, i) => (
          <div key={x.title} className={`acc ${open === i ? "open" : ""}`} style={{ ["--d" as string]: `${i * 55}ms` }}>
            <button className="acc-h" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="num">{String(cur * perPage + i + 1).padStart(2, "0")}</span>
              <span className="acc-t">
                <b>{x.title}</b>
                <small>
                  <em className={`cat c-${x.cat.replace(/[^a-z]/gi, "").toLowerCase()}`}>{x.cat}</em> · {x.read}
                </small>
              </span>
              <i aria-hidden>+</i>
            </button>
            <div className="acc-b">
              <div>
                <p>{x.summary}</p>
                <ul>
                  {x.bullets.map((bl) => (
                    <li key={bl}>{bl}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pages > 1 && (
        <div className="ins-pager">
          <button onClick={() => go(cur - 1)} disabled={cur === 0} aria-label="Previous page">
            ←
          </button>
          <div className="dots">
            {Array.from({ length: pages }).map((_, n) => (
              <button key={n} className={n === cur ? "on" : ""} onClick={() => go(n)} aria-label={`Page ${n + 1}`} />
            ))}
          </div>
          <span>
            {cur * perPage + 1} to {Math.min(list.length, cur * perPage + perPage)} of {list.length}
          </span>
          <button onClick={() => go(cur + 1)} disabled={cur === pages - 1} aria-label="Next page">
            →
          </button>
        </div>
      )}
    </div>
  );
}

function FrameCarousel({ cards }: { cards: NonNullable<Section["cards"]> }) {
  const [idx, setIdx] = useState(0);
  const n = cards.length;
  const down = useRef<number | null>(null);
  const swiped = useRef(false);
  const go = (i: number) => setIdx(((i % n) + n) % n);
  const short = (t: string) => t.replace(/ (Insurance|Water Transport|Global|Foods)$/, "");

  return (
    <div className="vis fcar">
      {n > 1 && (
        <div className="tabs ftabs" role="tablist">
          {cards.map((c, i) => (
            <button key={c.title} role="tab" aria-selected={i === idx} className={i === idx ? "on" : ""} onClick={() => go(i)}>
              {short(c.title)}
            </button>
          ))}
        </div>
      )}
      <div
        className="fstage"
        onPointerDown={(e) => {
          down.current = e.clientX;
          swiped.current = false;
        }}
        onPointerUp={(e) => {
          const x0 = down.current;
          down.current = null;
          if (x0 === null || n < 2) return;
          const dx = e.clientX - x0;
          if (Math.abs(dx) > 50) {
            swiped.current = true;
            go(idx + (dx < 0 ? 1 : -1));
          }
        }}
        onClickCapture={(e) => {
          if (swiped.current) {
            e.preventDefault();
            e.stopPropagation();
            swiped.current = false;
          }
        }}
      >
        {cards.map((c, i) => (
          <div key={c.title} className={`slide ${i === idx ? "on" : i < idx ? "prev" : "next"}`} aria-hidden={i !== idx} {...(i !== idx ? { inert: true } : {})}>
            <Frame c={c} />
          </div>
        ))}
      </div>
      {cards[idx].cta && cards[idx].href && (
        <a className="btn fvisit" href={cards[idx].href} target="_blank" rel="noopener noreferrer">
          {cards[idx].cta} <i>→</i>
        </a>
      )}
      {n > 1 && (
        <div className="ins-pager fnav">
          <button onClick={() => go(idx - 1)} aria-label="Previous project">
            ←
          </button>
          <div className="dots">
            {cards.map((c, i) => (
              <button key={c.title} className={i === idx ? "on" : ""} onClick={() => go(i)} aria-label={`Show ${c.title}`} />
            ))}
          </div>
          <span>
            {idx + 1} of {n}
          </span>
          <button onClick={() => go(idx + 1)} aria-label="Next project">
            →
          </button>
        </div>
      )}
    </div>
  );
}

function Visual({ s }: { s: Section }) {
  if (s.media === "photo")
    return (
      <div className="vis vis-photo">
        <div className="photo">
          <Image src="/mirsal-profile.webp" alt="Mirsal" fill priority sizes="(max-width:860px) 80vw, 40vw" style={{ objectFit: "cover", objectPosition: "50% 20%" }} />
        </div>
        <div className="chip c1">
          <b>10+</b>
          <span>years building</span>
        </div>
        <div className="chip c2">
          <b>5+</b>
          <span>years in government</span>
        </div>
        <div className="chip c3">
          <Bolt className="h-5 w-5" />
          <span>Next.js · APIs · DB</span>
        </div>
      </div>
    );
  if (s.media === "frames") return <FrameCarousel cards={s.cards!} />;
  if (s.media === "services") return <Services s={s} />;
  if (SHOW_PRICING && s.media === "pricing")
    return (
      <div className="vis vis-pricing">
        <div className="rate">
          {hasRate ? (
            <>
              <span>Hourly rate</span>
              <b>{rateLabel()}</b>
              <small>per hour, fixed-price quotes available, prices negotiable</small>
            </>
          ) : (
            <>
              <span>My promise</span>
              <b>No surprises</b>
              <small>Scope and estimate in writing before I start. Fixed price or hourly, and prices are negotiable.</small>
            </>
          )}
        </div>
        <div className="plans">
          {plans.map((p) => (
            <Link key={p.name} className="plan" href="/projects#pricing">
              <div>
                <h4>{p.name}</h4>
                <p>{p.blurb}</p>
              </div>
              <div className="plan-p">
                <small>{hasRate ? "from" : "best for"}</small>
                <b>{hasRate ? costOf(p.hours) : p.bestFor}</b>
                <em>{hasRate ? p.bestFor : "tailored to your needs"}</em>
              </div>
            </Link>
          ))}
        </div>
        <p className="plans-note">Starting points only, and the price is negotiable. Open the estimator to add functionality, complexity and what you can provide for your own scope.</p>
      </div>
    );
  if (s.media === "about") return <About s={s} />;
  if (s.media === "skills") return <Skills s={s} />;
  if (s.media === "insights") return <Insights s={s} />;
  return (
    <div className="vis vis-form">
      <ContactForm />
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState(0);
  const cur = useRef(0);
  const busy = useRef(false);
  const charge = useRef(0);
  const lastInput = useRef(0);
  const mobile = useRef(false);
  const scrollPart = useRef(0); // 0 to 1: how far the visitor has scrolled through the current section (phones)
  const dialRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const panels = useRef<(HTMLElement | null)[]>([]);

  const goTo = useCallback((next: number) => {
    if (busy.current || next < 0 || next >= N || next === cur.current) return;
    busy.current = true;
    charge.current = 0;
    scrollPart.current = 0;
    const prev = cur.current;
    const dir = next > prev ? 1 : -1;
    const dist = Math.abs(next - prev);
    const out = panels.current[prev]!;
    const inn = panels.current[next]!;
    const dur = 1.1 + 0.25 * dist;

    const tl = gsap.timeline({
      onComplete: () => {
        busy.current = false;
      },
    });
    tl.to(previewRef.current, { rotation: 0, duration: 0.4, ease: "power2.out" }, 0)
      .to(out, { y: 0, duration: 0.3 }, 0)
      .to(dialRef.current, { rotation: next * STEP, duration: dur, ease: "power3.inOut" }, 0)
      .to(blobRef.current, { filter: `hue-rotate(${sections[next].hue}deg)`, scale: 1 + 0.06 * (next % 3), duration: dur, ease: "power3.inOut" }, 0)
      .to(out.querySelectorAll("[data-a]"), { opacity: 0, y: -36 * dir, filter: "blur(6px)", duration: 0.45, stagger: 0.04, ease: "power2.in" }, 0)
      .set(out, { autoAlpha: 0 }, 0.6)
      .call(
        () => {
          cur.current = next;
          setActive(next);
        },
        undefined,
        0.55
      )
      .set(inn, { autoAlpha: 1, y: 0 }, 0.6)
      .call(
        () => {
          inn.scrollTop = 0;
        },
        undefined,
        0.6
      )
      .fromTo(
        inn.querySelectorAll("[data-a]"),
        { opacity: 0, y: 48 * dir, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.09, ease: "power3.out" },
        0.62
      );
  }, []);

  useLayoutEffect(() => {
    // deep link: /?s=3 opens section 3 directly
    if (new URLSearchParams(window.location.search).has("fast")) gsap.globalTimeline.timeScale(40);
    const raw = new URLSearchParams(window.location.search).get("s") || "1";
    const q = /^\d+$/.test(raw) ? parseInt(raw, 10) - 1 : (IDX[raw] ?? 0);
    const start = q > 0 && q < N ? q : 0;
    if (start > 0) {
      cur.current = start;
      // deep link: jump straight to the requested section on first paint
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(start);
      gsap.set(panels.current[0], { autoAlpha: 0 });
      gsap.set(panels.current[start], { autoAlpha: 1 });
      gsap.set(blobRef.current, { filter: `hue-rotate(${sections[start].hue}deg)` });
    }
    const first = panels.current[start];
    if (!first) return;
    gsap.fromTo(first.querySelectorAll("[data-a]"), { opacity: 0, y: 40, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.2 });
    gsap.fromTo(dialRef.current, { rotation: start * STEP - 35 }, { rotation: start * STEP, duration: 1.8, ease: "power3.out" });
    gsap.to(".blob i", { rotation: "+=360", duration: 80, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    let obs: Observer | undefined;
    const mount = () => {
      obs?.kill();
      mobile.current = mq.matches;
      obs = mq.matches
        ? // phones: swipe left/right to change section; vertical drags scroll the section normally
          Observer.create({
            type: "touch",
            lockAxis: true,
            tolerance: 50,
            preventDefault: false,
            ignore: "input,textarea,select,.tabs,.ins-pager,.process,.svc-grid,.tiles,.fstage",
            onLeft: () => goTo(cur.current + 1),
            onRight: () => goTo(cur.current - 1),
          })
        : Observer.create({
            type: "wheel,touch,pointer",
            wheelSpeed: -1,
            tolerance: 6,
            preventDefault: true,
            ignore: "a,button,input,textarea,label,.fstage",
            onUp: (self) => {
              if (busy.current) return;
              charge.current += Math.min(Math.abs(self.deltaY), 120) / THRESH;
              lastInput.current = performance.now();
            },
            onDown: (self) => {
              if (busy.current) return;
              charge.current -= Math.min(Math.abs(self.deltaY), 120) / THRESH;
              lastInput.current = performance.now();
            },
          });
    };
    mount();
    mq.addEventListener("change", mount);

    // the "steering wheel": charge builds resistance, tilts the dial, springs back if released
    const tick = () => {
      if (busy.current) return;
      const now = performance.now();
      if (!touching && now - lastInput.current > 140) charge.current *= 0.9;
      if (Math.abs(charge.current) < 0.002) charge.current = 0;
      const c = charge.current;
      if (c >= 1 && cur.current < N - 1) goTo(cur.current + 1);
      else if (c <= -1 && cur.current > 0) goTo(cur.current - 1);
      else {
        const atEdge = (c > 0 && cur.current === N - 1) || (c < 0 && cur.current === 0);
        const eff = Math.max(-1, Math.min(1, atEdge ? c * 0.3 : c));
        // on phones the dial also creeps slowly toward the next marker while you scroll through a section
        const creep = mobile.current ? scrollPart.current * 0.3 : 0;
        gsap.to(previewRef.current, { rotation: (creep + eff * 0.4) * STEP, duration: 0.35, ease: "power2.out", overwrite: "auto" });
        const p = panels.current[cur.current];
        if (p && !mobile.current) gsap.to(p, { y: eff * -18, duration: 0.35, ease: "power2.out", overwrite: "auto" });
      }
    };
    gsap.ticker.add(tick);

    // phones: native scrolling inside a section; pulling past its end (or start) turns the dial to the next (or previous) section
    const PULL = 110; // px of extra drag needed
    let touching = false;
    let ty = 0;
    const atEnds = () => {
      const el = panels.current[cur.current];
      if (!el) return { top: true, bottom: true };
      return { top: el.scrollTop <= 1, bottom: el.scrollTop + el.clientHeight >= el.scrollHeight - 2 };
    };
    const overscroll = (move: number) => {
      // move > 0 means scrolling down; only counts once the content cannot scroll any further
      const { top, bottom } = atEnds();
      if ((bottom && move > 0) || (top && move < 0)) charge.current += move / PULL;
      else charge.current *= 0.5;
      lastInput.current = performance.now();
    };
    const inContent = (t: EventTarget | null) => !!(t as HTMLElement | null)?.closest?.(".content");
    const onTouchStart = (e: TouchEvent) => {
      if (!mobile.current || !inContent(e.target)) return;
      touching = true;
      ty = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!mobile.current || !touching || busy.current) return;
      const y = e.touches[0].clientY;
      overscroll(ty - y);
      ty = y;
    };
    const onTouchEnd = () => {
      touching = false;
    };
    const onWheel = (e: WheelEvent) => {
      if (!mobile.current || busy.current || !inContent(e.target)) return;
      overscroll(Math.max(-120, Math.min(120, e.deltaY)) * 0.8);
    };
    const onScrollCapture = (e: Event) => {
      const el = e.target as HTMLElement;
      if (!mobile.current || el !== panels.current[cur.current]) return;
      const max = el.scrollHeight - el.clientHeight;
      scrollPart.current = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0;
    };
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("touchcancel", onTouchEnd, { passive: true });
    document.addEventListener("wheel", onWheel, { passive: true });
    document.addEventListener("scroll", onScrollCapture, true);

    const key = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && ["INPUT", "TEXTAREA"].includes(t.tagName)) return;
      if (["ArrowDown", "ArrowRight", "PageDown"].includes(e.key)) goTo(cur.current + 1);
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) goTo(cur.current - 1);
    };
    window.addEventListener("keydown", key);
    return () => {
      obs?.kill();
      mq.removeEventListener("change", mount);
      gsap.ticker.remove(tick);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("touchcancel", onTouchEnd);
      document.removeEventListener("wheel", onWheel);
      document.removeEventListener("scroll", onScrollCapture, true);
      window.removeEventListener("keydown", key);
    };
  }, [goTo]);

  return (
    <main className="stage">
      <header className="top">
        <div className="logo">
          <ThemeBolt />
          <button onClick={() => goTo(0)} aria-label="Home">
            kilu
          </button>
        </div>
        <nav className="top-right">
          <span className="hide-sm">Mirsal</span>
          <Link className="navlink" href="/projects">
            Projects
          </Link>
          <LinkedInIcon href={LINKEDIN} />
          <button className="pill" onClick={() => goTo(IDX.contact)}>
            Contact
          </button>
        </nav>
      </header>

      <div className="grid-dots" aria-hidden />
      <div className="orb a" aria-hidden />
      <div className="orb b" aria-hidden />
      <div className="bignum" key={active} aria-hidden>
        {pad(active)}
      </div>

      <div className="blob-wrap" aria-hidden>
        <div className="blob" ref={blobRef}>
          {Array.from({ length: 9 }).map((_, i) => (
            <i key={i} style={{ ["--i" as string]: i }} />
          ))}
        </div>
      </div>

      <div className="dial-anchor">
        <div className="dial-preview" ref={previewRef}>
          <div className="dial" ref={dialRef}>
            <div className="ring" />
            {sections.map((s, i) => (
              <button
                key={s.id}
                className={`marker ${i === active ? "on" : ""}`}
                style={{ transform: `rotate(${180 - i * STEP}deg) translateX(var(--R))` }}
                onClick={() => goTo(i)}
                aria-label={`Go to ${s.id}`}
              >
                <b />
                <span>{pad(i)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="content">
        {sections.map((s, i) => (
          <section
            key={s.id}
            ref={(el) => {
              panels.current[i] = el;
            }}
            className="panel"
            style={i === 0 ? undefined : { visibility: "hidden", opacity: 0 }}
            aria-hidden={i !== active}
            {...(i !== active ? { inert: true } : {})}
          >
            <div className="col-l">
              <p data-a className="eyebrow">
                {s.eyebrow}
              </p>
              <h1 data-a className="title">
                {s.title}
              </h1>
              <div data-a className="desc">
                {(Array.isArray(s.desc) ? s.desc : [s.desc]).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              {s.pointsHeading && <h2 data-a className="points-heading">{s.pointsHeading}</h2>}
              {s.points && (
                <ul data-a className="points">
                  {s.points.map((p) => (
                    <li key={typeof p === "string" ? p : p.label}>
                      {typeof p === "string" ? p : <><strong>{p.label}:</strong> {p.text}</>}
                    </li>
                  ))}
                </ul>
              )}
              {s.media === "form" && (
                <ul data-a className="points links">
                  <li>
                    Call: <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>
                  </li>
                  <li>
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  </li>
                  <li>
                    <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                      <LinkedInLogo className="in-ico" />
                      {LINKEDIN_LABEL}
                    </a>
                  </li>
                  <li>Makassar, Indonesia</li>
                </ul>
              )}
              {(s.id === "intro" || s.cta || s.links) && (
                <div data-a className="cta">
                  {s.id === "intro" && (
                    <>
                      <Link className="btn" href="/projects">
                        View my work <i>→</i>
                      </Link>
                      <button className="btn ghost" onClick={() => goTo(IDX.contact)}>
                        Contact me
                      </button>
                      <a className="btn ghost soc-btn" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                        <LinkedInLogo /> Instagram
                      </a>
                    </>
                  )}
                  {s.links?.map((l) => (
                    <Link key={l.href} className="btn" href={l.href}>
                      {l.label} <i>→</i>
                    </Link>
                  ))}
                  {s.cta && (
                    <button className="btn" onClick={() => goTo(IDX[s.cta!.goto])}>
                      {s.cta.label} <i>→</i>
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="col-r" data-a>
              <Visual s={s} />
            </div>
          </section>
        ))}
      </div>

      <footer className="bottom">
        <span className="count">
          {pad(active)} <em>/ {pad(N - 1)}</em>
          <span className="cname" key={active}>
            {sections[active].nav}
          </span>
        </span>
        <span className="hint">Scroll, swipe or use arrow keys to rotate</span>
        <div className="pager">
          <button onClick={() => goTo(cur.current - 1)} disabled={active === 0} aria-label="Previous section">
            ←
          </button>
          <button onClick={() => goTo(cur.current + 1)} disabled={active === N - 1} aria-label="Next section">
            →
          </button>
        </div>
      </footer>
    </main>
  );
}
