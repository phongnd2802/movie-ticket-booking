function Circle({ isShow, className }) {
  return (
    <div
      className={`border border-white rounded-full w-[10px] h-[10px] ${
        isShow ? "bg-white" : ""
      } ${className}`}
    />
  );
}

export default Circle;
