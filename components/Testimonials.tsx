"use client";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Замовляли будівництво котеджу. Все зроблено чисто та якісно. Команда дотримується строків — рекомендуємо!",
    name: "Іван та Ольга",
    role: "Приватні клієнти",
  },
  {
    text: "Комплексний підхід до ремонту офісу дуже професійно. Команда доглядає за кожним, жодних затримок.",
    name: "ТОВ «Бізнес Центр»",
    role: "Корпоративний клієнт",
  },
  {
    text: "Відмінна якість металоконструкцій. Монтаж виконано чітко та в темпі. Гарантія підтверджена.",
    name: "Андрій Петренко",
    role: "Підприємець, Львів",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#0D0D0D] py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p className="section-label">Відгуки</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">Що кажуть клієнти</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-[#1A1A1A] border border-white/10 p-7 flex flex-col hover:border-[#E53333]/30 transition-all duration-300"
            >
              <div className="w-8 h-1 bg-[#E53333] mb-6" />
              <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-8">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#E53333]/20 border border-[#E53333]/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#E53333] text-sm font-bold">{t.name[0]}</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
