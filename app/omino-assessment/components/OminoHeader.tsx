export default function OminoHeader() {
    return (
      <header className="om-shell flex items-center justify-between py-6 sm:py-8">
        <span className="font-mono text-sm tracking-[0.02em] text-[color:var(--foreground)]">
          OMINO
        </span>
        <span className="om-step-count">تقييم خاص</span>
      </header>
    );
  }