"use client";
import { useState, useEffect, useCallback } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import { Project } from "@/lib/storage";

const CATEGORIES = ["Будівництво", "Ремонт", "Металоконструкції", "Проектування"] as const;

const EMPTY_FORM = {
  title: "",
  category: "Будівництво" as Project["category"],
  area: "",
  duration: "",
  city: "Львів",
  status: "Завершено",
  year: new Date().getFullYear().toString(),
  description: "",
  specs: [] as { label: string; value: string }[],
  tags: "",
  featured: false,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [gallery, setGallery] = useState<string[]>([]);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/projects");
    setProjects(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function openCreate() {
    setForm(EMPTY_FORM);
    setMainImage(null);
    setGallery([]);
    setEditingProject(null);
    setView("create");
  }

  function openEdit(p: Project) {
    setForm({
      title: p.title,
      category: p.category,
      area: p.area,
      duration: p.duration,
      city: p.city || "Львів",
      status: p.status || "Завершено",
      year: p.year || "",
      description: p.description || "",
      specs: p.specs || [],
      tags: (p.tags || []).join(", "),
      featured: p.featured,
    });
    setMainImage(p.image);
    setGallery(p.gallery || []);
    setEditingProject(p);
    setView("edit");
  }

  async function handleSave() {
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      image: mainImage,
      gallery,
    };

    if (view === "create") {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const created = await res.json();
      setProjects((p) => [...p, created]);
    } else if (editingProject) {
      const res = await fetch("/api/admin/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingProject.id, ...payload }),
      });
      const updated = await res.json();
      setProjects((p) => p.map((x) => (x.id === updated.id ? updated : x)));
    }

    setSaving(false);
    setView("list");
  }

  async function handleDelete(id: string) {
    if (!confirm("Видалити проект?")) return;
    await fetch("/api/admin/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setProjects((p) => p.filter((x) => x.id !== id));
  }

  function addSpec() {
    setForm((f) => ({ ...f, specs: [...f.specs, { label: "", value: "" }] }));
  }

  function updateSpec(i: number, key: "label" | "value", val: string) {
    setForm((f) => {
      const specs = [...f.specs];
      specs[i] = { ...specs[i], [key]: val };
      return { ...f, specs };
    });
  }

  function removeSpec(i: number) {
    setForm((f) => ({ ...f, specs: f.specs.filter((_, idx) => idx !== i) }));
  }

  function addGalleryImage(url: string) {
    if (url) setGallery((g) => [...g, url]);
  }

  function removeGalleryImage(url: string) {
    setGallery((g) => g.filter((u) => u !== url));
  }

  // ─── LIST VIEW ────────────────────────────────────────────
  if (view === "list") {
    return (
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Проекти</h1>
            <p className="text-gray-500 text-sm mt-0.5">{projects.length} проектів в базі</p>
          </div>
          <button
            onClick={openCreate}
            className="bg-[#E53333] hover:bg-[#C42B2B] text-white text-sm font-bold px-5 py-2.5 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Новий проект
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#E53333]/30 border-t-[#E53333] rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-[#1A1A1A] border border-white/10 p-16 text-center">
            <p className="text-gray-500 mb-4">Проектів ще немає</p>
            <button onClick={openCreate} className="text-[#E53333] text-sm font-semibold hover:underline">
              Створити перший проект →
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id} className="bg-[#1A1A1A] border border-white/10 hover:border-white/20 transition-colors flex items-center gap-4 p-4">
                {/* Thumb */}
                <div className="w-20 h-14 bg-[#111] border border-white/10 flex-shrink-0 overflow-hidden relative">
                  {p.image
                    ? <img src={p.image} alt="" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16" />
                        </svg>
                      </div>
                  }
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-semibold text-sm truncate">{p.title}</p>
                    {p.featured && <span className="text-xs bg-yellow-500/15 text-yellow-400 px-2 py-0.5 flex-shrink-0">Featured</span>}
                    {!p.image && <span className="text-xs bg-orange-500/10 text-orange-400 px-2 py-0.5 flex-shrink-0">Без фото</span>}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span className="text-[#E53333]">{p.category}</span>
                    {p.area && <span>{p.area}</span>}
                    {p.year && <span>{p.year}</span>}
                    {p.gallery?.length > 0 && <span>{p.gallery.length + (p.image ? 1 : 0)} фото</span>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a href={`/projects/${p.id}`} target="_blank" className="text-gray-500 hover:text-white p-1.5 transition-colors" title="Переглянути на сайті">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <button onClick={() => openEdit(p)} className="text-gray-400 hover:text-white text-xs px-3 py-1.5 border border-white/10 hover:border-white/30 transition-colors">
                    Редагувати
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="text-gray-600 hover:text-red-400 p-1.5 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ─── CREATE / EDIT FORM ───────────────────────────────────
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView("list")} className="text-gray-500 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {view === "create" ? "Новий проект" : `Редагувати: ${editingProject?.title}`}
          </h1>
          <p className="text-gray-500 text-sm">Заповніть інформацію про проект</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* ── LEFT: main fields ── */}
        <div className="xl:col-span-3 space-y-5">

          {/* Basic info */}
          <Section title="Основна інформація">
            <div className="space-y-4">
              <Field label="Назва проекту *">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Котедж у Львівській області"
                  className={input}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Категорія">
                  <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Project["category"] }))} className={input}>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Рік">
                  <input type="text" value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} placeholder="2024" className={input} />
                </Field>
                <Field label="Площа">
                  <input type="text" value={form.area} onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))} placeholder="320 м²" className={input} />
                </Field>
                <Field label="Строк виконання">
                  <input type="text" value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))} placeholder="6 місяців" className={input} />
                </Field>
                <Field label="Місто">
                  <input type="text" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} placeholder="Львів" className={input} />
                </Field>
                <Field label="Статус">
                  <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className={input}>
                    <option>Завершено</option>
                    <option>В процесі</option>
                    <option>Проектування</option>
                  </select>
                </Field>
              </div>

              <Field label="Теги (через кому)">
                <input type="text" value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} placeholder="Котедж, Будівництво, Під ключ" className={input} />
              </Field>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 accent-[#E53333]" />
                <span className="text-sm text-gray-300">Показувати у Featured (головна сторінка)</span>
              </label>
            </div>
          </Section>

          {/* Description */}
          <Section title="Опис проекту">
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={6}
              placeholder="Опишіть проект: особливості, матеріали, складність, результат..."
              className={`${input} resize-none`}
            />
            <p className="text-gray-600 text-xs mt-1.5">Два переноси рядка = новий абзац на сторінці</p>
          </Section>

          {/* Specs */}
          <Section title="Характеристики">
            <div className="space-y-2 mb-3">
              {form.specs.map((spec, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={spec.label}
                    onChange={(e) => updateSpec(i, "label", e.target.value)}
                    placeholder="Параметр"
                    className={`${input} flex-1`}
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => updateSpec(i, "value", e.target.value)}
                    placeholder="Значення"
                    className={`${input} flex-1`}
                  />
                  <button onClick={() => removeSpec(i)} className="text-gray-600 hover:text-red-400 p-1.5 flex-shrink-0 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addSpec} className="text-[#E53333] text-sm font-semibold flex items-center gap-1.5 hover:text-red-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Додати характеристику
            </button>
          </Section>
        </div>

        {/* ── RIGHT: images ── */}
        <div className="xl:col-span-2 space-y-5">

          <Section title="Головне фото">
            <ImageUploader
              currentImage={mainImage}
              onUpload={(url) => setMainImage(url || null)}
              label=""
              aspectRatio="aspect-video"
            />
          </Section>

          <Section title={`Галерея (${gallery.length} фото)`}>
            {/* Existing gallery */}
            {gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-3">
                {gallery.map((img, i) => (
                  <div key={i} className="relative aspect-square group">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeGalleryImage(img)}
                      className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white p-1 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add to gallery */}
            <GalleryUploader onUpload={addGalleryImage} />
          </Section>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={saving || !form.title.trim()}
            className="w-full bg-[#E53333] hover:bg-[#C42B2B] disabled:opacity-50 text-white font-bold py-4 text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            {saving
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Зберігаємо...</>
              : view === "create" ? "Створити проект" : "Зберегти зміни"
            }
          </button>

          <button
            onClick={() => setView("list")}
            className="w-full border border-white/10 hover:border-white/30 text-gray-400 hover:text-white py-3 text-sm transition-colors"
          >
            Скасувати
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Helper components ──────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#1A1A1A] border border-white/10 p-5">
      <h3 className="text-white font-semibold text-sm mb-4 pb-3 border-b border-white/10">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function GalleryUploader({ onUpload }: { onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [drag, setDrag] = useState(false);

  async function upload(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (res.ok) {
      const { url } = await res.json();
      onUpload(url);
    }
    setUploading(false);
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) upload(f); }}
      className={`border-2 border-dashed transition-colors py-6 flex flex-col items-center gap-2 cursor-pointer ${drag ? "border-[#E53333] bg-[#E53333]/5" : "border-white/10 hover:border-white/25"}`}
      onClick={() => { const i = document.createElement("input"); i.type = "file"; i.accept = "image/*"; i.onchange = (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) upload(f); }; i.click(); }}
    >
      {uploading
        ? <div className="w-5 h-5 border-2 border-[#E53333]/30 border-t-[#E53333] rounded-full animate-spin" />
        : <>
            <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
            <p className="text-gray-500 text-xs">{drag ? "Відпустіть" : "Додати фото в галерею"}</p>
          </>
      }
    </div>
  );
}

const input = "w-full bg-[#111111] border border-white/10 focus:border-[#E53333]/60 text-white placeholder-gray-600 px-4 py-2.5 text-sm outline-none transition-colors appearance-none";
