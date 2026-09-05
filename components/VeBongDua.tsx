import AnimText from "@/components/AnimText";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { brand, socialLinks } from "@/data/brand";
import { btnPrimary, external } from "@/components/ui";

/* Thẻ trắng chứa chữ, ảnh dán liền bên phải — hai nửa hợp thành MỘT khối đặc,
   không có khe hở ở giữa. Khối này nổi lên vì section dùng nền mist còn thẻ thì
   trắng; nếu section cũng trắng thì thẻ sẽ tan vào nền và mất hẳn hiệu quả.

   Ảnh cao bằng thẻ chữ (chiều cao do lượng chữ quyết định), nên phải phủ kín
   bằng object-cover thay vì giữ tỷ lệ 4:5 gốc. */
export default function VeBongDua() {
  return (
    /* pt lớn hơn pb vì bông hoa nhô lên khỏi mép trên của khối — cần chỗ trống
       phía trên để nó không đụng vào dải chữ chạy ở section trước. */
    <section id="ve-bong-dua" className="bg-mist pt-28 pb-24 sm:pt-36 sm:pb-32">
      <div className="wrap">
        <Reveal>
          {/* Lớp bọc `relative` này KHÔNG có overflow-hidden, còn khối bên trong
              thì có. Nhờ tách hai lớp, bông hoa nhô lên trên mép mà không bị cắt,
              trong khi ảnh bên phải vẫn được bo góc gọn. */}
          <div className="relative">
            <div className="grid overflow-hidden rounded-img shadow-soft lg:grid-cols-[1.08fr_0.92fr]">
              {/* ── Nửa trái: thẻ trắng ── */}
              <div className="flex flex-col justify-center bg-white p-8 sm:p-12 lg:p-14">
                <AnimText
                  as="p"
                  text="Người sáng lập"
                  kieu="chu"
                  buoc={26}
                  className="eyebrow text-muted"
                />

                <span
                  aria-hidden="true"
                  className="mt-4 mb-6 block h-px w-10 bg-gold"
                />

                <AnimText
                  as="h2"
                  text={brand.founderName}
                  delay={140}
                  className="font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-display font-normal tracking-[-0.01em] text-ink"
                />

                {/* Cụm này được bôi vệt bút dạ vàng để nổi lên giữa đoạn văn.
                  Chữ đổi sang màu ink (không còn gold-deep) vì giờ nó nằm TRÊN
                  nền vàng — để nguyên màu vàng thì vàng chồng vàng, không đọc được. */}
                <p className="mt-5">
                  <span className="marker inline-block px-1 text-[16px] leading-relaxed text-ink">
                    <span className="font-display text-[22px] leading-none">
                      {brand.founderYears}
                    </span>{" "}
                    năm đồng hành cùng hoa
                  </span>
                </p>

                <div className="mt-7 space-y-4 text-[16px] leading-relaxed text-muted">
                  <p>
                    Bông Dua Fleur được sáng lập bởi Thư Phạm, người đã có hơn 5
                    năm đồng hành cùng hoa và những câu chuyện được gửi gắm qua
                    từng bó hoa.
                  </p>
                  <p>
                    Với Thư, một bó hoa đẹp không chỉ nằm ở màu sắc hay loại hoa
                    được sử dụng, mà còn ở cảm xúc của người tặng và khoảnh khắc
                    của người nhận.
                  </p>
                  <p>
                    Mỗi thiết kế đều được thực hiện bằng sự lắng nghe và chăm
                    chút riêng. Từ một bó hoa nhỏ cho ngày sinh nhật, một lời
                    yêu chưa kịp nói, đến những kệ hoa khai trương dành cho đối
                    tác — Bông Dua mong giúp bạn trao đi tình cảm theo cách chân
                    thành và tinh tế nhất.
                  </p>
                </div>

                <div className="mt-9">
                  <a
                    href={socialLinks.zalo}
                    {...external}
                    className={btnPrimary}
                  >
                    Nhắn Thư để được tư vấn
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>

              {/* ── Nửa phải: ảnh ──
                min-h trên mobile để ảnh không bị bẹp khi chưa có chiều cao từ
                lưới; từ 1024px thì chiều cao lấy theo thẻ chữ bên trái. */}
              <div className="relative min-h-80 sm:min-h-96 lg:min-h-0">
                <Photo
                  name="founder/thu-pham"
                  alt="Thư Phạm, người sáng lập Bông Dua Fleur, bên những bình hoa cẩm tú cầu hồng."
                  widths={[640, 1280]}
                  ratio={4 / 5}
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  wrapClassName="absolute inset-0 block"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Hoạ tiết hoa đè lên đường nối giữa thẻ chữ và ảnh (54% — đúng chỗ
                hai nửa gặp nhau). Thuần trang trí: alt rỗng và pointer-events-none
                để nó không chắn thao tác bấm vào ảnh phía dưới. */}
            <img
              src="/images/decor/hoa-peony-440.webp"
              srcSet="/images/decor/hoa-peony-440.webp 440w, /images/decor/hoa-peony-880.webp 880w"
              sizes="(min-width: 1024px) 150px, 96px"
              alt=""
              width={440}
              height={650}
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute -top-18 left-[54%] z-10 w-24 -translate-x-1/2 drop-shadow-[0_10px_18px_rgba(2,13,45,0.14)] sm:-top-24 sm:w-32 lg:-top-28 lg:w-[150px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
