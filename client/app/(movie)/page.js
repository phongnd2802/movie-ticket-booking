import Header from "@/components/page/header";
import Movie from "@/components/page/movie";

export default function Home() {
  return (
    <>
      <Header />
      <Movie width={290} height={435} title="Cướp biển vùng caribe" />
    </>
  );
}
