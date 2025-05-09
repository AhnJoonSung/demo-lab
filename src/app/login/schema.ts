import { z } from "zod";
import { isPasswordValid } from "@/components/auth/requirements";

// 로그인 폼 스키마
export const loginSchema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

// 회원가입 폼 스키마 - requirements.tsx의 검증 로직 활용
export const signupSchema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
  password: z
    .string()
    .min(1, "비밀번호를 입력해주세요.")
    .refine(
      (value) => isPasswordValid(value),
      "비밀번호는 최소 6자 이상이며, 영문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
    ),
});

// 입력 타입 정의
export type LoginFormInput = z.infer<typeof loginSchema>;
export type SignupFormInput = z.infer<typeof signupSchema>;
