/* ════════════════════════════════════════════════════════════════════
   WORKSHOP CẮM HOA
   Ảnh trong section này là ẢNH THẬT chụp tại workshop của Bông Dua Fleur,
   lấy từ project landing workshop. Không phải ảnh stock, không phải ảnh AI.

   Thay ảnh: sửa khối WORKSHOP trong tools/build-images.py rồi chạy
   `npm run images`. Ảnh ra ở public/images/workshops/.

   Lịch, địa điểm, số lượng và chi phí CỐ Ý không ghi trên web — mọi thứ
   được tư vấn qua Zalo, nên không bao giờ có thông tin cũ nằm lại trang.
   ════════════════════════════════════════════════════════════════════ */

export interface WorkshopPhoto {
  image: string;
  alt: string;
  ratio: number;
}

/* Ảnh lớn làm visual chính của section. */
export const workshopHero: WorkshopPhoto = {
  image: "workshops/nhom-hoc-vien",
  alt: "Cả nhóm học viên đứng cạnh những bình hoa vừa tự tay cắm trong buổi workshop của Bông Dua Fleur.",
  ratio: 3 / 2,
};

/* Ảnh phụ, xếp thành collage lệch tầng bên cạnh ảnh lớn. */
export const workshopPhotos: WorkshopPhoto[] = [
  {
    image: "workshops/ban-tay-cham-hoa",
    alt: "Đôi bàn tay đang chạm vào một cành hoa trắng giữa bàn hoa tươi.",
    ratio: 4 / 5,
  },
  {
    image: "workshops/khoanh-khac",
    alt: "Một học viên bật cười trong lúc cắm hoa tại workshop.",
    ratio: 4 / 5,
  },
  {
    image: "workshops/hoc-vien-va-hoa",
    alt: "Học viên cầm bông hoa vừa cắm xong, phía sau là bình hoa hồng và cẩm tú cầu.",
    ratio: 4 / 5,
  },
  {
    image: "workshops/thanh-pham",
    alt: "Một học viên đứng cạnh bình hoa trắng hồng đã hoàn thiện.",
    ratio: 4 / 5,
  },
];

export const workshopPoints: string[] = [
  "Phù hợp cho người mới, không cần biết gì về hoa",
  "Nhận cả cá nhân, nhóm bạn và nhóm doanh nghiệp",
  "Chủ đề và loại hoa thay đổi theo mùa",
  "Bạn tự tay thực hành và mang sản phẩm về",
  "Lịch, địa điểm và chi phí tư vấn riêng qua Zalo",
];
