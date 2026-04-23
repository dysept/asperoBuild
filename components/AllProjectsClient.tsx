"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Project } from "@/lib/storage";

const ALL_CATS = ["Всі", "Будівництво", "Ремонт", "Металоконструкції", "Проектування"];

export default function AllProjectsClient({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("Всі");
  const [clicking, setClicking] = useState<string | null>(null);
  const router = useRouter();

  const filtered = active === "Всі" ? projects : projects.filter((p) => p.category === active);
  const available = ["Всі", ...Array.from(new Set(projects.map((p) => p.category)))];
  const tabs = ALL_CATS.filter((c) => available.includes(c));

  function handleClick(id: string) {
    setClicking(id);
    setTimeout(() => router.push(`/projects/${id}`), 420);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-10">
        <Link href="/" className="hover:text-white transition-colors">Головна</Link>
        <span>/</span>
        <span className="text-gray-300">Проекти</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <p className="section-label">Портфоліо</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Всі проекти</h1>
          <p className="text-gray-500 text-sm mt-2">{projects.length} реалізованих об&apos;єктів</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                active === cat
                  ? "bg-[#E53333] text-white"
                  : "bg-[#1A1A1A] border border-white/10 text-gray-400 hover:text-white hover:border-white/30"
              }`}
            >
              {cat}
              {cat !== "Всі" && (
                <span className="ml-1.5 text-xs opacity-60">
                  ({projects.filter((p) => p.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: i < 9 ? i * 0.05 : 0 }}
            >
              <div
                onClick={() => handleClick(project.id)}
                className="group bg-[#1A1A1A] border border-white/10 hover:border-[#E53333]/50 overflow-hidden transition-all duration-300 cursor-pointer relative"
              >
                {/* Image */}
                <div className="aspect-[4/3] bg-[#222] relative overflow-hidden">
                  <span className="absolute top-3 left-3 z-10 bg-[#E53333] text-white text-xs font-bold px-2.5 py-1 uppercase tracking-wider">
                    {project.category}
                  </span>
                  {project.year && (
                    <span className="absolute top-3 right-3 z-10 bg-black/60 text-white text-xs px-2 py-1">
                      {project.year}
                    </span>
                  )}

                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-600"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                      </svg>
                    </div>
                  )}

                  {/* Click overlay */}
                  <AnimatePresence>
                    {clicking === project.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-[#E53333]/80 flex items-center justify-center z-20"
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -15 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        >
                          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-[#E53333] transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 mb-4">
                    {project.area && <span>{project.area}</span>}
                    {project.city && (
                      <>
                        <span className="w-1 h-1 bg-gray-700 rounded-full" />
                        <span>{project.city}</span>
                      </>
                    )}
                    {project.duration && (
                      <>
                        <span className="w-1 h-1 bg-gray-700 rounded-full" />
                        <span>{project.duration}</span>
                      </>
                    )}
                  </div>
                  <span className="text-[#E53333] text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Переглянути →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-24 text-gray-600">
          <p className="text-lg">Проектів у цій категорії ще немає</p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 sm:mt-20 bg-[#E53333] p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Хочете реалізувати свій проект?</h2>
          <p className="text-white/70 text-sm mt-1">Залиште заявку — розрахуємо вартість безкоштовно.</p>
        </div>
        <Link
          href="/#consultation"
          className="bg-white text-[#E53333] font-bold px-7 py-3.5 text-sm hover:bg-gray-100 transition-colors flex-shrink-0"
        >
          Залишити заявку
        </Link>
      </div>
    </div>
  );
}
