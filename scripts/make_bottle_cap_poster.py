from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


SOURCE_DIR = Path(r"C:\Users\ahsih\OneDrive\外贸\Bottle_Caps")
OUTPUT_DIR = Path(r"C:\Work\BottleCapForYou\outputs")
OUTPUT_PATH = OUTPUT_DIR / "bottle_cap_facebook_poster.png"

CANVAS_W = 1440
CANVAS_H = 1800


@dataclass(frozen=True)
class CapGroup:
    key: str
    title: str
    count_label: str
    tagline: str
    accent: tuple[int, int, int]
    filenames: tuple[str, ...]


GROUPS = (
    CapGroup(
        key="reusable",
        title="REUSABLE CAPS",
        count_label="5 styles",
        tagline="Durable closure for repeat use",
        accent=(0, 113, 188),
        filenames=(
            "reusable_1.jpg",
            "reusable_2.jpg",
            "reusable_3.jpg",
            "reusable_4.jpg",
            "reusable_5.jpg",
        ),
    ),
    CapGroup(
        key="one_time_use",
        title="ONE-TIME USE CAPS",
        count_label="4 styles",
        tagline="Fresh single-use sealing option",
        accent=(0, 138, 123),
        filenames=(
            "one_time_use_1.jpg",
            "one_time_use_2.jpg",
            "one_time_use_3.jpg",
            "one_time_use_4.jpg",
        ),
    ),
    CapGroup(
        key="reusable_liner",
        title="REUSABLE CAPS + LINER",
        count_label="7 styles",
        tagline="Reusable body with liner protection",
        accent=(59, 83, 164),
        filenames=(
            "reusable_liner_1.jpg",
            "reusable_liner_2.jpg",
            "reusable_liner_3.jpg",
            "reusable_liner_4.jpg",
            "reusable_liner_5.jpg",
            "reusable_liner_6.jpg",
            "reusable_liner_7.jpg",
        ),
    ),
    CapGroup(
        key="one_time_use_liner",
        title="ONE-TIME USE CAPS + LINER",
        count_label="2 styles",
        tagline="Tamper-evident cap with liner",
        accent=(203, 143, 32),
        filenames=(
            "one_time_use_liner_1.jpg",
            "one_time_use_liner_2.jpg",
        ),
    ),
)


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    candidates = [
        Path(r"C:\Windows\Fonts") / name,
        Path("/usr/share/fonts/truetype/dejavu") / name,
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default(size=size)


FONT_BLACK = font("arialbd.ttf", 72)
FONT_TITLE = font("arialbd.ttf", 58)
FONT_H2 = font("arialbd.ttf", 33)
FONT_H2_SMALL = font("arialbd.ttf", 29)
FONT_BODY = font("arial.ttf", 25)
FONT_BODY_BOLD = font("arialbd.ttf", 25)
FONT_SMALL = font("arial.ttf", 22)
FONT_BADGE = font("arialbd.ttf", 22)
FONT_CTA = font("arialbd.ttf", 38)
FONT_CONTACT = font("arialbd.ttf", 30)
FONT_MICRO = font("arial.ttf", 19)


def rounded_rect(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    radius: int,
    fill: tuple[int, int, int] | tuple[int, int, int, int],
    outline: tuple[int, int, int] | None = None,
    width: int = 1,
) -> None:
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def text_size(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont) -> tuple[int, int]:
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0], box[3] - box[1]


def draw_centered_text(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    text: str,
    fnt: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int],
) -> None:
    w, h = text_size(draw, text, fnt)
    x = box[0] + (box[2] - box[0] - w) // 2
    y = box[1] + (box[3] - box[1] - h) // 2 - 1
    draw.text((x, y), text, font=fnt, fill=fill)


def crop_to_product(image: Image.Image) -> Image.Image:
    rgb = image.convert("RGB")
    pix = rgb.load()
    w, h = rgb.size
    xs: list[int] = []
    ys: list[int] = []
    step = 4

    for y in range(0, h, step):
        for x in range(0, w, step):
            r, g, b = pix[x, y]
            max_c = max(r, g, b)
            min_c = min(r, g, b)
            is_blue = b > 85 and (b - r > 22 or b - g > 10)
            is_liner_gray = max_c < 210 and (max_c - min_c) < 45
            if is_blue or is_liner_gray:
                xs.append(x)
                ys.append(y)

    if not xs or not ys:
        return image

    left, right = max(0, min(xs) - 85), min(w, max(xs) + 85)
    top, bottom = max(0, min(ys) - 85), min(h, max(ys) + 85)
    if right - left < 240 or bottom - top < 240:
        return image
    return image.crop((left, top, right, bottom))


