import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { differentiators } from "@/data/services";

/* Section tối nằm giữa trang, ngắt nhịp cho chuỗi section sáng phía trên và
   phía dưới. Cố ý chỉ có chữ và số — icon chung chung sẽ làm loãng thông điệp,
   còn con số Champagne Gold giữ đúng nhịp editorial của cả trang. */
export default function KhacBiet() {
  return (
    <section className="bg-navy py-24 sm:py-32">
      <div className="wrap">
        <SectionHead
          eyebrow="Vì sao chọn Bông Dua"
          title="Điều làm nên một bó hoa của Bông Dua"
          dark
        />

        <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((d, i) => (
            <li key={d.title}>
              <Reveal delay={Math.min(i, 5) * 60}>
                <div className="border-t border-white/15 pt-6">
                  <span className="font-display text-[15px] text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-[20px] leading-snug text-white">{d.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-white/65">{d.detail}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
