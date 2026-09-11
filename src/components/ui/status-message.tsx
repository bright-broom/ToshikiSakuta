import type { ReactNode } from "react";

type StatusMessageProps = {
  title: string;
  description: string;
  /** ボタンやリンクなどの導線 */
  children: ReactNode;
};

/** 404・エラー画面の共通レイアウト（インラインスタイルを使わず CSP に適合させる） */
export function StatusMessage({ title, description, children }: StatusMessageProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-linear-to-br from-brand-900 to-brand-500 px-4 text-center">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">{title}</h1>
      <p className="max-w-md text-brand-200">{description}</p>
      <div className="flex flex-col gap-4 sm:flex-row">{children}</div>
    </main>
  );
}

export const STATUS_ACTION_CLASS =
  "rounded-full bg-white px-8 py-3 text-brand-600 transition-colors hover:bg-brand-50 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-600 focus:outline-hidden";
