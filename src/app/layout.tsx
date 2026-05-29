import type { Metadata } from "next";
import { AppSidebar } from "@/components/app-sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Dashboard Framework",
  description: "集成 shadcn 风格 UI、TanStack Table、React Hook Form 与 PostgreSQL 直连的管理后台框架",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full">
        <div className="min-h-screen bg-slate-50 text-slate-950 md:grid md:grid-cols-[260px_1fr]">
          <AppSidebar />
          <main className="min-w-0 p-6 md:p-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
