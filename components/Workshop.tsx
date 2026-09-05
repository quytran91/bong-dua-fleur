import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { socialLinks } from "@/data/brand";
import { workshopHero, workshopPhotos, workshopPoints } from "@/data/workshop";
import { btnPrimary, btnGhost, external } from "@/components/ui";

export default function Workshop() {
  const [phu1, phu2, phu3, phu4] = workshopPhotos;

  return (
    <section id="workshop" className="bg-white py-24 sm:py-32">
      <div className="wrap">
        <SectionHead
          eyebrow="Workshop cắm hoa"
          title="Một buổi chậm lại cùng hoa"
          lead="Workshop cắm hoa tại Bông Dua Fleur là khoảng thời gian để bạn tạm rời nhịp sống vội, tự tay lựa chọn từng cành hoa và tạo nên một tác phẩm mang dấu ấn riêng. Thư Phạm trực tiếp hướng dẫn từ cách chọn hoa, phối màu đến hoàn thiện một bó hoa hoặc bình hoa hài hoà."
        />

        {/* Ảnh lớn làm visual chính, đặt ngay dưới phần chữ. */}
        <Reveal delay={80}>
          <div className="mt-12 overflow-hidden rounded-img">
            <Photo
              name={workshopHero.image}
              alt={workshopHero.alt}
              widths={[640, 1280]}
              ratio={workshopHero.ratio}
              sizes="(min-width: 1024px) 76vw, 92vw"
              className="block w-full"
            />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Cột trái: những điều cần biết + hai nút. */}
          <div>
            <Reveal>
              <ul className="space-y-0">
                {workshopPoints.map((p) => (
                  <li
                    key={p}
                    className="flex gap-4 border-b border-ink/10 py-4 text-[15px] leading-relaxed text-ink first:border-t"
                  >
                    <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-gold" />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={socialLinks.zalo} {...external} className={btnPrimary}>
                  Hỏi lịch workshop
                </a>
                <a href={socialLinks.facebook} {...external} className={btnGhost}>
                  Đăng ký theo nhóm
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Cột phải: collage bốn ảnh lệch tầng, cùng nhịp với lưới portfolio. */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4 sm:space-y-6">
              {[phu1, phu2].map((p, i) => (
                <Reveal key={p.image} delay={i * 80}>
                  <div className="overflow-hidden rounded-img bg-mist">
                    <Photo
                      name={p.image}
                      alt={p.alt}
                      widths={[640, 1280]}
                      ratio={p.ratio}
                      sizes="(min-width: 1024px) 26vw, 45vw"
                      className="block w-full"
                    />
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="space-y-4 pt-8 sm:space-y-6 sm:pt-12">
              {[phu3, phu4].map((p, i) => (
                <Reveal key={p.image} delay={40 + i * 80}>
                  <div className="overflow-hidden rounded-img bg-mist">
                    <Photo
                      name={p.image}
                      alt={p.alt}
                      widths={[640, 1280]}
                      ratio={p.ratio}
                      sizes="(min-width: 1024px) 26vw, 45vw"
                      className="block w-full"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
