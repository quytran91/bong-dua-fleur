import AnimText from "@/components/AnimText";
import Reveal from "@/components/Reveal";

/* Đầu section dùng chung: nhãn nhỏ chữ hoa, gạch Champagne Gold, tiêu đề serif
   lớn, và một đoạn dẫn tuỳ chọn. Gom vào một component để mọi section có cùng
   nhịp — đây chính là thứ tạo cảm giác editorial xuyên suốt trang.

   Nhãn hiện theo từng CHỮ CÁI, tiêu đề theo từng TỪ. Ở cỡ chữ 11.5px của nhãn,
   tách theo từ thì gần như không thấy hiệu ứng. */
export default function SectionHead({
  eyebrow,
  title,
  lead,
  dark = false,
  align = "left",
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  /* Đặt true khi section nằm trên nền navy, để đảo màu chữ. */
  dark?: boolean;
  align?: "left" | "center";
  children?: React.ReactNode;
}) {
  const giua = align === "center";
  return (
    <div className={giua ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <AnimText
        as="p"
        text={eyebrow}
        kieu="chu"
        buoc={26}
        className={"eyebrow " + (dark ? "text-white/55" : "text-muted")}
      />

      <Reveal delay={120}>
        <span
          aria-hidden="true"
          className={"mt-4 mb-6 block h-px w-10 bg-gold " + (giua ? "mx-auto" : "")}
        />
      </Reveal>

      {/* leading-display = 1.28. Xem lý do ở khối @theme trong globals.css:
          đo bằng mực chữ thật, tiếng Việt cần tối thiểu 1.268 mới không
          để dấu của hai dòng chạm nhau. */}
      <AnimText
        as="h2"
        text={title}
        delay={140}
        className={
          "font-display text-[clamp(2.1rem,4.8vw,3.4rem)] leading-display font-normal tracking-[-0.01em] text-balance " +
          (dark ? "text-white" : "text-ink")
        }
      />

      {lead && (
        <Reveal delay={280}>
          <p
            className={
              "mt-6 max-w-xl text-[16px] leading-relaxed " +
              (giua ? "mx-auto " : "") +
              (dark ? "text-white/70" : "text-muted")
            }
          >
            {lead}
          </p>
        </Reveal>
      )}

      {children}
    </div>
  );
}
