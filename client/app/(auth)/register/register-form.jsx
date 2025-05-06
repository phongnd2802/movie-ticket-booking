"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
import { Lock } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { signUp } from "@/endpoint/auth";
import { handleSignUp } from "@/lib/auth/signUp";
import { setCookie } from "@/lib/cookie";
import { reasonPhrases, statusCode } from "@/core";
import { formSchemaSignUp } from "@/config/auth";
import { toast } from "sonner";
import { successLogin, failLogin } from "@/ui/toast";

function RegisterForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchemaSignUp),
    defaultValues: {
      userName: "",
      userEmail: "",
      userMobile: "",
      userPassword: "",
      userGender: true,
      userBirthday: "",
    },
  });

  const onSubmit = async (values) => {
    const data = JSON.stringify(values);
    const response = await handleSignUp({ endpoint: signUp, data });
    if (response.code === statusCode.OK) {
      const token = response.metadata.token;
      const email = response.metadata.email;
      toast.success(
        "Vui lòng kiểm tra email để nhận otp của bạn",
        successLogin
      );
      setCookie("otp_token", token, 60);
      router.push(`/verify-otp?token=${token}&email=${email}`);
    } else if (response.code === statusCode.ERR_USER_EXISTED) {
      toast.info("Email này đã được đăng kí", failLogin);
    } else {
      toast.error("Đã xảy ra lỗi", failLogin);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-3">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type={"text"} placeHolder={"Họ và tên"} {...field}>
                  <User className={clsx("w-full h-full text-base")} />
                </Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userEmail"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type={"text"} placeHolder={"Email"} {...field}>
                  <Mail className={clsx("w-full h-full text-base")} />
                </Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userMobile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type={"text"} placeHolder={"Số điện thoại"} {...field}>
                  <Phone className={clsx("w-full h-full text-base")} />
                </Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type={"password"} placeHolder={"Mật khẩu"} {...field}>
                  <Lock className={clsx("w-full h-full text-base")} />
                </Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userGender"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(value === "male")}
                  defaultValue={field.value ? "male" : "female"}
                  className={clsx("flex gap-10")}
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel>Nam</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel>Nữ</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userBirthday"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className={clsx("w-full mb-[10px]")}>Đăng ký</Button>
      </form>
    </Form>
  );
}

export default RegisterForm;
