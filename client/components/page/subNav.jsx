"use client";
import { useState } from "react";
function SubNav({ title, nav1, nav2 }) {
  const [isActiveShowing, setIsActiveShowing] = useState(false);
  const [isActiveWillShow, setIsActiveWillShow] = useState(false);

  const handleclick = (movie, showing, willShow) => {
    setIsActiveShowing(showing);
    setIsActiveWillShow(willShow);
  };

  return (
    <div className="w-full max-w-[80%] flex flex-row gap-10 font-bold text-black-10 text-[20px] ">
      <div>
        <span className="border-l-4 border-solid border-[#034ea2] mr-2" />
        <span
          className={`hover:text-blue-10 hover:cursor-pointer hover:text-blue-900 transition-all duration-300  ease-in-out cursor-pointer opacity-50`}
        >
          {title}
        </span>
      </div>
      <span
        className={` hover:cursor-pointer hover:text-blue-900 ${
          isActiveShowing === false ? "opacity-50" : ""
        } ${
          isActiveShowing
            ? "text-[#041ECB] after:content-[''] after:block after:w-1/2 after:h-[3px] after:bg-[#041ECB] after:mt-1 after:mx-auto transition-all duration-300  ease-in-out cursor-pointer"
            : ""
        }`}
        onClick={() => handleclick(false, true, false)}
      >
        {nav1}
      </span>
      <span
        className={` hover:cursor-pointer hover:text-blue-900 ${
          isActiveWillShow === false ? "opacity-50" : ""
        } ${
          isActiveWillShow
            ? "text-[#0D4DA2] after:content-[''] after:block after:w-1/2 after:h-[3px] after:bg-[#041ECB] after:mt-1 after:mx-auto transition-all duration-300  ease-in-out cursor-pointer"
            : ""
        } `}
        onClick={() => handleclick(false, false, true)}
      >
        {nav2}
      </span>
    </div>
  );
}

export default SubNav;
