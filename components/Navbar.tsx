"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "./ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "О компании", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "География", href: "#geography" },
  { label: "Команда", href: "#team" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
        scrolled
          ? "bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <span
                className={cn(
                  "font-[family-name:var(--font-montserrat)] font-700 text-xl tracking-tight transition-colors",
                  scrolled ? "text-[#0A0A0F]" : "text-white"
                )}
                style={{ fontWeight: 700 }}
              >
                NEXUS
              </span>
              <span
                className="font-[family-name:var(--font-montserrat)] text-xl ml-1"
                style={{ fontWeight: 700, color: "#0052CC" }}
              >
                CARGO
              </span>
            </div>
            <div
              className={cn(
                "w-px h-8 mx-1 transition-colors",
                scrolled ? "bg-[#E8ECF0]" : "bg-white/20"
              )}
            />
            <span
              className={cn(
                "text-[10px] font-[family-name:var(--font-montserrat)] font-500 tracking-widest uppercase hidden sm:block transition-colors",
                scrolled ? "text-[#8C9BAB]" : "text-white/50"
              )}
            >
              Международная логистика
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={cn(
                  "text-sm font-[family-name:var(--font-montserrat)] font-500 transition-colors hover:text-[#0052CC] cursor-pointer",
                  scrolled ? "text-[#5A6472]" : "text-white/80"
                )}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleNav("#contact")}
              className="bg-[#0052CC] text-white px-6 py-2.5 rounded-full text-sm font-[family-name:var(--font-montserrat)] font-600 hover:bg-[#0A0A0F] transition-all duration-300 cursor-pointer"
            >
              Рассчитать доставку
            </button>
          </div>

          {/* Mobile burger */}
          <button
            className={cn(
              "lg:hidden p-2 transition-colors",
              scrolled ? "text-[#0A0A0F]" : "text-white"
            )}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-[#E8ECF0] px-6 py-6 shadow-lg">
          <div className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-left text-[#0A0A0F] font-[family-name:var(--font-montserrat)] font-500 text-sm hover:text-[#0052CC] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav("#contact")}
              className="bg-[#0052CC] text-white px-6 py-3 rounded-full text-sm font-[family-name:var(--font-montserrat)] font-600 hover:bg-[#0A0A0F] transition-all mt-2"
            >
              Рассчитать доставку
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
