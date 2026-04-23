"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    id: "construction",
    slug: "Будівництво",
    title: "Будівництво",
    subtitle: "Під ключ — від фундаменту до здачі",
    description:
      "Зводимо житлові будинки, котеджі, комерційні та промислові об'єкти будь-якої складності. Весь процес — від погодження проекту до фінального оздоблення — контролюємо самостійно.",
    features: [
      "Котеджі та приватні будинки",
      "Комерційна нерухомість та офіси",
      "Промислові та складські об'єкти",
      "Багатоквартирні будинки",
      "Фундаментні роботи будь-якого типу",
      "Зовнішнє та внутрішнє оздоблення",
    ],
    process: [
      { step: "01", text: "Замір та консультація" },
      { step: "02", text: "Проектна документація" },
      { step: "03", text: "Будівництво коробки" },
      { step: "04", text: "Оздоблення та здача" },
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: "renovation",
    slug: "Ремонт",
    title: "Ремонт",
    subtitle: "Косметичний, капітальний, дизайнерський",
    description:
      "Виконуємо ремонт квартир, будинків, офісів та комерційних приміщень будь-якої площі. Власна бригада оздоблювачів, суворий контроль якості та дотримання строків.",
    features: [
      "Косметичний та капітальний ремонт",
      "Дизайнерське оздоблення під ключ",
      "Ремонт офісів та комерційних приміщень",
      "Санвузли та кухні",
      "Стяжка підлоги та стелі",
      "Електрика та сантехніка",
    ],
    process: [
      { step: "01", text: "Виїзд та замір" },
      { step: "02", text: "Кошторис за 24 год" },
      { step: "03", text: "Демонтаж та підготовка" },
      { step: "04", text: "Оздоблення та прибирання" },
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "design",
    slug: "Проектування",
    title: "Проектування",
    subtitle: "Архітектура та інженерні рішення",
    description:
      "Розробляємо архітектурні та конструктивні проекти, дизайн-проекти інтер'єру, інженерні мережі. Всі проекти відповідають актуальним нормам ДБН та погоджуються з державними органами.",
    features: [
      "Архітектурний та конструктивний проект",
      "Дизайн-проект інтер'єру",
      "Проекти інженерних мереж",
      "Кошторисна документація",
      "Авторський нагляд",
      "Погодження та дозвільна документація",
    ],
    process: [
      { step: "01", text: "Технічне завдання" },
      { step: "02", text: "Ескізний проект" },
      { step: "03", text: "Робочий проект" },
      { step: "04", text: "Погодження та видача" },
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "metal",
    slug: "Металоконструкції",
    title: "Металоконструкції",
    subtitle: "Проектування, виготовлення, монтаж",
    description:
      "Проектуємо та виготовляємо металеві конструкції для промислових, комерційних та сільськогосподарських об'єктів. Власне виробництво та монтажна бригада.",
    features: [
      "Промислові ангари та склади",
      "Каркасні будівлі та навіси",
      "Металеві ферми та перекриття",
      "Сходи, огорожі, ворота",
      "Сільськогосподарські споруди",
      "Підсилення та реконструкція конструкцій",
    ],
    process: [
      { step: "01", text: "Проект та розрахунок" },
      { step: "02", text: "Виготовлення на виробництві" },
      { step: "03", text: "Доставка на об'єкт" },
      { step: "04", text: "Монтаж та зварювання" },
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
];

export default function ServicesPageClient() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-10">
        <Link href="/" className="hover:text-white transition-colors">Головна</Link>
        <span>/</span>
        <span className="text-gray-300">Послуги</span>
      </nav>

      {/* Header */}
      <div className="mb-16">
        <p className="section-label">Що ми пропонуємо</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Наші послуги</h1>
        <p className="text-gray-400 max-w-xl text-sm sm:text-base leading-relaxed">
          Повний цикл будівництва та ремонту. Кожна послуга — з власною командою, гарантією та прозорим кошторисом.
        </p>
      </div>

      {/* Services */}
      <div className="space-y-6">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            id={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.05 * i }}
            className="bg-[#1A1A1A] border border-white/10 overflow-hidden"
          >
            {/* Service header */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

              {/* Left */}
              <div className="p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#E53333]/10 border border-[#E53333]/30 flex items-center justify-center text-[#E53333] flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">{service.title}</h2>
                    <p className="text-gray-500 text-sm mt-0.5">{service.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Process */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  {service.process.map((p) => (
                    <div key={p.step} className="text-center">
                      <div className="w-8 h-8 rounded-full bg-[#E53333]/10 border border-[#E53333]/30 text-[#E53333] text-xs font-extrabold flex items-center justify-center mx-auto mb-2">
                        {p.step}
                      </div>
                      <p className="text-gray-400 text-xs leading-tight">{p.text}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={`/?service=${encodeURIComponent(service.slug)}#consultation`}
                  className="inline-flex items-center gap-2 bg-[#E53333] hover:bg-[#C42B2B] text-white font-bold px-6 py-3 text-sm transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Отримати консультацію
                </Link>
              </div>

              {/* Right — features */}
              <div className="p-6 sm:p-8 lg:p-10">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-5">
                  Що входить
                </h3>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-[#E53333]/10 border border-[#E53333]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-[#E53333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Guarantee badge */}
                <div className="mt-8 border border-white/10 p-4 flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#E53333] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p className="text-gray-400 text-xs">
                    Гарантія на всі роботи <span className="text-white font-semibold">до 5 років</span>. Фіксована вартість без прихованих платежів.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10 sm:mt-16 bg-[#E53333] p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left"
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Не знаєте з чого почати?</h2>
          <p className="text-white/70 text-sm mt-1">
            Безкоштовна консультація допоможе визначитись з послугою та бюджетом.
          </p>
        </div>
        <Link
          href="/#consultation"
          className="bg-white text-[#E53333] font-bold px-7 py-3.5 text-sm hover:bg-gray-100 transition-colors flex-shrink-0 whitespace-nowrap"
        >
          Безкоштовна консультація →
        </Link>
      </motion.div>
    </div>
  );
}
