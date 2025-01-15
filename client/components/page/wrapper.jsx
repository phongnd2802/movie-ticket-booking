export function Wrapper({ items }) {
  return (
    <div className="max-h-[150px] overflow-auto ">
      {items.map((item, index) => (
        <div
          className="group flex justify-center hover:cursor-pointer hover:bg-[#FFF1E6] hover:border-l-4 hover:border-l-[#F26B38] mb-3 px-5 transition-all duration-300 ease-in-out"
          key={index}
        >
          <p className="group-hover:text-[#F26B38] p-1 transition-all duration-300 ease-in-out text-xs]">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}
