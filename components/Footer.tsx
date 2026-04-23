import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Головна", href: "/" },
  { label: "Про нас", href: "/#about" },
  { label: "Послуги", href: "/services" },
  { label: "Проекти", href: "/projects" },
  { label: "Вакансії", href: "/#vacancies" },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#0D0D0D] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-12 sm:py-16 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image src="/icon.svg" alt="ASPERO" width={22} height={26} className="flex-shrink-0" />
              <span className="text-white font-bold text-lg tracking-wider uppercase">
                ASPERO
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Будівельна компанія.
              <br />
              Львів · з 2002 року.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Навігація
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Контакти
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+380321234567"
                  className="text-gray-500 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2"
                >
                  <svg className="w-3.5 h-3.5 text-[#E53333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +38 (032) 123-45-67
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@aspero.ua"
                  className="text-gray-500 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2"
                >
                  <svg className="w-3.5 h-3.5 text-[#E53333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@aspero.ua
                </a>
              </li>
              <li>
                <span className="text-gray-500 text-sm flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-[#E53333] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  вул. Будівельників, 15,
                  <br />
                  Львів, 79000
                </span>
              </li>
            </ul>
          </div>

          {/* CTA block */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Зв&apos;яжіться з нами
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Готові обговорити ваш проект? Залишіть контакт — ми передзвонимо.
            </p>
            <a
              href="tel:+380321234567"
              className="bg-[#E53333] hover:bg-[#C42B2B] text-white text-sm font-semibold px-5 py-3 transition-colors duration-200 inline-block"
            >
              Зателефонувати
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} ASPERO. Всі права захищені.
          </p>
          <p className="text-gray-600 text-xs">
            Розроблено з{" "}
            <span className="text-[#E53333]">♥</span>
            {" "}у Львові
          </p>
        </div>
      </div>
    </footer>
  );
}
