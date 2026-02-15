import Image from "next/image";
import profileImage from "../img/me.png";
import logoMe from "../img/logo-me.png";
import logo99 from "../img/99logo2.png";
import logoSamar from "../img/samar-logo.png";
import logoWolve from "../img/wolve_store.png";
import logoChuckeese from "../img/chuckeese-logo.png";
import logoMarkiz from "../img/markiz-logo.png";
import logoRawan from "../img/rawan-logo.png";
import logoLayali from "../img/layali-logo.png";
import logoNana from "../img/nana's-logo.webp";
import ContactForm from "./components/ContactForm";
import CustomCursor from "./components/CustomCursor";
import LiquidEther from "./components/LiquidEther";
import RevealManager from "./components/RevealManager";
import StaggeredMenu from "./components/StaggeredMenu";
import { projects } from "./data/projects";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home", link: "#" },
  { label: "Projects", ariaLabel: "View projects", link: "#work" },
  { label: "Contact", ariaLabel: "Get in touch", link: "#contact" },
];

const socialItems = [
  { label: "WhatsApp", link: "https://wa.me/972592132438" },
  { label: "Instagram", link: "https://www.instagram.com/m7madi8/" },
];
export default function Home() {
  const services = [
    {
      title: "Branding",
      copy:
        "Visual identity and design systems that stand out and stay consistent across every touchpoint.",
      href: "#work",
    },
    {
      title: "3D Modeling",
      copy:
        "Photorealistic renders and 3D experiences that bring products and spaces to life.",
      href: "#work",
    },
  ];

  const processSteps = [
    { step: "01", title: "Discovery", copy: "I analyze business goals and technical requirements." },
    { step: "02", title: "Architecture", copy: "I design scalable system structures and database logic." },
    { step: "03", title: "Development", copy: "I build clean, maintainable, and high-performance code." },
    { step: "04", title: "Launch", copy: "I test, optimize, and deploy reliable digital products." },
  ];

  const portfolioProjects = projects;

  const brandLogos: { type: "image"; src: typeof logo99; alt: string }[] = [
    { type: "image", src: logo99, alt: "99" },
    { type: "image", src: logoSamar, alt: "Samar" },
    { type: "image", src: logoWolve, alt: "Wolve Store" },
    { type: "image", src: logoChuckeese, alt: "Chuckeese" },
    { type: "image", src: logoMarkiz, alt: "Markiz" },
    { type: "image", src: logoRawan, alt: "Rawan" },
    { type: "image", src: logoLayali, alt: "Layali" },
    { type: "image", src: logoNana, alt: "Nana's" },
  ];

  return (
    <div className="overflow-x-hidden bg-[color:var(--background)] text-[color:var(--foreground)]">
      <CustomCursor />
      <RevealManager />
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering
        logoUrl={logoMe.src}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen
        colors={["#08090a", "#1f2126", "#6b7280"]}
        accentColor="var(--button-border)"
        isFixed={true}
        closeOnClickAway
      />

      {/* الشاشة الأولى: 100vh على الأقل مع الهيدر والهيرو واللوجوهات ظاهرة */}
      <div className="relative min-h-screen w-full">
        <div className="absolute inset-0 z-0 min-h-screen">
          <LiquidEther
            colors={["#08090a", "#6b7280", "#f5f5f4"]}
            mouseForce={20}
            cursorSize={100}
            isViscous
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            color0="#08090a"
            color1="#6b7280"
            color2="#e8e6ef"
            className="h-full w-full"
            style={{ position: "absolute", inset: 0 }}
          />
        </div>
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 pt-8 sm:px-10 lg:px-16">
          {/* Hero – على الشاشات الكبيرة يملأ الصفحة فلا تظهر اللوجوهات حتى التمرير */}
          <section className="relative mt-6 flex min-h-[75vh] flex-col items-center justify-center text-center md:mt-10 md:min-h-[80vh] lg:mt-8 lg:min-h-[85vh]">
            <div className="relative max-w-3xl lg:-mt-10">
              <div className="hero-pill reveal" data-reveal>
                <span className="hero-pill-dot" aria-hidden />
                Web Developer
              </div>
              <h1 className="hero-title reveal text-4xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl" data-reveal>
                Silent Code.
                <br />
                Massive Impact.
              </h1>
              <p className="reveal mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--muted)]" data-reveal>
                I engineer modern, high-performance web systems built to scale.
              </p>
              <div className="mt-10 flex w-full flex-col items-center">
                <div className="reveal flex w-full flex-wrap items-center justify-center gap-4 sm:gap-6 px-3 sm:px-0" data-reveal>
                  <a href="#contact" className="hero-btn" data-cursor>
                    Let&apos;s Build Something Great
                  </a>
                  <a href="#work" className="hero-btn" data-cursor>
                    See The Proof
                  </a>
                </div>

              </div>
            </div>
          </section>

          {/* شريط اللوجوهات – فل العرض، على الشاشات الكبيرة يظهر أسفل قليلاً */}
          <section className="logos-marquee relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-hidden py-4 lg:mt-24" aria-hidden>
            <div className="logos-marquee-inner flex w-max items-center gap-12 px-6 sm:gap-16 sm:px-10 lg:gap-20 lg:px-16">
              {[...brandLogos, ...brandLogos].map((item, i) => (
                <span key={`img-${i}`} className="logos-marquee-item relative h-8 w-auto shrink-0 sm:h-10">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={120}
                    height={40}
                    className="h-full w-auto object-contain opacity-80"
                    loading="lazy"
                  />
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

      <main className="relative mx-auto min-h-screen max-w-7xl px-6 pb-8 pt-8 sm:px-10 lg:px-16">
        {/* Project showcase – 3D cards */}
        <section className="mt-28" aria-label="Featured projects">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioProjects.slice(0, 3).map((project, index) => (
              <div
                key={project.slug}
                className="perspective-3d reveal group"
                data-reveal
              >
                <div className="card-3d rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-elevated)] overflow-hidden">
                  <a href={`#work`} className="block">
                    <div className={`image-3d-wrap aspect-[4/3] relative p-4 ${index === 0 ? "bg-[color:var(--surface)]" : ""}`}>
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className={index === 0 ? "object-contain" : "object-cover"}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[color:var(--surface)] flex items-center justify-center text-[color:var(--muted)] text-sm uppercase tracking-widest">
                          {project.title}
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="eyebrow">Project 0{index + 1}</p>
                      <h3 className="mt-2 text-lg font-medium text-white">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm text-[color:var(--muted)]">
                        {project.context}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services – Craft exceptional experiences (hidden) */}
        <section id="about" className="mt-32 space-y-16 hidden" aria-hidden="true">
          <div className="reveal max-w-2xl" data-reveal>
            <h2 className="section-title text-3xl font-medium tracking-tight sm:text-4xl">
              Craft exceptional experiences that captivate.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[color:var(--muted)]">
              From web design and branding to 3D visualization, we bring clarity and impact to every project.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="reveal group rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 transition hover:border-[color:var(--accent)]"
                data-reveal
              >
                <h3 className="text-xl font-medium text-white">
                  {service.title}
                </h3>
                <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
                  {service.copy}
                </p>
                <a
                  href={service.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--accent)] transition hover:opacity-80"
                  data-cursor
                >
                  Learn more
                  <span aria-hidden>→</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Second project row – 3D feel (hidden: About + Selected cards) */}
        <section className="mt-32 hidden" aria-label="More work" aria-hidden="true">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="reveal perspective-3d" data-reveal>
              <div className="card-3d rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-elevated)] overflow-hidden">
                <div className="image-3d-wrap aspect-[5/4] relative">
                  <Image
                    src={profileImage}
                    alt="Portrait"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <p className="eyebrow">About</p>
                  <p className="mt-2 text-white">
                    Clean work, clear results. Focused on performance and clarity.
                  </p>
                </div>
              </div>
            </div>
            <div className="reveal perspective-3d" data-reveal>
              <div className="card-3d rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-elevated)] overflow-hidden">
                <div className="image-3d-wrap aspect-[5/4] relative bg-[color:var(--surface)]">
                  {portfolioProjects[0]?.image && (
                    <Image
                      src={portfolioProjects[0].image}
                      alt={portfolioProjects[0].title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="p-6">
                  <p className="eyebrow">Selected</p>
                  <p className="mt-2 text-white">
                    {portfolioProjects[0]?.title} — {portfolioProjects[0]?.context}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA – Let's build your next big thing */}
        <section className="mt-32 text-center">
          <div className="reveal rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] px-8 py-20 sm:px-16" data-reveal>
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
              Let&apos;s build your next big thing.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-[color:var(--muted)]">
              From idea to launch — we keep the process clear and the quality high.
            </p>
            <a
              href="#contact"
              className="btn-primary mt-10 px-8 py-4"
              data-cursor
            >
              Contact Us
            </a>
          </div>
        </section>

        {/* Process */}
        <section className="mt-32">
          <div className="reveal" data-reveal>
            <p className="eyebrow">How we work</p>
            <h2 className="section-title mt-4 text-3xl font-medium sm:text-4xl">
              Our process
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="reveal rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8"
                data-reveal
              >
                <span className="eyebrow">{item.step}</span>
                <h3 className="mt-4 text-xl font-medium text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Work – detailed projects */}
        <section id="work" className="mt-32 space-y-12">
          <div className="reveal" data-reveal>
            <p className="eyebrow">Selected Work</p>
            <h2 className="section-title mt-4 text-3xl font-medium sm:text-4xl">
              Real projects, real results.
            </h2>
          </div>
          <div className="space-y-12">
            {portfolioProjects.map((project, index) => (
              <article
                key={project.slug}
                className="reveal grid gap-10 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10"
                data-reveal
              >
                <div className="space-y-6">
                  <div>
                    <p className="eyebrow">Case 0{index + 1}</p>
                    <h3 className="mt-3 text-2xl font-medium text-white">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-[color:var(--muted)]">
                      {project.summary}
                    </p>
                    <p className="text-sm text-[color:var(--muted)]">
                      {project.context}
                    </p>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="eyebrow">Goal</p>
                      <p className="mt-1 text-white">{project.goal}</p>
                    </div>
                    <div>
                      <p className="eyebrow">Result</p>
                      <p className="mt-1 text-white">{project.result}</p>
                    </div>
                  </div>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--accent)] transition hover:opacity-80"
                      data-cursor
                    >
                      Visit site
                      <span aria-hidden>→</span>
                    </a>
                  )}
                </div>
                <div className="perspective-3d">
                  <div className="card-3d overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-elevated)]">
                    <div className="image-3d-wrap aspect-video relative">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={`${project.title} preview`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 45vw"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[color:var(--muted)] text-xs uppercase tracking-widest">
                          {project.title}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-32 space-y-10">
          <div className="reveal" data-reveal>
            <p className="eyebrow">Contact</p>
            <h2 className="section-title mt-4 text-3xl font-medium sm:text-4xl">
              Available for new projects.
            </h2>
          </div>
          <div className="reveal max-w-2xl text-lg leading-relaxed text-[color:var(--muted)]" data-reveal>
            Let&apos;s build something clean and effective. I take on a limited number of projects to keep quality high.
          </div>
          <div className="space-y-8">
            <ContactForm />
            <div className="reveal flex flex-wrap gap-4 text-sm uppercase tracking-[0.2em]" data-reveal>
              <a
                className="btn-primary px-6 py-3"
                href="https://www.instagram.com/m7madi8/"
                target="_blank"
                rel="noreferrer"
                data-cursor
              >
                Instagram
              </a>
              <a
                className="btn-primary px-6 py-3"
                href="https://wa.me/972592132438"
                target="_blank"
                rel="noreferrer"
                data-cursor
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 border-t border-[color:var(--border)] pt-10 text-center text-xs text-[color:var(--muted)]">
          <p>© {new Date().getFullYear()} Mohammad Hroub. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
