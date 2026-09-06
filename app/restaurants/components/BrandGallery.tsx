import Image, { type StaticImageData } from "next/image";
import type { ProjectGalleryItem } from "../../data/projects";

type BrandGalleryProps = {
  title: string;
  url?: string;
  status?: "live" | "coming-soon";
  cover?: StaticImageData;
  items: ProjectGalleryItem[];
};

export default function BrandGallery({
  url,
  status,
  cover,
  items,
}: BrandGalleryProps) {
  const slides =
    items.length > 0
      ? items
      : cover
        ? [{ src: cover, alt: "Project" }]
        : [];

  if (slides.length === 0) return null;

  return (
    <div className="r-gallery">
      {url && status === "live" ? (
        <a
          className="r-gallery-live"
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          Open live site
        </a>
      ) : null}

      <div className="r-gallery-grid">
        {slides.map((slide) => (
          <figure key={slide.src.src} className="r-gallery-item">
            <Image
              src={slide.src}
              alt={slide.alt}
              sizes="(max-width: 720px) 100vw, 50vw"
            />
            {slide.label ? <figcaption>{slide.label}</figcaption> : null}
          </figure>
        ))}
      </div>
    </div>
  );
}
