"use client";

import { STATUS_ACTION_CLASS, StatusMessage } from "@/components/ui/status-message";
import { siteConfig } from "@/config/site";
import { ERROR_COPY } from "@/content/copy";
import "./globals.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

/** ルートレイアウトで発生したエラーの表示（レイアウトを置き換えるため html / body とスタイルを自前で持つ） */
export default function GlobalError({ retry }: GlobalErrorProps) {
  return (
    <html lang={siteConfig.locale}>
      <body className="font-sans">
        <title>{ERROR_COPY.unexpected.title}</title>
        <StatusMessage title={ERROR_COPY.unexpected.title} description={ERROR_COPY.unexpected.description}>
          <button type="button" onClick={retry} className={STATUS_ACTION_CLASS}>
            {ERROR_COPY.unexpected.retry}
          </button>
        </StatusMessage>
      </body>
    </html>
  );
}
