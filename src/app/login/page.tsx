"use client";

import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoginButton, SignupButton } from "@/components/auth/buttons";
import {
  PasswordRequirements,
  isPasswordValid,
} from "@/components/auth/requirements";
import { login, signup } from "./actions";

// 초기 상태 정의
const initialState = {
  error: null,
  success: null,
  fieldErrors: {},
};

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordRequirementsMet, setIsPasswordRequirementsMet] =
    useState(false);
  const router = useRouter();

  // useActionState를 사용하여 로그인/회원가입 액션 상태 관리
  const [loginState, loginAction] = useActionState(login, initialState);
  const [signupState, signupAction] = useActionState(signup, initialState);

  // 현재 모드에 따른 상태값
  const currentState = mode === "login" ? loginState : signupState;

  // 이전 상태와 현재 상태를 비교하기 위한 참조
  const [prevState, setPrevState] = useState(currentState);

  // 리다이렉트 처리
  useEffect(() => {
    if (currentState?.shouldRedirect && currentState?.redirectTo) {
      // router.replace를 사용하여 현재 페이지를 리다이렉트 대상으로 대체
      router.replace(currentState.redirectTo);
    }
  }, [currentState, router]);

  // 상태 변경 감지 및 실패 시 비밀번호만 초기화
  useEffect(() => {
    // 이전 상태와 다르고, 에러가 있을 경우 비밀번호만 초기화
    if (prevState !== currentState && currentState?.error) {
      setPassword(""); // 비밀번호 초기화
      // 이메일은 유지
    }

    // 현재 상태를 이전 상태로 업데이트
    setPrevState(currentState);
  }, [currentState, prevState]);

  // 모드 변경 시 초기화
  useEffect(() => {
    setPassword("");
    // 모드 변경 시에는 이메일도 초기화
  }, [mode]);

  // 비밀번호 요구사항 검증
  useEffect(() => {
    setIsPasswordRequirementsMet(isPasswordValid(password));
  }, [password]);

  // 이메일 변경 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // 폼 제출 핸들러 - 로그인
  const handleLoginSubmit = (formData: FormData) => {
    formData.set("email", email);
    formData.set("password", password);
    loginAction(formData);
  };

  // 폼 제출 핸들러 - 회원가입
  const handleSignupSubmit = (formData: FormData) => {
    formData.set("email", email);
    formData.set("password", password);
    signupAction(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full min-w-xl px-6 sm:px-16">
        <CardHeader className="pb-6">
          <CardTitle className="text-3xl text-center">
            {mode === "login" ? "로그인" : "회원가입"}
          </CardTitle>
          <CardDescription className="text-center text-lg">
            {mode === "login"
              ? "계정에 로그인하세요."
              : "새 계정을 만들어보세요."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mode === "login" ? (
            <form action={handleLoginSubmit} className="space-y-6">
              {currentState.error && (
                <Alert variant="destructive">
                  <AlertDescription>{currentState.error}</AlertDescription>
                </Alert>
              )}

              {currentState.success && !currentState.shouldRedirect && (
                <Alert>
                  <AlertDescription>{currentState.success}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <Label htmlFor="email" className="text-base">
                  이메일
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="h-12 text-base"
                  aria-invalid={!!currentState.fieldErrors?.email}
                  value={email}
                  onChange={handleEmailChange}
                />
                {currentState.fieldErrors?.email && (
                  <p className="text-sm text-red-500">
                    {currentState.fieldErrors.email}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-base">
                  비밀번호
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="h-12 text-base"
                  aria-invalid={!!currentState.fieldErrors?.password}
                  onChange={handlePasswordChange}
                  value={password}
                />
                {currentState.fieldErrors?.password && (
                  <p className="text-sm text-red-500">
                    {currentState.fieldErrors.password}
                  </p>
                )}
              </div>

              <LoginButton />

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setMode("signup")}
                  className="text-base"
                >
                  계정이 없으신가요? 회원가입
                </Button>
              </div>
            </form>
          ) : (
            <form action={handleSignupSubmit} className="space-y-6">
              {currentState.error && (
                <Alert variant="destructive">
                  <AlertDescription>{currentState.error}</AlertDescription>
                </Alert>
              )}

              {currentState.success && (
                <Alert>
                  <AlertDescription>{currentState.success}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <Label htmlFor="email" className="text-base">
                  이메일
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="h-12 text-base"
                  aria-invalid={!!currentState.fieldErrors?.email}
                  value={email}
                  onChange={handleEmailChange}
                />
                {currentState.fieldErrors?.email && (
                  <p className="text-sm text-red-500">
                    {currentState.fieldErrors.email}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-base">
                  비밀번호
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="h-12 text-base"
                  aria-invalid={!!currentState.fieldErrors?.password}
                  onChange={handlePasswordChange}
                  value={password}
                />
                {currentState.fieldErrors?.password && (
                  <p className="text-sm text-red-500">
                    {currentState.fieldErrors.password}
                  </p>
                )}

                {/* 회원가입 모드일 때만 비밀번호 요구사항 표시 */}
                <PasswordRequirements password={password} />
              </div>

              <SignupButton isPasswordValid={isPasswordRequirementsMet} />

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setMode("login")}
                  className="text-base"
                >
                  이미 계정이 있으신가요? 로그인
                </Button>
              </div>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center pt-4">
          <Link
            href="/"
            className="text-base text-muted-foreground hover:text-primary"
          >
            홈으로 돌아가기
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
