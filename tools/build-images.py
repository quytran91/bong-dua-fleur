# -*- coding: utf-8 -*-
"""Nén ảnh gốc thành các biến thể mà website dùng.

    python tools/build-images.py        (hoặc: npm run images)

Ảnh gốc nằm ngoài repo vì chúng nặng và chỉ dùng một lần. Kết quả ghi vào
public/ theo cấu trúc:

    public/brand/      logo-original.png (bản gốc, KHÔNG bao giờ sửa)
                       logo-full.png     (đã cắt bỏ khoảng trong suốt thừa)
                       logo-monogram.png (chỉ biểu tượng BD + hoa)
    public/images/hero/       ảnh hero
           images/products/   mẫu hoa
           images/occasions/  thẻ "hoa theo dịp"
           images/founder/    chân dung Thư Phạm
           images/workshops/  ảnh workshop cắm hoa
           images/og/         ảnh bìa khi chia sẻ link

Mỗi ảnh xuất ra WebP nhiều bề rộng + một bản JPEG dự phòng ở bề rộng nhỏ nhất.

Thêm mẫu hoa mới:
    1. Chép ảnh gốc vào thư mục SRC bên dưới.
    2. Thêm một dòng vào SLUG (số thứ tự theo thứ tự tên file đã sắp xếp).
    3. Chạy lại script, rồi thêm sản phẩm vào data/products.ts.

Cần Pillow:  pip install Pillow
"""
import glob
import os
import sys

from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding="utf-8")

SRC = r"C:\Users\Admin\Downloads\bông dua web\ảnh sản phẩm"
WORKSHOP_SRC = r"C:\Users\Admin\Downloads\Quý Claude\bong-dua-workshop\assets\img"
# Ảnh banner hero do user tự tạo, nằm ngoài thư mục ảnh sản phẩm.
HERO_BANNER = r"C:\Users\Admin\Downloads\bông dua web\hero.png"
# Hoạ tiết hoa tách nền, đè lên mép trên khối "Về Bông Dua".
DECOR_HOA = r"C:\Users\Admin\Downloads\bông dua web\hoa-trang-tri.png"
# Logo Zalo — tài sản thương hiệu của Zalo, dùng để nhận diện lối vào kênh chat.
# Không đổi màu, không bóp méo tỷ lệ.
ZALO_LOGO = r"C:\Users\Admin\Downloads\bông dua web\Logo-Zalo-Arc.webp"
PUB = "public"

# Số thứ tự trong danh sách file đã sắp xếp -> tên file không dấu dùng trên web.
SLUG = {
    1: "gio-hong-do-lily", 2: "bo-hong-tim", 3: "bo-hong-cam",
    4: "tulip-va-hop-lan", 5: "bo-hong-do-goi-den", 6: "bo-hong-phan-lon",
    7: "ke-khai-truong-lan", 8: "bo-hong-sen-no-lua", 9: "bo-hong-phan-lily",
    10: "bo-protea-lan-trang", 11: "bo-kem-anthurium", 12: "bo-tot-nghiep",
    13: "bo-hong-phan-lan", 14: "bo-phan-lan-do", 15: "bo-protea-tulip",
    16: "bo-trang-cam-tay", 17: "ke-grand-opening", 18: "sen-can-canh",
    19: "bo-hong-vang-kem", 20: "bo-hong-phan-ren", 21: "doi-ke-hoa-do",
    22: "bo-om-hong-phan",
}

# Ảnh cho tám thẻ "chọn hoa theo dịp".
DIP = {
    11: "sinh-nhat", 8: "tinh-yeu", 15: "ky-niem", 1: "chuc-mung",
    17: "khai-truong", 16: "tot-nghiep", 21: "su-kien", 2: "thiet-ke-rieng",
}

HERO_INDEX = 13      # bó hoa dùng cho ảnh bìa chia sẻ (og-cover)

# Ảnh workshop THẬT, chụp tại buổi workshop cắm hoa của Bông Dua Fleur.
# Nguồn là project landing workshop — không phải ảnh stock, không phải ảnh AI.
WORKSHOP = {
    "gallery-ca-nhom": ("nhom-hoc-vien", 3 / 2),
    "act-cham-vao-hoa": ("ban-tay-cham-hoa", 4 / 5),
    "gallery-khoanh-khac": ("khoanh-khac", 4 / 5),
    "gallery-nang-sen": ("hoc-vien-va-hoa", 4 / 5),
    "act-luu-lai": ("thanh-pham", 4 / 5),
}

R45, R32 = 4 / 5, 3 / 2


