import AnimText from "@/components/AnimText";
import Reveal from "@/components/Reveal";

/* Dải trích dẫn: một câu duy nhất, chữ serif lớn, giữa nền navy, nhiều khoảng
   thở trên dưới. Đặt xen giữa các section dài để ngắt nhịp — mắt được nghỉ
   trước khi vào khối nội dung tiếp theo.

   Cố ý KHÔNG có ảnh, không nút, không gì khác ngoài câu chữ. */
export default function QuoteBand({
  quote,
  author,
}: {
  quote: string;
  author?: string;
}) {
  return (
    <section className="bg-navy py-24 sm:py-28">
      <div className="wrap">
        <figure className="mx-auto max-w-4xl text-center">
          <blockquote>
            {/* Bộ số này đo từ chính bản tham chiếu, và khác hẳn khối tiêu đề:
                nhoè tối đa 2px (không phải 10), không nhích dọc, và 7 từ cùng
                đang bay. Chữ trích dẫn to và trải nhiều dòng — nhoè 10px sẽ
                thành một vệt không đọc nổi, còn dải chuyển tiếp 3 từ thì tạo ra
                một vách đứng giữa phần rõ và phần mất hẳn. */}
            <AnimText
              as="p"
              text={quote}
              nhoe={2}
              nhich={0}
              chong={7}
              className="font-display text-[clamp(1.5rem,3.4vw,2.5rem)] leading-display font-normal text-balance text-white italic"
            />
          </blockquote>

          {author && (
            <Reveal delay={420}>
              <figcaption className="mt-7 flex items-center justify-center gap-4 text-[13px] text-white/55">
                <span aria-hidden="true" className="h-px w-8 bg-gold" />
                {author}
              </figcaption>
            </Reveal>
          )}
        </figure>
      </div>
    </section>
  );
}
