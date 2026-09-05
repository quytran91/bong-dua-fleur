"use client";

import { useEffect, useState } from "react";
import { brand, socialLinks } from "@/data/brand";
import { btnPrimaryOnDark, external } from "@/components/ui";

const NAV = [
  { href: "#dau-trang", label: "Trang chủ" },
  { href: "#hoa-theo-dip", label: "Hoa theo dịp" },
  { href: "#mau-hoa", label: "Mẫu hoa" },
  { href: "#ve-bong-dua", label: "Về Bông Dua" },
  { href: "#workshop", label: "Workshop" },
  { href: "#doanh-nghiep", label: "Doanh nghiệp" },
  { href: "#lien-he", label: "Liên hệ" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Khoá cuộn nền khi menu mở, nếu không người dùng sẽ cuộn trang phía sau lớp
     phủ mà tưởng là menu bị treo. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 " +
        (solid ? "bg-navy/88 backdrop-blur-xl" : "bg-transparent")
      }
    >
      <div className="wrap flex h-18 items-center gap-6">
        {/* Navbar dùng monogram, KHÔNG dùng logo đầy đủ: logo gốc là lockup dọc
            có hai dòng chữ ở dưới, thu về ~50px thì chữ không còn đọc được.
            Tên tiệm bên cạnh là chữ sống, luôn sắc nét ở mọi kích thước. */}
        <a href="#dau-trang" className="flex shrink-0 items-center gap-3">
          <img
            src="/brand/logo-monogram.png"
            alt=""
            width={512}
            height={512}
            className="h-11 w-11 object-contain xl:h-13 xl:w-13"
          />
          <span className="font-display text-[19px] leading-none tracking-tight text-white">
            {brand.name}
          </span>
        </a>

        <nav aria-label="Điều hướng chính" className="ml-auto hidden xl:block">
          <ul className="flex items-center gap-6">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="text-[14px] whitespace-nowrap text-white/80 transition hover:text-aqua"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bọc trong div để ẩn/hiện, KHÔNG đặt "hidden" thẳng lên thẻ <a>:
            btnPrimaryOnDark đã chứa "inline-flex", mà hai lớp cùng đặt thuộc
            tính display thì lớp nào Tailwind sinh ra sau sẽ thắng — không phụ
            thuộc thứ tự viết trong className. */}
        <div className="hidden xl:block">
          <a href={socialLinks.zalo} {...external} className={btnPrimaryOnDark}>
            <img src="/brand/zalo.webp" alt="" width={128} height={128} className="h-5 w-5 shrink-0" />
            Nhắn Zalo đặt hoa
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white xl:hidden"
        >
          <span aria-hidden="true" className="relative block h-4 w-5">
            <span
              className={
                "absolute left-0 h-px w-5 bg-current transition-all duration-300 " +
                (open ? "top-1.75 rotate-45" : "top-0")
              }
            />
            <span
              className={
                "absolute top-1.75 left-0 h-px w-5 bg-current transition-opacity duration-200 " +
                (open ? "opacity-0" : "opacity-100")
              }
            />
            <span
              className={
                "absolute left-0 h-px w-5 bg-current transition-all duration-300 " +
                (open ? "top-1.75 -rotate-45" : "top-3.5")
              }
            />
          </span>
        </button>
      </div>

      <div id="menu-mobile" hidden={!open} className="border-t border-white/10 bg-navy/96 backdrop-blur-xl xl:hidden">
        <ul className="wrap space-y-0.5 py-5">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                onClick={() => setOpen(false)}
                className="block px-2 py-3 text-[16px] text-white/90 transition hover:text-aqua"
              >
                {n.label}
              </a>
            </li>
          ))}
          <li className="pt-3">
            <a
              href={socialLinks.zalo}
              {...external}
              onClick={() => setOpen(false)}
              className={`${btnPrimaryOnDark} w-full`}
            >
              Nhắn Zalo đặt hoa
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
