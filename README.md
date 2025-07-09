# My Portfolio

Chào mừng bạn đến với **My Portfolio** - một trang web cá nhân được xây dựng để giới thiệu kỹ năng, dự án và thông tin liên hệ của tôi, Nguyễn Dũng. Đây là một dự án sử dụng các công nghệ web hiện đại để tạo ra một giao diện trực quan, thân thiện với người dùng.

## Giới thiệu

Dự án này là một trang portfolio cá nhân, được thiết kế để:
- Trưng bày các kỹ năng lập trình của tôi trong lĩnh vực **Frontend**, **Backend** và **Database**.
- Giới thiệu các dự án nổi bật mà tôi đã thực hiện.
- Cung cấp thông tin liên hệ và liên kết đến các hồ sơ mạng xã hội hoặc GitHub của tôi.
- Tạo một giao diện đơn giản, đẹp mắt và responsive trên nhiều thiết bị.

## Công nghệ sử dụng

Dự án được xây dựng với các công nghệ sau:

**Frontend**:
- **HTML** 📝: Cấu trúc giao diện web.
- **CSS** 🖌️: Thiết kế và tạo kiểu cho trang web.
- **Bootstrap** 📚: Framework CSS để xây dựng giao diện responsive.
- **Tailwind CSS** 🌬️: Tiện ích CSS để tùy chỉnh giao diện nhanh chóng.
- **NextJS** ⚡️: Framework React cho hiệu suất cao và SEO tốt.

**Backend**:
- **Node.js** 🟩: Môi trường runtime cho JavaScript phía server.
- **NestJS** 🪺: Framework Node.js để xây dựng API mạnh mẽ và có cấu trúc.

**Database**:
- **MongoDB** 🗃️: Cơ sở dữ liệu NoSQL để lưu trữ dữ liệu linh hoạt.
- **MySQL** 🐬: Cơ sở dữ liệu quan hệ để quản lý dữ liệu có cấu trúc.

## Cài đặt và chạy dự án

Để chạy dự án này trên máy local, hãy làm theo các bước sau:

### Yêu cầu
- **Node.js** (phiên bản 14.x hoặc cao hơn)
- **npm** hoặc **yarn**
- **MongoDB** (nếu sử dụng cơ sở dữ liệu MongoDB)
- **MySQL** (nếu sử dụng cơ sở dữ liệu MySQL)

### Hướng dẫn cài đặt
1. **Clone repository**:
   ```bash
   git clone https://github.com/NguyenDung0101/My-Portfolio.git
   cd My-Portfolio
   ```

2. **Cài đặt dependencies**:
   ```bash
   npm install
   ```
   hoặc
   ```bash
   yarn install
   ```

3. **Cấu hình môi trường**:
   - Tạo file `.env` dựa trên file `.env.example` (nếu có).
   - Cập nhật các biến môi trường như kết nối cơ sở dữ liệu, cổng server, v.v.

4. **Chạy dự án**:
   - Đối với Next.js:
     ```bash
     npm run dev
     ```
     hoặc
     ```bash
     yarn dev
     ```
   - Mở trình duyệt và truy cập `http://localhost:3000`.

5. **Chạy backend (nếu có)**:
   - Nếu dự án sử dụng backend (Node.js/NestJS):
     ```bash
     npm run start
     ```
     hoặc
     ```bash
     yarn start
     ```

## Cấu trúc thư mục
```
My-Portfolio/
├── public/               # Tài nguyên tĩnh (hình ảnh, font, v.v.)
├── src/                  # Mã nguồn chính
│   ├── pages/            # Các trang Next.js
│   ├── components/       # Các component React
│   ├── styles/           # File CSS/Tailwind
│   └── backend/          # Mã nguồn backend (nếu có)
├── .env.example          # Mẫu file cấu hình môi trường
├── package.json          # Quản lý dependencies
└── README.md             # Tài liệu này
```

## Các tính năng chính
- **Trang chủ**: Giới thiệu bản thân và thông tin tổng quan.
- **Kỹ năng**: Hiển thị các kỹ năng lập trình với biểu tượng và mức độ thông thạo.
- **Dự án**: Danh sách các dự án đã thực hiện với mô tả và liên kết.
- **Liên hệ**: Form hoặc thông tin để liên hệ với tôi.

## Đóng góp
Nếu bạn muốn đóng góp vào dự án này, hãy làm theo các bước sau:
1. Fork repository.
2. Tạo một branch mới (`git checkout -b feature/ten-tinh-nang`).
3. Commit các thay đổi (`git commit -m 'Thêm tính năng XYZ'`).
4. Push lên branch (`git push origin feature/ten-tinh-nang`).
5. Tạo Pull Request trên GitHub.

## Liên hệ
- **Email**: [dnguyentuan03@gmail.com](mailto:dnguyentuan03@gmail.com)
- **GitHub**: [NguyenDung0101](https://github.com/NguyenDung0101)
- **LinkedIn**: [Your LinkedIn Profile](#)

Cảm ơn bạn đã ghé thăm portfolio của tôi! 🚀