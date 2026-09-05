import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Xuất ra HTML tĩnh: trang này không có backend, không form, không database.
  // Bản tĩnh chạy được trên Netlify/GitHub Pages miễn phí và không bao giờ "ngủ".
  output: "export",

  // Kèm theo output:"export" thì bộ tối ưu ảnh của Next (chạy trên server) không
  // dùng được. Ảnh đã được nén sẵn thành WebP nhiều kích thước trong public/images
  // bằng tools/build-images.py, và component <Photo> tự chọn kích thước qua srcset.
  images: { unoptimized: true },

  // Netlify phục vụ /duong-dan/ -> /duong-dan/index.html
  trailingSlash: true,
};

export default nextConfig;
