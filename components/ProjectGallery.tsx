"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectGallery({ images }: { images: string[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = useCallback(() => setLightbox((i) => (i! > 0 ? i! - 1 : images.length - 1)), [images.length]);
  const next = useCallback(() => setLightbox((i) => (i! < images.length - 1 ? i! + 1 : 0)), [images.length]);
  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next, close]);

  if (images.length === 0) return null;

  const [main, ...rest] = images;

  return (
    <>
      {/* Gallery grid */}
      <div className="space-y-2">
        {/* Main large image */}
        <div
          className="relative w-full aspect-[16/9] overflow-hidden bg-[#1A1A1A] cursor-zoom-in group"
          onClick={() => setLightbox(0)}
        >
          <Image src={main} alt="Фото 1" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" sizes="100vw" priority />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 rounded-full p-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Thumbnails row */}
        {rest.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {rest.map((img, i) => {
              const isLast = i === rest.length - 1 && images.length > 7;
              const extra = images.length - 7;
              return (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden bg-[#1A1A1A] cursor-zoom-in group"
                  onClick={() => setLightbox(i + 1)}
                >
                  <Image src={img} alt={`Фото ${i + 2}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="15vw" />
                  {isLast && extra > 0 ? (
                    <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
                      <span className="text-white font-extrabold text-xl">+{extra}</span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center"
            onClick={close}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors z-10"
              onClick={close}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-gray-400 text-sm">
              {lightbox + 1} / {images.length}
            </div>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl mx-4 aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={images[lightbox]} alt="" fill className="object-contain" sizes="100vw" />
            </motion.div>

            {/* Nav */}
            <div className="flex items-center gap-4 sm:gap-6 mt-4 sm:mt-6" onClick={(e) => e.stopPropagation()}>
              <button onClick={prev} className="w-12 h-12 sm:w-11 sm:h-11 border border-white/20 hover:border-white/60 text-white/60 hover:text-white transition-all flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Thumbnail strip */}
              <div className="hidden sm:flex gap-1.5 max-w-sm overflow-hidden">
                {images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setLightbox(i)}
                    className={`relative w-12 h-9 flex-shrink-0 overflow-hidden cursor-pointer transition-all ${lightbox === i ? "ring-2 ring-[#E53333]" : "opacity-40 hover:opacity-80"}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="50px" />
                  </div>
                ))}
              </div>

              <button onClick={next} className="w-12 h-12 sm:w-11 sm:h-11 border border-white/20 hover:border-white/60 text-white/60 hover:text-white transition-all flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
