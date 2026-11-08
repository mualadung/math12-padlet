"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  BookOpen, 
  Layers, 
  HelpCircle, 
  MessageSquareHeart, 
  Users, 
  Menu, 
  X, 
  ExternalLink,
  GraduationCap,
  ShieldCheck
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Tổng quan", href: "/", icon: GraduationCap },
    { name: "1. Sơ đồ cây tri thức", href: "/mindmap", icon: BookOpen },
    { name: "2. 7 Dạng toán", href: "/math-types", icon: Layers },
    { name: "3. Phòng luyện tập", href: "/practice", icon: HelpCircle },
    { name: "4. Góp ý & Bảng tin", href: "/community", icon: MessageSquareHeart },
    { name: "Bảng điểm nhóm", href: "/team", icon: Users },
    { name: "Quản trị & Chấm chéo", href: "/team-admin", icon: ShieldCheck },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <span className="font-black text-lg">12</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                  Học Liệu Số Toán 12
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                  SGK KNTT
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Nhóm 6 • 8 thành viên • Khung 90-100 điểm</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-200/60 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <a
              href="https://padlet.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200/70 text-xs font-semibold transition-colors"
              title="Mở Padlet Dự án Toán 12"
            >
              <ExternalLink className="w-3.5 h-3.5 text-pink-600" />
              <span>Padlet Nhóm</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-bold border border-blue-200/60"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-100 mt-2">
            <a
              href="https://padlet.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-pink-600 text-white font-semibold text-xs shadow-sm hover:bg-pink-700"
            >
              <ExternalLink className="w-4 h-4" />
              Mở Padlet Học Liệu Toán 12
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
