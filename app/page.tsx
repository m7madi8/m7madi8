import Image from "next/image";
import profileImage from "../img/me.png";
import CustomCursor from "./components/CustomCursor";
import RevealManager from "./components/RevealManager";
import { projects } from "./data/projects";

export default function Home() {
  const systems = [
    {
      title: "Corporate Websites",
      copy:
        "Clean, modern sites that communicate trust and make content easy to manage.",
    },
    {
      title: "E-Commerce Stores",
      copy:
        "Fast, reliable storefronts built to convert and stay easy to operate.",
    },
    {
      title: "Landing Pages",
      copy:
        "Focused pages that guide decisions with clear structure and strong UX.",
    },
    {
      title: "Full-Stack Delivery",
      copy:
        "From UI to backend logic, built with clarity and long-term reliability.",
    },
  ];

  const portfolioProjects = projects;

  const mindset = [
    "Modern front-end with a focus on clean UI and accessible layouts.",
    "Back-end logic that stays simple, clear, and reliable.",
    "Performance checks built into the workflow, not added later.",
    "Responsive behavior tested across devices and real content.",
    "CMS-ready builds when teams need to update content fast.",
    "Project delivery that stays practical and on scope.",
  ];

  return (
    <div className="bg-[color:var(--background)] text-[color:var(--foreground)]">
      <CustomCursor />
      <RevealManager />
      <main className="relative mx-auto min-h-screen max-w-6xl px-6 pb-28 pt-12 sm:px-10 lg:px-16">
        <header className="flex items-start justify-between text-sm">
          <div className="space-y-2">
            <p className="eyebrow">Mohammad</p>
            <p className="text-xs text-[color:var(--muted)]">
              Full-Stack Web Developer • Freelancer.
            </p>
          </div>
          <nav className="hidden gap-6 text-xs text-[color:var(--muted)] md:flex">
            <a className="transition-colors hover:text-white" href="#identity">
              About
            </a>
            <a className="transition-colors hover:text-white" href="#build">
              Services
            </a>
            <a className="transition-colors hover:text-white" href="#work">
              Work
            </a>
            <a className="transition-colors hover:text-white" href="#mindset">
              Skills
            </a>
            <a className="transition-colors hover:text-white" href="#presence">
              Presence
            </a>
          </nav>
        </header>

        <section
          id="hero"
          className="mt-24 grid gap-12 md:grid-cols-[1.3fr_0.7fr]"
        >
          <div className="space-y-10">
            <p className="eyebrow">Entry</p>
            <h1 className="text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Modern web development for businesses that value quality
              <span className="inline-block animate-[blink_1.4s_ease-in-out_infinite] text-[color:var(--accent)]">
                _
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-[color:var(--muted)]">
              Websites and stores that are clean, fast, and reliable. Built for
              real business goals without unnecessary complexity.
            </p>
            <a
              href="#identity"
              className="inline-flex items-center gap-4 rounded-full border border-[color:var(--border)] px-6 py-3 text-sm uppercase tracking-[0.3em] transition duration-300 hover:border-[color:var(--accent)]"
              data-cursor
            >
              Enter
              <span className="text-[color:var(--accent)]">→</span>
            </a>
          </div>
          <div className="flex flex-col justify-between gap-8 text-sm text-[color:var(--muted)]">
            <div className="hero-tilt">
              <div className="hero-tilt-card space-y-4 rounded-2xl border border-[color:var(--border)] bg-[#0f1012] p-6">
                <p className="eyebrow">Status</p>
                <p className="text-base text-white">
                  Available for new freelance projects.
                </p>
                <p>Focused on clear, modern, and dependable builds.</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="eyebrow">Focus</p>
              <div className="space-y-2 text-xs uppercase tracking-[0.28em]">
                <p>Performance</p>
                <p>Reliability</p>
                <p>Clarity</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-20 glow-divider" />

        <section id="identity" className="mt-24 space-y-12">
          <div className="reveal" data-reveal>
            <p className="eyebrow">About</p>
            <h2 className="section-title mt-6 text-3xl">
              Clean work, clear results.
            </h2>
          </div>
          <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
            <div
              className="reveal space-y-6 text-lg leading-relaxed text-[color:var(--muted)]"
              data-reveal
            >
              <p>
                I’m Mohammad, a freelance full-stack developer. I build websites
                that look modern, load fast, and stay reliable. The process is
                direct: clear goals, clean structure, and careful execution.
              </p>
              <p>
                You get a site that reflects your business, works on every
                device, and stays easy to maintain as you grow.
              </p>
            </div>
            <div
              className="reveal flex flex-col justify-between rounded-2xl border border-[color:var(--border)] bg-[#0f1012] p-8"
              data-reveal
            >
              <p className="eyebrow">Principle</p>

              <p className="text-xl leading-relaxed text-white">
                Clarity builds trust.
              </p>

              {/* Image Wrapper */}
              <div className="relative mt-8 min-h-0 w-full aspect-[4/5] max-h-[70vh] overflow-hidden rounded-2xl border border-[color:var(--border)] md:max-h-none">
                <Image
                  src={profileImage}
                  alt="Mohammad portrait"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 40vw"
                  priority
                />
              </div>
            </div>

          </div>
        </section>

        <div className="mt-20 glow-divider" />

        <section id="build" className="mt-24 space-y-12">
          <div className="reveal" data-reveal>
            <p className="eyebrow">Services</p>
            <h2 className="section-title mt-6 text-3xl">
              What I do.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {systems.map((system) => (
              <div
                key={system.title}
                className="reveal group rounded-2xl border border-[color:var(--border)] bg-[#0f1012] p-7 transition duration-300 hover:border-[color:var(--accent)]"
                data-reveal
              >
                <p className="text-lg font-medium text-white">
                  {system.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
                  <span className="text-[color:var(--accent)]">—</span>{" "}
                  {system.copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-20 glow-divider" />

        <section id="work" className="mt-24 space-y-12">
          <div className="reveal" data-reveal>
            <p className="eyebrow">Selected Work</p>
            <h2 className="section-title mt-6 text-3xl">
              Real projects, real results.
            </h2>
          </div>
          <div className="space-y-8">
            {portfolioProjects.map((project, index) => (
              <details
                key={project.title}
                className="case-details reveal rounded-2xl p-6 sm:p-8"
                data-reveal
                open={index === 0}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-6">
                  <div>
                    <p className="eyebrow">Case File 0{index + 1}</p>
                    <h3 className="mt-4 text-2xl text-white">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-base text-white/80">
                      {project.summary}
                    </p>
                    <p className="mt-2 text-sm text-[color:var(--muted)]">
                      {project.context}
                    </p>
                  </div>
                  <span className="case-indicator text-xl">›</span>
                </summary>
                <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="space-y-5 text-sm text-[color:var(--muted)]">
                    <div>
                      <p className="eyebrow">Goal</p>
                      <p className="mt-2 text-base text-white">
                        {project.goal}
                      </p>
                    </div>
                    <div>
                      <p className="eyebrow">What was built</p>
                      <p className="mt-2">{project.build}</p>
                    </div>
                    <div>
                      <p className="eyebrow">Key work</p>
                      <ul className="mt-3 space-y-2">
                        {project.work.map((item) => (
                          <li key={item}>— {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-base text-white">
                      <span className="eyebrow">Result</span>
                      <p className="mt-2">{project.result}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-6">
                      {project.url ? (
                        <a
                          className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--muted)] transition hover:text-white"
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          data-cursor
                        >
                          Visit site
                        </a>
                      ) : null}
                    </div>
                  </div>
                  <div className="relative flex items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[#14161b] p-6">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`${project.title} preview`}
                        className="h-full w-full rounded-xl border border-[color:var(--border)] object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        priority={index === 0}
                      />
                    ) : (
                      <div className="h-full w-full rounded-xl border border-[color:var(--border)] bg-[#0e0f13] p-6 text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                        Project View
                        <div className="mt-4 h-[60%] rounded-lg border border-[color:var(--border)] bg-[#111318]" />
                      </div>
                    )}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-20 glow-divider" />

        <section id="mindset" className="mt-24 space-y-12">
          <div className="reveal" data-reveal>
            <p className="eyebrow">Skills</p>
            <h2 className="section-title mt-6 text-3xl">
              What I use for client work.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {mindset.map((note) => (
              <div
                key={note}
                className="reveal rounded-2xl border border-[color:var(--border)] bg-[#0f1012] p-6 text-sm text-[color:var(--muted)]"
                data-reveal
              >
                {note}
              </div>
            ))}
          </div>
        </section>

        <div className="mt-20 glow-divider" />

        <section id="presence" className="mt-24 space-y-10">
          <div className="reveal" data-reveal>
            <p className="eyebrow">Contact</p>
            <h2 className="section-title mt-6 text-3xl">
              Available for new projects.
            </h2>
          </div>
          <div className="reveal max-w-2xl text-lg leading-relaxed text-[color:var(--muted)]" data-reveal>
            Let’s build something clean and effective. I take on a limited
            number of projects to keep quality high.
          </div>
          <div className="reveal flex flex-wrap gap-6 text-sm uppercase tracking-[0.3em]" data-reveal>
            <a
              className="rounded-full border border-[color:var(--border)] px-6 py-3 transition hover:border-[color:var(--accent)]"
              href="mailto:hello@studio.systems"
              data-cursor
            >
              Email
            </a>
            <a
              className="rounded-full border border-[color:var(--border)] px-6 py-3 transition hover:border-[color:var(--accent)]"
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              data-cursor
            >
              GitHub
            </a>
            <a
              className="rounded-full border border-[color:var(--border)] px-6 py-3 transition hover:border-[color:var(--accent)]"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              data-cursor
            >
              LinkedIn
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
