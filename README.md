# Bông Dua Fleur — website chính

Landing page portfolio cho tiệm hoa tươi Bông Dua Fleur (Hà Nội). Trang giới thiệu
sản phẩm và nhận yêu cầu tư vấn — **không** có giá, giỏ hàng, thanh toán hay tài
khoản. Khách xem mẫu rồi nhắn Zalo/Facebook để được tư vấn thủ công.

Next.js 16 · TypeScript · Tailwind CSS v4 · App Router · xuất ra HTML tĩnh.

---

## Chạy trên máy

```bash
npm install
npm run dev
```

Mở http://localhost:3000

| Lệnh | Việc |
|---|---|
| `npm run dev` | Chạy bản phát triển, sửa file là tự cập nhật |
| `npm run build` | Dựng bản tĩnh, kết quả nằm trong thư mục `out/` |
| `npm run lint` | Soát lỗi code |
| `npm run typecheck` | Soát lỗi kiểu dữ liệu |
| `npm run images` | Nén lại toàn bộ ảnh từ thư mục ảnh gốc (cần `pip install Pillow`) |

---

## Concept thiết kế

Học ngôn ngữ editorial của Urban Flora — khoảng thở rộng, tiêu đề serif lớn, nhãn
nhỏ chữ hoa giãn cách, lưới ảnh lệch tầng, góc gần vuông — rồi thay toàn bộ bảng
màu và nhận diện bằng chính logo Bông Dua Fleur.

**Nhịp sáng–tối** của trang, đọc từ trên xuống:

```
navy → trắng → mist → trắng → NAVY → mist → trắng → mist → trắng → navy → navy
hero   dịp     mẫu    Thư     khác   quy    work    doanh  fb      CTA    footer
                              biệt   trình  shop    nghiệp
```

Ba mảng navy chia trang thành ba chương. Phần lớn trang là nền sáng để **ảnh hoa
giữ được màu thật** — đây là lý do không phủ xanh toàn trang.

**Champagne Gold** chỉ xuất hiện ở đường kẻ mảnh, số thứ tự và mã mẫu. Không bao
giờ làm mảng nền lớn.

---

## Ba biến thể logo

`npm run images` tự sinh cả ba từ file gốc, **không bao giờ ghi đè bản gốc**:

| File | Dùng ở đâu | Ghi chú |
|---|---|---|
| `public/brand/logo-original.png` | (lưu trữ) | Bản gốc, đừng sửa |
| `public/brand/logo-full.png` | Hero (165/245px), footer (170px), ảnh chia sẻ | Đã cắt khoảng trong suốt thừa, giữ nguyên tỷ lệ |
| `public/brand/logo-monogram.png` | Navbar (44/52px), favicon | Chỉ biểu tượng BD + hoa |
| `public/brand/zalo.webp` | Nút CTA ở hero, header và thanh dính đáy | Logo của Zalo — giữ nguyên màu và tỷ lệ, không sửa |

**Vì sao tách monogram:** logo gốc là lockup dọc có hai dòng chữ ở dưới. Thu cả
lockup về ~50px thì hai dòng chữ đó chỉ còn là vệt mờ. Script tìm dải trong suốt
nằm giữa biểu tượng và phần chữ rồi cắt tại đó, nên đường cắt luôn sạch.

Màu bên trong logo **không bị đổi** ở bất kỳ đâu. Trên hero chỉ có một quầng aqua
rất mờ phía sau để logo tách khỏi nền navy — không phải glow trang trí.

---

## Sửa nội dung — tất cả nằm trong `data/`

Không cần đụng vào component nào.

| Muốn đổi | Sửa file |
|---|---|
| Tên, slogan, tên miền, số điện thoại, địa chỉ, link mạng xã hội | `data/brand.ts` |
| Tám dịp tặng hoa | `data/categories.ts` |
| Thêm/bớt/sửa mẫu hoa | `data/products.ts` |
| Dịch vụ doanh nghiệp và điểm khác biệt | `data/services.ts` |
| Section workshop | `data/workshop.ts` |
| Feedback khách hàng | `data/testimonials.ts` |

### Thêm một mẫu hoa

1. Chép ảnh gốc vào thư mục ảnh nguồn (xem `SRC` trong `tools/build-images.py`).
2. Thêm một dòng vào `SLUG` trong `tools/build-images.py`, rồi chạy `npm run images`.
3. Thêm một object vào `products` trong `data/products.ts`.

