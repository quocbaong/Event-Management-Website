# Event Management System - Frontend

Dự án Frontend cho Hệ thống Quản lý Sự kiện (Event Management Website) được xây dựng với React và Vite, cung cấp giao diện người dùng hiện đại, tương tác cao cho cả người tham gia và nhà tổ chức sự kiện.

## 🚀 Công nghệ sử dụng

Dự án sử dụng các công nghệ và thư viện hiện đại nhất để đảm bảo hiệu suất và trải nghiệm người dùng:

- **Core**: React 19, Vite, React Router DOM
- **UI & Styling**: TailwindCSS v4, Material UI (MUI), Framer Motion (cho animations)
- **Biểu đồ & Thống kê**: Chart.js, react-chartjs-2, Recharts
- **Lịch & Thời gian**: FullCalendar (@fullcalendar/react, daygrid, timegrid, interaction)
- **Tiện ích**: Axios (gọi API), Lucide React (Icons), qrcode.react (Tạo mã QR)

## ✨ Tính năng nổi bật

Dựa trên quá trình phát triển, hệ thống cung cấp các tính năng chính sau (tập trung vào nghiệp vụ của Nhà tổ chức - Organizer):

- **Bảng điều khiển Quản lý Sự kiện (Dashboard)**: Tổng quan số liệu thống kê trực quan với nhiều loại biểu đồ (Recharts, Chart.js).
- **Lịch Sự kiện (Schedule Interface)**: Hiển thị sự kiện theo lịch (tháng, tuần, ngày) sử dụng FullCalendar. Hỗ trợ xem chi tiết sự kiện với modal chuyên nghiệp, hiệu ứng hover, và các chỉ thị trực quan (dots).
- **Báo cáo & Phân tích (Reporting)**: Module báo cáo mạnh mẽ, cho phép tuỳ chỉnh (chọn khoảng thời gian) và xuất dữ liệu ra nhiều định dạng khác nhau (PDF, Excel, CSV).
- **Trải nghiệm người dùng (UX)**: Giao diện hiện đại, responsive, kết hợp các hiệu ứng mượt mà từ Framer Motion và hệ thống icon từ Lucide/MUI.
- **Tính năng mở rộng**: Hỗ trợ quét và tạo mã QR (qrcode.react) cho vé sự kiện hoặc điểm danh.

## 🛠 Hướng dẫn cài đặt và chạy dự án

### Yêu cầu hệ thống
- **Node.js**: Phiên bản >= 18.x (khuyến nghị sử dụng phiên bản LTS mới nhất)
- **NPM** hoặc **Yarn**

### Các bước cài đặt

1. **Clone repository (nếu chưa có)**
   ```bash
   git clone <repository-url>
   cd Event-Management-Website/Event-Management-Website
   ```

2. **Cài đặt các dependencies**
   ```bash
   npm install
   ```

3. **Chạy dự án ở môi trường phát triển (Development)**
   ```bash
   npm run dev
   ```
   Dự án sẽ khởi chạy mặc định tại: `http://localhost:5173/` (Vite)

4. **Build dự án cho Production**
   ```bash
   npm run build
   ```
   Thư mục `dist/` sẽ được tạo ra chứa các file tĩnh đã được tối ưu.

5. **Xem trước bản Build (Preview)**
   ```bash
   npm run preview
   ```

## 📂 Cấu trúc thư mục (Tham khảo)

```text
Event-Management-Website/
├── public/               # Tài nguyên tĩnh (images, icons,...)
├── src/                  # Mã nguồn chính của ứng dụng
│   ├── components/       # Các UI component có thể tái sử dụng
│   ├── pages/            # Các trang giao diện (Ví dụ: OrganizerReportTemplatesPage, OrganizerSchedulePage,...)
│   ├── routes/           # Cấu hình routing của ứng dụng
│   ├── assets/           # Tài nguyên css, hình ảnh trong src
│   ├── utils/            # Các hàm hỗ trợ
│   ├── App.jsx           # Component gốc của React
│   └── main.jsx          # Entry point của ứng dụng
├── package.json          # Quản lý dependencies và scripts
├── vite.config.js        # Cấu hình Vite
└── tailwind.config.js    # Cấu hình TailwindCSS (nếu có)
```

## 📝 Quy ước code & Linter

Dự án đã được cấu hình sẵn ESLint (`eslint.config.js`) để đảm bảo chất lượng code và tính nhất quán.
- Chạy kiểm tra lỗi:
  ```bash
  npm run lint
  ```

---
*Lưu ý: Bạn có thể cập nhật thêm thông tin về các biến môi trường (`.env`) hoặc các cấu hình API backend chi tiết hơn khi dự án phát triển hoàn thiện.*
