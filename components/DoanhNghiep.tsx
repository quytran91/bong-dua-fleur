import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { services } from "@/data/services";
import { socialLinks } from "@/data/brand";
import { btnPrimary, external } from "@/components/ui";

export default function DoanhNghiep() {
  return (
    <section id="doanh-nghiep" className="bg-mist py-24 sm:py-32">
      <div className="wrap">
        <SectionHead
          eyebrow="Dành cho doanh nghiệp"
          title="Hoa dành cho những cột mốc đáng nhớ"
          lead="Bông Dua đã đồng hành cùng nhiều lễ khai trương, sự kiện và đơn hàng số lượng lớn. Bạn gửi thời gian, địa điểm và số lượng, phần còn lại để Bông Dua lo."
        />

        <ul className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={Math.min(i, 5) * 60}>
                <div className="border-t border-ink/12 pt-5">
                  <h3 className="font-display text-[20px] leading-snug text-ink">{s.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.detail}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <div className="mt-12">
            <a href={socialLinks.zalo} {...external} className={btnPrimary}>
              Trao đổi đơn hàng doanh nghiệp
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
