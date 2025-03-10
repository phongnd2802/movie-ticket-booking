"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  fullName: z.string().min(1, "Họ và tên không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  mobileNumber: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Số điện thoại không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: z
    .string()
    .min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự"),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Giới tính là bắt buộc" }),
  }),
  termsOfService: z.boolean().refine((value) => value === true, {
    message: "Bạn phải đồng ý với các điều khoản dịch vụ",
  }),
});

function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
      gender: "",
      termsOfService: false,
    },
  });

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-3">
        <FormField
          control={form.control}
          name="fullName"
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
          name="email"
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
          name="mobileNumber"
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
          name="password"
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type={"password"}
                  placeHolder={"Xác nhận mật khẩu"}
                  {...field}
                >
                  <Lock className={clsx("w-full h-full text-base")} />
                </Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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
          name="termsOfService"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>
                Tôi đồng ý với các điều khoản dịch vụ và chính sách bảo mật
              </FormLabel>
            </FormItem>
          )}
        />
        <Button className={clsx("w-full mb-[10px]")}>Đăng ký</Button>
      </form>
    </Form>
  );
}

export default RegisterForm;
