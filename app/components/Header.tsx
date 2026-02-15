"use client";

import { useState, useCallback, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#", num: "01" },
  { label: "Projects", href: "#work", num: "02" },
  { label: "About", href: "#about", num: "03" },
  { label: "Contact", href: "#contact", num: "04" },
];

const MENU_EXIT_MS = 320;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [backdropVisible, setBackdropVisible] = useState(false);

  const closeMenu = useCallback(() => {
    setClosing(true);
    const t = setTimeout(() => {
      setMenuOpen(false);
      setClosing(false);
      setBackdropVisible(false);
    }, MENU_EXIT_MS);
    return () => clearTimeout(t);
  }, []);

  const openMenu = () => {
    setClosing(false);
    setBackdropVisible(false);
    setMenuOpen(true);
  };

  const toggleMenu = () => (menuOpen ? closeMenu() : openMenu());

  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
    document.addEventListener("keydown", onEscape);
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => setBackdropVisible(true));
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
      cancelAnimationFrame(raf);
    };
  }, [menuOpen, closeMenu]);

  return (
    <header className="relative flex items-center justify-between text-sm">
      <a href="#" className="text-lg font-medium tracking-tight text-white">
        Mohammad
      </a>

      <div className="md:hidden">
        <button
          type="button"
          className="menu-trigger flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl text-white transition-colors hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-white/20"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-0.5 w-5 bg-current transition-all duration-200 ease-out ${menuOpen ? "translate-y-1 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-current transition-all duration-200 ease-out ${menuOpen ? "scale-x-0 opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-current transition-all duration-200 ease-out ${menuOpen ? "-translate-y-1 -rotate-45" : ""}`}
          />
        </button>

        {menuOpen && (
          <div
            className="fixed inset-0 z-[100] md:hidden"
            aria-hidden
            onClick={closeMenu}
          >
            {/* Backdrop – ظهور ناعم */}
            <div
              className={`menu-backdrop absolute inset-0 bg-black/55 backdrop-blur-sm md:hidden ${closing ? "menu-backdrop-closing" : backdropVisible ? "menu-backdrop-visible" : ""}`}
            />
            {/* Panel – انزلاق من اليمين مع تأثير واضح */}
            <nav
              className={`menu-panel absolute right-0 top-0 h-full w-[min(18rem,92vw)] max-[500px]:w-[min(14rem,88vw)] border-l border-[color:var(--border)] bg-[color:var(--background)]/95 shadow-[-8px_0_32px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:w-[min(20rem,88vw)] ${closing ? "menu-panel-closing" : "menu-panel-entering"}`}
              aria-label="Main navigation"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute right-3 top-3 flex items-center justify-end max-[500px]:right-2 max-[500px]:top-2 sm:right-4 sm:top-6">
                <button
                  type="button"
                  onClick={closeMenu}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[color:var(--muted)] transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20 max-[500px]:h-7 max-[500px]:w-7 sm:h-10 sm:w-10 sm:rounded-xl"
                  aria-label="Close menu"
                >
                  <svg className="h-3.5 w-3.5 max-[500px]:h-3 max-[500px]:w-3 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex h-full flex-col overflow-hidden pt-10 px-2.5 pb-3 min-[501px]:overflow-y-auto min-[501px]:pt-16 min-[501px]:px-4 min-[501px]:pb-6 sm:pt-20 sm:px-6 sm:pb-8">
                <p className="mb-2 font-mono text-[6px] uppercase tracking-[0.3em] text-[color:var(--muted)] min-[501px]:mb-4 min-[501px]:text-[8px] sm:mb-5 sm:text-[9px]">
                  Menu
                </p>
                <ul className="flex flex-col gap-0 min-[501px]:gap-0.5">
                  {navLinks.map((link, i) => (
                    <li
                      key={link.href}
                      className="menu-item opacity-0"
                      style={{
                        animation: closing ? "none" : "menuItemIn 0.45s cubic-bezier(0.32, 0.72, 0, 1) forwards",
                        animationDelay: closing ? "0ms" : `${120 + i * 55}ms`,
                      }}
                    >
                      <a
                        href={link.href}
                        className="menu-link group flex items-center gap-1.5 py-1 text-[10px] font-medium tracking-tight text-[color:var(--foreground)] transition-colors hover:text-white min-[501px]:gap-2.5 min-[501px]:py-2 min-[501px]:text-[12px] sm:gap-3 sm:py-2.5 sm:text-[13px]"
                        onClick={closeMenu}
                      >
                        <span className="menu-link-num font-mono text-[7px] text-[color:var(--muted)] tabular-nums transition-colors group-hover:text-white/70 min-[501px]:text-[9px] sm:text-[10px]">
                          {link.num}
                        </span>
                        <span className="menu-link-label relative">
                          {link.label}
                          <span className="menu-link-line absolute bottom-0 left-0 h-px w-0 bg-white transition-[width] duration-300 ease-out group-hover:w-full" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto shrink-0 pt-2 border-t border-[color:var(--border)] min-[501px]:pt-4 min-[501px]:text-[8px] sm:pt-6">
                  <p className="font-mono text-[6px] uppercase tracking-[0.2em] text-[color:var(--muted)] min-[501px]:text-[8px] sm:text-[9px]">
                    Mohammad — Portfolio
                  </p>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>

      <nav
        className="hidden gap-8 text-xs text-[color:var(--muted)] md:flex md:gap-10"
        aria-label="Main navigation"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            className="transition-colors hover:text-white"
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </nav>

    </header>
  );
}
