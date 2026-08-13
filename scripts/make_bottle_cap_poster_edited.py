from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


SOURCE_DIR = Path(r"C:\Work\BottleCapForYou\outputs\edited_bottle_caps")
OUTPUT_DIR = Path(r"C:\Work\BottleCapForYou\outputs")
OUTPUT_PATH = OUTPUT_DIR / "bottle_cap_facebook_poster_edited_photos.png"

CANVAS_W = 1440
CANVAS_H = 1800

NAVY = (8, 33, 57)
BLUE = (0, 115, 185)
TEAL = (0, 145, 130)
INDIGO = (63, 83, 166)
GOLD = (209, 148, 32)
INK = (18, 37, 58)
MUTED = (89, 108, 125)
LINE = (213, 226, 237)
PAPER = (247, 250, 252)


@dataclass(frozen=True)
class CapGroup:
    title: str
    count_label: str
    tagline: str
    accent: tuple[int, int, int]
    filenames: tuple[str, ...]


GROUPS = (
    CapGroup(
        title="REUSABLE CAPS",
        count_label="5 styles",
        tagline="Durable closure for repeat-use bottles",
        accent=BLUE,
        filenames=(
            "reusable_1_edited.jpg",
            "reusable_2_edited.jpg",
            "reusable_3_edited.jpg",
            "reusable_4_edited.jpg",
            "reusable_5_edited.jpg",
        ),
    ),
    CapGroup(
        title="ONE-TIME USE CAPS",
        count_label="4 styles",
        tagline="Clean single-use sealing solution",
        accent=TEAL,
        filenames=(
            "one_time_use_1_edited.jpg",
            "one_time_use_2_edited.jpg",
            "one_time_use_3_edited.jpg",
            "one_time_use_4_edited.jpg",
        ),
    ),
    CapGroup(
        title="REUSABLE CAPS + LINER",
        count_label="7 styles",
        tagline="Reusable cap body with liner protection",
        accent=INDIGO,
        filenames=(
            "reusable_liner_1_edited.jpg",
            "reusable_liner_2_edited.jpg",
            "reusable_liner_3_edited.jpg",
            "reusable_liner_4_edited.jpg",
            "reusable_liner_5_edited.jpg",
            "reusable_liner_6_edited.jpg",
            "reusable_liner_7_edited.jpg",
        ),
    ),
    CapGroup(
        title="ONE-TIME USE CAPS + LINER",
        count_label="2 styles",
        tagline="Tamper-evident option with liner",
        accent=GOLD,
        filenames=(
            "one_time_use_liner_1_edited.jpg",
            "one_time_use_liner_2_edited.jpg",
        ),
    ),
)


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    for candidate in (Path(r"C:\Windows\Fonts") / name, Path("/usr/share/fonts/truetype/dejavu") / name):
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default(size=size)


FONT_BRAND = font("arialbd.ttf", 25)
FONT_H1 = font("arialbd.ttf", 70)
FONT_H1_SMALL = font("arialbd.ttf", 55)
FONT_SUB = font("arial.ttf", 29)
FONT_CARD = font("arialbd.ttf", 31)
FONT_CARD_SMALL = font("arialbd.ttf", 27)
FONT_BODY = font("arial.ttf", 24)
FONT_BODY_BOLD = font("arialbd.ttf", 24)
FONT_BADGE = font("arialbd.ttf", 22)
FONT_CTA = font("arialbd.ttf", 38)
FONT_CONTACT = font("arialbd.ttf", 29)
FONT_FOOT = font("arial.ttf", 18)


def text_size(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont) -> tuple[int, int]:
    left, top, right, bottom = draw.textbbox((0, 0), text, font=fnt)
    return right - left, bottom - top


def draw_centered(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    text: str,
    fnt: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int],
) -> None:
    width, height = text_size(draw, text, fnt)
    x = box[0] + (box[2] - box[0] - width) // 2
    y = box[1] + (box[3] - box[1] - height) // 2 - 2
    draw.text((x, y), text, font=fnt, fill=fill)


