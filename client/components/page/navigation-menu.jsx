import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import Movie from "./movie";
import Link from "next/link";
function Navigation({ title, subItems }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-white hover:cursor-pointer data-[active]:bg-transparent data-[state=open]:bg-transparent hover:text-textOrange focus:bg-transparent hover:bg-transparent text-[14px] bg-inherit">
            {title}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {title && title !== "Phim" && (
              <ul className="flex flex-col items-center gap-2 bg-white w-max shadow-md border-none ">
                {subItems.map((item, index) => (
                  <li
                    className="box-border transition-all duration-300 text-sm text-black hover:text-[#f26b38] hover:cursor-pointer hover:bg-[#fb770b1a] w-[100%] px-8 py-1 hover:border-[#fd841f] hover:border-l-4"
                    key={index}
                  >
                    <NavigationMenuLink
                      href={"/login"}
                      className="flex justify-center"
                    >
                      <span>{item}</span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            )}
            {title && title === "Phim" && (
              <div className="flex flex-col gap-2 p-4 bg-white">
                {subItems &&
                  subItems.map((item, index) => (
                    <div className="flex flex-col w-max" key={index}>
                      <span className="ml-[10px] border-l-4  border-[#034ea2] pl-2 hover:cursor-pointer">
                        <Link href="/login">{item.title}</Link>
                      </span>
                      <div className="flex flex-row gap-2">
                        {item.menu &&
                          item.menu.map((movie, idx) => (
                            <div key={idx}>
                              <Movie width={140} height={210} image={movie} />
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Navigation;
