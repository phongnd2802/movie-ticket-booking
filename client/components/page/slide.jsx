import Image from "@/components/page/imagekit";

export default function Slide() {
  return (
    <div className="w-full relative">
      <div className="relative w-full h-[500px] overflow-hidden">
        <Image
          path="page/interstellar.jpg"
          alt="Movie Banner"
          width={1920}
          height={500}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Nhà Gia Tiên
            </h1>
            <p className="text-lg md:text-xl mb-4 max-w-2xl">
              Câu chuyện về một gia đình với những bí mật tâm linh đầy bất ngờ
            </p>
            <div className="flex gap-4">
              <button className="bg-[#f26b38] hover:bg-[#fb9440] px-6 py-2 rounded-md font-medium transition-colors">
                Mua vé ngay
              </button>
              <button className="bg-transparent border border-white hover:bg-white/20 px-6 py-2 rounded-md font-medium transition-colors">
                Xem trailer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-4">
        {[1, 2, 3, 4].map((dot) => (
          <button
            key={dot}
            className={`w-3 h-3 rounded-full ${
              dot === 1 ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Slide ${dot}`}
          />
        ))}
      </div>
    </div>
  );
}
