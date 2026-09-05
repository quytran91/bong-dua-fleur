import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuoteBand from "@/components/QuoteBand";
import ChonHoa from "@/components/ChonHoa";
import Marquee from "@/components/Marquee";
import VeBongDua from "@/components/VeBongDua";
import KhacBiet from "@/components/KhacBiet";
import QuyTrinh from "@/components/QuyTrinh";
import Workshop from "@/components/Workshop";
import DoanhNghiep from "@/components/DoanhNghiep";
import Feedback from "@/components/Feedback";
import LienHe from "@/components/LienHe";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import { brand } from "@/data/brand";

/* Nhịp của trang. Hai dải trích dẫn và một dải chữ chạy đóng vai trò dấu ngắt
   câu: sau mỗi khối nội dung dài, mắt được nghỉ trên một câu duy nhất trước khi
   vào khối tiếp theo.

     navy   hero
     NAVY   trích dẫn 1        <- ngắt sau hero
     trắng  hoa theo dịp
     mist   mẫu hoa
     mist   dải chữ chạy       <- ngắt sau portfolio
     trắng  Thư Phạm
     NAVY   điểm khác biệt
     mist   quy trình
     trắng  workshop
     NAVY   trích dẫn 2        <- ngắt trước phần doanh nghiệp
     mist   doanh nghiệp
     trắng  feedback (đang ẩn)
     navy   CTA cuối
     navy   footer

   Nền sáng vẫn chiếm phần lớn để ảnh hoa giữ được màu thật. */
export default function Home() {
  return (
    <>
      <a
        href="#mau-hoa"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-pill focus:bg-white focus:px-5 focus:py-3 focus:text-navy focus:shadow-lift"
      >
        Bỏ qua, tới phần mẫu hoa
      </a>

      <Header />

      <main className="flex-1">
        <Hero />

        <QuoteBand quote="Một bó hoa đẹp không chỉ nằm ở loài hoa, mà ở khoảnh khắc người nhận mở ra và cảm nhận tình yêu gửi gắm trong đó." />

        {/* "Hoa theo dịp" và lưới mẫu hoa nằm chung một component vì chúng dùng
            chung trạng thái lọc: bấm một dịp ở trên thì lưới bên dưới đổi theo. */}
        <ChonHoa />

        <Marquee />

        <VeBongDua />
        <KhacBiet />
        <QuyTrinh />
        <Workshop />

        <QuoteBand
          quote="Một bó hoa không chỉ mang hương sắc, mà còn mang lời thì thầm bạn muốn gửi gắm."
          author={`${brand.founderName} — ${brand.name}`}
        />

        <DoanhNghiep />
        <Feedback />
        <LienHe />
      </main>

      <Footer />
      <MobileCtaBar />
    </>
  );
}
