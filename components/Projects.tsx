"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Project } from "@/lib/storage";

const categories = ["Всі", "Будівництво", "Ремонт", "Металоконструкції", "Проектування"];

export default function Projects({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("Всі");
  const [clicking, setClicking] = useState<string | null>(null);
  const router = useRouter();

  const filtered = active === "Всі" ? projects : projects.filter((p) => p.category === active);
  const available = ["Всі", ...Array.from(new Set(projects.map((p) => p.category)))];
  const tabs = categories.filter((c) => available.includes(c));

  function handleClick(e: React.MouseEvent, id: string) {
    e.preventDefault();
    setClicking(id);
    setTimeout(() => router.push(`/projects/${id}`), 420);
  }

  return (
    <section id="projects" className="bg-[#111111] py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <p className="section-label">Проекти</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">Наші проєкти</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  active === cat ? "bg-[#E53333] text-white" : "bg-[#1A1A1A] text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <div
                  onClick={(e) => handleClick(e, project.id)}
                  className="group bg-[#1A1A1A] border border-white/10 overflow-hidden hover:border-[#E53333]/50 transition-all duration-300 cursor-pointer relative"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] bg-[#222] relative overflow-hidden">
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-[#E53333] text-white text-xs font-semibold px-2.5 py-1 uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                        </svg>
                      </div>
                    )}

                    {/* Click overlay animation */}
                    <AnimatePresence>
                      {clicking === project.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-[#E53333]/80 flex items-center justify-center z-20"
                        >
                          <motion.div
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
                    <h3 className="text-white font-bold text-base mb-2 group-hover:text-[#E53333] transition-colors duration-200">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                      {project.area && <span>{project.area}</span>}
                      {project.area && project.duration && <span className="w-1 h-1 bg-gray-700 rounded-full" />}
                      {project.duration && <span>{project.duration}</span>}
                    </div>
                    <span className="text-[#E53333] text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
                      Переглянути <span>→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center py-16 text-gray-600">Проектів в цій категорії ще немає</p>
        )}

        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-[#E53333]/60 hover:text-[#E53333] text-white font-semibold px-8 py-3.5 text-sm transition-all duration-200"
          >
            Всі проекти <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
