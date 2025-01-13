import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import clsx from "clsx";
import { Phone } from "lucide-react";
import { Lock } from "lucide-react";
import { Mail } from "lucide-react";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function RegisterPage() {
  return (
    <div className="h-screen p-10 flex items-center">

      <Image
              className={clsx("fixed right-0 top-0")}
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

        <Input
          type={"text"}
          className={clsx("mb-[20px]")}
          placeHolder={"Full Name"}
        >
          <User className={clsx("w-full h-full text-base")} />
        </Input>

        <Input
          type={"email"}
          className={clsx("mb-[20px]")}
          placeHolder={"Email"}
        >
          <Mail className={clsx("w-full h-full text-base")} />
        </Input>

        <Input
          type={"text"}
          className={clsx("mb-[20px]")}
          placeHolder={"Mobile Number"}
        >
          <Phone className={clsx("w-full h-full text-base")} />
        </Input>

        <Input
          className={clsx("mb-[20px]")}
          placeHolder={"Password"}
          type={"password"}
        >
          <Lock className={clsx("w-full h-full text-base")} />
        </Input>

        <Input
          className={clsx("mb-[20px]")}
          placeHolder={"Confirm Password"}
          type={"password"}
        >
          <Lock className={clsx("w-full h-full text-base")} />
        </Input>

        <RadioGroup className={clsx("flex gap-10 mb-[50px]")}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>
        </RadioGroup>

        <div className={clsx("flex items-center gap-2 mb-[20px]")}>
          <Checkbox />
          <p className={clsx("text-sm")}>I agree the terms of Services and acknowledge the privacy policy</p>
        </div>

        <Button className={clsx("w-full mb-[10px]")}>Sign Up</Button>


        <div className={clsx("absolute text-sm right-0")}>
          <span className="mr-1">You have an account?</span>
          <Link className="text-[rgba(70,174,252,0.9)]" href={"/login"}>Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
