import type { Metadata } from "next";
import Link from "next/link";
import { STATUS_ACTION_CLASS, StatusMessage } from "@/components/ui/status-message";
import { ERROR_COPY } from "@/content/copy";

export const metadata: Metadata = {
  title: ERROR_COPY.notFound.title,
};

export default function NotFound() {
  return (
    <StatusMessage title={ERROR_COPY.notFound.title} description={ERROR_COPY.notFound.description}>
      <Link href="/" className={STATUS_ACTION_CLASS}>
        {ERROR_COPY.backToHome}
      </Link>
    </StatusMessage>
  );
}
