import Image from "next/image";
import logo from "@/public/logo.png";
import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { Lock } from "lucide-react";
import Link from "next/link";

function LoginPage() {
  return (
    <div className="h-screen p-10">
      {/* Logo */}
      <div className={clsx("w-8/12")}>
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

        <Input className={clsx("mb-[20px]")} placeHolder={"Email"}>
          <User className={clsx("w-full h-full text-base")} />
        </Input>

        <Input className={clsx("mb-[30px]")} placeHolder={"Password"}>
          <Lock className={clsx("w-full h-full text-base")} />
        </Input>

        <div className={clsx("flex justify-between")}>
          <div className="text-sm">
            <span className="mr-1">If don&apos;t have an account?</span>
            <Link 
            className="text-[rgba(70,174,252,0.9)]"
            href={"/register"}>Sign up</Link>
          </div>
          <Link className="text-sm text-[#b4b5c8]" href={"/forgot-password"}>Forgot Password</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
