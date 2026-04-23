"use client";
import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

interface Sections {
  hero: string | null;
  about: string | null;
}

export default function AdminSections() {
  const [sections, setSections] = useState<Sections>({ hero: null, about: null });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/sections")
      .then((r) => r.json())
      .then((d) => { setSections(d); setLoading(false); });
  }, []);

  async function save(key: keyof Sections, url: string) {
    const updated = { ...sections, [key]: url || null };
    setSections(updated);
    await fetch("/api/admin/sections", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [key]: url || null }),
    });
    setSaved(key);
    setTimeout(() => setSaved(null), 2000);
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-64">
        <div className="w-8 h-8 border-2 border-[#E53333]/30 border-t-[#E53333] rounded-full animate-spin" />
      </div>
    );
  }

  const sectionConfig = [
    {
      key: "hero" as const,
      title: "Hero — Головне зображення",
      description: "Фонове або бокове фото на головному екрані сайту. Рекомендований розмір: 1200×900px",
      aspect: "aspect-video",
    },
    {
      key: "about" as const,
      title: "Про нас — Фото компанії",
      description: "Зображення у секції «Про нас». Рекомендований розмір: 800×1000px (вертикальне)",
      aspect: "aspect-[4/5]",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Секції сайту</h1>
        <p className="text-gray-500 text-sm">Управління зображеннями для різних секцій</p>
      </div>

      <div className="space-y-6">
        {sectionConfig.map((section) => (
          <div key={section.key} className="bg-[#1A1A1A] border border-white/10 p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-white font-semibold mb-1">{section.title}</h2>
                <p className="text-gray-500 text-sm">{section.description}</p>
              </div>
              {saved === section.key && (
                <span className="text-green-400 text-xs font-semibold flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Збережено
                </span>
              )}
            </div>

            <div className="max-w-md">
              <ImageUploader
                currentImage={sections[section.key]}
                onUpload={(url) => save(section.key, url)}
                label=""
                aspectRatio={section.aspect}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Info block */}
      <div className="mt-6 bg-[#1A1A1A] border border-white/5 p-5">
        <p className="text-gray-500 text-xs leading-relaxed">
          <span className="text-gray-300 font-semibold">Як це працює:</span> Завантажені зображення зберігаються у{" "}
          <code className="text-gray-400">/public/uploads/</code> і одразу відображаються на сайті. Зображення
          оптимізуються автоматично через Next.js Image. Старі файли при видаленні залишаються на диску —
          їх можна видалити вручну через FTP/SSH.
        </p>
      </div>
    </div>
  );
}
