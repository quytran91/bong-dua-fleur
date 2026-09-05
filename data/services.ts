/* Dịch vụ doanh nghiệp, và những điểm khác biệt của tiệm.
   Cả hai đều chỉ là chữ, không cần ảnh — sửa trực tiếp ở đây. */

export interface Service {
  title: string;
  detail: string;
}

export const services: Service[] = [
  { title: "Kệ hoa khai trương", detail: "Dựng và giao đúng giờ cắt băng, bảng chúc ghi theo tên đơn vị." },
  { title: "Hoa sự kiện", detail: "Hoa sân khấu, bàn tiệc và khu chụp ảnh cho lễ ra mắt, hội nghị." },
  { title: "Hoa chúc mừng đối tác", detail: "Bó hoặc giỏ hoa kèm thiệp viết tay theo nội dung bạn gửi." },
  { title: "Đơn hàng số lượng", detail: "Hoa tri ân, hoa 8/3 và 20/10 cho cả phòng ban hoặc toàn công ty." },
  { title: "Hoa sỉ và lẻ", detail: "Cung cấp hoa tươi theo lô cho cửa hàng, quán và đơn vị tổ chức." },
  { title: "Xuất hoá đơn VAT", detail: "Hỗ trợ đầy đủ chứng từ để phòng kế toán quyết toán." },
];

/* Section "Điểm khác biệt" — cố ý để dạng danh sách đánh số, không dùng icon.
   Icon chung chung làm loãng thông điệp; con số Champagne Gold giữ nhịp editorial. */
export const differentiators: Service[] = [
  { title: "Hoa tuyển trong ngày", detail: "Hoa được chọn theo từng đơn, không giữ tồn để bán dần." },
  { title: "Thiết kế theo yêu cầu", detail: "Bó hoa dựng theo dịp tặng, màu sắc và ngân sách bạn đưa ra." },
  { title: "Tư vấn trực tiếp", detail: "Bạn nhắn với chính florist, không qua tổng đài hay chatbot." },
  { title: "Làm thủ công", detail: "Từng bó do Thư Phạm và cộng sự tự tay hoàn thiện." },
  { title: "Cá nhân và doanh nghiệp", detail: "Từ một bó nhỏ đến đơn hoa sự kiện vài chục kệ." },
  { title: "Có hoá đơn VAT", detail: "Đầy đủ chứng từ cho đơn hàng của công ty." },
];
