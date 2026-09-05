/* Lớp CSS dùng chung cho nút bấm. Gom một chỗ để mọi nút trên trang luôn cùng
   chiều cao, cùng bo góc và cùng cách phản hồi khi bấm.

   Nút là hình viên thuốc (pill) — ngoại lệ duy nhất của quy tắc "góc gần vuông".
   Ảnh và khối nội dung dùng radius 4px để giữ cảm giác editorial. */

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3 " +
  "text-[14px] font-medium tracking-[0.01em] transition duration-200 " +
  "active:scale-[0.985] whitespace-nowrap";

/* Nút chính trên nền sáng: đặc màu navy, chữ trắng (tương phản 17:1). */
export const btnPrimary =
  `${base} bg-navy text-white hover:bg-cobalt`;

/* Nút chính trên nền tối: đảo lại thành nền trắng chữ navy để bật hẳn lên. */
export const btnPrimaryOnDark =
  `${base} bg-white text-navy hover:bg-mist`;

/* Nút phụ trên nền sáng. */
export const btnGhost =
  `${base} border border-ink/20 text-ink hover:border-ink/45 hover:bg-mist`;

/* Nút phụ trên nền tối. */
export const btnGhostDark =
  `${base} border border-white/28 text-white hover:border-aqua/70 hover:text-aqua`;

/* Thuộc tính bắt buộc cho mọi link mở tab mới. */
export const external = { target: "_blank", rel: "noopener noreferrer" } as const;
