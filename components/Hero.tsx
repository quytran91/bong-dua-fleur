import AnimText from "@/components/AnimText";
import { brand, socialLinks } from "@/data/brand";
import { btnPrimaryOnDark, btnGhostDark, external } from "@/components/ui";

/* Mỗi khối vào sau khối trước một nhịp ngắn. Gom số liệu ra đây để nhìn được cả
   trình tự, thay vì rải delay khắp JSX. */
const NHIP = { logo: 0, eyebrow: 140, tieuDe: 220, slogan: 340, moTa: 420, nut: 500, tinCay: 580 };

export default function Hero() {
  return (
    /* flex-col trên mobile để đảo thứ tự: chữ trước, ảnh sau. Từ 1024px thì
       chuyển về block và khối ảnh được đặt tuyệt đối làm nền. */
    <section id="dau-trang" className="relative isolate flex flex-col overflow-hidden bg-navy lg:block">
      {/* ẢNH BANNER — MỘT thẻ <picture> duy nhất cho cả hai bố cục.
          Cố ý KHÔNG dùng hai ảnh rồi ẩn/hiện bằng CSS: `display: none` không ngăn
          trình duyệt tải ảnh, nên cách đó bắt khách mobile tải cả bản desktop
          2400px mà không bao giờ nhìn thấy. Ở đây thuộc tính `media` quyết định
          ngay từ đầu, mỗi máy chỉ tải đúng một file.

          Ảnh gốc có sẵn ~45% bên trái là nền navy tối hẳn (độ sáng đo được
          8–23/255) — đúng chỗ đặt logo và tiêu đề, nên không cần lớp phủ dày
          làm hoa xỉn màu. Bản mobile đã cắt bỏ vùng tối đó vì trên màn hình hẹp
          ảnh nằm dưới phần chữ, chỉ cần hoa. */}
      <div className="order-2 lg:absolute lg:inset-0 lg:-z-10 lg:order-none">
        <picture>
          <source
            media="(min-width: 1024px)"
            type="image/webp"
            sizes="100vw"
            srcSet="/images/hero/banner-1200.webp 1200w, /images/hero/banner-2400.webp 2400w"
          />
          <source
            type="image/webp"
            sizes="100vw"
            srcSet="/images/hero/banner-mb-720.webp 720w, /images/hero/banner-mb-1440.webp 1440w"
          />
          <img
            src="/images/hero/banner-mb-720.jpg"
            alt="Cụm hoa mẫu đơn trắng, tulip, hồng phấn và lan hồ điệp trên nền xanh navy — tinh thần thiết kế của Bông Dua Fleur."
            width={1440}
            height={960}
            className="hero-zoom aspect-3/2 w-full object-cover lg:aspect-auto lg:h-full lg:object-right"
            fetchPriority="high"
            decoding="sync"
          />
        </picture>

        {/* Chỉ đậm thêm ở mép trái để chắc chắn chữ tách khỏi nền, rồi tan hết
            trước khi chạm vào cụm hoa. Không cần trên mobile vì ở đó chữ nằm
            trên nền navy phẳng. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-linear-to-r from-navy via-navy/55 to-transparent lg:block"
        />
      </div>

      {/* ── Logo và chữ ──
          CĂN GIỮA, không neo xuống đáy. Đã thử neo đáy để bắt chước nhịp "ảnh
          trên, chữ thấp" của mẫu tham khảo, nhưng khối chữ ở đây cao khoảng
          700px (logo 245 + nhãn + tiêu đề hai dòng + slogan + mô tả + hai nút +
          dòng tin cậy) — cộng padding thì vượt chiều cao màn hình, logo bị đẩy
          lên sát mép trên chui dưới header và dòng cuối dính đáy.
          Mẫu tham khảo neo đáy được vì hero của họ chỉ có đúng một tiêu đề. */}
      <div className="wrap order-1 grid items-center pt-28 pb-16 lg:order-none lg:min-h-[94svh] lg:grid-cols-[1.05fr_0.95fr] lg:pt-32 lg:pb-24">
        <div className="max-w-2xl lg:max-w-none">
          {/* Logo đầy đủ đứng đầu hero — chỗ khách nhìn thấy nhận diện trong vài
              giây đầu. Trên desktop nó nằm đúng vùng navy phẳng của ảnh, không
              đè lên cụm hoa. */}
          <div className="hero-rise relative inline-block" style={{ animationDelay: `${NHIP.logo}ms` }}>
            {/* Quầng aqua rất mờ, chỉ để logo tách khỏi nền navy chứ không phải
                hiệu ứng trang trí. Màu bên trong logo giữ nguyên. */}
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -z-10 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aqua/8 blur-3xl"
            />
            <img
              src="/brand/logo-full.png"
              alt={brand.name}
              width={343}
              height={333}
              className="h-auto w-[165px] lg:w-[245px]"
              fetchPriority="high"
              decoding="sync"
            />
          </div>

          <AnimText
            as="p"
            text={brand.eyebrow}
            kieu="chu"
            kichHoat="tai"
            buoc={34}
            delay={NHIP.eyebrow}
            className="eyebrow mt-9 text-aqua"
          />

          {/* Hai dòng là hai AnimText riêng để dòng dưới bắt đầu sau dòng trên
              một nhịp — cả câu "tụ lại" theo đúng thứ tự đọc. */}
          <h1 className="mt-5 font-display text-[clamp(2.3rem,5vw,3.6rem)] leading-display font-normal tracking-[-0.01em] text-white">
            <AnimText as="span" text="Gửi một bó hoa." kichHoat="tai" delay={NHIP.tieuDe} buoc={75} className="block" />
            <AnimText
              as="span"
              text="Giữ lại một khoảnh khắc."
              kichHoat="tai"
              buoc={75}
              delay={NHIP.tieuDe + 300}
              className="block"
            />
          </h1>

          <p
            className="hero-rise mt-6 flex items-center gap-4 text-[17px] text-white/85 italic"
            style={{ animationDelay: `${NHIP.slogan}ms` }}
          >
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold" />
            {brand.slogan}
          </p>

          <p
            className="hero-rise mt-5 max-w-lg text-[16px] leading-relaxed text-white/70"
            style={{ animationDelay: `${NHIP.moTa}ms` }}
          >
            Bông Dua Fleur thiết kế hoa tươi theo từng câu chuyện, dịp tặng và cảm xúc riêng của bạn.
          </p>

          <div
            className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: `${NHIP.nut}ms` }}
          >
            {/* alt rỗng: ngay cạnh đã có chữ "Zalo" rồi, đọc lại tên logo là thừa. */}
            <a href={socialLinks.zalo} {...external} className={btnPrimaryOnDark}>
              <img
                src="/brand/zalo.webp"
                alt=""
                width={128}
                height={128}
                className="h-5 w-5 shrink-0"
              />
              Nhắn Zalo đặt hoa
            </a>
            <a href="#mau-hoa" className={btnGhostDark}>
              Khám phá mẫu hoa
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <p
            className="hero-rise mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-white/55"
            style={{ animationDelay: `${NHIP.tinCay}ms` }}
          >
            <span>Thiết kế theo yêu cầu</span>
            <span aria-hidden="true" className="text-gold">·</span>
            <span>Hoa tươi mỗi ngày</span>
            <span aria-hidden="true" className="text-gold">·</span>
            <span>Giao hoa tại Hà Nội</span>
          </p>
        </div>
      </div>
    </section>
  );
}
