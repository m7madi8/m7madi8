'use client';

import { useEffect, useState, useCallback } from 'react';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface SocialIconsProps {
  links: SocialLink[];
}

function useDynamicBottomOffset() {
  const [bottomOffset, setBottomOffset] = useState(0);

  const updateOffset = useCallback(() => {
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    const windowHeight = window.innerHeight;
    const diff = windowHeight - viewportHeight;
    setBottomOffset(Math.max(0, diff));
  }, []);

  useEffect(() => {
    updateOffset();

    const visualViewport = window.visualViewport;
    if (visualViewport) {
      visualViewport.addEventListener('resize', updateOffset);
      visualViewport.addEventListener('scroll', updateOffset);
    }

    window.addEventListener('resize', updateOffset);

    return () => {
      if (visualViewport) {
        visualViewport.removeEventListener('resize', updateOffset);
        visualViewport.removeEventListener('scroll', updateOffset);
      }
      window.removeEventListener('resize', updateOffset);
    };
  }, [updateOffset]);

  return bottomOffset;
}

export default function SocialIcons({ links }: SocialIconsProps) {
  const bottomOffset = useDynamicBottomOffset();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <style jsx>{`
        .social-icons-container {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 50;
          display: flex;
          justify-content: center;
          padding: 1rem;
          padding-bottom: max(1rem, env(safe-area-inset-bottom, 0px));
          background: linear-gradient(to top, var(--background) 60%, transparent);
          transform: translateY(${isVisible ? '0' : '100%'});
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-icons-wrapper {
          display: flex;
          gap: 1.25rem;
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          background: color-mix(in srgb, var(--surface-elevated) 85%, transparent);
          border: 1px solid var(--border);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          color: var(--foreground);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .social-link::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: var(--accent-dim);
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-link:hover {
          color: var(--foreground);
          transform: translateY(-2px);
        }

        .social-link:hover::before {
          opacity: 1;
          transform: scale(1);
        }

        .social-link:active {
          transform: scale(0.95);
        }

        .social-link svg {
          width: 1.25rem;
          height: 1.25rem;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 480px) {
          .social-icons-wrapper {
            gap: 0.75rem;
            padding: 0.625rem 1rem;
          }

          .social-link {
            width: 2.25rem;
            height: 2.25rem;
          }

          .social-link svg {
            width: 1.125rem;
            height: 1.125rem;
          }
        }
      `}</style>

      <div
        className="social-icons-container"
        style={{ paddingBottom: `max(1rem, env(safe-area-inset-bottom, ${bottomOffset}px))` }}
      >
        <div className="social-icons-wrapper">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
