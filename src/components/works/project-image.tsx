"use client";

import { useEffect, useRef, useState } from "react";
import { UI_LABELS } from "@/content/copy";
import { DEFAULT_PROJECT_IMAGE } from "@/content/projects";

type ProjectImageProps = {
  src: string;
  title: string;
};

/**
 * 外部 OG 画像は画像最適化 API を通さず直接表示し、読み込めない場合は代替画像に切り替える
 */
export function ProjectImage({ src, title }: ProjectImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageSrc, setImageSrc] = useState(src);
  const showFallback = () => setImageSrc(DEFAULT_PROJECT_IMAGE);

  // ハイドレーション前に読み込みに失敗した画像は onError が発火しないため、マウント時にも確認する
  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth === 0) setImageSrc(DEFAULT_PROJECT_IMAGE);
  }, []);

  return (
    <div className="relative h-48 overflow-hidden sm:h-56">
      {/* next/image を使うと画像最適化 API が必要になるため、意図的に img 要素を使う */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={imageSrc}
        alt={UI_LABELS.screenshotAlt(title)}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={showFallback}
        className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" aria-hidden="true" />
    </div>
  );
}
