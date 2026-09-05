import type { CategoryId } from "./categories";

/* ════════════════════════════════════════════════════════════════════
   MẪU HOA
   Thêm mẫu mới:
     1. Chép ảnh gốc vào thư mục ảnh nguồn rồi chạy `npm run images`
        (xem tools/build-images.py). Ảnh ra ở public/images/products/.
     2. Thêm một object vào mảng dưới đây.
   Bỏ mẫu: xoá object, không cần đụng vào component nào.

   `category`  — dịp chính, hiện làm nhãn trên thẻ.
   `occasion`  — mọi dịp mà mẫu này hợp; bộ lọc dùng mảng này, nên một bó
                 hoa có thể xuất hiện ở nhiều dịp khác nhau.
   `featured`  — hiện ngay khi vào trang. Tám mẫu là vừa đẹp; phần còn lại
                 nằm sau nút "Xem thêm mẫu hoa".
   KHÔNG có trường giá — giá luôn được tư vấn riêng qua Zalo.
   ════════════════════════════════════════════════════════════════════ */

export interface Product {
  id: string;
  code: string;
  name: string;
  category: CategoryId;
  occasion: CategoryId[];
  description: string;
  image: string;
  alt: string;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: "bo-hong-do-goi-den", code: "BD-01", name: "Đêm và hồng đỏ",
    category: "tinh-yeu", occasion: ["tinh-yeu", "ky-niem"],
    description: "Hồng đỏ và lily trắng gói trong giấy đen — dành cho lời tỏ tình không cần nói to.",
    image: "products/bo-hong-do-goi-den",
    alt: "Bó hoa hồng đỏ điểm lily trắng, gói giấy đen, được một người ôm trước ngực.",
    featured: true,
  },
  {
    id: "bo-hong-phan-lon", code: "BD-02", name: "Sớm mai hồng phấn",
    category: "sinh-nhat", occasion: ["sinh-nhat", "chuc-mung"],
    description: "Một ôm hồng phấn đầy đặn, gói giấy trắng, hợp với ngày sinh nhật nhẹ nhàng.",
    image: "products/bo-hong-phan-lon",
    alt: "Bó hoa hồng phấn lớn gói giấy trắng, đặt trên nền tối.",
    featured: true,
  },
  {
    id: "bo-protea-lan-trang", code: "BD-03", name: "Protea và lan hồ điệp",
    category: "ky-niem", occasion: ["ky-niem", "thiet-ke-rieng"],
    description: "Protea làm điểm nhấn giữa hồng phấn và lan hồ điệp trắng — một bó hoa để nhớ lâu.",
    image: "products/bo-protea-lan-trang",
    alt: "Bó hoa hồng phấn với protea ở giữa và lan hồ điệp trắng buông xuống.",
    featured: true,
  },
  {
    id: "ke-khai-truong-lan", code: "BD-04", name: "Kệ khai trương lan trắng",
    category: "khai-truong", occasion: ["khai-truong", "su-kien"],
    description: "Kệ hoa đỏ điểm lan hồ điệp trắng, kèm bảng chúc mừng ghi theo tên cửa hàng.",
    image: "products/ke-khai-truong-lan",
    alt: "Kệ hoa khai trương tông đỏ với dải lan hồ điệp trắng và bảng chúc mừng.",
    featured: true,
  },
  {
    id: "bo-tot-nghiep", code: "BD-05", name: "Ngày cầm bằng",
    category: "tot-nghiep", occasion: ["tot-nghiep", "chuc-mung"],
    description: "Cẩm tú cầu tím và hồng kem, cài thêm chú gấu đội mũ cử nhân.",
    image: "products/bo-tot-nghiep",
    alt: "Bó hoa cẩm tú cầu tím và hồng kem, có gấu bông đội mũ tốt nghiệp cài bên trên.",
    featured: true,
  },
  {
    id: "bo-hong-vang-kem", code: "BD-06", name: "Nắng kem",
    category: "chuc-mung", occasion: ["chuc-mung", "tot-nghiep"],
    description: "Hồng vàng kem xếp tròn đầy, sáng và ấm — hợp lời chúc mừng một khởi đầu.",
    image: "products/bo-hong-vang-kem",
    alt: "Bó hoa hồng vàng kem xếp tròn, gói giấy kem.",
    featured: true,
  },
  {
    id: "doi-ke-hoa-do", code: "BD-07", name: "Đôi kệ hoa sự kiện",
    category: "su-kien", occasion: ["su-kien", "khai-truong"],
    description: "Hai kệ hoa đỏ đặt đối xứng hai bên sân khấu, dùng cho lễ khai mạc và tri ân.",
    image: "products/doi-ke-hoa-do",
    alt: "Hai kệ hoa tông đỏ đặt cạnh nhau, mỗi kệ có một bảng chúc mừng.",
    featured: true,
  },
  {
    id: "tulip-va-hop-lan", code: "BD-08", name: "Tulip và hộp lan",
    category: "thiet-ke-rieng", occasion: ["thiet-ke-rieng", "sinh-nhat"],
    description: "Bình tulip hồng đi cùng hộp mica cắm lan — một cách tặng hoa khác với bó truyền thống.",
    image: "products/tulip-va-hop-lan",
    alt: "Bình thuỷ tinh cắm tulip hồng bên cạnh hộp mica trong suốt cắm hoa lan tím.",
    featured: true,
  },

  {
    id: "bo-om-hong-phan", code: "BD-21", name: "Bó ôm hồng phấn",
    category: "tinh-yeu", occasion: ["tinh-yeu", "sinh-nhat", "ky-niem"],
    description: "Một ôm hồng phấn đầy tay, đi kèm bó ly thơm — cỡ bó thấy rõ khi có người cầm.",
    image: "products/bo-om-hong-phan",
    alt: "Cô gái mặc váy xanh nhạt ôm một bó hoa hồng phấn lớn, bên cạnh là bó hoa ly hồng.",
    featured: true,
  },

  /* ── Các mẫu hiện sau khi bấm "Xem thêm mẫu hoa" ── */
  {
    id: "gio-hong-do-lily", code: "BD-09", name: "Giỏ hồng đỏ",
    category: "chuc-mung", occasion: ["chuc-mung", "khai-truong"],
    description: "Giỏ hoa hồng đỏ đầy ắp, điểm lily trắng — đặt được ở bàn tiếp khách.",
    image: "products/gio-hong-do-lily",
    alt: "Giỏ hoa hồng đỏ lớn điểm lily trắng, đặt trong giỏ sơn đỏ.",
    featured: false,
  },
  {
    id: "bo-hong-tim", code: "BD-10", name: "Hồng tím và cúc nhỏ",
    category: "thiet-ke-rieng", occasion: ["thiet-ke-rieng", "sinh-nhat"],
    description: "Tông tím lạnh điểm cúc vàng — dành cho người không thích hồng phấn quen thuộc.",
    image: "products/bo-hong-tim",
    alt: "Bó hoa hồng tím xanh điểm những bông cúc vàng nhỏ.",
    featured: false,
  },
  {
    id: "bo-hong-cam", code: "BD-11", name: "Cam nắng",
    category: "tinh-yeu", occasion: ["tinh-yeu", "sinh-nhat"],
    description: "Hồng cam gói giấy cùng tông, ấm và trẻ, hợp tặng bất chợt giữa tuần.",
    image: "products/bo-hong-cam",
    alt: "Bó hoa hồng cam lớn gói giấy cam, đặt trên ghế xe hơi.",
    featured: false,
  },
  {
    id: "bo-hong-sen-no-lua", code: "BD-12", name: "Hồng sen và nơ lụa",
    category: "tinh-yeu", occasion: ["tinh-yeu", "ky-niem"],
    description: "Hồng sen gói giấy đen, thắt nơ lụa dài buông xuống.",
    image: "products/bo-hong-sen-no-lua",
    alt: "Bó hoa hồng màu hồng sen gói giấy đen, thắt nơ lụa trắng buông dài.",
    featured: false,
  },
  {
    id: "bo-hong-phan-lily", code: "BD-13", name: "Hồng phấn và lily",
    category: "sinh-nhat", occasion: ["sinh-nhat", "chuc-mung"],
    description: "Hồng phấn xen lily thơm, bó vừa tay, dễ mang theo cả buổi tiệc.",
    image: "products/bo-hong-phan-lily",
    alt: "Bó hoa hồng phấn xen lily trắng, gói giấy trắng, trước tủ gỗ.",
    featured: false,
  },
  {
    id: "bo-kem-anthurium", code: "BD-14", name: "Kem và hồng môn",
    category: "sinh-nhat", occasion: ["sinh-nhat", "ky-niem"],
    description: "Tông kem cam nhạt điểm hồng môn — nhẹ nhàng mà vẫn có điểm nhìn.",
    image: "products/bo-kem-anthurium",
    alt: "Bó hoa tông kem cam nhạt điểm hoa hồng môn, kèm thiệp chúc sinh nhật.",
    featured: false,
  },
  {
    id: "bo-hong-phan-lan", code: "BD-15", name: "Phấn và lan",
    category: "ky-niem", occasion: ["ky-niem", "tinh-yeu"],
    description: "Hồng phấn, tulip và lan hồ điệp xếp lớp — mẫu được đặt lại nhiều nhất.",
    image: "products/bo-hong-phan-lan",
    alt: "Bó hoa hồng phấn với tulip, protea và lan hồ điệp trắng xếp lớp kín khung.",
    featured: false,
  },
  {
    id: "bo-phan-lan-do", code: "BD-16", name: "Phấn và hồng môn đỏ",
    category: "ky-niem", occasion: ["ky-niem", "tinh-yeu"],
    description: "Hồng phấn dịu điểm hồng môn đỏ, đủ ấm cho một dịp kỷ niệm.",
    image: "products/bo-phan-lan-do",
    alt: "Bó hoa hồng phấn điểm hồng môn đỏ và lan hồ điệp trắng.",
    featured: false,
  },
  {
    id: "bo-protea-tulip", code: "BD-17", name: "Protea và tulip",
    category: "ky-niem", occasion: ["ky-niem", "thiet-ke-rieng"],
    description: "Protea giữa nền hồng phấn và tulip, dáng bó cao và thoáng.",
    image: "products/bo-protea-tulip",
    alt: "Bó hoa hồng phấn với protea, tulip và lan hồ điệp trắng.",
    featured: false,
  },
  {
    id: "bo-trang-cam-tay", code: "BD-18", name: "Trắng cầm tay",
    category: "tot-nghiep", occasion: ["tot-nghiep", "su-kien"],
    description: "Bó trắng nhỏ gọn cầm một tay, hợp ảnh kỷ yếu và lễ tốt nghiệp.",
    image: "products/bo-trang-cam-tay",
    alt: "Bàn tay cầm bó hoa trắng nhỏ gọn với cành cỏ vươn cao.",
    featured: false,
  },
  {
    id: "ke-grand-opening", code: "BD-19", name: "Kệ Grand Opening",
    category: "khai-truong", occasion: ["khai-truong", "su-kien"],
    description: "Kệ hoa đỏ dáng cao kèm bảng Grand Opening, dựng sẵn trước giờ cắt băng.",
    image: "products/ke-grand-opening",
    alt: "Kệ hoa khai trương tông đỏ với bảng chữ Grand Opening và nơ đỏ lớn.",
    featured: false,
  },
  {
    id: "bo-hong-phan-ren", code: "BD-20", name: "Hồng phấn viền ren",
    category: "sinh-nhat", occasion: ["sinh-nhat", "tinh-yeu"],
    description: "Bó hồng phấn nhỏ xinh gói giấy viền ren, vừa một vòng tay.",
    image: "products/bo-hong-phan-ren",
    alt: "Bó hoa hồng phấn nhỏ gói giấy trắng viền ren, được một người ôm.",
    featured: false,
  },
];
