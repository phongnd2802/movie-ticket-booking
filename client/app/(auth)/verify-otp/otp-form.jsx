"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/cookie";
import { deleteCookie } from "@/lib/cookie";
import { handleVerifyOtp } from "@/lib/auth/verifyOtp";
import { submitVerify } from "@/endpoint/auth";

import Countdown from "@/components/page/countDown";
import InputOTP from "@/components/page/inputOtp";
import { useOtp } from "@/hooks/useOtp";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { successLogin } from "@/ui/toast";

function FormOtpSubmit() {
  const router = useRouter();
  const { otp, handleOtpChange } = useOtp();
  const searchParam = useSearchParams();
  const email = searchParam.get("email") || "";

  const form = useForm({
    defaultValues: { otp: "" },
  });

  // gửi xác thực otp
  const onSubmit = async () => {
    const _data = await handleVerifyOtp(otp, email, submitVerify);
    if (_data) {
      toast("OTP xác thực thành công", successLogin);
      deleteCookie("otp_token", "/verify-otp");
      router.push("/login");
    } else {
      alert("OTP không hợp lệ");
    }
  };
  const resendOtp = async () => {
    const OTP_TOKEN = "otp_token";
    const token = getCookie(OTP_TOKEN);

    const response = await fetch(
      "http://localhost:8000/v1/api/user/resend-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          OTP_TOKEN: token,
        },
      }
    );

    if (response.ok) {
      alert("OTP đã được gửi lại");
      setTtl(60);
    } else {
      alert("Có lỗi khi gửi lại OTP");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6 mt-4">
        <FormItem>
          <FormLabel className="text-lg font-semibold">Mã OTP</FormLabel>
          <FormControl>
            <InputOTP otp={otp} handleOtpChange={handleOtpChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <Countdown />
        <Button
          type="button"
          onClick={onSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          Xác nhận
        </Button>
      </form>
    </Form>
  );
}

export default FormOtpSubmit;