`featured: true` = hiện ngay khi vào trang (đang có 9 mẫu, vừa đủ ba hàng ba cột
trên desktop nên lưới không bị hụt ô). Phần còn lại nằm sau
nút "Xem thêm mẫu hoa".

`occasion` là **mảng** — một bó hoa hợp nhiều dịp sẽ xuất hiện ở đủ các dịp đó khi
khách lọc. `category` là dịp chính, hiện làm nhãn trên thẻ.

### Thay ảnh banner hero

Đặt ảnh mới vào `Downloads/bông dua web/hero.png` rồi chạy `npm run images`.
Script tự cắt ra **hai bản khác nhau**, không phải hai kích thước của một bản:

| File | Tỷ lệ | Dùng ở đâu |
|---|---|---|
| `hero/banner-1200/2400.webp` | 16:9, giữ nguyên khung | Từ 1024px — ảnh làm nền, chữ đè lên vùng tối bên trái |
| `hero/banner-mb-720/1440.webp` | 3:2, đã bỏ 36% bên trái | Dưới 1024px — dải ảnh nằm **dưới** phần chữ |

Ảnh banner cần **khoảng 40–45% bên trái tối và trống** vì đó là chỗ đặt logo và
tiêu đề. Bản hiện tại đo được độ sáng 8–23/255 ở vùng đó, và mọi vùng chữ đều đạt
tương phản tối thiểu 6,2:1 với chữ trắng.

### Thêm feedback khách hàng

Mở `data/testimonials.ts`, bỏ chú thích ở object mẫu và điền lại. **Chừng nào mảng
còn rỗng thì cả section tự động không hiện** — cố ý làm vậy để trang không bị hở
một khoảng trống, và để không bao giờ có nguy cơ đăng feedback bịa.

Ảnh chụp màn hình đặt tại `public/images/testimonials/`.

---

## Cấu trúc ảnh

```
public/
  brand/          logo-original.png · logo-full.png · logo-monogram.png
  images/
    hero/         banner (desktop) · banner-mb (mobile) · dai-sen
    products/     21 mẫu hoa, tỷ lệ 4:5
    occasions/    8 ảnh cho thẻ chọn dịp, tỷ lệ 4:5
    founder/      thu-pham
    workshops/    5 ảnh workshop THẬT
    decor/        hoa-peony (hoạ tiết hoa tách nền, đè lên khối "Về Bông Dua")
    og/           cover.jpg (ảnh bìa khi chia sẻ link)
```

Mỗi ảnh có hai bề rộng WebP + một bản JPEG dự phòng.

---

## Vài quyết định kỹ thuật, và lý do

**Xuất tĩnh (`output: "export"`).** Trang không có backend, không form, không
database. Bản tĩnh chạy trên Netlify miễn phí, tải nhanh và không bao giờ "ngủ".

**Không dùng `next/image`.** Bộ tối ưu ảnh của Next cần một server đang chạy, mà
bản tĩnh thì không có — bật `next/image` ở chế độ này chỉ tắt tối ưu chứ không
thêm được gì. Thay vào đó ảnh được nén sẵn nhiều kích thước bằng
`tools/build-images.py`, và `components/Photo.tsx` phát ra `<picture>` kèm
`srcset` + `width`/`height` thật. Vẫn đủ ba thứ quan trọng: đúng kích thước theo
màn hình, tải lười, và không làm nội dung nhảy khi ảnh về.

**Hero chỉ có MỘT thẻ `<picture>`.** Cố ý không dùng hai ảnh rồi ẩn/hiện bằng CSS:
`display: none` **không** ngăn trình duyệt tải ảnh, nên cách đó bắt khách mobile
tải cả bản desktop 2400px mà không bao giờ nhìn thấy. Thuộc tính `media` quyết
định ngay từ đầu — mỗi máy chỉ tải đúng một file.

**Lưới portfolio dùng ảnh 4:5 đồng loạt.** Cả 21 ảnh gốc đều là ảnh dọc. Ép một
phần thành 1:1 hay 3:2 sẽ cắt mất phần trên của bó hoa. Nhịp bất đối xứng đến từ
**độ lệch tầng giữa ba cột** (0 / 64px / 28px), nên chiều cao mỗi ô vẫn cố định và
trang không bị nhảy khi ảnh tải về.

