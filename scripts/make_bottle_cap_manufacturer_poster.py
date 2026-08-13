from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


SOURCE_DIR = Path(r"C:\Work\BottleCapForYou\outputs\edited_bottle_caps")
OUTPUT_DIR = Path(r"C:\Work\BottleCapForYou\outputs")
OUTPUT_PATH = OUTPUT_DIR / "bottle_cap_manufacturer_facebook_poster.png"

W = 1440
H = 1800

NAVY = (7, 27, 47)
NAVY_2 = (10, 42, 70)
STEEL = (229, 235, 241)
PAPER = (246, 248, 251)
INK = (20, 35, 50)
MUTED = (88, 106, 122)
LINE = (200, 214, 226)
BLUE = (0, 116, 184)
TEAL = (0, 143, 128)
INDIGO = (63, 83, 166)
GOLD = (209, 149, 34)
WHITE = (255, 255, 255)


@dataclass(frozen=True)
class ProductRow:
    title: str
    subtitle: str
    count: str
    color: tuple[int, int, int]
    specs: tuple[str, ...]
    files: tuple[str, ...]


ROWS = (
    ProductRow(
        "REUSABLE CAPS",
        "Durable closure options for repeat-use bottles",
        "5 styles",
        BLUE,
        ("Weight: 10.2 g", "Height: 37.5 mm"),
        (
            "reusable_1_edited.jpg",
            "reusable_2_edited.jpg",
            "reusable_3_edited.jpg",
            "reusable_4_edited.jpg",
            "reusable_5_edited.jpg",
        ),
    ),
    ProductRow(
        "ONE-TIME USE CAPS",
        "Clean single-use sealing solutions",
        "4 styles",
        TEAL,
        ("Weight: 8.2 g", "Height: 36.2 mm"),
        (
            "one_time_use_1_edited.jpg",
            "one_time_use_2_edited.jpg",
            "one_time_use_3_edited.jpg",
            "one_time_use_4_edited.jpg",
        ),
    ),
    ProductRow(
        "REUSABLE CAPS + LINER",
        "Reusable cap body with liner protection",
        "7 styles",
        INDIGO,
        ("Weight: 10.2 g", "Height: 37.5 mm", "Liner: 1.5 mm"),
        (
            "reusable_liner_1_edited.jpg",
            "reusable_liner_2_edited.jpg",
            "reusable_liner_3_edited.jpg",
            "reusable_liner_4_edited.jpg",
            "reusable_liner_5_edited.jpg",
            "reusable_liner_6_edited.jpg",
            "reusable_liner_7_edited.jpg",
        ),
    ),
    ProductRow(
        "ONE-TIME USE + LINER",
        "Tamper-evident option with liner",
        "2 styles",
        GOLD,
        ("Weight: 8 g", "Height: 35.5 mm", "Liner: 1.5 mm"),
        (
            "one_time_use_liner_1_edited.jpg",
            "one_time_use_liner_2_edited.jpg",
        ),
    ),
)


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    candidates = (
        Path(r"C:\Windows\Fonts") / name,
        Path("/usr/share/fonts/truetype/dejavu") / name,
    )
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default(size=size)


FONT_BRAND = font("arialbd.ttf", 24)
FONT_KICKER = font("arialbd.ttf", 20)
FONT_H1 = font("arialbd.ttf", 66)
FONT_H2 = font("arialbd.ttf", 43)
FONT_SUB = font("arial.ttf", 27)
FONT_ROW = font("arialbd.ttf", 31)
FONT_ROW_SMALL = font("arialbd.ttf", 27)
FONT_BODY = font("arial.ttf", 24)
FONT_BODY_BOLD = font("arialbd.ttf", 24)
FONT_BADGE = font("arialbd.ttf", 22)
FONT_SMALL = font("arial.ttf", 18)
FONT_SPEC = font("arialbd.ttf", 17)
FONT_SPEC_LABEL = font("arial.ttf", 17)
FONT_CTA = font("arialbd.ttf", 42)
FONT_CONTACT = font("arialbd.ttf", 30)
FONT_MICRO = font("arial.ttf", 18)


def text_box(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont) -> tuple[int, int]:
    left, top, right, bottom = draw.textbbox((0, 0), text, font=fnt)
    return right - left, bottom - top


def center_text(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    text: str,
    fnt: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int],
) -> None:
    tw, th = text_box(draw, text, fnt)
    x = box[0] + (box[2] - box[0] - tw) // 2
    y = box[1] + (box[3] - box[1] - th) // 2 - 2
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


def shadow(canvas: Image.Image, box: tuple[int, int, int, int], radius: int, opacity: int = 22) -> None:
    x1, y1, x2, y2 = box
    sw, sh = x2 - x1, y2 - y1
    layer = Image.new("RGBA", (sw + 38, sh + 38), (0, 0, 0, 0))
    layer_draw = ImageDraw.Draw(layer)
    layer_draw.rounded_rectangle((19, 19, sw + 19, sh + 19), radius=radius, fill=(5, 28, 48, opacity))
    layer = layer.filter(ImageFilter.GaussianBlur(14))
    canvas.alpha_composite(layer, (x1 - 19, y1 - 12))


