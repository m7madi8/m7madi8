from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
from pathlib import Path
import math

src_dir = Path(r"c:\Users\eslam\Desktop\projects\3\img\nanas-biets")
out_dir = src_dir / "mockups"
out_dir.mkdir(exist_ok=True)

screens = [
    ("ui-dumplings-chicken.png", "mockup-product-chicken.png"),
    ("ui-date-balls.png", "mockup-product-dates.png"),
    ("ui-dumplings-meat.png", "mockup-product-meat.png"),
    ("ui-cart.png", "mockup-cart.png"),
    ("ui-checkout.png", "mockup-checkout.png"),
]

BG_TOP = (28, 14, 36)
BG_BOT = (10, 8, 14)
FRAME = (18, 18, 20)
FRAME_EDGE = (55, 55, 60)


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def rounded_mask(size, radius):
    m = Image.new("L", size, 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius=radius, fill=255)
    return m


def make_bg(w, h):
    img = Image.new("RGB", (w, h))
    px = img.load()
    for y in range(h):
        t = y / (h - 1)
        c = lerp(BG_TOP, BG_BOT, t)
        for x in range(w):
            glow = math.exp(
                -((x - w * 0.35) ** 2) / (2 * (w * 0.28) ** 2)
                - ((y - h * 0.4) ** 2) / (2 * (h * 0.35) ** 2)
            )
            g = int(70 * glow)
            px[x, y] = (
                min(255, c[0] + int(g * 0.85)),
                min(255, c[1] + int(g * 0.25)),
                min(255, c[2] + int(g * 0.7)),
            )
    return img.filter(ImageFilter.GaussianBlur(0.6))


def phone_mockup(screenshot_path, out_path, canvas=(1200, 1600)):
    shot = Image.open(screenshot_path).convert("RGB")

    screen_w = 720
    aspect = shot.height / shot.width
    screen_h = int(screen_w * aspect)
    screen_h = max(1100, min(screen_h, 1400))

    bezel = 18
    top_chin = 28
    bottom_chin = 34
    device_w = screen_w + bezel * 2
    device_h = screen_h + top_chin + bottom_chin

    cw, ch = canvas
    scale = min((cw - 180) / device_w, (ch - 160) / device_h)
    device_w = int(device_w * scale)
    device_h = int(device_h * scale)
    screen_w = int(screen_w * scale)
    screen_h = int(screen_h * scale)
    bezel = int(bezel * scale)
    top_chin = int(top_chin * scale)
    bottom_chin = int(bottom_chin * scale)

    bg = make_bg(cw, ch)

    shadow = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    dx = (cw - device_w) // 2
    dy = (ch - device_h) // 2 + 18
    sd.rounded_rectangle(
        [dx + 20, dy + 30, dx + device_w + 20, dy + device_h + 30],
        radius=max(24, int(48 * scale)),
        fill=(0, 0, 0, 160),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(38))
    bg = Image.alpha_composite(bg.convert("RGBA"), shadow).convert("RGB")

    device = Image.new("RGBA", (device_w, device_h), (0, 0, 0, 0))
    dd = ImageDraw.Draw(device)
    r = max(28, int(48 * (device_w / 756)))
    dd.rounded_rectangle(
        [0, 0, device_w - 1, device_h - 1], radius=r, fill=FRAME_EDGE + (255,)
    )
    dd.rounded_rectangle(
        [3, 3, device_w - 4, device_h - 4], radius=r - 2, fill=FRAME + (255,)
    )

    shot_resized = shot.resize((screen_w, screen_h), Image.Resampling.LANCZOS)
    shot_resized = ImageEnhance.Contrast(shot_resized).enhance(1.04)
    shot_resized = ImageEnhance.Color(shot_resized).enhance(1.05)

    sx = bezel
    sy = top_chin
    screen_mask = rounded_mask((screen_w, screen_h), max(20, int(36 * (screen_w / 720))))
    device.paste(shot_resized, (sx, sy), screen_mask)

    island_w = int(screen_w * 0.28)
    island_h = max(12, int(22 * (screen_w / 720)))
    ix = sx + (screen_w - island_w) // 2
    iy = sy + max(6, int(10 * (screen_w / 720)))
    dd = ImageDraw.Draw(device)
    dd.rounded_rectangle(
        [ix, iy, ix + island_w, iy + island_h],
        radius=island_h // 2,
        fill=(8, 8, 10, 255),
    )

    bw = max(3, int(4 * scale))
    btn = ImageDraw.Draw(device)
    btn.rounded_rectangle(
        [-bw + 1, int(device_h * 0.22), 2, int(device_h * 0.30)],
        radius=2,
        fill=(70, 70, 75, 255),
    )
    btn.rounded_rectangle(
        [-bw + 1, int(device_h * 0.33), 2, int(device_h * 0.42)],
        radius=2,
        fill=(70, 70, 75, 255),
    )
    btn.rounded_rectangle(
        [device_w - 3, int(device_h * 0.28), device_w + bw - 2, int(device_h * 0.40)],
        radius=2,
        fill=(70, 70, 75, 255),
    )

    highlight = Image.new("RGBA", (device_w, device_h), (0, 0, 0, 0))
    hd = ImageDraw.Draw(highlight)
    hd.rounded_rectangle(
        [4, 4, device_w - 5, device_h - 5],
        radius=r - 2,
        outline=(255, 255, 255, 28),
        width=2,
    )
    device = Image.alpha_composite(device, highlight)

    canvas_img = bg.convert("RGBA")
    canvas_img.paste(device, (dx, dy - 10), device)

    sheen = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    shd = ImageDraw.Draw(sheen)
    shd.ellipse(
        [cw * 0.15, -ch * 0.1, cw * 0.85, ch * 0.35], fill=(160, 90, 180, 18)
    )
    sheen = sheen.filter(ImageFilter.GaussianBlur(40))
    canvas_img = Image.alpha_composite(canvas_img, sheen)

    final = canvas_img.convert("RGB")
    final.save(out_path, "PNG", optimize=True)
    print("wrote", out_path.name, final.size)


