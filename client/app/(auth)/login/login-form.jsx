"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import clsx from "clsx";

const formSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type={"text"} placeHolder={"Email"} {...field}>
                  <User className={clsx("w-full h-full text-base")} />
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

        <Button type="submit" className={clsx("w-full mb-[20px]")}>Login</Button>

      </form>
    </Form>
  );
}

export default LoginForm;
