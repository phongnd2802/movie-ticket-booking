import FormOtpSubmit from "./otp-form";
export default function OTPVerificationForm() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r ">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96 text-center">
        <h2 className="text-3xl font-bold text-blue-700">Xác thực OTP</h2>
        <p className="text-gray-600 mt-2">
          Nhập mã OTP được gửi đến số điện thoại của bạn.
        </p>
        <FormOtpSubmit />
      </div>
    </div>
  );
}
