"use client";
import ListMovie from "@/components/page/listMovie";
import Slide from "@/components/page/slide";
import Header from "@/components/page/header";
import SubNav from "@/components/page/subNav";
import Movie from "@/components/page/movie";
import Footer from "@/components/page/footer";
import Section from "@/components/page/section";
import { useMovie } from "@/hooks/useMovie";

export default function HomePage() {
  const { movies, isAccess } = useMovie();
  return (
    <div className="flex flex-col items-center gap-16">
      <div className="w-full">
        <Header isLogin={isAccess} />
        <div className="flex flex-col gap-12 items-center">
          <Slide />
          <Section>
            <SubNav title="PHIM" nav1="Đang chiếu" nav2="Sắp chiếu" />
            <div className="w-full mt-4">
              {movies && movies.length > 0 ? (
                <ListMovie movies={movies} />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed">
                  <h3 className="text-lg font-medium">
                    Hiện tại không có phim nào
                  </h3>
                </div>
              )}
            </div>
          </Section>
        </div>
      </div>

      <div className="w-full h-0.5 bg-black/5" aria-hidden="true"></div>

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
              image="https://res.cloudinary.com/dwwrqkjnu/image/upload/v1746012635/z6557045585230_a9383da1d4c5d5a3e04c499b9ad7115e_w3wheu.jpg"
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
                image="https://res.cloudinary.com/dwwrqkjnu/image/upload/v1746012635/z6557045585230_a9383da1d4c5d5a3e04c499b9ad7115e_w3wheu.jpg"
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