**Section giới thiệu là một khối đặc, không phải hai cột rời.** Thẻ trắng chứa
chữ và ảnh dán liền nhau, khe hở đúng 0px, cùng chiều cao (chiều cao do lượng chữ
quyết định, ảnh phủ kín bằng `object-cover`). Khối nổi lên được là vì section dùng
nền mist — nếu đổi section sang nền trắng thì thẻ sẽ tan vào nền và mất hẳn hiệu
quả. Dải chữ chạy phía trên cũng vì thế mà để nền trắng, để hai section mist
không dính vào nhau.

**Hai ảnh nền trong suốt không đi qua `emit()`.** Hoạ tiết hoa và logo Zalo được
xử lý riêng trong `alpha_assets()` vì `emit()` cắt theo tỷ lệ — cắt sẽ xén mất
cánh hoa và bóp méo logo Zalo. Cả hai xuất WebP để giữ kênh alpha mà vẫn nhẹ.

**Hoạ tiết hoa cần hai lớp bọc.** Khối "Về Bông Dua" có `overflow-hidden` để bo
góc ảnh, mà bông hoa lại phải nhô lên khỏi mép trên. Nên có một lớp `relative`
bên ngoài (không cắt) chứa khối `overflow-hidden` bên trong, bông hoa là anh em
của khối đó. Section cũng có `padding-top` lớn hơn `padding-bottom` để chừa chỗ
cho phần nhô lên.

**Chữ hiện theo từng từ, GẮN THEO tiến độ cuộn.** `components/AnimText.tsx` tách
câu thành các mảnh, rồi mức hiện của từng mảnh được tính lại theo vị trí của khối
trong khung nhìn: cuộn xuống chữ rõ dần từ trái sang, cuộn LÊN chữ mờ và thu lại.
Ở giữa quãng luôn có một dải chuyển tiếp vài từ đang dở — đó chính là đặc điểm
nhận ra ngay của hiệu ứng này.

Hero là ngoại lệ, dùng `kichHoat="tai"` (chạy một lần theo thời gian) vì hero đã
nằm sẵn trong khung nhìn nên không có quãng cuộn nào để bám vào.

Ba điều bắt buộc giữ khi sửa:
- Thẻ bao ngoài mang `aria-label` là câu đầy đủ, các mảnh đều `aria-hidden` — nếu
  không, trình đọc màn hình sẽ đọc rời rạc từng từ.
- Trạng thái mặc định là ĐÃ HIỆN; chỉ khi JavaScript chạy thì mảnh mới bị ẩn.
- Mảnh kiểu "cuon" **không được có `transition`**. Style được ghi trực tiếp mỗi
  khung hình, thêm transition thì chữ chạy đuổi theo con trỏ cuộn, trễ và rung.

Bộ chạy dùng một listener `scroll` chung cho cả trang, gộp vào một khung hình
bằng `requestAnimationFrame`. Cố ý không chạy vòng rAF liên tục: cuộn xong mà
vòng vẫn quay thì máy vẫn phải thức, hao pin trên điện thoại.

**Thông số khác nhau theo từng khối** (`nhoe` / `nhich` / `chong`):

| | Tiêu đề | Dải trích dẫn |
|---|---|---|
| Nhoè tối đa | 10px | **2px** |
| Nhích dọc | 10px | **0** |
| Số mảnh cùng bay | 3 | **7** |

Bộ số của dải trích dẫn đo từ bản tham chiếu. Chữ trích dẫn to và trải nhiều
dòng — để nhoè 10px thì cả đoạn thành một vệt không đọc nổi, còn dải chuyển tiếp
chỉ 3 từ thì tạo ra một vách đứng giữa phần rõ và phần mất hẳn.

**`void el.offsetWidth` trong nhánh "tai" không phải dòng thừa.** Nó ép trình
duyệt tính lại style ngay tại chỗ. Không có nó, việc thêm class `.aw` rồi `.aw-in`
có thể rơi vào cùng một khung hình — trình duyệt chưa từng thấy trạng thái `.aw`
nên không có gì để chuyển tiếp, và chữ hero hiện thẳng ra không hề nhoè. Lỗi này
đã xảy ra thật khi dùng `setTimeout(30)`: 30ms vẫn nằm gọn trong một khung hình
lúc máy yếu.

