import { readDB } from "@/lib/storage";
import Image from "next/image";

const features = [
  "Повний цикл — від проекту до здачі",
  "Власний парк техніки та матеріалів",
  "Гарантія на всі роботи до 5 років",
];

export default async function About() {
  const db = await readDB();
  const aboutImage = db.sections.about;

  return (
    <section id="about" className="bg-[#111111] py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] bg-[#1A1A1A] border border-white/10 overflow-hidden">
              {aboutImage ? (
                <Image src={aboutImage} alt="ASPERO" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 border border-white/20 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                      </svg>
                    </div>
                    <p className="text-white/20 text-xs uppercase tracking-widest">Фото об&apos;єкту</p>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 bg-[#E53333] px-5 py-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-white block">500+</span>
              <span className="text-xs text-white/80 uppercase tracking-widest">завершених проектів</span>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <p className="section-label">Про компанію</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
              Ми будуємо не просто об&apos;єкти —{" "}
              <span className="text-[#E53333]">ми будуємо довіру.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 text-sm sm:text-base">
              ASPERO — будівельна компанія з Львова, яка з 2002 року реалізує проекти різної складності: від приватних котеджів до промислових об&apos;єктів. За 22 роки ми сформували команду справжніх професіоналів.
            </p>
            <div className="space-y-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 border-b border-white/10 pb-3 last:border-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E53333] mt-2 flex-shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
