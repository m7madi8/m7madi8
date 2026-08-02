"""Generate m. brand icons (favicon, apple, OG, SVG)."""
from pathlib import Path
from urllib.request import urlretrieve

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
FONTS = Path(__file__).resolve().parent / "fonts"
FONT_PATH = FONTS / "LeagueSpartan-Medium.ttf"

INK = (15, 15, 16, 255)  # #0F0F10
PAPER = (245, 245, 242, 255)  # #F5F5F2

FONT_URLS = [
    "https://github.com/google/fonts/raw/main/ofl/leaguespartan/LeagueSpartan%5Bwght%5D.ttf",
    "https://raw.githubusercontent.com/google/fonts/main/ofl/leaguespartan/LeagueSpartan%5Bwght%5D.ttf",
]


def ensure_font() -> Path:
    FONTS.mkdir(parents=True, exist_ok=True)
    if FONT_PATH.exists() and FONT_PATH.stat().st_size > 1000:
        return FONT_PATH
    last_err: Exception | None = None
    for url in FONT_URLS:
        try:
            urlretrieve(url, FONT_PATH)
            if FONT_PATH.stat().st_size > 1000:
                print(f"Downloaded font from {url}")
                return FONT_PATH
        except Exception as exc:  # noqa: BLE001
            last_err = exc
            print(f"Fail {url}: {exc}")
    raise RuntimeError(f"Could not download League Spartan: {last_err}")


def render_mark(size: int, fg, bg) -> Image.Image:
    img = Image.new("RGBA", (size, size), bg)
    draw = ImageDraw.Draw(img)
    font_size = int(size * 0.46)
    font = ImageFont.truetype(str(FONT_PATH), font_size)
    text = "m."
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (size - tw) / 2 - bbox[0]
    y = (size - th) / 2 - bbox[1] - size * 0.02
    draw.text((x, y), text, font=font, fill=fg)
    return img


def main() -> None:
    ensure_font()

    targets = [
        ROOT / "app" / "icon.png",
        ROOT / "public" / "icon.png",
        ROOT / "app" / "apple-icon.png",
        ROOT / "public" / "apple-icon.png",
    ]
    mark = render_mark(512, PAPER, INK).convert("RGB")
    for dest in targets:
        dest.parent.mkdir(parents=True, exist_ok=True)
        mark.save(dest, "PNG", optimize=True)
        print("wrote", dest)

    # OG 1200×630
    og = Image.new("RGB", (1200, 630), INK[:3])
    draw = ImageDraw.Draw(og)
    font = ImageFont.truetype(str(FONT_PATH), 220)
    text = "m."
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (1200 - tw) / 2 - bbox[0]
    y = (630 - th) / 2 - bbox[1] - 12
    draw.text((x, y), text, font=font, fill=PAPER[:3])
    og_path = ROOT / "public" / "og.png"
    og.save(og_path, "PNG", optimize=True)
    print("wrote", og_path)

    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="m.">
  <rect width="120" height="120" fill="#0F0F10"/>
  <text x="60" y="72" text-anchor="middle" font-family="League Spartan, system-ui, sans-serif" font-weight="500" font-size="54" fill="#F5F5F2" letter-spacing="0.5">m.</text>
</svg>
"""
    for dest in [ROOT / "public" / "mark.svg", ROOT / "img" / "mark.svg"]:
        dest.write_text(svg, encoding="utf-8")
        print("wrote", dest)


if __name__ == "__main__":
    main()