**Line-height tiêu đề là 1.28, không phải 1.0.** Đo bằng chiều cao mực chữ thật
của Playfair với chính các câu trên trang: dấu chồng tiếng Việt (ố, ộ, ằ, Đ) đẩy
phần trên của mực chữ lên 1.07 lần cỡ font, cộng phần dưới thành **1.268**. Dưới
mức đó thì dấu của dòng dưới chạm dấu của dòng trên. Mẫu tham khảo tiếng Anh để
được 1.0 là vì tiếng Anh không có dấu chồng.

**Menu ngang chỉ bật từ 1280px.** Bảy mục menu tiếng Việt cộng nút CTA cần khoảng
1200px. Nếu bật từ 1024px thì ở khoảng 1024–1279px các mục sẽ gãy làm hai dòng.
Thanh CTA dính đáy cũng dùng đúng ngưỡng này, để không có khoảng nào vừa mất menu
vừa mất lối vào Zalo.

**Hiệu ứng hiện dần mặc định là ĐÃ HIỆN.** `components/Reveal.tsx` chỉ ẩn phần tử
sau khi JavaScript chạy được. Nhờ vậy nếu JS lỗi hoặc chưa tải, khách vẫn đọc được
đầy đủ và Google luôn thấy trang. Có tôn trọng `prefers-reduced-motion` — các vòng
lặp vô tận bị tắt hẳn chứ không chỉ rút ngắn.

**Zalo không nhận tin nhắn soạn sẵn qua URL.** Nút "Tư vấn mẫu này" chép sẵn câu
`Mình muốn được tư vấn mẫu "..." (mã BD-xx)` vào clipboard, hiện một toast xác
nhận rồi mở đúng trang Zalo. Nếu trình duyệt chặn clipboard thì link vẫn mở bình
thường, không báo lỗi làm phiền khách.

---

## Đưa lên mạng

Netlify:

- Build command: `npm run build`
- Publish directory: `out`

Sau khi tên miền `bongduafleur.com` trỏ xong, sửa `url` trong `data/brand.ts`.
Dòng đó quyết định địa chỉ canonical **và** ảnh bìa khi dán link lên Facebook/Zalo
— `og:image` bắt buộc phải là đường dẫn tuyệt đối, để tương đối thì link chia sẻ
ra một ô trắng không ảnh.

Đổi tên miền xong nhớ vào [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
bấm **Scrape Again**, vì Facebook lưu ảnh bìa cũ trong bộ nhớ đệm.

---

## Những thứ CẦN THAY bằng dữ liệu thật

| Việc | Hiện tại | Cần |
|---|---|---|
| **Feedback khách hàng** | Section đang ẩn vì chưa có dữ liệu | 3–5 phản hồi thật + ảnh chụp màn hình nếu có |
| **Logo độ phân giải cao** | `logo-original.png` chỉ 400×400 | Bản gốc ≥1024px hoặc SVG, nền trong suốt |
| **Logo bản sáng cho nền tối** | Chưa có | Artwork logo là tông navy đậm; có bản trắng thì bỏ được quầng aqua sau logo ở hero |
| **Ảnh ngang 3:2** | Chỉ có đúng 1 tấm | Vài tấm 2400×1600 sẽ mở ra thêm lựa chọn bố cục cho portfolio |
| **Banner hero độ phân giải cao** | `hero.png` 1672×941 | Bản ≥2400px sẽ nét hơn trên màn hình retina |
| **Loại dữ liệu có cấu trúc** | Đang khai `Florist` kèm địa chỉ | Nếu 21/39/27 Võ Chí Công không phải cửa hàng đón khách, đổi `@type` thành `LocalBusiness` và bỏ khối `address` trong `app/layout.tsx` |

**Ảnh đang dùng đều là ảnh thật của tiệm:**

- 21 ảnh sản phẩm từ trang Facebook của Bông Dua Fleur (có sẵn watermark).
- 5 ảnh workshop chụp tại buổi workshop cắm hoa thật, lấy từ project landing workshop.
- Ảnh chân dung Thư Phạm chụp trong bối cảnh hoa.

Riêng ảnh banner hero là ảnh do chủ tiệm tự tạo, dùng làm nền tạo không khí —
không đặt cạnh mô tả sản phẩm nào, nên không có nguy cơ khách hiểu nhầm đó là một
mẫu hoa đang bán. Không dùng ảnh stock hay ảnh của tiệm hoa khác.
