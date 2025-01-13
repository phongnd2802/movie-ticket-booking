import Image from "next/image";
import logo from "@/public/logo.png";
import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { Lock } from "lucide-react";

function LoginPage() {
  return (
    <div className="h-screen p-10">
      {/* Logo */}
      <div>
        <div>
          <Image src={logo} alt="This is a logo" width={40} />
        </div>

        {/* Login Form */}
        <div className={clsx("my-2 flex items-center mb-[20px]")}>
          <h4 className={clsx("font-medium text-center")}>Welcome back</h4>
          <span className={clsx("ml-1 font-black   text-xl")}>
            MovieTicket!
          </span>
        </div>

        <Input className={clsx("w-8/12 mb-[20px]")} placeHolder={"Email"}>
          <User className={clsx("w-full h-full text-base")} />
        </Input>

        <Input className={clsx("w-8/12")} placeHolder={"Password"}>
          <Lock className={clsx("w-full h-full text-base")}/>
        </Input>
      </div>
    </div>
  );
}

export default LoginPage;
