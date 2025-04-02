import z from "zod";
const formSchemaSignUp = z.object({
  name: z.string().min(1, "Họ và tên không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().regex(/^[0-9]{10,15}$/, "Số điện thoại không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: z
    .string()
    .min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự"),
  gender: z.boolean(),
  termsOfService: z.boolean().refine((value) => value === true, {
    message: "Bạn phải đồng ý với các điều khoản dịch vụ",
  }),
  birthDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Ngày sinh không hợp lệ",
    })
    .transform((date) => {
      const d = new Date(date);
      return d.toISOString().split("T")[0];
    }),
});

const formSchemaLogin = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export { formSchemaSignUp, formSchemaLogin };
