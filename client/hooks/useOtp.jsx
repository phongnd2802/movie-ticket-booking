import { useState, useEffect } from "react";
import { getCookie } from "@/lib/cookie";
import { fetchTtl } from "@/lib/auth/verifyOtp";
import { verifyOtp } from "@/endpoint/auth";
import { useRouter } from "next/navigation";

export function useOtp() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [ttl, setTtl] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const checkbox = async () => {
      const OTP_TOKEN = "otp_token";
      const token = await getCookie(OTP_TOKEN);
      if (!token) {
        router.push("/");
      } else {
        const _data = await fetchTtl(verifyOtp);
        if (_data) {
          setTtl(_data);
        }
      }
    };

    checkbox();
  }, []);

  useEffect(() => {
    let interval;
    if (ttl > 0) {
      interval = setInterval(() => {
        setTtl((prevTtl) => prevTtl - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [ttl]);

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
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
  return { otp, ttl, handleOtpChange, resendOtp };
}
