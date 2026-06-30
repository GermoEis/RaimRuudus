from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
ASSET_LOGO = ROOT / "src" / "assets" / "raim-ruudus-logo-transparent.png"

W, H = 1489, 2105
BLACK = (14, 18, 18)
WHITE = (255, 255, 255)

FONT_DIR = Path("C:/Windows/Fonts")
REG = str(FONT_DIR / "times.ttf")
BOLD = str(FONT_DIR / "timesbd.ttf")
ITALIC = str(FONT_DIR / "timesi.ttf")


def font(path, size):
    return ImageFont.truetype(path, size)


F = {
    "section": font(REG, 66),
    "section_small": font(REG, 54),
    "price_head": font(BOLD, 36),
    "item": font(REG, 48),
    "item_bold": font(BOLD, 48),
    "price": font(REG, 38),
    "note": font(REG, 25),
    "note_small": font(REG, 21),
    "cocktail_title": font(BOLD, 48),
    "cocktail": font(REG, 35),
    "cocktail_price": font(REG, 27),
    "souvenir": font(REG, 31),
    "souvenir_note": font(REG, 22),
    "footer": font(BOLD, 37),
}


def text_size(draw, text, fnt):
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0], box[3] - box[1]


def draw_center(draw, y, text, fnt, fill=BLACK):
    tw, _ = text_size(draw, text, fnt)
    draw.text(((W - tw) / 2, y), text, font=fnt, fill=fill)


def draw_right(draw, x, y, text, fnt, fill=BLACK):
    tw, _ = text_size(draw, text, fnt)
    draw.text((x - tw, y), text, font=fnt, fill=fill)


def draw_borders(draw):
    draw.rectangle((32, 32, W - 32, H - 32), outline=BLACK, width=4)
    draw.rectangle((45, 45, W - 45, H - 45), outline=BLACK, width=2)


