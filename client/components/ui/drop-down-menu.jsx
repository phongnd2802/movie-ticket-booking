import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

function DropDownMenu({ lists, title, image, subTitle }) {
  return (
    <div className="group relative">
      <div className={clsx("flex gap-2 items-center cursor-pointer")}>
        <span>{title}</span>
        <span>
          <ChevronDown className="text-sm" />
        </span>
      </div>

      <div className="hidden group-hover:block absolute top-8 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-md px-10 py-2">
        {lists.map((list, index) => (
          <div key={index} className="hover:bg-gray-100 rounded">
            <Link href={list.href} className="text-sm text-gray-700">
              {list.text}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DropDownMenu;
