import { contactInfo, socialLinks } from "@/data/brand";
import { external } from "@/components/ui";

const ITEM =
  "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11.5px] " +
  "text-white/90 transition active:bg-white/10";

/* Thanh liên hệ dính đáy màn hình, chỉ hiện dưới 1280px — đúng ngưỡng mà menu
   ngang chuyển sang menu gọn, để không có khoảng nào vừa mất menu vừa mất thanh
   liên hệ. Body đã có padding-bottom theo safe-area nên thanh này không che nội
   dung cuối trang. */
export default function MobileCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/12 bg-navy/94 backdrop-blur-xl xl:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <nav aria-label="Liên hệ nhanh" className="mx-auto flex max-w-125">
        {/* Logo Zalo thật thay cho chữ "Zalo" — trên mobile thanh này và nút ở
            hero cùng hiện một lúc, để hai nơi hai kiểu sẽ lệch. */}
        <a href={socialLinks.zalo} {...external} className={ITEM}>
          <img
            src="/brand/zalo.webp"
            alt=""
            width={128}
            height={128}
            className="h-[18px] w-[18px] shrink-0"
          />
          Nhắn Zalo
        </a>
        <span aria-hidden="true" className="my-2 w-px bg-white/12" />
        <a href={socialLinks.facebook} {...external} className={ITEM}>
          <span aria-hidden="true" className="text-[15px] leading-none font-medium text-aqua">
            f
          </span>
          Facebook
        </a>
        <span aria-hidden="true" className="my-2 w-px bg-white/12" />
        <a href={`tel:${contactInfo.phoneRaw}`} className={ITEM}>
          <span aria-hidden="true" className="text-[15px] leading-none font-medium text-aqua">
            ☎
          </span>
          Gọi điện
        </a>
      </nav>
    </div>
  );
}