def render_scaled_phone(screenshot_path, target_h):
    shot = Image.open(screenshot_path).convert("RGB")
    screen_w = 420
    aspect = shot.height / max(shot.width, 1)
    screen_h = int(screen_w * aspect)
    screen_h = max(700, min(screen_h, 900))
    bezel, top_chin, bottom_chin = 12, 20, 24
    device_w = screen_w + bezel * 2
    device_h = screen_h + top_chin + bottom_chin
    scale = target_h / device_h
    device_w = int(device_w * scale)
    device_h = int(device_h * scale)
    screen_w = int(screen_w * scale)
    screen_h = int(screen_h * scale)
    bezel = max(8, int(bezel * scale))
    top_chin = max(14, int(top_chin * scale))
    bottom_chin = max(16, int(bottom_chin * scale))

    device = Image.new("RGBA", (device_w, device_h), (0, 0, 0, 0))
    dd = ImageDraw.Draw(device)
    r = max(24, int(40 * (device_w / 444)))
    dd.rounded_rectangle(
        [0, 0, device_w - 1, device_h - 1], radius=r, fill=FRAME_EDGE + (255,)
    )
    dd.rounded_rectangle(
        [2, 2, device_w - 3, device_h - 3], radius=r - 2, fill=FRAME + (255,)
    )
    shot_r = shot.resize((screen_w, screen_h), Image.Resampling.LANCZOS)
    mask = rounded_mask((screen_w, screen_h), max(16, int(28 * (screen_w / 420))))
    device.paste(shot_r, (bezel, top_chin), mask)
    island_w = int(screen_w * 0.28)
    island_h = max(10, int(16 * scale))
    ix = bezel + (screen_w - island_w) // 2
    iy = top_chin + max(6, int(8 * scale))
    dd.rounded_rectangle(
        [ix, iy, ix + island_w, iy + island_h],
        radius=island_h // 2,
        fill=(8, 8, 10, 255),
    )
    return device


for src_name, out_name in screens:
    phone_mockup(src_dir / src_name, out_dir / out_name)

# Collage of first three product screens
cw, ch = 1800, 1200
bg = make_bg(cw, ch).convert("RGBA")
glow = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse([cw * 0.2, ch * 0.1, cw * 0.8, ch * 0.9], fill=(120, 50, 140, 35))
glow = glow.filter(ImageFilter.GaussianBlur(60))
bg = Image.alpha_composite(bg, glow)

trio = screens[:3]
positions = [
    (0.10, 0.14, 0.78, -7),
    (0.58, 0.12, 0.80, 7),
    (0.32, 0.05, 0.94, 0),
]

for i in range(3):
    src_name = trio[i][0]
    px, py, scale_h, rot = positions[i]
    phone = render_scaled_phone(src_dir / src_name, int(ch * scale_h * 0.95))
    if rot:
        phone = phone.rotate(rot, resample=Image.Resampling.BICUBIC, expand=True)
    x = int(cw * px)
    y = int(ch * py)
    sh = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    box = Image.new("RGBA", phone.size, (0, 0, 0, 140))
    sh.paste(box, (x + 18, y + 28), phone.split()[-1])
    sh = sh.filter(ImageFilter.GaussianBlur(28))
    bg = Image.alpha_composite(bg, sh)
    bg.paste(phone, (x, y), phone)

collage_path = out_dir / "mockup-interfaces-hero.png"
bg.convert("RGB").save(collage_path, "PNG", optimize=True)
print("wrote", collage_path.name, bg.size)
print("done")
