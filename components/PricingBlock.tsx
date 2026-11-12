import Estimator from "@/components/Estimator";
import Faq, { type FaqItem } from "@/components/Faq";
import { hasRate, rateLabel, iNeedFromYou, iDoForYou } from "@/lib/pricing";

const promises = [
  { t: "Scope and estimate in writing", d: "Before I start, you get the scope, the estimate and the timeline in writing, so there are no surprises later." },
  { t: "Updates you can actually see", d: "Preview links and regular check-ins, the same rhythm that worked on NGS Super, with two client calls every week." },
  { t: "Changes handled openly", d: "If requirements change, I explain the effect on time and cost first, and go ahead only when you agree." },
  { t: "Fast and performance-minded", d: "Pages are checked with Lighthouse and for accessibility before launch. Two brochure sites went live in about 7 hours each." },
  { t: "A clean handover", d: "A tested site with the database connected and hosting set up, plus a go-live checklist, with code organised so your team or another developer can carry on." },
  { t: "Business-first advice", d: "Whether you come with an idea or a goal, I focus on what helps your business most, and I will always suggest the option that fits best." },
];

const steps = [
  { t: "Discovery call", d: "We talk through your idea or goals, your customers and any existing systems, so I understand what success looks like for you." },
  { t: "Scope in writing", d: "I confirm what will be built, what you provide and what I do, and send a written estimate for your approval." },
  { t: "Build with previews", d: "I build in stages and share preview links, with regular check-ins for feedback and bug discussions." },
  { t: "Database, hosting and launch", d: "I connect the database, host the site, and test across devices with performance, accessibility and go-live checks before it goes live." },
  { t: "Support after launch", d: "Once the site is live I can fix issues and handle updates, so it keeps running well." },
];

const trust = [
  { n: "5+", l: "years of experience" },
  { n: "6+", l: "projects delivered" },
  { n: "3 yrs", l: "on one enterprise engagement" },
  { n: "100+", l: "API calls integrated" },
];

const faq: FaqItem[] = [
  {
    q: "How do you estimate a project?",
    a: "I look at four things: the functionality you need, how complex it is, what you can provide (designs, content, quick feedback) and what I need to do. The estimate is based on projects I have actually delivered. After a short call I confirm the scope and send a final quote.",
  },
  {
    q: "Fixed price or hourly?",
    a: "Either. A fixed price suits a clear scope, and hourly billing suits work that will keep evolving. Prices are negotiable, and we agree the approach before I start.",
  },
  {
    q: "Can you advise on how my website can help my business grow?",
    a: "Yes. I work as a developer and a consultant. You can come with a clear idea and I will build it, or come with a goal and we will work out together what the website should do. I look at how your business works and what your customers need, then share practical ideas, and we decide together what is worth doing.",
  },
  {
    q: "I already know what I want. Can you just build it?",
    a: "Absolutely. Share your requirements and designs, or let me design it, and I will build it end to end, including the database and hosting.",
  },
  {
    q: "Do you handle the database and hosting too?",
    a: "Yes. I work end to end: after building, I connect the database and host the site, so it goes live ready to use. Tell me what your project needs and I will set up what suits it.",
  },
  {
    q: "What if my requirements change?",
    a: "That is normal. We follow a simple loop: clarify the change, estimate its effect, agree, then build, test and release. I handled change requests like this for two years on an insurance website.",
  },
  {
    q: "What do I need to provide to get started?",
    a: "A short brief or a call is enough. Designs and content are helpful, or I can create them. If anything needs connecting, such as an API, I will need access and documentation. One person who can approve work quickly makes everything faster.",
  },
  {
    q: "Can my team update the content ourselves?",
    a: "For projects that need regular updates, I can build an admin dashboard so your team can manage products, orders or content without editing code.",
  },
  {
    q: "Do you work with remote or international clients?",
    a: "Yes. For example, I delivered the NGS Super website for an Australian client, with two calls every week and preview links in between.",
  },
  {
    q: "Can you work with my existing site or team?",
    a: "Yes. I can review your existing site, improve its responsiveness, accessibility or performance, and collaborate through previews and code reviews.",
  },
  {
    q: "Do you help after launch?",
    a: "Yes. I have supported live sites in production, fixing issues and handling updates. We agree the support arrangement upfront.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on scope. A brochure website took about 7 hours of work, and a full online store took 9 days. After a short call I give you a clear plan for your scope.",
  },
];

/** The pricing + estimator block of the projects page. Only loaded when SHOW_PRICING is true. */
export default function PricingBlock() {
  return (
    <>
      {/* pricing */}
      <section id="pricing" className="pricing">
        <p className="eyebrow">How I work</p>
        <h2 className="title">Know what to expect before we start</h2>
        <p className="lead">
          {hasRate ? (
            <>
              My rate is <strong>{rateLabel()} per hour</strong>, and <strong>prices are negotiable</strong>.
            </>
          ) : (
            <>
              <strong>Prices are negotiable</strong> and shared after a short call about your project.
            </>
          )}{" "}
          You can choose a fixed price or hourly billing. The estimate below depends on four things, and it is calibrated on projects I have actually delivered: two brochure sites in about 7 hours each and a full store in 9 days.
        </p>

        <div className="trust">
          {trust.map((x) => (
            <div key={x.l}>
              <b>{x.n}</b>
              <span>{x.l}</span>
            </div>
          ))}
        </div>

        <div className="drivers">
          <div className="glass">
            <b>01</b>
            <h4>Functionality</h4>
            <p>Every feature (forms, admin, accounts, payments, integrations) adds a known amount of effort.</p>
          </div>
          <div className="glass">
            <b>02</b>
            <h4>Complexity</h4>
            <p>Simple, standard or complex scopes change the effort, because unknowns and integrations take longer.</p>
          </div>
          <div className="glass">
            <b>03</b>
            <h4>What you provide</h4>
            <p>Ready designs, content and fast feedback reduce the effort. If I create them, they are added.</p>
          </div>
          <div className="glass">
            <b>04</b>
            <h4>What I do</h4>
            <p>Design, build, test, deploy and hand over. You see the scope in writing before work starts.</p>
          </div>
        </div>

        <Estimator />

        <div className="split big">
          <div className="glass">
            <h4>What I need from you</h4>
            <ul>
              {iNeedFromYou.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="glass">
            <h4>What I do for you</h4>
            <ul>
              {iDoForYou.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="sub-h">How a project runs</h3>
        <ol className="flow">
          {steps.map((x, i) => (
            <li key={x.t}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              <h4>{x.t}</h4>
              <p>{x.d}</p>
            </li>
          ))}
        </ol>

        <h3 className="sub-h">My promises to you</h3>
        <div className="promises">
          {promises.map((x, i) => (
            <div key={x.t} className="glass">
              <b>{String(i + 1).padStart(2, "0")}</b>
              <h4>{x.t}</h4>
              <p>{x.d}</p>
            </div>
          ))}
        </div>

        <h3 className="sub-h">Common questions</h3>
        <Faq items={faq} />
      </section>
    </>
  );
}
