import { readDB } from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const db = await readDB();
  const newConsultations = db.consultations.filter((c) => c.status === "new").length;
  const totalProjects = db.projects.length;
  const projectsWithImages = db.projects.filter((p) => p.image).length;
  const recentConsultations = db.consultations.slice(-5).reverse();

  const stats = [
    {
      label: "Всього проектів",
      value: totalProjects,
      sub: `${projectsWithImages} з фото`,
      color: "border-blue-500/30",
      icon: (
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
        </svg>
      ),
    },
    {
      label: "Нових заявок",
      value: newConsultations,
      sub: `всього ${db.consultations.length}`,
      color: newConsultations > 0 ? "border-[#E53333]/50" : "border-green-500/30",
      icon: (
        <svg className="w-5 h-5 text-[#E53333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      label: "Фото на сайті",
      value: db.sections.hero || db.sections.about ? "✓" : "—",
      sub: "hero + about",
      color: "border-yellow-500/30",
      icon: (
        <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
        </svg>
      ),
    },
  ];

  const statusLabels: Record<string, string> = {
    new: "Нова",
    contacted: "Зв'язались",
    done: "Виконано",
  };
  const statusColors: Record<string, string> = {
    new: "bg-[#E53333]/15 text-[#E53333]",
    contacted: "bg-yellow-500/15 text-yellow-400",
    done: "bg-green-500/15 text-green-400",
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white mb-1">Дашборд</h1>
        <p className="text-gray-500 text-sm">Огляд стану сайту</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-[#1A1A1A] border ${stat.color} p-6`}>
            <div className="flex items-start justify-between mb-4">
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <div className="w-9 h-9 bg-white/5 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
            <p className="text-4xl font-extrabold text-white">{stat.value}</p>
            <p className="text-gray-600 text-xs mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent consultations */}
        <div className="bg-[#1A1A1A] border border-white/10">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">Останні заявки</h2>
            <a href="/admin/consultations" className="text-[#E53333] text-xs hover:underline">
              Всі →
            </a>
          </div>
          <div className="divide-y divide-white/5">
            {recentConsultations.length === 0 ? (
              <p className="px-6 py-8 text-gray-600 text-sm text-center">Заявок ще немає</p>
            ) : (
              recentConsultations.map((c) => (
                <div key={c.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{c.name}</p>
                    <p className="text-gray-500 text-xs">{c.phone} · {c.service || "Не вказано"}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 flex-shrink-0 ${statusColors[c.status]}`}>
                    {statusLabels[c.status]}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-[#1A1A1A] border border-white/10">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-white font-semibold text-sm">Швидкі дії</h2>
          </div>
          <div className="p-4 space-y-2">
            {[
              { label: "Додати фото до проекту", href: "/admin/projects", color: "text-blue-400" },
              { label: "Оновити фото Hero секції", href: "/admin/sections", color: "text-yellow-400" },
              { label: "Переглянути нові заявки", href: "/admin/consultations", color: "text-[#E53333]" },
            ].map((action, i) => (
              <a
                key={i}
                href={action.href}
                className="flex items-center justify-between px-4 py-3 bg-[#111111] hover:bg-white/5 transition-colors group"
              >
                <span className={`text-sm font-medium ${action.color}`}>{action.label}</span>
                <span className="text-gray-600 group-hover:text-gray-400 transition-colors">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
