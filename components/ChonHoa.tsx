"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { categories, categoryName, type CategoryId } from "@/data/categories";
import { products } from "@/data/products";
import { messageForProduct, socialLinks } from "@/data/brand";
import { external } from "@/components/ui";

type Filter = CategoryId | "tat-ca";

/* Lệch tầng theo chu kỳ 3 cột: cột giữa tụt xuống nhiều nhất, cột phải tụt vừa.
   Đây là cách tạo lưới bất đối xứng mà vẫn giữ chiều cao ô cố định — nhờ vậy
   trình duyệt biết trước chỗ của mọi ảnh và trang không bị nhảy khi ảnh tải về. */
const LECH = ["lg:mt-0", "lg:mt-16", "lg:mt-7"];

export default function ChonHoa() {
  const [filter, setFilter] = useState<Filter>("tat-ca");
  const [xemThem, setXemThem] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const hetGio = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(hetGio.current), []);

  const danhSach = useMemo(() => {
    /* Lọc theo mảng occasion chứ không theo category, để một bó hoa hợp nhiều
       dịp vẫn xuất hiện ở đủ các dịp đó. */
    if (filter !== "tat-ca") return products.filter((p) => p.occasion.includes(filter));
    return xemThem ? products : products.filter((p) => p.featured);
  }, [filter, xemThem]);

  const conAn = filter === "tat-ca" && !xemThem && products.length > danhSach.length;
  const dipDangChon = categories.find((c) => c.id === filter);

  function chonDip(id: CategoryId) {
    setFilter(id);
    document.getElementById("mau-hoa")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* Zalo không nhận nội dung soạn sẵn qua URL, nên chép mã mẫu vào clipboard để
     khách chỉ việc dán vào khung chat. Chép thất bại cũng không sao — thẻ <a>
     vẫn mở đúng trang Zalo của tiệm. */
  async function chepMa(name: string, code: string) {
    try {
      await navigator.clipboard.writeText(messageForProduct(name, code));
      setToast(`Đã chép mã ${code}. Dán vào Zalo là xong.`);
      window.clearTimeout(hetGio.current);
      hetGio.current = window.setTimeout(() => setToast(null), 3600);
    } catch {
      /* Trình duyệt chặn clipboard: bỏ qua, không làm phiền khách bằng báo lỗi. */
    }
  }

  return (
    <>
      {/* ═══════════ HOA THEO DỊP ═══════════ */}
      <section id="hoa-theo-dip" className="bg-white py-24 sm:py-32">
        <div className="wrap">
          <SectionHead
            eyebrow="Bắt đầu từ đây"
            title="Bạn muốn gửi hoa cho dịp nào?"
            lead="Chọn một dịp, Bông Dua sẽ đưa bạn tới những mẫu hoa phù hợp nhất."
          />

          <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
            {categories.map((c, i) => {
              const dangChon = filter === c.id;
              return (
                <li key={c.id}>
                  <Reveal delay={Math.min(i, 7) * 40}>
                    <button
                      type="button"
                      onClick={() => chonDip(c.id)}
                      aria-pressed={dangChon}
                      className="group block w-full text-left"
                    >
                      <span className="block overflow-hidden rounded-img bg-mist">
                        <Photo
                          name={c.image}
                          alt=""
                          widths={[480, 960]}
                          ratio={4 / 5}
                          sizes="(min-width: 1024px) 21vw, (min-width: 640px) 29vw, 43vw"
                          className={
                            "block w-full transition-transform duration-700 ease-out group-hover:scale-[1.03] " +
                            (dangChon ? "scale-[1.03]" : "")
                          }
                        />
                      </span>
                      <span className="mt-4 flex items-baseline gap-2">
                        <span
                          className={
                            "font-display text-[18px] leading-snug transition " +
                            (dangChon ? "text-cobalt" : "text-ink group-hover:text-cobalt")
                          }
                        >
                          {c.name}
                        </span>
                        {dangChon && (
                          <span aria-hidden="true" className="h-px w-5 shrink-0 bg-gold" />
                        )}
                      </span>
                      <span className="mt-1.5 block text-[13.5px] leading-relaxed text-muted">
                        {c.blurb}
                      </span>
                    </button>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ═══════════ PORTFOLIO ═══════════ */}
      <section id="mau-hoa" className="bg-mist py-24 sm:py-32">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Portfolio" title="Những bó hoa đã được trao đi" />

            {dipDangChon && (
              <Reveal>
                <button
                  type="button"
                  onClick={() => setFilter("tat-ca")}
                  className="inline-flex items-center gap-2 rounded-pill border border-ink/20 px-4 py-2 text-[13.5px] text-ink transition hover:border-ink/45 hover:bg-white"
                >
                  <span>Đang xem: {dipDangChon.name}</span>
                  <span aria-hidden="true" className="text-[16px] leading-none">×</span>
                  <span className="sr-only">Bỏ lọc, xem tất cả các dịp</span>
                </button>
              </Reveal>
            )}
          </div>

          {/* aria-live để người dùng đọc màn hình biết lưới vừa đổi sau khi lọc. */}
          <p aria-live="polite" className="sr-only">
            Đang hiện {danhSach.length} mẫu hoa
            {dipDangChon ? " cho dịp " + dipDangChon.name : ""}.
          </p>

          {/* Mọi ảnh sản phẩm đều là ảnh dọc 4:5 — nhịp của lưới đến từ độ lệch
              tầng giữa các cột, không đến từ việc trộn tỷ lệ. Ép ảnh dọc thành
              1:1 hay 3:2 sẽ cắt mất phần trên của bó hoa. */}
          <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
            {danhSach.map((p, i) => (
              <li key={p.id} className={LECH[i % 3]}>
                <Reveal delay={Math.min(i, 5) * 60}>
                  <article className="group">
                    <a
                      href={socialLinks.zalo}
                      {...external}
                      onClick={() => chepMa(p.name, p.code)}
                      className="block overflow-hidden rounded-img bg-white"
                    >
                      <Photo
                        name={p.image}
                        alt={p.alt}
                        widths={[640, 1280]}
                        ratio={4 / 5}
                        sizes="(min-width: 1024px) 30vw, 45vw"
                        className="block w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </a>

                    <div className="mt-5">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-[13px] text-gold-deep">{p.code}</span>
                        <span aria-hidden="true" className="h-px flex-1 bg-ink/12" />
                        <span className="text-[12.5px] text-muted">{categoryName(p.category)}</span>
                      </div>

                      <h3 className="mt-3 font-display text-[21px] leading-snug text-ink">{p.name}</h3>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{p.description}</p>

                      <a
                        href={socialLinks.zalo}
                        {...external}
                        onClick={() => chepMa(p.name, p.code)}
                        className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-cobalt transition hover:text-navy"
                      >
                        Tư vấn mẫu này
                        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                      </a>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>

          {conAn && (
            <div className="mt-16 text-center">
              <button
                type="button"
                onClick={() => setXemThem(true)}
                className="inline-flex items-center gap-2 rounded-pill border border-ink/20 px-7 py-3 text-[14px] font-medium text-ink transition hover:border-ink/45 hover:bg-white"
              >
                Xem thêm mẫu hoa
                <span aria-hidden="true">↓</span>
              </button>
            </div>
          )}

          <p className="mt-12 text-center text-[14px] text-muted">
            Giá được tư vấn riêng theo mẫu, loại hoa, kích thước và mùa hoa.
          </p>
        </div>
      </section>

      {/* Toast xác nhận đã chép mã. role="status" để trình đọc màn hình thông báo
          mà không cắt ngang thao tác đang làm. */}
      <div
        role="status"
        aria-live="polite"
        className={
          "pointer-events-none fixed inset-x-4 bottom-24 z-40 mx-auto max-w-sm rounded-pill bg-navy px-5 py-3 text-center text-[13.5px] text-white shadow-lift transition-all duration-300 xl:bottom-8 " +
          (toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0")
        }
      >
        {toast}
      </div>
    </>
  );
}
