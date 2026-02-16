import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-bold">ページが見つかりません</h2>
        <p className="text-muted-foreground">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <Button asChild>
          <Link href="/">トップページに戻る</Link>
        </Button>
      </div>
    </div>
  );
}
