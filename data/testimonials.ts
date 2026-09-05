/* ════════════════════════════════════════════════════════════════════
   FEEDBACK KHÁCH HÀNG — HIỆN ĐANG TRỐNG, SECTION SẼ TỰ ẨN
   Chừng nào mảng này còn rỗng thì section feedback không hiện trên web.
   Không đặt feedback bịa vào đây: khách đọc được và đó là lời hứa thật.

   Khi đã có feedback thật, bỏ dấu chú thích ở object mẫu bên dưới và
   điền lại. Ảnh chụp màn hình (nếu có) đặt tại public/images/testimonials/,
   giữ nguyên tỷ lệ gốc.
   ════════════════════════════════════════════════════════════════════ */

export interface Testimonial {
  quote: string;
  author: string;
  occasion: string;
  /* Tên file trong public/images/feedback/, ví dụ "chi-lan.jpg". Bỏ trống nếu chưa có. */
  screenshot?: string;
  screenshotWidth?: number;
  screenshotHeight?: number;
}

export const testimonials: Testimonial[] = [
  // {
  //   quote: "Hoa tươi và gói rất kỹ, người nhận thích lắm.",
  //   author: "Chị Lan",
  //   occasion: "Hoa sinh nhật",
  //   screenshot: "chi-lan.jpg",
  //   screenshotWidth: 900,
  //   screenshotHeight: 1600,
  // },
];
