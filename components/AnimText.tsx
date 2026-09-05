"use client";

import { useEffect, useRef, type ElementType } from "react";

type Kieu = "tu" | "chu";
type KichHoat = "cuon" | "tai";

interface AnimTextProps {
  text: string;
  /* "tu" = từng từ (tiêu đề), "chu" = từng chữ cái (nhãn nhỏ chữ hoa — ở cỡ đó
     tách theo từ gần như không thấy hiệu ứng). */
  kieu?: Kieu;
  /* "cuon"  — mức hiện GẮN THEO tiến độ cuộn: cuộn xuống chữ rõ dần, cuộn lên
                chữ mờ và thu lại. Dùng cho mọi thứ nằm dưới màn hình đầu.
     "tai"   — chạy một lần khi tải trang. Dùng cho hero, vì hero đã nằm sẵn
                trong khung nhìn nên không có quãng cuộn nào để bám vào. */
  kichHoat?: KichHoat;
  as?: ElementType;
  className?: string;
  /* Với "tai": trễ tính bằng ms.
     Với "cuon": quy ra độ lệch tiến độ, để dòng dưới bắt đầu sau dòng trên. */
  delay?: number;
  /* Với "tai": khoảng cách giữa hai mảnh, ms.
     Với "cuon": không dùng — nhịp do quãng cuộn quyết định. */
  buoc?: number;
  /* Độ nhoè tối đa (px) của mảnh chưa hiện. */
  nhoe?: number;
  /* Độ nhích lên (px) của mảnh chưa hiện. Đặt 0 để chữ đứng yên, chỉ mờ dần. */
  nhich?: number;
  /* Bao nhiêu mảnh cùng "đang bay" một lúc. Số càng lớn thì dải chuyển tiếp
     càng dài và mềm. */
  chong?: number;
}

/* Mặc định dùng cho tiêu đề: nhoè mạnh, có nhích lên, dải chuyển tiếp ngắn.
   Dải trích dẫn dùng bộ số khác hẳn (xem QuoteBand) — chữ to và nhiều dòng nên
   nhoè 10px sẽ thành một vệt không đọc nổi. */
const MAC_DINH = { nhoe: 10, nhich: 10, chong: 3 };

/* ── Bộ chạy dùng chung cho mọi AnimText kiểu "cuon" ──────────────────────
   MỘT listener cuộn cho cả trang, thay vì mỗi component một cái. Mỗi lần vẽ chỉ
   tính lại những khối đang ở gần khung nhìn, và bỏ qua khối có tiến độ gần như
   không đổi — nếu không, hơn 200 thẻ span sẽ bị ghi lại style mỗi lần cuộn và
   trang sẽ giật. */
type Muc = {
  el: HTMLElement;
  manh: HTMLElement[];
  lech: number;
  truoc: number;
  nhoe: number;
  nhich: number;
  chong: number;
};
const soMuc = new Set<Muc>();
let daGanListener = false;
let dangCho = false;

/* Chỉ vẽ khi thực sự có cuộn hoặc đổi kích thước, và gộp nhiều sự kiện vào một
   khung hình. Cố ý KHÔNG chạy vòng rAF liên tục: cuộn xong mà vòng vẫn quay thì
   máy vẫn phải thức, hao pin trên điện thoại mà chẳng vẽ thêm gì. */
function hen() {
  if (dangCho) return;
  dangCho = true;
  requestAnimationFrame(() => {
    dangCho = false;
    ve();
  });
}

function veMuc(m: Muc, vh: number) {
  const batDau = vh * 0.94; // mép trên khối ở đây -> tiến độ 0
  const ketThuc = vh * 0.4; //                    -> tiến độ 1

  const r = m.el.getBoundingClientRect();
  /* Bỏ qua khối ở quá xa khung nhìn: tiến độ của chúng chắc chắn đã là 0 hoặc 1.
     NGOẠI TRỪ lần vẽ đầu tiên (truoc === -1) — lần đó vẫn phải chạy để đặt đúng
     trạng thái nghỉ theo thông số của khối. Không có ngoại lệ này, khối nằm xa
     sẽ giữ nguyên giá trị của class .aw (nhoè 10px của tiêu đề) thay vì thông số
     riêng của nó. */
  if (m.truoc !== -1 && (r.bottom < -vh || r.top > vh * 1.5)) return;

  let p = (batDau - r.top) / (batDau - ketThuc);
  p = p < 0 ? 0 : p > 1 ? 1 : p;
  // Dòng dưới bắt đầu sau dòng trên: nén tiến độ vào quãng còn lại.
  if (m.lech > 0) p = p <= m.lech ? 0 : (p - m.lech) / (1 - m.lech);

  if (Math.abs(p - m.truoc) < 0.004) return; // chưa đổi đủ để phải vẽ lại
  m.truoc = p;

  const n = m.manh.length;
  for (let i = 0; i < n; i++) {
    let l = (p * (n + m.chong) - i) / m.chong;
    l = l < 0 ? 0 : l > 1 ? 1 : l;
    const s = m.manh[i].style;
    s.opacity = String(0.001 + 0.999 * l);
    s.filter = l === 1 ? "none" : `blur(${(m.nhoe * (1 - l)).toFixed(2)}px)`;
    s.transform =
      l === 1 || m.nhich === 0 ? "none" : `translateY(${(m.nhich * (1 - l)).toFixed(2)}px)`;
  }
}

