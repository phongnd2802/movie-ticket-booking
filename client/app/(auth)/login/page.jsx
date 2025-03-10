import Image from "next/image";
import logo from "@/public/logo.png";
import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import LoginForm from "./login-form";

function LoginPage() {
  return (
    <div className="h-screen p-10 flex items-center">
      <Image
        className={clsx("fixed right-0 top-0")}
        src={"/image/star-shape.png"}
        alt="start-shape"
        width={200}
        height={200}
      />
      {/* Logo */}
      <div className={clsx("w-8/12")}>
        <div>
          <Image src={logo} alt="This is a logo" width={40} height={40} />
        </div>

        {/* Login Form */}
        <div className={clsx("my-2 flex items-center mb-[20px]")}>
          <h4 className={clsx("font-medium text-center")}>Welcome back</h4>
          <span className={clsx("ml-1 font-black text-xl")}>MovieTicket!</span>
        </div>

        <LoginForm />
        
        <div className={clsx("flex justify-between mb-[20px]")}>
          <div className="text-sm">
            <span className="mr-1">If don&apos;t have an account?</span>
            <Link className="text-[rgba(70,174,252,0.9)]" href={"/register"}>
              Sign up
            </Link>
          </div>
          <Link className="text-sm text-[#b4b5c8]" href={"/forgot-password"}>
            Forgot Password?
          </Link>
        </div>


        <h4 className={clsx("text-xl font-bold mb-[20px]")}>Login With</h4>

        <div
          className={clsx(
            "flex sm:flex-col sm:gap-3 xl:justify-around xl:items-center xl:gap-20 xl:flex-row"
          )}
        >
          <Link
            href={"#"}
            className={clsx(
              "flex items-center justify-center text-center w-full rounded-2xl border py-1 relative hover:cursor-pointer hover:bg-primary/90 hover:text-primary-foreground shadow"
            )}
          >
            <FaGoogle className={clsx("absolute left-3")} />
            <span className={clsx("font-medium")}>Continue with Google</span>
          </Link>
          <Link
            href={"#"}
            className={clsx(
              "flex items-center justify-center text-center w-full rounded-2xl border py-1 relative hover:cursor-pointer hover:bg-primary/90 hover:text-primary-foreground shadow"
            )}
          >
            <FaFacebook className={clsx("absolute left-3")} />
            <span className={clsx("font-medium")}>Continue with Facebook</span>
          </Link>
        </div>

        <p className={clsx("fixed bottom-3 text-[#b4b5c8] text-sm")}>
          By Signing up you are accepting the Service Terms{" "}
          <Link className={clsx("text-[rgba(70,174,252,0.9)]")} href={"#"}>
            Privacy Policy
          </Link>{" "}
          and use of{" "}
          <Link className={clsx("text-[rgba(70,174,252,0.9)]")} href={"#"}>
            Cookies{" "}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
