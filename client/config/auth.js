import z from "zod";
const formSchemaSignUp = z.object({
  userName: z.string().min(1, "Họ và tên không được để trống"),
  userEmail: z.string().email("Email không hợp lệ"),
  userMobile: z.string().regex(/^[0-9]{10,15}$/, "Số điện thoại không hợp lệ"),
  userPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  userGender: z.boolean(),
  userBirthday: z
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
