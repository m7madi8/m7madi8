import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CustomCursor from "../../components/CustomCursor";
import RevealManager from "../../components/RevealManager";
import { projects } from "../../data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-[color:var(--background)] text-[color:var(--foreground)]">
      <CustomCursor />
      <RevealManager />
      <main className="relative mx-auto min-h-screen max-w-5xl px-6 pb-24 pt-12 sm:px-10 lg:px-16">
        <header className="flex items-start justify-between text-sm">
          <div className="space-y-2">
            <p className="eyebrow">Case File</p>
            <p className="text-xs text-[color:var(--muted)]">
              {project.context}
            </p>
          </div>
          <div className="flex items-center gap-6 text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            <Link
              className="transition hover:text-white"
              href="/#work"
              data-cursor
            >
              Back to work
            </Link>
            {project.url ? (
              <a
                className="transition hover:text-white"
                href={project.url}
                target="_blank"
                rel="noreferrer"
                data-cursor
              >
                Visit site
              </a>
            ) : null}
          </div>
        </header>

        <section className="mt-16 space-y-8">
          <div className="reveal" data-reveal>
            <p className="eyebrow">{project.title}</p>
            <h1 className="text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
              {project.overview}
            </h1>
          </div>
          <p
            className="reveal max-w-2xl text-lg leading-relaxed text-[color:var(--muted)]"
            data-reveal
          >
            {project.result}
          </p>
        </section>

        <div className="mt-16 glow-divider" />

        <section className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="reveal space-y-6 text-sm text-[color:var(--muted)]" data-reveal>
            <div>
              <p className="eyebrow">Goal</p>
              <p className="mt-2 text-base text-white">{project.goal}</p>
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
          </div>
          <div
            className="reveal rounded-2xl border border-[color:var(--border)] bg-[#0f1012] p-8"
            data-reveal
          >
            <p className="eyebrow">Outcome</p>
            <p className="mt-4 text-lg text-white">{project.result}</p>
            <div className="mt-8">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="h-56 w-full rounded-xl border border-[color:var(--border)] object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              ) : (
                <div className="h-40 rounded-xl border border-[color:var(--border)] bg-[#14161b]" />
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