def rounded(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    radius: int,
    fill: tuple[int, int, int] | tuple[int, int, int, int],
    outline: tuple[int, int, int] | None = None,
    width: int = 1,
) -> None:
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def add_shadow(canvas: Image.Image, box: tuple[int, int, int, int], radius: int, opacity: int = 28) -> None:
    x1, y1, x2, y2 = box
    w, h = x2 - x1, y2 - y1
    shadow = Image.new("RGBA", (w + 36, h + 36), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.rounded_rectangle((18, 18, w + 18, h + 18), radius=radius, fill=(10, 31, 52, opacity))
    shadow = shadow.filter(ImageFilter.GaussianBlur(14))
    canvas.alpha_composite(shadow, (x1 - 18, y1 - 12))


def fit_product(path: Path, size: int) -> Image.Image:
    img = Image.open(path).convert("RGB")
    img.thumbnail((size - 20, size - 20), Image.Resampling.LANCZOS)
    tile = Image.new("RGB", (size, size), (255, 255, 255))
    tile.paste(img, ((size - img.width) // 2, (size - img.height) // 2))
    return tile


def paste_product(canvas: Image.Image, path: Path, box: tuple[int, int, int, int]) -> None:
    x1, y1, x2, y2 = box
    size = min(x2 - x1, y2 - y1)
    tile = fit_product(path, size).resize((x2 - x1, y2 - y1), Image.Resampling.LANCZOS)
    mask = Image.new("L", tile.size, 0)
    mdraw = ImageDraw.Draw(mask)
    mdraw.rounded_rectangle((0, 0, tile.width, tile.height), radius=18, fill=255)
    add_shadow(canvas, box, 18, opacity=18)
    canvas.paste(tile.convert("RGBA"), (x1, y1), mask)


def draw_badge(draw: ImageDraw.ImageDraw, x: int, y: int, label: str, color: tuple[int, int, int]) -> None:
    width, _ = text_size(draw, label, FONT_BADGE)
    box = (x, y, x + width + 42, y + 44)
    rounded(draw, box, 22, (255, 255, 255), outline=(199, 216, 230), width=2)
    draw.ellipse((x + 14, y + 13, x + 30, y + 29), fill=color)
    draw.text((x + 40, y + 10), label, font=FONT_BADGE, fill=INK)


def draw_header(canvas: Image.Image) -> None:
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((0, 0, CANVAS_W, 344), fill=(233, 246, 253))
    draw.polygon([(0, 0), (510, 0), (355, 344), (0, 344)], fill=(214, 239, 250))
    draw.rectangle((0, 0, 28, CANVAS_H), fill=BLUE)
    draw.rectangle((28, 0, 38, CANVAS_H), fill=GOLD)

    draw.text((92, 55), "BOTTLECAPFORYOU.COM", font=FONT_BRAND, fill=BLUE)
    draw.text((92, 101), "5-GALLON WATER", font=FONT_H1, fill=NAVY)
    draw.text((92, 180), "BOTTLE CAPS & CLOSURES", font=FONT_H1_SMALL, fill=NAVY)
    draw.text((94, 265), "Factory-direct caps for bottled water production and delivery", font=FONT_SUB, fill=MUTED)

    draw_badge(draw, 1030, 74, "ISO 9001", BLUE)
    draw_badge(draw, 1030, 132, "ISO 22000", TEAL)
    rounded(draw, (1004, 214, 1348, 298), 24, NAVY)
    draw_centered(draw, (1004, 214, 1348, 256), "OEM / ODM", FONT_CONTACT, (255, 255, 255))
    draw_centered(draw, (1004, 252, 1348, 298), "Custom Colors Available", FONT_BODY_BOLD, (188, 226, 245))


def tile_grid(count: int) -> tuple[int, int]:
    if count <= 2:
        return 2, 1
    if count <= 4:
        return 2, 2
    if count <= 6:
        return 3, 2
    return 4, 2


def draw_group(canvas: Image.Image, group: CapGroup, box: tuple[int, int, int, int]) -> None:
    draw = ImageDraw.Draw(canvas)
    x1, y1, x2, y2 = box
    w, h = x2 - x1, y2 - y1
    add_shadow(canvas, box, 26)
    rounded(draw, box, 26, (255, 255, 255), outline=LINE, width=2)
    draw.rounded_rectangle((x1, y1, x2, y1 + 76), radius=26, fill=group.accent)
    draw.rectangle((x1, y1 + 40, x2, y1 + 76), fill=group.accent)

    title_font = FONT_CARD if text_size(draw, group.title, FONT_CARD)[0] < w - 180 else FONT_CARD_SMALL
    draw.text((x1 + 28, y1 + 22), group.title, font=title_font, fill=(255, 255, 255))
    pill_w = text_size(draw, group.count_label, FONT_BODY_BOLD)[0] + 32
    rounded(draw, (x2 - pill_w - 22, y1 + 21, x2 - 22, y1 + 55), 17, (255, 255, 255))
    draw_centered(draw, (x2 - pill_w - 22, y1 + 21, x2 - 22, y1 + 55), group.count_label, FONT_BODY_BOLD, group.accent)

    draw.text((x1 + 28, y1 + 94), group.tagline, font=FONT_BODY, fill=MUTED)

    filenames = [SOURCE_DIR / filename for filename in group.filenames]
    cols, rows = tile_grid(len(filenames))
    gap = 15
    area_x = x1 + 26
    area_y = y1 + 134
    area_w = w - 52
    area_h = h - 165
    tile_w = (area_w - gap * (cols - 1)) // cols
    tile_h = (area_h - gap * (rows - 1)) // rows
    tile_size = min(tile_w, tile_h)

    for i, path in enumerate(filenames):
        row, col = divmod(i, cols)
        if row >= rows:
            break
        tx = area_x + col * (tile_w + gap) + (tile_w - tile_size) // 2
        ty = area_y + row * (tile_h + gap) + (tile_h - tile_size) // 2
        if len(filenames) == 5 and i == 4:
            tx = area_x + tile_w + gap + (tile_w - tile_size) // 2
        paste_product(canvas, path, (tx, ty, tx + tile_size, ty + tile_size))


def draw_footer(canvas: Image.Image) -> None:
    draw = ImageDraw.Draw(canvas)
    rounded(draw, (88, 1542, 1352, 1716), 34, NAVY)
    draw.rectangle((88, 1542, 128, 1716), fill=GOLD)
    draw.text((150, 1575), "Free samples, product information and MOQ", font=FONT_CTA, fill=(255, 255, 255))
    draw.text((150, 1645), "bottlecapforyou.com", font=FONT_CONTACT, fill=(190, 226, 245))
    draw.text((760, 1645), "WhatsApp: +86 158 1642 7686", font=FONT_CONTACT, fill=(255, 225, 151))
    draw.text((92, 1742), "High-quality caps and closures for 5-gallon water bottles | ISO certified manufacturer", font=FONT_FOOT, fill=(99, 116, 132))


def create_poster() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), PAPER + (255,))
    draw_header(canvas)
    boxes = (
        (88, 390, 700, 914),
        (740, 390, 1352, 914),
        (88, 960, 700, 1495),
        (740, 960, 1352, 1495),
    )
    for group, box in zip(GROUPS, boxes):
        draw_group(canvas, group, box)
    draw_footer(canvas)
    canvas.convert("RGB").save(OUTPUT_PATH, "PNG", optimize=True)


if __name__ == "__main__":
    missing = [filename for group in GROUPS for filename in group.filenames if not (SOURCE_DIR / filename).exists()]
    if missing:
        raise FileNotFoundError(f"Missing edited images: {', '.join(missing)}")
    create_poster()
    print(OUTPUT_PATH)
