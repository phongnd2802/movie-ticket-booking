function InputOTP({ otp, handleOtpChange }) {
  return (
    <div className="flex justify-center gap-2">
      {otp &&
        otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            className="w-12 h-12 text-center text-2xl font-bold border-2 border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => handleOtpChange(index, e.target.value)}
          />
        ))}
    </div>
  );
}

export default InputOTP;