function ve() {
  const vh = window.innerHeight;
  for (const m of soMuc) veMuc(m, vh);
}

function themMuc(m: Muc) {
  soMuc.add(m);
  if (!daGanListener) {
    daGanListener = true;
    addEventListener("scroll", hen, { passive: true });
    addEventListener("resize", hen);
  }
  // Vẽ NGAY, không đợi khung hình đầu tiên: giữa lúc gắn class .aw và lúc rAF
  // chạy sẽ có một nhịp mảnh chữ hiện sai thông số (class .aw dùng bộ mặc định
  // của tiêu đề), đủ để thấy một cái nháy.
  veMuc(m, window.innerHeight);
  hen();
}

/* Chữ hiện dần theo từng từ: mờ + nhoè + nhích lên.

   Ba điều quan trọng:

   1. Trạng thái mặc định là ĐÃ HIỆN. Chỉ khi JavaScript chạy được thì các mảnh
      mới bị đặt về trạng thái ẩn. Nhờ vậy JS lỗi hay chưa tải thì khách vẫn đọc
      được, và Google luôn thấy đủ chữ.

   2. Trình đọc màn hình đọc `aria-label` của thẻ bao ngoài, còn các mảnh đều
      `aria-hidden`. Nếu không, câu "Gửi một bó hoa" sẽ bị đọc rời rạc từng từ.

   3. Tôn trọng `prefers-reduced-motion`: bỏ qua hoàn toàn, không tách mảnh. */
export default function AnimText({
  text,
  kieu = "tu",
  kichHoat = "cuon",
  as: Tag = "span",
  className,
  delay = 0,
  buoc = 55,
  nhoe = MAC_DINH.nhoe,
  nhich = MAC_DINH.nhich,
  chong = MAC_DINH.chong,
}: AnimTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const manh = Array.from(el.querySelectorAll<HTMLElement>("[data-manh]"));
    manh.forEach((m) => m.classList.add("aw"));

    if (kichHoat === "tai") {
      /* Hero: chạy một lần khi tải. Dùng transition + class nên trình duyệt tự
         lo phần nội suy.

         `void el.offsetWidth` KHÔNG phải dòng thừa: nó ép trình duyệt tính lại
         style ngay tại đây. Không có nó, việc thêm .aw rồi .aw-in có thể rơi vào
         cùng một khung hình — trình duyệt chưa từng thấy trạng thái .aw nên
         không có gì để chuyển tiếp, và chữ hiện thẳng ra không hề nhoè.
         Trước đây tôi dùng setTimeout 30ms, nhưng 30ms vẫn nằm gọn trong một
         khung hình khi máy yếu hoặc tab bị giảm nhịp vẽ. */
      void el.offsetWidth;
      manh.forEach((m, i) => {
        m.style.transitionDelay = `${delay + i * buoc}ms`;
        m.classList.add("aw-in");
      });
      return;
    }

    /* Quy delay (ms) thành độ lệch tiến độ, chặn ở 0.4 để dòng sau không bao giờ
       phải đợi quá nửa quãng cuộn mới bắt đầu. */
    const muc: Muc = {
      el,
      manh,
      lech: Math.min(delay / 1600, 0.4),
      truoc: -1,
      nhoe,
      nhich,
      chong,
    };
    themMuc(muc);
    return () => {
      soMuc.delete(muc);
    };
  }, [delay, buoc, kichHoat, text, nhoe, nhich, chong]);

  /* Tách theo từ thì giữ dấu cách NGOÀI span, để khoảng trắng không bị nhoè theo
     và dòng chữ vẫn xuống hàng bình thường. */
  const manh = kieu === "tu" ? text.split(" ") : Array.from(text);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {manh.map((m, i) => (
        <span key={i} aria-hidden="true">
          <span data-manh="" className="inline-block">
            {m === " " ? " " : m}
          </span>
          {kieu === "tu" && i < manh.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
