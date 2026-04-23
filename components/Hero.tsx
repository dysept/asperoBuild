"use client";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import GridAnimation from "./GridAnimation";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero({ heroImage }: { heroImage?: string | null }) {
  return (
    <section id="hero" className="relative min-h-screen bg-[#111111] flex items-center pt-16 overflow-hidden">
      <GridAnimation />
      <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-transparent to-[#1a0a0a] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div>
            <motion.p className="section-label mb-4" variants={fadeUp} initial="hidden" animate="show" custom={0.3}>
              Будівельна компанія · з 2002 року · Львів
            </motion.p>
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05] mb-5"
              variants={fadeUp} initial="hidden" animate="show" custom={0.5}
            >
              Будуємо<br />вашу<br />
              <span className="text-[#E53333]">майбутнє.</span>
            </motion.h1>
            <motion.p
              className="text-gray-400 text-sm sm:text-base max-w-md mb-8 leading-relaxed"
              variants={fadeUp} initial="hidden" animate="show" custom={0.7}
            >
              Повний цикл будівництва житлових та комерційних об&apos;єктів. Проектування, будівництво, ремонт — під ключ.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-3" variants={fadeUp} initial="hidden" animate="show" custom={0.85}>
              <a href="#projects" className="bg-[#E53333] hover:bg-[#C42B2B] text-white font-semibold px-6 py-3.5 text-center transition-colors text-sm sm:text-base">
                Переглянути проекти
              </a>
              <a href="#about" className="text-white font-semibold px-6 py-3.5 border border-white/20 hover:border-white/40 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                Дізнатись більше <span>→</span>
              </a>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square bg-[#1A1A1A] border border-white/10">
              <motion.div
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center"
                initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <div className="absolute w-full h-px bg-white/30" />
                <div className="absolute h-full w-px bg-white/30" />
                <div className="w-2 h-2 border border-white/50" />
              </motion.div>
              <div className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 border-[#E53333]/60" />
              <div className="absolute bottom-14 right-0 w-10 h-10 border-r-2 border-b-2 border-[#E53333]/60" />

              {heroImage ? (
                <div className="absolute inset-0 overflow-hidden">
                  <Image src={heroImage} alt="ASPERO" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-4">
                    <div className="w-14 h-14 border border-white/20 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-7 h-7 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
                      </svg>
                    </div>
                    <p className="text-white/20 text-xs uppercase tracking-widest">Фото компанії</p>
                  </div>
                </div>
              )}

              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-[#E53333] px-5 py-3"
                initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">22</span>
                  <span className="text-xs text-white/80 font-medium uppercase tracking-wide">роки досвіду</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
      >
        <span className="text-gray-600 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          className="w-px h-7 bg-gradient-to-b from-[#E53333] to-transparent"
          animate={{ scaleY: [1, 0.3, 1], originY: 0 }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </motion.div>
    </section>
  );
}
