import type { Metadata, Viewport } from "next";
import { Playfair_Display, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { brand, contactInfo, socialLinks } from "@/data/brand";

/* Hai font, tối đa ba độ đậm mỗi font — nhiều hơn thì trang mất sự tiết chế.
   Cả hai đều nạp kèm bộ ký tự "vietnamese"; thiếu bộ này thì các chữ có dấu
   (ữ, ậ, ợ) sẽ rơi về font dự phòng và dòng chữ bị so le. */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500"],
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const TITLE = `${brand.name} | Hoa tươi và hoa bó theo yêu cầu tại Hà Nội`;
const DESC =
  "Bông Dua Fleur thiết kế hoa tươi, hoa sinh nhật, hoa khai trương, hoa sự kiện và quà tặng thủ công tại Hà Nội. Liên hệ Zalo để được tư vấn mẫu hoa theo yêu cầu.";

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: brand.name,
    url: brand.url,
    title: TITLE,
    description: DESC,
    /* metadataBase ở trên biến đường dẫn này thành URL tuyệt đối — Facebook và
       Zalo đọc thẻ og:image từ máy chủ của họ nên đường dẫn tương đối sẽ không
       hiện ảnh bìa. */
    images: [
      {
        url: "/images/og/cover.jpg",
        width: 1200,
        height: 630,
        alt: `${brand.name} — hoa tươi tại Hà Nội`,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  /* Favicon dùng monogram: ở 32px thì hai dòng chữ trong logo đầy đủ chỉ còn
     là vệt mờ. */
  icons: { icon: "/brand/logo-monogram.png", apple: "/brand/logo-monogram.png" },
};

export const viewport: Viewport = {
  themeColor: "#020d2d",
};

/* Dữ liệu có cấu trúc cho Google.
   LƯU Ý: loại "Florist" ngụ ý có cửa hàng khách ghé được. Nếu địa chỉ dưới đây
   chỉ là xưởng/nhà riêng không đón khách, đổi "@type" thành "LocalBusiness" và
   bỏ khối "address" để tránh Google hiểu sai. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Florist",
  name: brand.name,
  description: brand.description,
  url: brand.url,
  image: `${brand.url}/images/og/cover.jpg`,
  logo: `${brand.url}/brand/logo-full.png`,
  telephone: contactInfo.phoneRaw,
  address: {
    "@type": "PostalAddress",
    streetAddress: contactInfo.address,
    addressLocality: contactInfo.addressLocality,
    addressCountry: contactInfo.addressCountry,
  },
  areaServed: { "@type": "City", name: "Hà Nội" },
  sameAs: [socialLinks.facebook, socialLinks.instagram, socialLinks.tiktok],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${playfair.variable} ${beVietnam.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
