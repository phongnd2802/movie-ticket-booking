import React from "react";
import { useOtp } from "@/hooks/useOtp";

const Countdown = () => {
  const { ttl, resendOtp } = useOtp();
  return (
    <div className="text-gray-500 text-sm">
      {ttl > 0 ? (
        <>
          Mã OTP sẽ hết hạn sau{" "}
          <span className="text-red-500 font-semibold">{ttl}s</span>
        </>
      ) : (
        <button
          type="button"
          className="text-blue-600 font-semibold hover:underline"
          onClick={resendOtp}
        >
          Gửi lại OTP
        </button>
      )}
    </div>
  );
};

export default Countdown;
