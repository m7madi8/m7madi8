"""Create a professional ultrawide / desktop monitor mockup for Bashar Hroub cover."""
from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(r"c:\Users\eslam\Desktop\projects\3")
SRC = Path(
    r"C:\Users\eslam\.cursor\projects\c-Users-eslam-Desktop-projects-3\assets"
    r"\c__Users_eslam_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"1fdcf4f2adaf3444279cc7b06c059d4a_images_screencapture-localhost-3000-"
    r"2026-07-29-01_33_526-f8ccbbd0-0985-4786-b7fc-ca8694da0d4f.png"
)
OUT_DIR = ROOT / "img"
OUT_DIR.mkdir(exist_ok=True)


def rounded_mask(size: tuple[int, int], radius: int) -> Image.Image:
    m = Image.new("L", size, 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius=radius, fill=255)
    return m


def main() -> None:
    shot = Image.open(SRC).convert("RGB")

    # Canvas — cinematic widescreen presentation
    cw, ch = 1920, 1200
    canvas = Image.new("RGB", (cw, ch), (6, 7, 8))
    px = canvas.load()
    # subtle vertical gradient
    for y in range(ch):
        t = y / (ch - 1)
        c = int(6 + t * 8)
        for x in range(cw):
            # soft spotlight behind monitor
            glow = (
                ((x - cw * 0.5) / (cw * 0.42)) ** 2
                + ((y - ch * 0.42) / (ch * 0.38)) ** 2
            )
            g = int(28 * max(0.0, 1.0 - glow))
            px[x, y] = (min(255, c + g), min(255, c + int(g * 0.9)), min(255, c + int(g * 0.95)))

    # Monitor outer frame proportions (~16:10 screen)
    bezel = 18
    screen_w = 1480
    screen_h = int(screen_w * shot.height / shot.width)
    frame_w = screen_w + bezel * 2
    frame_h = screen_h + bezel * 2 + 10  # bottom chin slightly thicker
    frame_r = 22

    # Position monitor
    fx = (cw - frame_w) // 2
    fy = int(ch * 0.12)

    # Drop shadow
    shadow = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle(
        [fx + 24, fy + 36, fx + frame_w + 24, fy + frame_h + 50],
        radius=frame_r + 4,
        fill=(0, 0, 0, 170),
    )
    # stand shadow
    stand_cy = fy + frame_h + 70
    sd.ellipse(
        [cw // 2 - 220, stand_cy, cw // 2 + 220, stand_cy + 36],
        fill=(0, 0, 0, 120),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(42))
    canvas = Image.alpha_composite(canvas.convert("RGBA"), shadow)

    # Frame body
    frame = Image.new("RGBA", (frame_w, frame_h), (0, 0, 0, 0))
    fd = ImageDraw.Draw(frame)
    # metal rim
    fd.rounded_rectangle(
        [0, 0, frame_w - 1, frame_h - 1],
        radius=frame_r,
        fill=(42, 42, 46, 255),
    )
    fd.rounded_rectangle(
        [2, 2, frame_w - 3, frame_h - 3],
        radius=frame_r - 1,
        fill=(14, 14, 16, 255),
    )
    # inner highlight
    fd.rounded_rectangle(
        [3, 3, frame_w - 4, frame_h - 4],
        radius=frame_r - 2,
        outline=(70, 70, 76, 90),
        width=1,
    )

    # Screen content
    screen = shot.resize((screen_w, screen_h), Image.Resampling.LANCZOS)
    screen_mask = rounded_mask((screen_w, screen_h), 8)
    frame.paste(screen, (bezel, bezel), screen_mask)

    # Tiny camera notch / LED
    fd.ellipse(
        [frame_w // 2 - 4, 6, frame_w // 2 + 4, 14],
        fill=(28, 28, 32, 255),
    )
    fd.ellipse(
        [frame_w // 2 - 2, 8, frame_w // 2 + 2, 12],
        fill=(80, 80, 90, 255),
    )

    canvas.paste(frame, (fx, fy), frame)

    # Monitor stand neck
    stand = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    st = ImageDraw.Draw(stand)
    neck_w = 70
    neck_top = fy + frame_h - 2
    neck_bot = neck_top + 88
    st.rectangle(
        [cw // 2 - neck_w // 2, neck_top, cw // 2 + neck_w // 2, neck_bot],
        fill=(28, 28, 32, 255),
    )
    # base plate
    base_y = neck_bot - 8
    st.rounded_rectangle(
        [cw // 2 - 170, base_y, cw // 2 + 170, base_y + 18],
        radius=9,
        fill=(36, 36, 40, 255),
    )
    st.ellipse(
        [cw // 2 - 190, base_y + 6, cw // 2 + 190, base_y + 28],
        fill=(22, 22, 26, 255),
    )
    canvas = Image.alpha_composite(canvas, stand)

    final = canvas.convert("RGB")
    png_path = OUT_DIR / "bashar-hroub.png"
    webp_path = OUT_DIR / "bashar-hroub.webp"
    final.save(png_path, "PNG", optimize=True)
    # Cover-sized webp for site
    cover = final.copy()
    max_side = 1600
    w, h = cover.size
    if max(w, h) > max_side:
        s = max_side / max(w, h)
        cover = cover.resize((int(w * s), int(h * s)), Image.Resampling.LANCZOS)
    cover.save(webp_path, "WEBP", quality=82, method=6)
    print("wrote", png_path.name, png_path.stat().st_size // 1024, "KB")
    print("wrote", webp_path.name, webp_path.stat().st_size // 1024, "KB", cover.size)


if __name__ == "__main__":
    main()