def paste_logo(img, y=88, width=780):
    logo = Image.open(ASSET_LOGO).convert("RGBA")
    ratio = width / logo.width
    resized = logo.resize((width, int(logo.height * ratio)), Image.Resampling.LANCZOS)
    img.alpha_composite(resized, ((W - width) // 2, y))


def banner(draw, y, text, width=1260, fnt=None):
    fnt = fnt or F["section"]
    h = 92
    x = (W - width) / 2
    cut = 42
    pts = [
        (x + cut, y),
        (x + width - cut, y),
        (x + width, y + h / 2),
        (x + width - cut, y + h),
        (x + cut, y + h),
        (x, y + h / 2),
    ]
    draw.line(pts + [pts[0]], fill=BLACK, width=3, joint="curve")
    tw, th = text_size(draw, text, fnt)
    draw.text(((W - tw) / 2, y + (h - th) / 2 - 8), text, font=fnt, fill=BLACK)


def draw_footer(draw, text):
    draw_center(draw, H - 185, text, F["footer"])
    y = H - 88
    draw.line((105, y, 490, y), fill=BLACK, width=3)
    draw.line((1000, y, W - 105, y), fill=BLACK, width=3)
    draw_wave(draw, 570, y, 138)
    draw_fish(draw, W // 2, y - 1, scale=1.1)
    draw_wave(draw, 795, y, 138)


def draw_wave(draw, x, y, width):
    import math

    points = []
    for i in range(width + 1):
        px = x + i
        py = y + math.sin(i / width * math.pi * 4) * 7
        points.append((px, py))
    draw.line(points, fill=BLACK, width=3)


def draw_fish(draw, cx, cy, scale=1.0):
    body_w = 48 * scale
    body_h = 26 * scale
    tail_w = 30 * scale
    draw.ellipse((cx - body_w / 2, cy - body_h / 2, cx + body_w / 2, cy + body_h / 2), fill=BLACK)
    draw.polygon(
        [
            (cx + body_w / 2 - 3 * scale, cy),
            (cx + body_w / 2 + tail_w, cy - body_h / 2),
            (cx + body_w / 2 + tail_w, cy + body_h / 2),
        ],
        fill=BLACK,
    )
    draw.ellipse((cx - 12 * scale, cy - 5 * scale, cx - 5 * scale, cy + 2 * scale), fill=WHITE)


def line_item(draw, x, price_x, y, name, price, note=None, item_font=None, note_font=None, price_font=None):
    item_font = item_font or F["item"]
    note_font = note_font or F["note"]
    price_font = price_font or F["price"]
    draw.text((x, y), name, font=item_font, fill=BLACK)
    if price:
        draw_right(draw, price_x, y + 5, price, price_font)
    if note:
        draw.text((x, y + 47), f"({note})", font=note_font, fill=BLACK)
        return y + 84
    return y + 70


def wrap_text(draw, text, fnt, max_width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = word if not current else f"{current} {word}"
        if text_size(draw, candidate, fnt)[0] <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def cocktail(draw, x, price_x, y, name, note, price, name_font=None):
    name_font = name_font or F["cocktail"]
    draw.text((x, y), name, font=name_font, fill=BLACK)
    if price:
        if "\n" in price:
            for i, part in enumerate(price.split("\n")):
                draw_right(draw, price_x, y + 4 + i * 30, part, F["cocktail_price"])
        else:
            draw_right(draw, price_x, y + 4, price, F["cocktail_price"])
    note_lines = wrap_text(draw, note, F["note_small"], 400)
    for i, line in enumerate(note_lines[:2]):
        draw.text((x, y + 40 + i * 24), f"({line}" if i == 0 else line, font=F["note_small"], fill=BLACK)
    if note_lines:
        # Close the parenthesis on the final rendered line.
        last_i = min(len(note_lines), 2) - 1
        if not note_lines[last_i].endswith(")"):
            lx, ly = x, y + 40 + last_i * 24
            line = (f"({note_lines[last_i]}" if last_i == 0 else note_lines[last_i]) + ")"
            draw.rectangle((lx, ly, lx + 430, ly + 28), fill=WHITE)
            draw.text((lx, ly), line, font=F["note_small"], fill=BLACK)
    return y + 66 + max(0, len(note_lines[:2]) - 1) * 18


def base_page():
    img = Image.new("RGBA", (W, H), WHITE + (255,))
    draw = ImageDraw.Draw(img)
    draw_borders(draw)
    paste_logo(img)
    return img, draw


ET_NON_ALC = [
    ("Kohv", "2.5-3.5€", None),
    ("Tee", "2€", None),
    ("Vesi 0,5l", "2€", "Gaasiga ja gaasita"),
    ("Coca, Fanta, Sprite 0,33l", "3€", None),
    ("Kõrremahl", "2.50€", None),
    ("Merineitsi limonaad", "5€", "Sprite, jõhvikamahl, sidrunimahl, jää"),
    ("Mereröövli limonaad", "5€", "Apelsinimahl, Sprite, Grenadiinisiirup, jää"),
    ("Alkoholivaba õlu 0,5l", "4€", None),
    ("Pringles krõpsud", "4€", None),
    ("Jäätis", "3€", "küsi saadavust"),
    ("Snickers/Mars/Bounty", "2.50€", None),
    ("Purgi snäkid", "4€", None),
]

EN_NON_ALC = [
    ("Coffee", "2.5-3.5€", None),
    ("Tea", "2€", None),
    ("Water 0.5l", "2€", "sparkling and still"),
    ("Coca, Fanta, Sprite 0.33l", "3€", None),
    ("Kõrre juice", "2.50€", None),
    ("Mermaid lemonade", "5€", "Sprite, cranberry juice, lemon juice, ice"),
    ("Pirate lemonade", "5€", "orange juice, Sprite, grenadine syrup, ice"),
    ("Non-alcoholic beer 0.5l", "4€", None),
    ("Pringles crisps", "4€", None),
    ("Ice cream", "3€", "ask availability"),
    ("Snickers/Mars/Bounty", "2.50€", None),
    ("Packaged snacks", "4€", None),
]

ET_ALC = [
    ("Õlu 0,33l", "4€", None),
    ("Õlu Sass 0,568l", "6€", None),
    ("Long Drink", "5€", None),
    ("Siider 0,33l", "5€", "õuna, pirni"),
    ("Kange alkohol 4cl", "6€", None),
    ("Viin 4cl", "5€", None),
    ("Pits viina ja kurgid", "7€", None),
    ("Nudist", "5€/6€", "Aperol Spritz, Rabarbra, õlu Reimo"),
    ("Vaadiõlu", "0,33l 4€\n0,5l 6€", "küsi saadavust"),
]

EN_ALC = [
    ("Beer 0.33l", "4€", None),
    ("Beer Sass 0.568l", "6€", None),
    ("Long Drink", "5€", None),
    ("Cider 0.33l", "5€", "apple, pear"),
    ("Spirits 4cl", "6€", None),
    ("Vodka 4cl", "5€", None),
    ("Vodka shot and pickles", "7€", None),
    ("Nudist", "5€/6€", "Aperol Spritz, rhubarb, Reimo beer"),
    ("Draught beer", "0.33l 4€\n0.5l 6€", "ask availability"),
]

ET_COCKTAILS = [
    ("Rum Cola", "tume rumm, Coca-Cola, jää, laimiviil", "4cl 10€\n8cl 12€"),
    ("Blue Lagoon", "Viin, Blue Curacao, sidrunilimonaad, jää", "12€"),
    ("Gin Tonic", "Gin, toonik, jää, laim", "4cl 10€\n8cl 12€"),
    ("Sunrise", "tekiila, apelsinimahl, grenadiin, jää", "10€"),
    ("Aperol Spritz", "Prosecco, Aperol, soodavesi, jää, apelsiniviil", "12€"),
    ("Mimosa", "Prosecco, apelsinimahl", "10€"),
    ("Grinch Mimosa", "Apelsinimahl, curacao, prosecco, jää", "12€"),
    ("Bloody Mary", "Viin, tomatimahl, sool, pipar, tabasco, laim, jää", "4cl 10€\n8cl 12€"),
    ("Männiku Sunset", "Gin, Prosecco, apelsinimahl, jõhvikamahl, sidrunimahl, grenadiin, roosa toonik", "10€"),
]

EN_COCKTAILS = [
    ("Rum Cola", "dark rum, Coca-Cola, ice, lime wedge", "4cl 10€\n8cl 12€"),
    ("Blue Lagoon", "vodka, blue curacao, lemon soda, ice", "12€"),
    ("Gin Tonic", "gin, tonic, ice, lime", "4cl 10€\n8cl 12€"),
    ("Sunrise", "tequila, orange juice, grenadine, ice", "10€"),
    ("Aperol Spritz", "Prosecco, Aperol, soda water, ice, orange slice", "12€"),
    ("Mimosa", "Prosecco, orange juice", "10€"),
    ("Grinch Mimosa", "orange juice, curacao, prosecco, ice", "12€"),
    ("Bloody Mary", "vodka, tomato juice, salt, pepper, tabasco, lime, ice", "4cl 10€\n8cl 12€"),
    ("Männiku Sunset", "gin, Prosecco, orange, cranberry, lemon, grenadine, pink tonic", "10€"),
]

ET_SOUVENIRS = [
    ("T-Särk", "25€", None),
    ("Kruus", "20€", None),
    ("Rätik", "15€", None),
    ("Gaasigrilli rent", "40€/1h. Iga järgnev tund 30€", None),
    ("Puudugrilli rent", "30€/1h. Iga järgnev tund 25€.", None),
    ("Mõrvamüsteerium seltskonnale", "5€ ja raskem versioon 10€", "küsi saadavust"),
    ('Näitus "Meri tõi"', "Tasuta", None),
]

EN_SOUVENIRS = [
    ("T-shirt", "25€", None),
    ("Mug", "20€", None),
    ("Towel", "15€", None),
    ("Gas grill rental", "40€/1h. Each following hour 30€", None),
    ("Charcoal grill rental", "30€/1h. Each following hour 25€.", None),
    ("Murder mystery for groups", "5€ and harder version 10€", "ask availability"),
    ('Exhibition "Meri tõi"', "Free", None),
]


def draw_non_alc(lang):
    img, draw = base_page()
    title = "Alkoholivabad joogid & suupisted" if lang == "et" else "Non-alcoholic drinks & snacks"
    price = "HIND" if lang == "et" else "PRICE"
    footer = "Tellimine baari letist" if lang == "et" else "Order at the bar counter"
    data = ET_NON_ALC if lang == "et" else EN_NON_ALC
    banner(draw, 375, title)
    draw_right(draw, W - 140, 470, price, F["price_head"])
    y = 555
    for name, item_price, note in data:
        y = line_item(draw, 125, W - 140, y, name, item_price, note)
    draw_footer(draw, footer)
    return img.convert("RGB")


def draw_alc(lang):
    img, draw = base_page()
    title = "Alkohoolsed joogid" if lang == "et" else "Alcoholic drinks"
    price = "HIND" if lang == "et" else "PRICE"
    cocktail_head = "Kokteilid:" if lang == "et" else "Cocktails:"
    souvenirs = "Meened ja teenused" if lang == "et" else "Souvenirs and services"
    footer = "Tellimine baari letist" if lang == "et" else "Order at the bar counter"
    left = ET_ALC if lang == "et" else EN_ALC
    cocktails = ET_COCKTAILS if lang == "et" else EN_COCKTAILS
    souvenir_rows = ET_SOUVENIRS if lang == "et" else EN_SOUVENIRS

    banner(draw, 375, title)
    draw_right(draw, 735, 500, price, F["price_head"])
    draw_right(draw, W - 135, 500, price, F["price_head"])
    y = 570
    for name, item_price, note in left:
        if "\n" in item_price:
            draw.text((115, y), name, font=F["item"], fill=BLACK)
            draw_right(draw, 735, y + 5, item_price.split("\n")[0], F["price"])
            draw_right(draw, 735, y + 42, item_price.split("\n")[1], F["price"])
            if note:
                draw.text((115, y + 48), f"({note})", font=F["note"], fill=BLACK)
            y += 89
        else:
            y = line_item(draw, 115, 735, y, name, item_price, note)

    draw.text((815, 548), cocktail_head, font=F["cocktail_title"], fill=BLACK)
    y = 615
    for name, note, item_price in cocktails:
        y = cocktail(draw, 815, W - 125, y, name, note, item_price)

    banner(draw, 1432, souvenirs, width=980, fnt=F["section_small"])
    draw_right(draw, W - 135, 1467, price, F["price_head"])
    y = 1538
    for name, item_price, note in souvenir_rows:
        draw.text((125, y), name, font=F["souvenir"], fill=BLACK)
        fnt = F["souvenir"] if len(item_price) < 14 else F["souvenir_note"]
        draw_right(draw, W - 135, y + 2, item_price, fnt)
        if note:
            draw.text((125, y + 33), f"({note})", font=F["souvenir_note"], fill=BLACK)
            y += 68
        else:
            y += 51
    draw_footer(draw, footer)
    return img.convert("RGB")


def save_set(lang, prefix):
    p1 = draw_non_alc(lang)
    p2 = draw_alc(lang)
    page1 = PUBLIC / f"{prefix}-page-1.png"
    page2 = PUBLIC / f"{prefix}-page-2.png"
    pdf = PUBLIC / f"{prefix}.pdf"
    p1.save(page1, optimize=True)
    p2.save(page2, optimize=True)
    p1.save(pdf, "PDF", resolution=150.0, save_all=True, append_images=[p2])
    return [page1, page2, pdf]


def main():
    created = []
    created += save_set("et", "raim-ruudus-menu")
    created += save_set("en", "raim-ruudus-menu-en")
    # Keep the legacy root PDF in sync with the Estonian menu.
    (ROOT / "raim_ruudus_menüü.pdf").write_bytes((PUBLIC / "raim-ruudus-menu.pdf").read_bytes())
    for path in created:
        print(path.relative_to(ROOT))
    print("raim_ruudus_menüü.pdf")


if __name__ == "__main__":
    main()
