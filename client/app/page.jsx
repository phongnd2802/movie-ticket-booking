import ListMovie from "@/components/page/listMovie";
import Slide from "@/components/page/slide";
import Header from "@/components/page/header";
import { listMovie } from "@/lib/data";
import SubNav from "@/components/page/subNav";
import Movie from "@/components/page/movie";
function HomePage() {
  return (
    <div className="flex flex-col items-center gap-16">
      {/*Content */}
      <div>
        <Header />
        <div className="flex flex-col gap-12 items-center">
          <Slide />

          {/*Navigation */}
          <SubNav title={"PHIM"} nav1={"Đang chiếu"} nav2={"Sắp chiếu"} />
          {/*List Movie */}
          <div className="w-full max-w-[85%] max-md:max-w-[100%]">
            <ListMovie movies={listMovie} />
          </div>
        </div>
      </div>
      {/*row */}
      <div className="w-full h-2 bg-black opacity-5"></div>
      {/*Review */}
      <div className="flex flex-col gap-2 w-full max-w-[85%] max-md:max-w-[100%]">
        <SubNav
          title={"GÓC ĐIỆN ẢNH"}
          nav1={"Bình luận phim"}
          nav2={"Blog điện ảnh"}
        />
      </div>
      <div className="w-full max-w-[85%] flex gap-2 max-vs:flex-col">
        <div>
          <Movie
            width={612}
            height={400}
            image={"page/reivew.jpg"}
            ticket={false}
            title={
              "[Review] Nhà Gia Tiên: Huỳnh Lập Tiếp Tục Thắng Nhờ Đề Tài Tâm Linh?"
            }
            styleText={"font-bold text-[#4a4a4a] text-[20px]"}
            className={
              "hover:scale-[1.03] transition-transform duration-500 ease-in-out flex flex-col gap-4"
            }
          />
        </div>
        <div>
          <Movie
            width={195}
            height={150}
            image={"page/reivew.jpg"}
            ticket={false}
            title={
              "[Review] Nhà Gia Tiên: Huỳnh Lập Tiếp Tục Thắng Nhờ Đề Tài Tâm Linh?"
            }
            styleText={"font-bold text-[#4a4a4a] text-[20px]"}
            className={
              "hover:scale-[1.02] transition-transform duration-500 ease-in-out flex flex-row gap-4"
            }
          />
          <Movie
            width={195}
            height={150}
            image={"page/reivew.jpg"}
            ticket={false}
            title={
              "[Review] Nhà Gia Tiên: Huỳnh Lập Tiếp Tục Thắng Nhờ Đề Tài Tâm Linh?"
            }
            styleText={"font-bold text-[#4a4a4a] text-[20px]"}
            className={
              "hover:scale-[1.02] transition-transform duration-500 ease-in-out flex flex-row gap-4"
            }
          />
          <Movie
            width={195}
            height={150}
            image={"page/reivew.jpg"}
            ticket={false}
            title={
              "[Review] Nhà Gia Tiên: Huỳnh Lập Tiếp Tục Thắng Nhờ Đề Tài Tâm Linh?"
            }
            styleText={"font-bold text-[#4a4a4a] text-[20px] "}
            className={
              "hover:scale-[1.02] transition-transform duration-500 ease-in-out flex flex-row gap-4"
            }
          />
        </div>
      </div>
      {/*Footer */}
    </div>
  );
}

export default HomePage;
