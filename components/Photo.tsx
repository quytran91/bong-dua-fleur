interface PhotoProps {
  /* Đường dẫn trong public/images, không có đuôi và không có hậu tố kích thước.
     Ví dụ "products/bo-hong-cam" hoặc "workshops/nhom-hoc-vien". */
  name: string;
  alt: string;
  /* Các bề rộng đã nén sẵn. Bề rộng đầu tiên cũng là bản JPEG dự phòng. */
  widths: [number, number];
  /* Tỷ lệ khung, dùng để đặt width/height thật -> trình duyệt chừa sẵn chỗ,
     ảnh tải xong không làm nội dung nhảy (tránh layout shift). */
  ratio: number;
  /* Ảnh sẽ rộng bao nhiêu trên màn hình, để trình duyệt chọn đúng file. */
  sizes: string;
  className?: string;
  /* Lớp đặt lên chính thẻ <picture>. Cần khi muốn ảnh phủ kín một khối có chiều
     cao do thứ khác quyết định — <picture> mặc định là inline nên h-full trên
     thẻ <img> bên trong sẽ không có tác dụng. */
  wrapClassName?: string;
  /* Đặt true CHỈ cho ảnh nằm trong màn hình đầu tiên. */
  priority?: boolean;
}

/* Vì trang xuất tĩnh (output: "export") nên bộ tối ưu ảnh của Next không chạy —
   nó cần một server. Component này thay thế: <picture> với srcset WebP nhiều
   kích thước và một bản JPEG dự phòng, kèm width/height thật để không bị layout
   shift. Xem README, mục "Vài quyết định kỹ thuật". */
export default function Photo({
  name,
  alt,
  widths,
  ratio,
  sizes,
  className,
  wrapClassName,
  priority = false,
}: PhotoProps) {
  const [small, large] = widths;
  const base = `/images/${name}`;
  return (
    <picture className={wrapClassName}>
      <source
        type="image/webp"
        sizes={sizes}
        srcSet={`${base}-${small}.webp ${small}w, ${base}-${large}.webp ${large}w`}
      />
      <img
        src={`${base}-${small}.jpg`}
        alt={alt}
        width={large}
        height={Math.round(large / ratio)}
        sizes={sizes}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}
