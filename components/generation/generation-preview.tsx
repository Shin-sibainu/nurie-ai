"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileDown } from "lucide-react";
import Image from "next/image";

interface GenerationPreviewProps {
  imageUrl: string;
  pdfUrl: string | null;
}

export function GenerationPreview({ imageUrl, pdfUrl }: GenerationPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>生成結果</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="overflow-hidden rounded-lg border border-border">
          <Image
            src={imageUrl}
            alt="生成された塗り絵"
            width={768}
            height={768}
            className="w-full object-contain"
          />
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" asChild>
            <a href={imageUrl} download="nurie.png" target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4" />
              PNG ダウンロード
            </a>
          </Button>
          {pdfUrl && (
            <Button variant="default" className="flex-1" asChild>
              <a href={pdfUrl} download="nurie.pdf" target="_blank" rel="noopener noreferrer">
                <FileDown className="h-4 w-4" />
                PDF ダウンロード
              </a>
            </Button>
          )}
        </div>

        {!pdfUrl && (
          <p className="text-center text-xs text-muted-foreground">
            PDF ダウンロードは Pro プランで利用できます
          </p>
        )}
      </CardContent>
    </Card>
  );
}
