"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const services = [
  "Будівництво",
  "Ремонт",
  "Проектування",
  "Металоконструкції",
  "Інше",
];

const timeSlots = [
  "09:00 – 11:00",
  "11:00 – 13:00",
  "13:00 – 15:00",
  "15:00 – 17:00",
  "17:00 – 19:00",
];

type FormState = "idle" | "loading" | "success" | "error";

export default function Consultation() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    time: "",
    message: "",
  });
  const [status, setStatus] = useState<FormState>("idle");

  // Pre-fill service from URL ?service=
  useEffect(() => {
    const s = searchParams.get("service");
    if (s) setForm((f) => ({ ...f, service: s }));
  }, [searchParams]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", service: "", time: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="consultation" className="bg-[#0D0D0D] py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left — info */}
          <div className="lg:sticky lg:top-24">
            <p className="section-label">Консультація</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
              Запишіться на
              <br />
              безкоштовну
              <br />
              <span className="text-[#E53333]">консультацію.</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-10">
              Наш спеціаліст зв&apos;яжеться з вами у зручний час, відповість
              на всі питання та підготує попередній кошторис.
            </p>

            {/* Advantages */}
            <div className="space-y-4">
              {[
                "Безкоштовно та без зобов'язань",
                "Виїзд на об'єкт у Львові та області",
                "Попередній кошторис протягом 24 годин",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#E53333]/10 border border-[#E53333]/40 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-[#E53333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* Decorative element */}
            <div className="hidden sm:block mt-10 lg:mt-12 relative">
              <div className="border border-white/10 p-6 bg-[#1A1A1A]">
                <div className="absolute -top-3 left-6">
                  <span className="bg-[#E53333] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                    Відповідь протягом 30 хв
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="w-12 h-12 bg-[#E53333]/10 border border-[#E53333]/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#E53333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">Або телефонуйте прямо зараз</p>
                    <a href="tel:+380321234567" className="text-white font-bold text-lg hover:text-[#E53333] transition-colors">
                      +38 (032) 123-45-67
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#1A1A1A] border border-white/10 p-5 sm:p-8">
              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#E53333]/10 border border-[#E53333]/30 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-[#E53333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">Заявку прийнято!</h3>
                  <p className="text-gray-400 text-sm">
                    Ми зв&apos;яжемось з вами найближчим часом.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-[#E53333] text-sm font-semibold hover:underline"
                  >
                    Подати ще одну заявку
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Ваше ім&apos;я *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Іван Петренко"
                      className="w-full bg-[#111111] border border-white/10 focus:border-[#E53333]/60 text-white placeholder-gray-600 px-4 py-3 text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+38 (0__) ___-__-__"
                      className="w-full bg-[#111111] border border-white/10 focus:border-[#E53333]/60 text-white placeholder-gray-600 px-4 py-3 text-sm outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Послуга
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="w-full bg-[#111111] border border-white/10 focus:border-[#E53333]/60 text-white px-4 py-3 text-sm outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" className="text-gray-600">Оберіть послугу</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Зручний час
                      </label>
                      <select
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className="w-full bg-[#111111] border border-white/10 focus:border-[#E53333]/60 text-white px-4 py-3 text-sm outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Будь-який</option>
                        {timeSlots.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Коментар
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Опишіть ваш проект або питання..."
                      className="w-full bg-[#111111] border border-white/10 focus:border-[#E53333]/60 text-white placeholder-gray-600 px-4 py-3 text-sm outline-none transition-colors resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-sm">
                      Помилка відправки. Спробуйте ще раз або зателефонуйте нам.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-[#E53333] hover:bg-[#C42B2B] disabled:opacity-60 text-white font-bold py-4 text-sm uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Відправляємо...
                      </>
                    ) : (
                      "Записатись на консультацію"
                    )}
                  </button>

                  <p className="text-gray-600 text-xs text-center">
                    Натискаючи кнопку, ви погоджуєтесь з обробкою персональних даних
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
