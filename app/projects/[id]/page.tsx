import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { readDB } from "@/lib/storage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectGallery from "@/components/ProjectGallery";

export const dynamic = "force-dynamic";

const stages = [
  { num: "01", title: "Проектування", desc: "Розробка архітектурного та конструктивного проекту, погодження з замовником." },
  { num: "02", title: "Фундамент", desc: "Буріння паль, заливка плити. Геологічне дослідження ґрунту." },
  { num: "03", title: "Коробка", desc: "Зведення стін, перекриттів, монтаж покрівельної системи." },
  { num: "04", title: "Оздоблення", desc: "Утеплення, фасадні роботи, внутрішнє оздоблення під ключ." },
  { num: "05", title: "Здача", desc: "Фінальна перевірка, підписання акту, передача замовнику." },
];

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const db = await readDB();
  const project = db.projects.find((p) => p.id === params.id);
  if (!project) notFound();

  const related = db.projects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 3);

  const allImages = [project.image, ...project.gallery].filter(Boolean) as string[];

  return (
    <>
      <Header />
      <main className="bg-[#111111] pt-16">

        {/* Hero */}
        <section className="py-12 lg:py-16 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8">
              <Link href="/" className="hover:text-white transition-colors">Головна</Link>
              <span>/</span>
              <Link href="/#projects" className="hover:text-white transition-colors">Проекти</Link>
              <span>/</span>
              <span className="text-gray-300">{project.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left */}
              <div>
                <span className="inline-block bg-[#E53333] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider mb-5">
                  {project.category}
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-8">
                  {project.title}
                </h1>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 border border-white/10">
                  {[
                    { label: "Площа", value: project.area },
                    { label: "Строк", value: project.duration },
                    { label: "Місто", value: project.city || "Львів" },
                    { label: "Статус", value: project.status || "Завершено" },
                  ].map((item, i) => (
                    <div key={i} className={`px-4 py-4 border-white/10 ${[
                      "border-r border-b sm:border-b-0",
                      "border-b sm:border-r sm:border-b-0",
                      "border-r",
                      "",
                    ][i]}`}>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-white font-bold text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Link
                    href="/#projects"
                    className="text-gray-500 hover:text-white text-sm flex items-center gap-2 transition-colors"
                  >
                    ← Всі проекти
                  </Link>
                </div>
              </div>

              {/* Right — main photo */}
              <div className="relative aspect-[4/3] bg-[#1A1A1A] border border-white/10 overflow-hidden">
                {project.image ? (
                  <Image src={project.image} alt={project.title} fill className="object-cover" sizes="50vw" priority />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-700 gap-2">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                    </svg>
                    <span className="text-xs uppercase tracking-widest">Головне фото</span>
                  </div>
                )}
                {/* Year badge */}
                {project.year && (
                  <div className="absolute bottom-4 right-4 bg-[#E53333] px-4 py-2 text-center">
                    <p className="text-white font-extrabold text-xl leading-none">{project.year}</p>
                    <p className="text-white/70 text-xs">рік</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {allImages.length > 0 ? (
          <section className="py-16 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-extrabold text-white">Галерея проєкту</h2>
                <span className="text-gray-500 text-sm">{allImages.length} фото</span>
              </div>
              <ProjectGallery images={allImages} />
            </div>
          </section>
        ) : (
          <section className="py-16 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-extrabold text-white">Галерея проєкту</h2>
              </div>
              {/* Empty gallery grid placeholder */}
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 row-span-2 aspect-[4/3] bg-[#1A1A1A] border border-white/10 flex items-center justify-center">
                  <span className="text-gray-700 text-xs uppercase tracking-widest">Фото 1</span>
                </div>
                {[2, 3].map((n) => (
                  <div key={n} className="aspect-[4/3] bg-[#1A1A1A] border border-white/10 flex items-center justify-center">
                    <span className="text-gray-700 text-xs">Фото {n}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Description + Specs */}
        <section className="py-16 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Description */}
              <div>
                <p className="text-xs font-semibold text-[#E53333] uppercase tracking-widest mb-3">Про проект</p>
                <h2 className="text-2xl font-extrabold text-white mb-6">Опис проєкту</h2>
                {project.description ? (
                  <div className="space-y-4">
                    {project.description.split("\n\n").map((para, i) => (
                      <p key={i} className="text-gray-400 text-sm leading-relaxed">{para}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Опис проекту ще не додано.</p>
                )}

                {/* Tags */}
                {project.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-8">
                    {project.tags.map((tag) => (
                      <span key={tag} className="border border-white/15 text-gray-400 text-xs px-3 py-1.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Specs table */}
              {project.specs?.length > 0 && (
                <div className="bg-[#1A1A1A] border border-white/10 p-6">
                  <h3 className="text-white font-bold text-base mb-5">Характеристики</h3>
                  <div className="divide-y divide-white/5">
                    {project.specs.map((spec, i) => (
                      <div key={i} className="flex justify-between items-start py-3 gap-4">
                        <span className="text-gray-500 text-sm flex-shrink-0">{spec.label}</span>
                        <span className="text-white text-sm font-semibold text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Stages */}
        <section className="py-16 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold text-[#E53333] uppercase tracking-widest mb-3">Як ми працювали</p>
              <h2 className="text-3xl font-extrabold text-white">Етапи реалізації</h2>
              <div className="w-12 h-0.5 bg-[#E53333] mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {stages.map((stage, i) => (
                <div key={i} className="text-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-extrabold mx-auto mb-4 ${i === 0 ? "bg-[#E53333] text-white" : "bg-[#1A1A1A] border border-white/15 text-gray-400"}`}>
                    {stage.num}
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2">{stage.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{stage.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-[#E53333] py-12 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Хочете такий же проект?</h2>
              <p className="text-white/70 text-sm mt-1">Залиште заявку — ми зв&apos;яжемось та розрахуємо вартість безкоштовно.</p>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              <Link href="/#consultation" className="bg-white text-[#E53333] font-bold px-6 py-3 text-sm hover:bg-gray-100 transition-colors">
                Залишити заявку
              </Link>
              <Link href="/#footer" className="border-2 border-white text-white font-bold px-6 py-3 text-sm hover:bg-white/10 transition-colors">
                Зв&apos;язатись з нами
              </Link>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-extrabold text-white mb-8">Схожі проекти</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((p) => (
                  <Link key={p.id} href={`/projects/${p.id}`} className="group bg-[#1A1A1A] border border-white/10 hover:border-[#E53333]/40 transition-colors overflow-hidden">
                    <div className="aspect-video bg-[#222] relative overflow-hidden">
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-[#E53333] text-white text-xs font-semibold px-2 py-0.5">{p.category}</span>
                      </div>
                      {p.image ? (
                        <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-white font-semibold text-sm mb-1">{p.title}</p>
                      {p.duration && <p className="text-gray-500 text-xs">{p.duration}</p>}
                      <span className="text-[#E53333] text-xs font-semibold mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Переглянути →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
