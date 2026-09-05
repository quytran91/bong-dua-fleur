import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";

const BUOC = [
  { title: "Chọn cảm hứng", detail: "Chọn một mẫu hoa bạn thích, hoặc chỉ cần kể dịp bạn muốn tặng." },
  {
    title: "Nhắn cho Bông Dua",
    detail: "Gửi mẫu qua Zalo hoặc Facebook, cho biết màu sắc, thời gian và ngân sách.",
  },
  {
    title: "Bông Dua thiết kế",
    detail: "Florist tư vấn và hoàn thiện bó hoa dành riêng cho người nhận.",
  },
];

export default function QuyTrinh() {
  return (
    <section className="bg-mist py-24 sm:py-32">
      <div className="wrap">
        <SectionHead eyebrow="Quy trình" title="Đặt một bó hoa theo cách thật đơn giản" />

        <ol className="mt-14 grid gap-x-10 gap-y-10 lg:grid-cols-3">
          {BUOC.map((b, i) => (
            <li key={b.title}>
              <Reveal delay={i * 90}>
                <div className="border-t border-ink/12 pt-6">
                  <span className="font-display text-[15px] text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-[22px] leading-snug text-ink">{b.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{b.detail}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal>
          <p className="mt-12 max-w-2xl text-[15px] leading-relaxed text-muted">
            Giá của mỗi bó hoa được tư vấn riêng, tuỳ mẫu, loại hoa, kích thước và mùa hoa trong năm.
            Bạn cứ nói ngân sách mong muốn, Bông Dua sẽ đề xuất phương án hợp nhất.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
