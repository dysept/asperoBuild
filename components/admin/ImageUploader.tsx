"use client";
import { useState, useCallback, useRef } from "react";
import Image from "next/image";

interface Props {
  currentImage: string | null;
  onUpload: (url: string) => void;
  label?: string;
  aspectRatio?: string;
}

export default function ImageUploader({ currentImage, onUpload, label = "Зображення", aspectRatio = "aspect-video" }: Props) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onUpload(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Помилка завантаження");
    } finally {
      setUploading(false);
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        {label}
      </label>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !currentImage && inputRef.current?.click()}
        className={`relative ${aspectRatio} border-2 border-dashed transition-all duration-200 overflow-hidden group ${
          dragging
            ? "border-[#E53333] bg-[#E53333]/5"
            : currentImage
            ? "border-white/20 cursor-default"
            : "border-white/10 hover:border-white/30 cursor-pointer bg-[#111111]"
        }`}
      >
        {currentImage ? (
          <>
            <Image
              src={currentImage}
              alt={label}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                className="bg-white text-black text-xs font-bold px-4 py-2 hover:bg-gray-100"
              >
                Замінити
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onUpload(""); }}
                className="bg-[#E53333] text-white text-xs font-bold px-4 py-2 hover:bg-[#C42B2B]"
              >
                Видалити
              </button>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-600">
            {uploading ? (
              <>
                <div className="w-8 h-8 border-2 border-[#E53333]/30 border-t-[#E53333] rounded-full animate-spin" />
                <span className="text-xs">Завантажується...</span>
              </>
            ) : (
              <>
                <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-500">
                    {dragging ? "Відпустіть файл" : "Перетягніть або клікніть"}
                  </p>
                  <p className="text-xs text-gray-700 mt-0.5">JPG, PNG, WebP — до 10MB</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