def load_product(path: Path, size: int) -> Image.Image:
    img = Image.open(path).convert("RGB")
    img.thumbnail((size - 14, size - 14), Image.Resampling.LANCZOS)
    base = Image.new("RGB", (size, size), WHITE)
    base.paste(img, ((size - img.width) // 2, (size - img.height) // 2))
    return base


def paste_product(canvas: Image.Image, path: Path, box: tuple[int, int, int, int], radius: int = 10) -> None:
    x1, y1, x2, y2 = box
    size = x2 - x1
    product = load_product(path, size)
    mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle((0, 0, size, size), radius=radius, fill=255)
    draw = ImageDraw.Draw(canvas)
    rounded(draw, (x1 - 1, y1 - 1, x2 + 1, y2 + 1), radius + 1, WHITE, outline=(226, 233, 240), width=2)
    canvas.paste(product.convert("RGBA"), (x1, y1), mask)


def draw_blueprint_background(draw: ImageDraw.ImageDraw) -> None:
    draw.rectangle((0, 0, W, 500), fill=NAVY)
    for x in range(0, W + 1, 80):
        draw.line((x, 0, x, 500), fill=(18, 55, 86), width=1)
    for y in range(0, 501, 80):
        draw.line((0, y, W, y), fill=(18, 55, 86), width=1)
    for x in range(-300, W, 220):
        draw.line((x, 500, x + 330, 0), fill=(18, 59, 92), width=2)
    draw.rectangle((0, 0, 34, H), fill=BLUE)
    draw.rectangle((34, 0, 44, H), fill=GOLD)
    draw.polygon([(0, 0), (520, 0), (420, 500), (0, 500)], fill=(10, 47, 78))


def draw_header(canvas: Image.Image) -> None:
    draw = ImageDraw.Draw(canvas)
    draw_blueprint_background(draw)

    rounded(draw, (90, 55, 420, 93), 19, (232, 241, 248), outline=None)
    draw.text((112, 64), "BOTTLECAPFORYOU.COM", font=FONT_BRAND, fill=BLUE)

    draw.text((90, 130), "PLASTIC CAPS", font=FONT_H1, fill=WHITE)
    draw.text((90, 206), "& CLOSURES MANUFACTURER", font=FONT_H2, fill=(220, 236, 247))
    draw.text((92, 280), "For 5-gallon water bottles", font=FONT_SUB, fill=(179, 205, 224))
    draw.text((92, 325), "ISO-certified supply for bottling plants, distributors and water delivery brands", font=FONT_BODY, fill=(198, 220, 235))

    hero_box = (930, 68, 1338, 382)
    shadow(canvas, hero_box, 18, opacity=36)
    rounded(draw, hero_box, 18, (239, 245, 249), outline=(123, 162, 190), width=2)
    draw.rectangle((930, 68, 1338, 116), fill=(221, 232, 240))
    draw.line((1132, 76, 1132, 108), fill=(179, 199, 214), width=1)
    center_text(draw, (944, 68, 1128, 116), "FACTORY DIRECT", FONT_KICKER, NAVY)
    center_text(draw, (1138, 68, 1324, 116), "OEM / ODM", FONT_KICKER, BLUE)

    paste_product(canvas, SOURCE_DIR / "reusable_1_edited.jpg", (960, 142, 1128, 310), radius=8)
    paste_product(canvas, SOURCE_DIR / "one_time_use_1_edited.jpg", (1138, 142, 1306, 310), radius=8)
    center_text(draw, (954, 328, 1314, 362), "Caps | Liners | Custom Supply", FONT_BODY_BOLD, NAVY)

    badges = [
        ("ISO 9001", BLUE),
        ("ISO 22000", TEAL),
        ("OEM / ODM", INDIGO),
        ("Bulk Orders", GOLD),
        ("Free Samples*", BLUE),
    ]
    x = 90
    for label, color in badges:
        bw = text_box(draw, label, FONT_BADGE)[0] + 46
        rounded(draw, (x, 414, x + bw, 462), 6, (238, 245, 250), outline=(92, 132, 162), width=1)
        draw.rectangle((x, 414, x + 10, 462), fill=color)
        center_text(draw, (x + 10, 414, x + bw, 462), label, FONT_BADGE, NAVY)
        x += bw + 18


def draw_section_title(draw: ImageDraw.ImageDraw) -> None:
    draw.text((90, 545), "PRODUCT RANGE", font=FONT_H2, fill=INK)
    draw.line((90, 606, 1350, 606), fill=LINE, width=2)
    draw.text((905, 556), "Reusable | One-time use | Liner options", font=FONT_BODY, fill=MUTED)


def row_thumb_size(count: int, area_w: int, row_h: int) -> tuple[int, int]:
    gap = 16
    max_size = row_h - 58
    size = min(max_size, (area_w - gap * (count - 1)) // count)
    return size, gap


def draw_spec_lines(draw: ImageDraw.ImageDraw, x: int, y: int, specs: tuple[str, ...]) -> None:
    first_line = "  |  ".join(specs[:2])
    draw.text((x, y), first_line, font=FONT_SPEC, fill=INK)
    if len(specs) > 2:
        draw.text((x, y + 21), specs[2], font=FONT_SPEC_LABEL, fill=MUTED)


def draw_product_row(canvas: Image.Image, row: ProductRow, box: tuple[int, int, int, int]) -> None:
    draw = ImageDraw.Draw(canvas)
    x1, y1, x2, y2 = box
    h = y2 - y1
    shadow(canvas, box, 10)
    rounded(draw, box, 10, WHITE, outline=LINE, width=2)

    label_w = 350
    draw.rectangle((x1, y1, x1 + label_w, y2), fill=(241, 246, 250))
    draw.rectangle((x1, y1, x1 + 12, y2), fill=row.color)
    count_y = y1 + (18 if h < 170 else 26)
    title_y = y1 + (62 if h < 170 else 76)
    subtitle_y = y1 + (92 if h < 170 else 112)
    spec_y = y1 + (116 if h < 170 else 143)
    count_box = (x1 + 32, count_y, x1 + 32 + text_box(draw, row.count, FONT_BADGE)[0] + 34, count_y + 38)
    rounded(draw, count_box, 4, row.color)
    center_text(draw, count_box, row.count, FONT_BADGE, WHITE)

    row_font = FONT_ROW if text_box(draw, row.title, FONT_ROW)[0] < label_w - 52 else FONT_ROW_SMALL
    draw.text((x1 + 32, title_y), row.title, font=row_font, fill=INK)
    draw.text((x1 + 32, subtitle_y), row.subtitle, font=FONT_SMALL, fill=MUTED)
    draw_spec_lines(draw, x1 + 32, spec_y, row.specs)

    count = len(row.files)
    product_area_x = x1 + label_w + 34
    product_area_w = x2 - product_area_x - 34
    size, gap = row_thumb_size(count, product_area_w, h)
    start_x = product_area_x + (product_area_w - (count * size + (count - 1) * gap)) // 2
    y = y1 + (h - size) // 2
    for i, filename in enumerate(row.files):
        x = start_x + i * (size + gap)
        paste_product(canvas, SOURCE_DIR / filename, (x, y, x + size, y + size), radius=8)


def draw_manufacturing_strip(draw: ImageDraw.ImageDraw) -> None:
    strip = (90, 1450, 1350, 1534)
    rounded(draw, strip, 8, (232, 239, 245), outline=LINE, width=1)
    items = [
        ("Factory Direct", "manufacturer supply"),
        ("Product Options", "cap and liner series"),
        ("Quality System", "ISO 9001 / ISO 22000"),
        ("Free Samples*", "shipping cost excluded"),
    ]
    col_w = (strip[2] - strip[0]) // 4
    for i, (label, sub) in enumerate(items):
        x = strip[0] + i * col_w
        if i:
            draw.line((x, strip[1] + 18, x, strip[3] - 18), fill=(202, 216, 228), width=1)
        draw.text((x + 28, strip[1] + 18), label, font=FONT_BODY_BOLD, fill=NAVY)
        draw.text((x + 28, strip[1] + 48), sub, font=FONT_SMALL, fill=MUTED)


def draw_footer(canvas: Image.Image) -> None:
    draw = ImageDraw.Draw(canvas)
    box = (90, 1568, 1350, 1718)
    rounded(draw, box, 10, NAVY)
    draw.rectangle((90, 1568, 132, 1718), fill=GOLD)
    draw.text((158, 1595), "Request free samples* and quotation", font=FONT_CTA, fill=WHITE)
    draw.text((158, 1660), "bottlecapforyou.com", font=FONT_CONTACT, fill=(191, 224, 242))
    draw.text((755, 1660), "WhatsApp: +86 158 1642 7686", font=FONT_CONTACT, fill=(255, 224, 149))
    draw.text((92, 1744), "*Free samples exclude shipping. Dingyuan GaiYe Plastic Manufacturer Ltd. | Caps and closures for 5-gallon water bottles", font=FONT_MICRO, fill=(92, 109, 126))


def create_poster() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    canvas = Image.new("RGBA", (W, H), PAPER + (255,))
    draw = ImageDraw.Draw(canvas)
    draw_header(canvas)
    draw_section_title(draw)

    row_boxes = (
        (90, 635, 1350, 820),
        (90, 842, 1350, 1027),
        (90, 1049, 1350, 1255),
        (90, 1277, 1350, 1428),
    )
    for product_row, box in zip(ROWS, row_boxes):
        draw_product_row(canvas, product_row, box)

    draw_manufacturing_strip(draw)
    draw_footer(canvas)
    canvas.convert("RGB").save(OUTPUT_PATH, "PNG", optimize=True)


if __name__ == "__main__":
    missing = [filename for row in ROWS for filename in row.files if not (SOURCE_DIR / filename).exists()]
    if missing:
        raise FileNotFoundError(f"Missing edited images: {', '.join(missing)}")
    create_poster()
    print(OUTPUT_PATH)
