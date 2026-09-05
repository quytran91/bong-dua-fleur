import { socialLinks } from "@/data/brand";
import { external } from "@/components/ui";

/* Dải chữ chạy ngang, dùng làm lời mời hành động không giống một cái nút.

   Nội dung được lặp HAI lần trong DOM và track chạy từ 0 tới -50%: hết một bản
   thì bản thứ hai đang nằm đúng vị trí bản đầu, nên vòng lặp không có điểm nối.

   Bản lặp thứ hai mang aria-hidden để trình đọc màn hình không đọc hai lần.
   Cả dải nằm trong một thẻ <a>, nên đây vẫn là một lối vào Zalo thật sự chứ
   không phải chi tiết trang trí. */
const CUM = "Nhắn Zalo để được tư vấn mẫu hoa";

function Day({ an = false }: { an?: boolean }) {
  return (
    <span aria-hidden={an || undefined} className="flex shrink-0 items-center">
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className="flex items-center">
          <span className="px-7 font-display text-[clamp(1.1rem,2.2vw,1.6rem)] whitespace-nowrap text-navy italic">
            {CUM}
          </span>
          <span aria-hidden="true" className="text-[18px] text-gold-deep">
            ✳
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Marquee() {
  return (
    <section className="overflow-hidden border-y border-ink/10 bg-white py-7">
      <a
        href={socialLinks.zalo}
        {...external}
        aria-label={CUM}
        className="group flex w-full items-center transition hover:opacity-70"
      >
        <span className="marquee-track flex min-w-max group-hover:[animation-play-state:paused]">
          <Day />
          <Day an />
        </span>
      </a>
    </section>
  );
}
