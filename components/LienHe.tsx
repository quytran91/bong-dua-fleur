import Reveal from "@/components/Reveal";
import { contactInfo, socialLinks } from "@/data/brand";
import { btnPrimaryOnDark, btnGhostDark, external } from "@/components/ui";

export default function LienHe() {
  return (
    <section id="lien-he" className="relative isolate overflow-hidden bg-navy py-24 sm:py-32">
      {/* Ảnh sen làm nền, phủ navy rất đậm lên trên. Ảnh chỉ còn là kết cấu mờ
          phía sau chữ, nên chữ trắng luôn đọc được ở mọi vùng của ảnh. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <picture>
          <source
            type="image/webp"
            sizes="100vw"
            srcSet="/images/hero/dai-sen-1200.webp 1200w, /images/hero/dai-sen-2000.webp 2000w"
          />
          <img
            src="/images/hero/dai-sen-1200.jpg"
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-navy/92" />
      </div>

      <div className="wrap">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span aria-hidden="true" className="mx-auto mb-7 block h-px w-10 bg-gold" />

            <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.1rem)] leading-display font-normal text-balance text-white">
              Bạn chưa biết nên chọn bó hoa nào?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/70">
              Chỉ cần kể cho Bông Dua về người bạn muốn tặng, dịp đặc biệt và cảm xúc bạn muốn gửi.
              Chúng tôi sẽ giúp bạn chọn một bó hoa phù hợp.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={socialLinks.zalo} {...external} className={btnPrimaryOnDark}>
                Nhắn Zalo để được tư vấn
              </a>
              <a href={socialLinks.facebook} {...external} className={btnGhostDark}>
                Liên hệ qua Facebook
              </a>
            </div>

            <p className="mt-9 text-[15px] text-white/65">
              Hoặc gọi trực tiếp{" "}
              <a
                href={`tel:${contactInfo.phoneRaw}`}
                className="text-aqua underline decoration-aqua/35 underline-offset-4 transition hover:decoration-aqua"
              >
                {contactInfo.phone}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
