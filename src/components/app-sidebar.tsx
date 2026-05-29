"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Database, FileSpreadsheet, FormInput, LayoutDashboard } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/",
    label: "总览",
    icon: LayoutDashboard,
  },
  {
    href: "/table-demo",
    label: "TanStack Table",
    icon: FileSpreadsheet,
  },
  {
    href: "/form-demo",
    label: "React Hook Form",
    icon: FormInput,
  },
  {
    href: "/settings/database",
    label: "数据库配置",
    icon: Database,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-slate-200 bg-white md:min-h-screen md:border-r md:border-b-0">
      <div className="sticky top-0 space-y-6 p-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-500">nextjs-dashboard-framework</p>
          <h2 className="text-xl font-semibold">管理后台脚手架</h2>
          <p className="text-sm text-slate-500">shadcn + TanStack Table + React Hook Form + PostgreSQL</p>
        </div>
        <nav className="grid gap-2">
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
