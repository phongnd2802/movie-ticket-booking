export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 w-full">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="font-semibold text-lg mb-4">GIỚI THIỆU</h2>
          <ul className="space-y-2">
            <li>
              <a href="#">Về Chúng Tôi</a>
            </li>
            <li>
              <a href="#">Thỏa Thuận Sử Dụng</a>
            </li>
            <li>
              <a href="#">Quy Chế Hoạt Động</a>
            </li>
            <li>
              <a href="#">Chính Sách Bảo Mật</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-4">GÓC ĐIỆN ẢNH</h2>
          <ul className="space-y-2">
            <li>
              <a href="#">Thể Loại Phim</a>
            </li>
            <li>
              <a href="#">Bình Luận Phim</a>
            </li>
            <li>
              <a href="#">Blog Điện Ảnh</a>
            </li>
            <li>
              <a href="#">Phim Hay Tháng</a>
            </li>
            <li>
              <a href="#">Phim IMAX</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-4">HỖ TRỢ</h2>
          <ul className="space-y-2">
            <li>
              <a href="#">Góp Ý</a>
            </li>
            <li>
              <a href="#">Sale & Services</a>
            </li>
            <li>
              <a href="#">Rạp / Giá Vé</a>
            </li>
            <li>
              <a href="#">Tuyển Dụng</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 py-6 text-center text-sm">
        <p className="mb-2">CÔNG TY CỔ PHẦN PHIM THIÊN NGÂN</p>
        <p>
          3/9 Võ Văn Tần, Phường Võ Thị Sáu, Quận 3, Tp. Hồ Chí Minh, Việt Nam
        </p>
        <p>
          ☎️: 028.39.333.303 - 📞: 19002224 (9:00 - 22:00) - ✉️:
          hotro@galaxystudio.vn
        </p>
      </div>
    </footer>
  );
}