def crop(im, ratio, anchor="top"):
    """Cắt về đúng tỷ lệ. Mặc định neo mép trên vì hoa gần như luôn ở nửa trên khung."""
    w, h = im.size
    if w / h > ratio:
        nw = int(round(h * ratio))
        return im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    nh = int(round(w / ratio))
    y = 0 if anchor == "top" else (h - nh) // 2
    return im.crop((0, y, w, y + nh))


def emit(im, folder, slug, widths, ratio, anchor="top"):
    """Xuất WebP cho mọi bề rộng, kèm một bản JPEG ở bề rộng nhỏ nhất làm dự phòng."""
    out = os.path.join(PUB, "images", folder)
    os.makedirs(out, exist_ok=True)
    c = crop(im, ratio, anchor)
    for wd in widths:
        r = c.resize((wd, int(round(wd / ratio))), Image.LANCZOS)
        r.save(f"{out}/{slug}-{wd}.webp", "WEBP", quality=82, method=6)
        if wd == widths[0]:
            r.save(f"{out}/{slug}-{wd}.jpg", "JPEG", quality=84, optimize=True, progressive=True)


def alpha_assets():
    """Hai ảnh có nền trong suốt: hoạ tiết hoa và logo Zalo.

    Xuất WebP để giữ được kênh alpha mà file vẫn nhẹ. KHÔNG đi qua emit() vì
    emit() cắt theo tỷ lệ — cắt sẽ xén mất cánh hoa và bóp méo logo Zalo.
    """
    out = os.path.join(PUB, "images", "decor")
    os.makedirs(out, exist_ok=True)

    hoa = Image.open(DECOR_HOA).convert("RGBA")
    hoa = hoa.crop(hoa.split()[-1].getbbox())          # bỏ viền trong suốt thừa
    for wd in (440, 880):
        r = hoa.resize((wd, round(wd * hoa.height / hoa.width)), Image.LANCZOS)
        r.save(f"{out}/hoa-peony-{wd}.webp", "WEBP", quality=88, method=6)

    # Logo Zalo giữ nguyên khung vuông. 128px đủ nét cho ô 22px ở màn hình 2x.
    zalo = Image.open(ZALO_LOGO).convert("RGBA").resize((128, 128), Image.LANCZOS)
    zalo.save(f"{PUB}/brand/zalo.webp", "WEBP", quality=92, method=6)

    print(f"  decor: hoa-peony {hoa.size} -> 440/880 · zalo 128x128")


