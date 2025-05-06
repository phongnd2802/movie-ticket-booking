import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "./register-form";

function RegisterPage() {
  return (
    <div className="h-screen p-10 flex items-center max-vs:w-full max-vs:justify-center">
      <Image
        className={clsx("fixed right-0 top-0 max-vs:hidden")}
        src={"/image/star-shape.png"}
        alt="start-shape"
        width={200}
        height={200}
      />
      <div className={clsx("w-8/12 relative")}>
        <div>
          <Image
            src={"/image/logo.png"}
            alt="This is a logo"
            width={40}
            height={40}
          />
        </div>

        <div className={clsx("my-2 flex items-center mb-[20px]")}>
          <h4 className={clsx("font-medium text-center")}>Welcome</h4>
          <span className={clsx("ml-1 font-black text-xl")}>MovieTicket!</span>
        </div>

        <RegisterForm />

        <div className={clsx("absolute text-sm right-0")}>
          <span className="mr-1">Bạn đã có tài khoản?</span>
          <Link className="text-[rgba(70,174,252,0.9)]" href={"/login"}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
