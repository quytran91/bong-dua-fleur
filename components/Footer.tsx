import { brand, contactInfo, socialLinks } from "@/data/brand";
import { external } from "@/components/ui";

const NAV = [
  { href: "#hoa-theo-dip", label: "Hoa theo dịp" },
  { href: "#mau-hoa", label: "Mẫu hoa" },
  { href: "#ve-bong-dua", label: "Về Bông Dua" },
  { href: "#workshop", label: "Workshop" },
  { href: "#doanh-nghiep", label: "Doanh nghiệp" },
  { href: "#lien-he", label: "Liên hệ" },
];

const MANG_XA_HOI = [
  { href: socialLinks.zalo, label: "Zalo" },
  { href: socialLinks.facebook, label: "Facebook" },
  { href: socialLinks.instagram, label: "Instagram" },
  { href: socialLinks.tiktok, label: "TikTok" },
];

export default function Footer() {
  return (
    /* pb lớn trên mobile để thanh CTA dính đáy không che dòng bản quyền. */
    <footer className="border-t border-white/10 bg-navy pt-16 pb-28 text-white/65 xl:pb-14">
      <div className="wrap">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            {/* Chân trang rộng rãi nên dùng được logo đầy đủ, đứng trên nền navy
                — đúng nền mà logo được thiết kế để đặt lên. */}
            <img
              src="/brand/logo-full.png"
              alt={brand.name}
              width={343}
              height={333}
              className="h-auto w-[170px]"
              loading="lazy"
              decoding="async"
            />
            <p className="mt-6 flex max-w-xs items-center gap-4 text-[15px] text-white/80 italic">
              <span aria-hidden="true" className="h-px w-6 shrink-0 bg-gold" />
              {brand.slogan}
            </p>
          </div>

          <div>
            <h2 className="eyebrow text-white/50">Liên hệ</h2>
            <address className="mt-5 space-y-2.5 text-[15px] not-italic">
              <p>{contactInfo.address}</p>
              <p>
                <a href={`tel:${contactInfo.phoneRaw}`} className="transition hover:text-aqua">
                  {contactInfo.phone}
                </a>
              </p>
            </address>

            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
              {MANG_XA_HOI.map((m) => (
                <li key={m.label}>
                  <a href={m.href} {...external} className="transition hover:text-aqua">
                    {m.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Điều hướng chân trang">
            <h2 className="eyebrow text-white/50">Khám phá</h2>
            <ul className="mt-5 space-y-2.5 text-[15px]">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition hover:text-aqua">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-14 border-t border-white/10 pt-7 text-[13.5px] text-white/50">
          © {new Date().getFullYear()} {brand.name}. Hoa tươi tại Hà Nội.
        </p>
      </div>
    </footer>
  );
}
