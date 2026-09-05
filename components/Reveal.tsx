"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* Hiện dần khi cuộn tới. Cố ý KHÔNG ẩn nội dung ở HTML tĩnh: chỉ khi
   JavaScript chạy được và người dùng không bật "giảm chuyển động" thì phần tử
   mới được đặt về trạng thái ẩn rồi hiện ra. Nhờ vậy trang vẫn đọc được đầy đủ
   khi JS lỗi, và Google luôn thấy nội dung. */
export default function Reveal({
  children, delay = 0, className,
}: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.dataset.reveal = "hidden";
    el.style.transitionDelay = `${delay}ms`;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.reveal = "shown";
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return <div ref={ref} className={className}>{children}</div>;
}