def logo_assets():
    """Ba biến thể logo. Bản gốc được chép nguyên, không bao giờ bị sửa.

    Logo gốc là lockup dọc: biểu tượng ở trên, hai dòng chữ ở dưới, ngăn cách bởi
    một dải trong suốt hoàn toàn. Thu cả lockup về 48px thì hai dòng chữ chỉ còn là
    vệt mờ, nên navbar và favicon dùng riêng phần biểu tượng.
    """
    os.makedirs(f"{PUB}/brand", exist_ok=True)
    src = Image.open(os.path.join(WORKSHOP_SRC, "logo-400.png")).convert("RGBA")
    src.save(f"{PUB}/brand/logo-original.png")

    # logo-full: chỉ cắt khoảng trong suốt thừa, giữ nguyên mọi chi tiết và tỷ lệ.
    full = src.crop(src.split()[-1].getbbox())
    full.save(f"{PUB}/brand/logo-full.png")

    # logo-monogram: dải ngang trống đầu tiên nằm dưới nửa trên chính là ranh giới
    # giữa biểu tượng và phần chữ.
    alpha = src.split()[-1]
    w, h = src.size
    dac = [sum(1 for x in range(w) if alpha.getpixel((x, y)) > 40) for y in range(h)]
    cat = next((y for y in range(int(h * 0.55), h) if dac[y] == 0), int(h * 0.68))

    mark = src.crop((0, 0, w, cat))
    mark = mark.crop(mark.split()[-1].getbbox())
    side = int(max(mark.size) * 1.16)              # chừa lề ~8% cho vùng an toàn
    sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    sq.alpha_composite(mark, ((side - mark.width) // 2, (side - mark.height) // 2))
    sq.resize((512, 512), Image.LANCZOS).save(f"{PUB}/brand/logo-monogram.png")

    print(f"  brand: logo-full {full.size}, logo-monogram 512x512")
    return full


def og_cover(files, logo_full):
    """Ảnh bìa 1200x630 hiện khi dán link lên Facebook, Zalo, tin nhắn.

    Full logo + một bó hoa thật, trên nền Deep Navy — đúng nền mà logo được thiết
    kế để đứng trên.
    """
    W, H = 1200, 630
    navy, gold, aqua = (2, 13, 45), (216, 179, 106), (0, 207, 232)
    bg = Image.new("RGB", (W, H), navy)

    # Ảnh hoa chiếm nửa phải, tan dần về trái để chữ luôn nằm trên nền phẳng.
    photo = crop(Image.open(files[HERO_INDEX - 1]).convert("RGB"), 1.0).resize((H, H), Image.LANCZOS)
    mask = Image.new("L", (H, H))
    md = ImageDraw.Draw(mask)
    for x in range(H):
        md.line([(x, 0), (x, H)], fill=int(255 * min(1.0, x / (H * 0.55))))
    bg.paste(photo, (W - H, 0), mask)

    d = ImageDraw.Draw(bg)
    lg = logo_full.copy()
    lg.thumbnail((170, 170), Image.LANCZOS)
    bg.paste(lg, (64, 54), lg)

    font = "C:/Windows/Fonts/%s"
    f_head = ImageFont.truetype(font % "segoeuib.ttf", 44)
    f_slog = ImageFont.truetype(font % "segoeuii.ttf", 25)
    f_meta = ImageFont.truetype(font % "segoeui.ttf", 21)

    d.text((64, 274), "Gửi một bó hoa.", font=f_head, fill=(255, 255, 255))
    d.text((64, 328), "Giữ lại một khoảnh khắc.", font=f_head, fill=(255, 255, 255))
    d.line([(66, 404), (152, 404)], fill=gold, width=2)
    d.text((64, 424), "Hoa tươi cho những ngày muốn chậm lại.", font=f_slog, fill=aqua)
    d.text((64, 474), "Tiệm hoa tươi tại Hà Nội  ·  0356 622 262", font=f_meta, fill=(198, 210, 230))

    os.makedirs(f"{PUB}/images/og", exist_ok=True)
    bg.save(f"{PUB}/images/og/cover.jpg", "JPEG", quality=88, optimize=True, progressive=True)


def main():
    files = sorted(glob.glob(os.path.join(SRC, "*.jpg")))
    if not files:
        sys.exit(f"Không tìm thấy ảnh gốc trong {SRC}")

    logo_full = logo_assets()

    for n, slug in SLUG.items():
        im = Image.open(files[n - 1]).convert("RGB")
        if slug == "sen-can-canh":                       # ảnh ngang duy nhất -> dải nền
            emit(im, "hero", "dai-sen", [1200, 2000], R32, "center")
        else:
            emit(im, "products", slug, [640, 1280], R45)

    # Banner hero. Ảnh gốc có ~45% bên trái là nền navy tối hẳn (độ sáng đo được
    # 8–23/255) — đúng chỗ đặt logo và tiêu đề. Hai BẢN CẮT KHÁC NHAU, không phải
    # hai kích thước của cùng một bản: desktop giữ nguyên 16:9 để chữ nằm trên
    # vùng tối bên trái; mobile bỏ vùng tối đó đi vì trên màn hình hẹp ảnh nằm
    # DƯỚI phần chữ, chỉ cần hoa.
    banner = Image.open(HERO_BANNER).convert("RGB")
    emit(banner, "hero", "banner", [1200, 2400], 16 / 9)

    bw, bh = banner.size
    emit(banner.crop((int(bw * 0.36), 0, bw, bh)), "hero", "banner-mb", [720, 1440], R32, "center")

    for n, dip in DIP.items():
        emit(Image.open(files[n - 1]).convert("RGB"), "occasions", dip, [480, 960], R45)

    for src_name, (slug, ratio) in WORKSHOP.items():
        # Project workshop lưu mỗi ảnh ở vài bề rộng khác nhau (1440/1366/1320…),
        # nên lấy bản lớn nhất thay vì đoán một con số cố định.
        canh = sorted(glob.glob(os.path.join(WORKSHOP_SRC, f"{src_name}-*.jpg")),
                      key=lambda f: Image.open(f).size[0])
        if not canh:
            sys.exit(f"Không tìm thấy ảnh workshop {src_name} trong {WORKSHOP_SRC}")
        emit(Image.open(canh[-1]).convert("RGB"), "workshops", slug, [640, 1280], ratio)

    emit(Image.open(os.path.join(WORKSHOP_SRC, "founder-1320.jpg")).convert("RGB"),
         "founder", "thu-pham", [640, 1280], R45)

    alpha_assets()
    og_cover(files, logo_full)

    tong = sum(len(fs) for _, _, fs in os.walk(PUB))
    print(f"Xong. {tong} file trong {PUB}/")


if __name__ == "__main__":
    main()
