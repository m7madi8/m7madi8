"""Convert site images to optimized WebP and remove unused heavy assets."""
from __future__ import annotations

from pathlib import Path
from PIL import Image

ROOT = Path(r"c:\Users\eslam\Desktop\projects\3")
IMG = ROOT / "img"

# Unused generated mockups (CSS phone mockups replaced these)
UNUSED_DIRS = [IMG / "nanas-biets" / "mockups"]

# Max longest side by path hint
def max_side_for(path: Path) -> int:
    parts = {p.lower() for p in path.parts}
    name = path.name.lower()
    if "ui-" in name or "99cafe" in parts or "nanas-biets" in parts:
        return 900
    if "logo" in name or name in {"logo-me.png", "logo-me.webp"}:
        return 512
    if name.startswith("icon"):
        return 512
    # Hero / cover photos
    return 1600


def convert_file(src: Path) -> tuple[Path, int, int] | None:
    if src.suffix.lower() not in {".png", ".jpg", ".jpeg"}:
        return None
    # Keep app favicon as PNG for broad PWA/Apple compatibility
    if src.name == "icon.png" and "app" in src.parts:
        return None

    out = src.with_suffix(".webp")
    try:
        im = Image.open(src)
    except Exception as e:
        print("skip open", src, e)
        return None

    # Preserve alpha when present
    if im.mode in ("P", "RGBA", "LA"):
        im = im.convert("RGBA")
    elif im.mode != "RGB":
        im = im.convert("RGB")

    max_side = max_side_for(src)
    w, h = im.size
    longest = max(w, h)
    if longest > max_side:
        scale = max_side / longest
        im = im.resize((max(1, int(w * scale)), max(1, int(h * scale))), Image.Resampling.LANCZOS)

    # UI screenshots keep higher quality for text sharpness
    quality = 88 if ("ui-" in src.name.lower() or "logo" in src.name.lower()) else 80

    save_kwargs = {
        "format": "WEBP",
        "quality": quality,
        "method": 6,
    }
    if im.mode == "RGBA":
        save_kwargs["exact"] = True

    im.save(out, **save_kwargs)
    before = src.stat().st_size
    after = out.stat().st_size
    try:
        src.unlink()
    except PermissionError:
        print(f"warn could not delete {src.name} (locked) — webp written")
    return out, before, after


def main() -> None:
    # Remove unused mockup directory first
    for d in UNUSED_DIRS:
        if d.exists():
            for f in d.rglob("*"):
                if f.is_file():
                    print(f"delete unused {f.relative_to(ROOT)} ({f.stat().st_size // 1024} KB)")
                    f.unlink()
            # remove empty dirs
            for sub in sorted(d.rglob("*"), reverse=True):
                if sub.is_dir():
                    sub.rmdir()
            d.rmdir()
            print("removed", d.relative_to(ROOT))

    # Also delete unused python mockup script references stay; keep script or remove - keep for now

    total_before = 0
    total_after = 0
    converted = 0

    candidates = list(IMG.rglob("*"))
    icon = ROOT / "app" / "icon.png"
    # Convert content images under img/
    for src in sorted(candidates):
        if not src.is_file():
            continue
        result = convert_file(src)
        if not result:
            continue
        out, before, after = result
        total_before += before
        total_after += after
        converted += 1
        print(
            f"ok {out.relative_to(ROOT)}  "
            f"{before // 1024}KB -> {after // 1024}KB "
            f"({100 - int(after * 100 / max(before, 1))}% smaller)"
        )

    print(
        f"\nConverted {converted} files. "
        f"Total {total_before // 1024}KB -> {total_after // 1024}KB "
        f"(saved {(total_before - total_after) // 1024}KB)"
    )


if __name__ == "__main__":
    main()
