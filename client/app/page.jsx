import ListMovie from "@/components/page/listMovie";
import Slide from "@/components/page/slide";
import Header from "@/components/page/header";
import { listMovie } from "@/lib/data";
function HomePage() {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-12 items-center">
        <Slide />

        {/*Navigation */}
        <div className="w-full max-w-[85%] flex gap-10 font-bold text-black-10 text-[16px] opacity-50">
          <div>
            <span className="border-l-4 border-solid border-[#034ea2] mr-2" />
            <span className="hover:text-blue-10 hover:cursor-pointer active:text-[#034ea2]">
              Phim
            </span>
          </div>
          <span className="hover:text-blue-10 hover:cursor-pointer active:text-[#034ea2]">
            Đang chiếu
          </span>
          <span className="hover:text-blue-10 hover:cursor-pointer active:text-[#034ea2]">
            Sắp chiếu
          </span>
        </div>

        {/*List Movie */}
        <div className="w-full max-w-[90%] max-md:max-w-[100%]">
          <ListMovie movies={listMovie} />
        </div>
      </div>
    </>
  );
}

export default HomePage;
