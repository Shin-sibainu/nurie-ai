"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileDown } from "lucide-react";

interface Generation {
  id: string;
  prompt: string;
  style: string;
  difficulty: string;
  status: string;
  imageUrl: string | null;
  pdfUrl: string | null;
  createdAt: Date | null;
}

interface GenerationHistoryProps {
  generations: Generation[];
  isPro: boolean;
}

export function GenerationHistory({ generations, isPro }: GenerationHistoryProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {generations.map((gen) => {
        const displayUrl = gen.imageUrl;
        return (
          <Card key={gen.id} className="overflow-hidden">
            {displayUrl && (
              <div className="aspect-square overflow-hidden">
                <Image
                  src={displayUrl}
                  alt={gen.prompt}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="p-3 space-y-2">
              <p className="text-sm font-medium line-clamp-1">{gen.prompt}</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {gen.style}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {gen.difficulty}
                </Badge>
              </div>
              <div className="flex gap-2">
                {displayUrl && (
                  <a
                    href={displayUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    <Download className="h-3 w-3" />
                    PNG
                  </a>
                )}
                {gen.pdfUrl && (
                  <a
                    href={gen.pdfUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    <FileDown className="h-3 w-3" />
                    PDF
                  </a>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
