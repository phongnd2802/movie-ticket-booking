import ListMovie from "@/components/page/listMovie";
import Slide from "@/components/page/slide";
import Header from "@/components/page/header";
import SubNav from "@/components/page/subNav";
import Movie from "@/components/page/movie";
import Footer from "@/components/page/footer";
import Section from "@/components/page/section";

const sampleMovies = [
  {
    id: "1",
    title: "Nhà Gia Tiên",
    image: "page/nha-gia-tien-500_1739775156127.jpg",
    genre: "Hài, Tâm Linh",
    trailer: true,
    ticket: true,
  },
  {
    id: "2",
    title: "Deadpool & Wolverine",
    image: "page/nha-gia-tien-500_1739775156127.jpg",
    genre: "Hành Động, Phiêu Lưu",
    trailer: true,
    ticket: true,
  },
  {
    id: "3",
    title: "Inside Out 2",
    image: "page/nha-gia-tien-500_1739775156127.jpg",
    genre: "Hoạt Hình, Gia Đình",
    trailer: true,
    ticket: true,
  },
  {
    id: "4",
    title: "Bụi Đời Chợ Lớn",
    image: "page/nha-gia-tien-500_1739775156127.jpg",
    genre: "Hành Động, Tội Phạm",
    trailer: true,
    ticket: true,
  },
  {
    id: "5",
    title: "Godzilla x Kong",
    image: "page/nha-gia-tien-500_1739775156127.jpg",
    genre: "Hành Động, Viễn Tưởng",
    trailer: true,
    ticket: true,
  },
  {
    id: "6",
    title: "Dune: Part Two",
    image: "page/nha-gia-tien-500_1739775156127.jpg",
    genre: "Khoa Học Viễn Tưởng",
    trailer: true,
    ticket: true,
  },
  {
    id: "7",
    title: "Kung Fu Panda 4",
    image: "page/nha-gia-tien-500_1739775156127.jpg",
    genre: "Hoạt Hình, Hài",
    trailer: true,
    ticket: true,
  },
  {
    id: "8",
    title: "Twisters",
    image: "page/nha-gia-tien-500_1739775156127.jpg",
    genre: "Hành Động, Thảm Họa",
    trailer: true,
    ticket: true,
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-16">
      {/* Header and Main Content */}
      <div className="w-full">
        <Header />
        <div className="flex flex-col gap-12 items-center">
          <Slide />

          <Section>
            {/* Movie Navigation */}
            <SubNav title="PHIM" nav1="Đang chiếu" nav2="Sắp chiếu" />

            {/* Movie List */}
            <div className="w-full mt-4">
              <ListMovie movies={sampleMovies} />
            </div>
          </Section>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 bg-black/5" aria-hidden="true"></div>

      {/* Reviews Section */}
      <Section id="reviews">
        <SubNav
          title="GÓC ĐIỆN ẢNH"
          nav1="Bình luận phim"
          nav2="Blog điện ảnh"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Featured Review */}
          <div>
            <Movie
              width={612}
              height={400}
              image="page/reivew.jpg"
              ticket={false}
              title="[Review] Nhà Gia Tiên: Huỳnh Lập Tiếp Tục Thắng Nhờ Đề Tài Tâm Linh?"
              styleText="font-bold text-[#4a4a4a] text-xl"
              className="hover:scale-[1.03] transition-transform duration-500 ease-in-out flex flex-col gap-4"
              href="/reviews/nha-gia-tien"
            />
          </div>

          {/* Smaller Reviews */}
          <div className="flex flex-col gap-4">
            {[
              {
                id: 1,
                title:
                  "[Review] Nhà Gia Tiên: Huỳnh Lập Tiếp Tục Thắng Nhờ Đề Tài Tâm Linh?",
                href: "/reviews/nha-gia-tien",
              },
              {
                id: 2,
                title:
                  "[Review] Deadpool & Wolverine: Bom Tấn Hài Hước Của Marvel",
                href: "/reviews/deadpool-wolverine",
              },
              {
                id: 3,
                title: "[Review] Inside Out 2: Cảm Xúc Mới, Câu Chuyện Sâu Sắc",
                href: "/reviews/inside-out-2",
              },
            ].map((review) => (
              <Movie
                key={review.id}
                width={195}
                height={150}
                image="page/reivew.jpg"
                ticket={false}
                title={review.title}
                styleText="font-bold text-[#4a4a4a] text-base"
                className="hover:scale-[1.02] transition-transform duration-500 ease-in-out flex flex-row gap-4"
                href={review.href}
              />
            ))}
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
