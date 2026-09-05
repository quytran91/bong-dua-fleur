/* ════════════════════════════════════════════════════════════════════
   THÔNG TIN THƯƠNG HIỆU — SỬA Ở ĐÂY, KHÔNG SỬA TRONG COMPONENT
   Đổi số điện thoại, địa chỉ, link mạng xã hội thì chỉ động vào file này.
   ════════════════════════════════════════════════════════════════════ */

export const brand = {
  name: "Bông Dua Fleur",
  slogan: "Hoa tươi cho những ngày muốn chậm lại.",
  eyebrow: "Tiệm hoa tươi tại Hà Nội",

  /* Đổi khi tên miền thật đã trỏ xong. Dùng cho canonical + ảnh chia sẻ lên
     Facebook/Zalo (og:image bắt buộc là đường dẫn tuyệt đối). */
  url: "https://bongduafleur.com",

  description:
    "Bông Dua Fleur là tiệm hoa tươi tại Hà Nội, chuyên thiết kế hoa bó, hoa khai trương, hoa sự kiện và quà tặng thủ công. Mỗi sản phẩm được thực hiện dựa trên dịp tặng, câu chuyện và cảm xúc mà khách hàng muốn gửi gắm.",

  founderName: "Thư Phạm",
  founderYears: 5,
} as const;

export const contactInfo = {
  phone: "0356 622 262",
  phoneRaw: "0356622262",
  address: "Số 21/39/27 Võ Chí Công, Hà Nội",
  addressLocality: "Hà Nội",
  addressCountry: "VN",
} as const;

export const socialLinks = {
  zalo: "https://zalo.me/0356622262",
  /* Dùng link trang chính thay cho link "share/..." kèm tham số theo dõi —
     link share là địa chỉ tạm, Facebook có thể đổi bất cứ lúc nào. */
  facebook: "https://www.facebook.com/BongDuaFleur",
  instagram: "https://www.instagram.com/bongdua_fleur/",
  tiktok: "https://www.tiktok.com/@bongduafleur",
} as const;

/* Zalo trên web không nhận nội dung soạn sẵn qua URL, nên câu này được chép vào
   clipboard ở phía component để khách dán thẳng vào khung chat. */
export function messageForProduct(name: string, code: string): string {
  return `Mình muốn được tư vấn mẫu "${name}" (mã ${code}).`;
}
