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

export default function AuthError() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">인증 오류</CardTitle>
          <CardDescription className="text-center">
            인증 과정에서 문제가 발생했습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center">
            <p className="mb-4">
              이메일 링크가 만료되었거나 유효하지 않을 수 있습니다.
            </p>
            <p>다시 로그인하거나 회원가입을 시도해주세요.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Link href="/login">
            <Button>로그인 페이지로</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">홈으로</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
