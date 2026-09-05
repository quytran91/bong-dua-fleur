/* Tám dịp tặng hoa — vừa là thẻ chọn ở section "Hoa theo dịp", vừa là bộ lọc
   cho portfolio. Thêm/bớt dịp thì sửa ở đây; ảnh đại diện đặt tại
   public/images/occasions/<id>-480.webp và -960.webp (tỷ lệ dọc 4:5). */

export type CategoryId =
  | "sinh-nhat"
  | "tinh-yeu"
  | "ky-niem"
  | "chuc-mung"
  | "khai-truong"
  | "tot-nghiep"
  | "su-kien"
  | "thiet-ke-rieng";

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
  image: string;
}

export const categories: Category[] = [
  { id: "sinh-nhat", name: "Sinh nhật", blurb: "Một tuổi mới, một bó hoa được chọn riêng.", image: "occasions/sinh-nhat" },
  { id: "tinh-yeu", name: "Tình yêu", blurb: "Nói điều khó nói bằng màu hoa.", image: "occasions/tinh-yeu" },
  { id: "ky-niem", name: "Kỷ niệm", blurb: "Đánh dấu ngày hai người vẫn nhớ.", image: "occasions/ky-niem" },
  { id: "chuc-mung", name: "Chúc mừng", blurb: "Mừng một cột mốc vừa chạm tới.", image: "occasions/chuc-mung" },
  { id: "khai-truong", name: "Khai trương", blurb: "Kệ hoa chỉn chu cho ngày mở cửa.", image: "occasions/khai-truong" },
  { id: "tot-nghiep", name: "Tốt nghiệp và kỷ yếu", blurb: "Giữ lại mùa cuối cùng của thanh xuân.", image: "occasions/tot-nghiep" },
  { id: "su-kien", name: "Sự kiện", blurb: "Hoa cho hội nghị, lễ ra mắt, tri ân.", image: "occasions/su-kien" },
  { id: "thiet-ke-rieng", name: "Thiết kế theo yêu cầu", blurb: "Kể dịp và ngân sách, Bông Dua lo phần còn lại.", image: "occasions/thiet-ke-rieng" },
];

export function categoryName(id: CategoryId): string {
  return categories.find((c) => c.id === id)?.name ?? id;
}
