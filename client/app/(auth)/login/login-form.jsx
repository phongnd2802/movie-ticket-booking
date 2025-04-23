"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/cookie";
import { setCookie } from "@/lib/cookie";
import { useEffect } from "react";
import { handleLogin, handleToken } from "@/lib/auth/apiLogin";
import { login } from "@/endpoint/auth";
import InputField from "@/components/page/inputField";
import { Form } from "@/components/ui/form";
import { Lock } from "lucide-react";
import { User } from "lucide-react";
import { formSchemaLogin } from "@/config/auth";
import { reasonPhrases, statusCode } from "@/core";
import { toast } from "sonner";
import { successLogin, failLogin, MovieErrorToast } from "@/ui/toast";
function LoginForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkToken = () => {
      () => {
        const isLogined = getCookie("at");
        if (isLogined) {
          router.push("/");
        }
      };
    };
    checkToken();
  }, [router]);

  const onSubmit = async (values) => {
    const response = await handleLogin(login, values);
    if (!response) {
      toast.error("Đã xảy ra lỗi", failLogin);
      return;
    }
    if (response.code === statusCode.OK) {
      handleToken(response.metadata);
      toast.success("Đăng nhập thành công", successLogin);
      router.push("/");
    } else if (response.code === statusCode.ERR_USER_NOT_VERIFY) {
      toast.info("Tài khoản chưa được xác minh", failLogin);
    } else {
      toast.info("Đã xảy ra lỗi", failLogin);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-3">
        <InputField
          name="email"
          control={form.control}
          icon={<User className={clsx("w-full h-full text-base")} />}
          placeholder="Email"
          type="text"
        />

        <InputField
          name="password"
          control={form.control}
          icon={<Lock className={clsx("w-full h-full text-base")} />}
          placeholder="Mật khẩu"
          type="password"
        />

        <Button type="submit" className={clsx("w-full mb-[20px]")}>
          Login
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
