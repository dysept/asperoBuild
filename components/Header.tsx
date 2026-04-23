"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Головна", href: "/", anchor: "" },
  { label: "Про нас", href: "/#about", anchor: "about" },
  { label: "Послуги", href: "/services", anchor: "" },
  { label: "Проекти", href: "/projects", anchor: "" },
  { label: "Вакансії", href: "/#vacancies", anchor: "vacancies" },
  { label: "Контакти", href: "/#footer", anchor: "footer" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  function getHref(link: typeof navLinks[0]) {
    if (pathname === "/" && link.anchor) return `#${link.anchor}`;
    return link.href;
  }

  const Logo = () => (
    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
      <Image src="/icon.svg" alt="ASPERO" width={24} height={28} className="flex-shrink-0" />
      <span className="text-white font-bold text-lg tracking-wider uppercase">ASPERO</span>
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/95 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/projects" ? pathname.startsWith("/projects") :
                link.href === "/services" ? pathname.startsWith("/services") : false;
              return (
                <Link
                  key={link.label}
                  href={getHref(link)}
                  className={`text-sm transition-colors duration-200 ${
                    isActive ? "text-white border-b border-[#E53333] pb-0.5" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Link href="/#consultation" className="bg-[#E53333] hover:bg-[#C42B2B] text-white text-sm font-semibold px-5 py-2.5 transition-colors">
              Зв&apos;язатись
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden text-white p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#111111] border-t border-white/10">
          <nav className="flex flex-col divide-y divide-white/5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={getHref(link)}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3.5 text-gray-300 hover:text-white hover:bg-white/5 text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#consultation"
              onClick={() => setMenuOpen(false)}
              className="m-4 bg-[#E53333] text-white text-sm font-bold py-3 text-center"
            >
              Зв&apos;язатись
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
