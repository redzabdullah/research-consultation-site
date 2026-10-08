"""
Regenerate the QR code and link-preview image, and update the site URL.

Usage (from the project folder, in the VS Code terminal):

    py -m pip install qrcode pillow          # first time only
    py tools/make_images.py https://your-site-name.onrender.com

What it does:
  1. Replaces the old site address with the new one in content.js and index.html
  2. Creates assets/qr-code.png pointing to the new address
  3. Creates assets/og-image.png (the preview card shown in WhatsApp/Teams)
  4. Creates assets/apple-touch-icon.png (icon when saved to a phone home screen)
"""
import re
import sys
from pathlib import Path

import qrcode
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"

INK = (27, 34, 32)
INK_2 = (63, 72, 69)
ACCENT = (14, 92, 87)
BG = (248, 245, 239)
LINE = (225, 217, 204)


def font(names, size):
    """Load the first font found (Windows, then macOS, then a basic fallback)."""
    folders = [Path("C:/Windows/Fonts"), Path("/System/Library/Fonts/Supplemental"), Path("/Library/Fonts")]
    for name in names:
        for folder in folders:
            f = folder / name
            if f.exists():
                return ImageFont.truetype(str(f), size)
    return ImageFont.load_default(size)


def current_url():
    text = (ROOT / "content.js").read_text(encoding="utf-8")
    m = re.search(r'siteUrl:\s*"([^"]+)"', text)
    return m.group(1) if m else None


def update_url(new_url):
    old = current_url()
    new_url = new_url.rstrip("/")
    if not old or old.rstrip("/") == new_url:
        return new_url
    old = old.rstrip("/")
    for name in ("content.js", "index.html"):
        path = ROOT / name
        text = path.read_text(encoding="utf-8")
        path.write_text(text.replace(old, new_url), encoding="utf-8")
    print(f"Updated site address: {old}  ->  {new_url}")
    return new_url


def make_qr(url):
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=10, border=3)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color=INK, back_color="white").convert("RGB")
    img = img.resize((600, 600), Image.NEAREST)
    img.save(ASSETS / "qr-code.png", optimize=True)
    print("Created assets/qr-code.png")


def wrap(draw, text, fnt, max_width):
    words, lines, line = text.split(), [], ""
    for w in words:
        test = (line + " " + w).strip()
        if draw.textlength(test, font=fnt) <= max_width:
            line = test
        else:
            lines.append(line)
            line = w
    lines.append(line)
    return lines


def make_og(name, title):
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, 14], fill=ACCENT)

    eyebrow = font(["seguisb.ttf", "segoeui.ttf", "Arial.ttf"], 26)
    head = font(["georgia.ttf", "Georgia.ttf"], 66)
    head_i = font(["georgiai.ttf", "Georgia Italic.ttf"], 58)
    small = font(["segoeui.ttf", "Arial.ttf"], 30)
    small_b = font(["seguisb.ttf", "segoeuib.ttf", "Arial Bold.ttf"], 30)

    x, y = 80, 90
    d.text((x, y), "RESEARCH CONSULTATIONS  ·  SMU LIBRARIES", font=eyebrow, fill=ACCENT)
    y += 70
    for line in wrap(d, "Stuck on data, methods or the literature?", head, W - 2 * x):
        d.text((x, y), line, font=head, fill=INK)
        y += 80
    y += 10
    for line in wrap(d, "You don\u2019t have to figure it out alone.", head_i, W - 2 * x):
        d.text((x, y), line, font=head_i, fill=ACCENT)
        y += 72

    d.line([x, H - 130, W - x, H - 130], fill=LINE, width=2)
    d.text((x, H - 100), name, font=small_b, fill=INK)
    nx = x + d.textlength(name, font=small_b)
    d.text((nx, H - 100), "  ·  " + title, font=small, fill=INK_2)

    img.save(ASSETS / "og-image.png", optimize=True)
    print("Created assets/og-image.png")


def make_touch_icon():
    size = 180
    img = Image.new("RGB", (size, size), ACCENT)
    d = ImageDraw.Draw(img)
    f = font(["georgiab.ttf", "Georgia Bold.ttf"], 112)
    box = d.textbbox((0, 0), "R", font=f)
    w, h = box[2] - box[0], box[3] - box[1]
    d.text(((size - w) / 2 - box[0], (size - h) / 2 - box[1]), "R", font=f, fill=BG)
    img.save(ASSETS / "apple-touch-icon.png", optimize=True)
    print("Created assets/apple-touch-icon.png")


def main():
    ASSETS.mkdir(exist_ok=True)
    url = update_url(sys.argv[1]) if len(sys.argv) > 1 else current_url()
    text = (ROOT / "content.js").read_text(encoding="utf-8")
    name = re.search(r'name:\s*"([^"]+)"', text).group(1)
    title = re.search(r'title:\s*"([^"]+)"', text).group(1)
    make_qr(url + "/")
    make_og(name, title)
    make_touch_icon()
    print("Done. QR code points to:", url + "/")


if __name__ == "__main__":
    main()
