"use client";

import { STATUS_ACTION_CLASS, StatusMessage } from "@/components/ui/status-message";
import { ERROR_COPY } from "@/content/copy";

type ErrorPageProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function ErrorPage({ retry }: ErrorPageProps) {
  return (
    <StatusMessage title={ERROR_COPY.unexpected.title} description={ERROR_COPY.unexpected.description}>
      <button type="button" onClick={retry} className={STATUS_ACTION_CLASS}>
        {ERROR_COPY.unexpected.retry}
      </button>
    </StatusMessage>
  );
}
