import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { testimonials } from "@/data/testimonials";

/* Chưa có feedback thật thì KHÔNG hiện section này.
   Một khung trống kèm chữ "sẽ cập nhật" làm trang trông dở dang, còn feedback
   bịa thì là nói dối khách. Điền dữ liệu vào data/testimonials.ts là section tự
   hiện, không cần sửa component. */
export default function Feedback() {
  if (testimonials.length === 0) return null;

  return (
    <section id="feedback" className="bg-white py-24 sm:py-32">
      <div className="wrap">
        <SectionHead eyebrow="Khách hàng" title="Lời nhắn từ những người đã tặng hoa" />

        <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={t.author + i}>
              <Reveal delay={Math.min(i, 5) * 60}>
                <figure className="border-t border-ink/12 pt-6">
                  <blockquote className="font-display text-[17px] leading-relaxed text-ink italic">
                    <p>{t.quote}</p>
                  </blockquote>

                  {t.screenshot && t.screenshotWidth && t.screenshotHeight && (
                    <img
                      src={`/images/testimonials/${t.screenshot}`}
                      alt={`Ảnh chụp tin nhắn phản hồi của ${t.author}.`}
                      width={t.screenshotWidth}
                      height={t.screenshotHeight}
                      loading="lazy"
                      decoding="async"
                      className="mt-5 w-full rounded-img bg-mist object-contain"
                    />
                  )}

                  <figcaption className="mt-5 text-[13.5px]">
                    <span className="text-ink">{t.author}</span>
                    <span className="text-muted"> · {t.occasion}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
