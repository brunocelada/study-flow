"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [{ label: "Dashboard", href: "/" }];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white p-6 md:flex md:flex-col md:justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
              S
            </div>
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              StudyFlow
            </span>
          </div>

          <nav aria-label="Main Navigation" className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <p className="text-xs text-slate-500">More sections coming soon</p>
      </aside>

      <header className="flex items-center justify-between border-b border-slate-200 bg-white p-4 md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-7 items-center justify-center rounded-md bg-blue-600 text-sm font-bold text-white">
            S
          </div>
          <span className="font-semibold text-slate-900">StudyFlow</span>
        </div>

        <nav aria-label="Mobile navigation" className="flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
    </>
  );
}
