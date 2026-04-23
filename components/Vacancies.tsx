const vacancies = [
  {
    title: "Електрик",
    category: "Будівництво",
    experience: "3+ роки",
    location: "Львів",
    salary: "30 000 – 40 000 грн",
  },
  {
    title: "Будівельник",
    category: "Будівництво",
    experience: "1+ рік",
    location: "Львів",
    salary: "25 000 – 35 000 грн",
  },
  {
    title: "Проектувальник",
    category: "Проектування",
    experience: "3+ роки",
    location: "Львів",
    salary: "40 000 – 55 000 грн",
  },
];

export default function Vacancies() {
  return (
    <section id="vacancies" className="bg-[#111111] py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p className="section-label">Кар&apos;єра</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
            Вільні вакансії
          </h2>
        </div>

        <div className="space-y-3">
          {vacancies.map((v, i) => (
            <div
              key={i}
              className="bg-[#1A1A1A] border border-white/10 hover:border-[#E53333]/40 transition-all duration-300 p-5 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                {/* Title + badge */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <h3 className="text-white font-bold text-base sm:text-lg">
                    {v.title}
                  </h3>
                  <span className="bg-[#E53333]/15 border border-[#E53333]/30 text-[#E53333] text-xs font-semibold px-2.5 py-0.5 flex-shrink-0">
                    {v.category}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {v.experience}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {v.location}
                  </span>
                  <span className="text-white font-semibold">{v.salary}</span>
                </div>

                {/* CTA */}
                <a
                  href="#footer"
                  className="bg-[#E53333] hover:bg-[#C42B2B] text-white text-sm font-semibold px-5 py-2.5 transition-colors duration-200 flex-shrink-0 text-center"
                >
                  Відгукнутись
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