def prepare_product(path: Path, tile_w: int, tile_h: int) -> Image.Image:
    img = Image.open(path).convert("RGB")
    img = ImageEnhance.Color(img).enhance(1.08)
    img = ImageEnhance.Contrast(img).enhance(1.07)
    img = ImageEnhance.Brightness(img).enhance(1.04)
    img = crop_to_product(img)
    img.thumbnail((tile_w - 28, tile_h - 28), Image.Resampling.LANCZOS)

    tile = Image.new("RGB", (tile_w, tile_h), (249, 252, 255))
    tx = (tile_w - img.width) // 2
    ty = (tile_h - img.height) // 2
    tile.paste(img, (tx, ty))
    return tile


def make_round_mask(size: tuple[int, int], radius: int) -> Image.Image:
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    return mask


def paste_tile(canvas: Image.Image, tile: Image.Image, box: tuple[int, int, int, int]) -> None:
    x1, y1, x2, y2 = box
    tile = tile.resize((x2 - x1, y2 - y1), Image.Resampling.LANCZOS)
    mask = make_round_mask(tile.size, 22)

    shadow = Image.new("RGBA", (tile.width + 18, tile.height + 18), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle((9, 9, tile.width + 9, tile.height + 9), radius=22, fill=(20, 42, 70, 30))
    shadow = shadow.filter(ImageFilter.GaussianBlur(9))
    canvas.alpha_composite(shadow, (x1 - 9, y1 - 5))

    rgba_tile = tile.convert("RGBA")
    canvas.paste(rgba_tile, (x1, y1), mask)


def draw_badge(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    label: str,
    accent: tuple[int, int, int],
) -> None:
    x, y = xy
    w, h = text_size(draw, label, FONT_BADGE)
    box = (x, y, x + w + 34, y + 42)
    rounded_rect(draw, box, 21, (255, 255, 255), outline=(205, 220, 232), width=2)
    draw.ellipse((x + 12, y + 12, x + 28, y + 28), fill=accent)
    draw.text((x + 38, y + 9), label, font=FONT_BADGE, fill=(21, 43, 68))


def draw_header(canvas: Image.Image) -> None:
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((0, 0, CANVAS_W, 360), fill=(235, 246, 253))
    draw.polygon([(0, 0), (460, 0), (330, 360), (0, 360)], fill=(219, 240, 250))
    draw.rectangle((0, 0, 26, CANVAS_H), fill=(0, 113, 188))
    draw.rectangle((26, 0, 36, CANVAS_H), fill=(203, 143, 32))

    draw.text((90, 58), "BOTTLECAPFORYOU.COM", font=FONT_BODY_BOLD, fill=(0, 113, 188))
    draw.text((90, 102), "5-GALLON WATER", font=FONT_BLACK, fill=(11, 36, 62))
    draw.text((90, 181), "BOTTLE CAPS & CLOSURES", font=FONT_TITLE, fill=(11, 36, 62))
    draw.text(
        (92, 263),
        "Reusable and one-time-use options for water bottling and delivery",
        font=FONT_BODY,
        fill=(70, 88, 106),
    )

    draw_badge(draw, (1035, 82), "ISO 9001", (0, 113, 188))
    draw_badge(draw, (1035, 138), "ISO 22000", (0, 138, 123))
    rounded_rect(draw, (1016, 218, 1338, 304), 24, (11, 36, 62))
    draw_centered_text(draw, (1016, 218, 1338, 260), "OEM / ODM", FONT_CONTACT, (255, 255, 255))
    draw_centered_text(draw, (1016, 256, 1338, 304), "Manufacturer Direct", FONT_BODY_BOLD, (184, 224, 245))


def draw_group_card(
    canvas: Image.Image,
    group: CapGroup,
    box: tuple[int, int, int, int],
) -> None:
    draw = ImageDraw.Draw(canvas)
    x1, y1, x2, y2 = box
    w, h = x2 - x1, y2 - y1

    shadow = Image.new("RGBA", (w + 30, h + 30), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.rounded_rectangle((15, 15, w + 15, h + 15), radius=28, fill=(18, 39, 64, 28))
    shadow = shadow.filter(ImageFilter.GaussianBlur(13))
    canvas.alpha_composite(shadow, (x1 - 15, y1 - 10))

    rounded_rect(draw, box, 26, (255, 255, 255), outline=(213, 226, 237), width=2)
    draw.rounded_rectangle((x1, y1, x2, y1 + 78), radius=26, fill=group.accent)
    draw.rectangle((x1, y1 + 42, x2, y1 + 78), fill=group.accent)

    title_font = FONT_H2 if text_size(draw, group.title, FONT_H2)[0] < w - 190 else FONT_H2_SMALL
    draw.text((x1 + 28, y1 + 22), group.title, font=title_font, fill=(255, 255, 255))
    pill_w = text_size(draw, group.count_label, FONT_SMALL)[0] + 34
    rounded_rect(draw, (x2 - pill_w - 24, y1 + 20, x2 - 24, y1 + 54), 17, (255, 255, 255))
    draw_centered_text(draw, (x2 - pill_w - 24, y1 + 20, x2 - 24, y1 + 54), group.count_label, FONT_SMALL, group.accent)
    draw.text((x1 + 28, y1 + 92), group.tagline, font=FONT_BODY, fill=(73, 91, 109))

    area_x = x1 + 28
    area_y = y1 + 135
    area_w = w - 56
    area_h = h - 170
    files = [SOURCE_DIR / name for name in group.filenames]

    if len(files) <= 2:
        cols, rows = 2, 1
    elif len(files) <= 4:
        cols, rows = 2, 2
    elif len(files) <= 5:
        cols, rows = 3, 2
    else:
        cols, rows = 4, 2

    gap = 16
    tile_w = (area_w - gap * (cols - 1)) // cols
    tile_h = (area_h - gap * (rows - 1)) // rows

    for idx, path in enumerate(files):
        row = idx // cols
        col = idx % cols
        if row >= rows:
            break
        tx = area_x + col * (tile_w + gap)
        ty = area_y + row * (tile_h + gap)
        if len(files) == 5 and idx == 4:
            tx = area_x + tile_w + gap // 2
        if len(files) == 2:
            tile_w_actual = (area_w - gap) // 2
            tx = area_x + idx * (tile_w_actual + gap)
            tile_w_use = tile_w_actual
        else:
            tile_w_use = tile_w
        tile = prepare_product(path, tile_w_use, tile_h)
        paste_tile(canvas, tile, (tx, ty, tx + tile_w_use, ty + tile_h))


def draw_footer(canvas: Image.Image) -> None:
    draw = ImageDraw.Draw(canvas)
    rounded_rect(draw, (90, 1550, 1350, 1718), 34, (11, 36, 62))
    draw.rectangle((90, 1550, 128, 1718), fill=(203, 143, 32))
    draw.text((150, 1582), "Contact us for free samples, product information and MOQ", font=FONT_CTA, fill=(255, 255, 255))
    draw.text((150, 1648), "Website: bottlecapforyou.com", font=FONT_CONTACT, fill=(184, 224, 245))
    draw.text((760, 1648), "WhatsApp: +86 158 1642 7686", font=FONT_CONTACT, fill=(255, 224, 150))
    draw.text(
        (92, 1742),
        "High-quality caps and closures for 5-gallon water bottles | ISO certified manufacturer",
        font=FONT_MICRO,
        fill=(95, 113, 128),
    )


def create_poster() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (247, 250, 252, 255))
    draw_header(canvas)

    card_boxes = (
        (90, 410, 700, 925),
        (740, 410, 1350, 925),
        (90, 975, 700, 1490),
        (740, 975, 1350, 1490),
    )
    for group, box in zip(GROUPS, card_boxes):
        draw_group_card(canvas, group, box)

    draw_footer(canvas)
    canvas.convert("RGB").save(OUTPUT_PATH, "PNG", optimize=True)


if __name__ == "__main__":
    missing = [name for group in GROUPS for name in group.filenames if not (SOURCE_DIR / name).exists()]
    if missing:
        raise FileNotFoundError(f"Missing source images: {', '.join(missing)}")
    create_poster()
    print(OUTPUT_PATH)
