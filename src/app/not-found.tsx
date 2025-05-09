import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createMetadata } from "@/utils/seo/metadata";

/**
 * 404 페이지 메타데이터
 * 검색 엔진에 노출되지 않도록 noIndex를 true로 설정
 */
export const metadata = createMetadata({
  title: "페이지를 찾을 수 없음",
  description: "요청하신 페이지를 찾을 수 없습니다.",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-muted/10">
      <Card className="shadow-md max-w-md w-full">
        <CardHeader className="pb-4 sm:pb-6 text-center">
          <CardTitle className="text-4xl sm:text-5xl font-bold">404</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-muted-foreground">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pt-2 pb-6">
          <Link href="/">
            <Button variant="default" className="w-full sm:w-auto">
              홈으로 돌아가기
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
