"use client";
import { useEffect, useState } from "react";

interface Consultation {
  id: string;
  name: string;
  phone: string;
  service: string;
  time: string;
  message: string;
  createdAt: string;
  status: "new" | "contacted" | "done";
}

const statusConfig = {
  new: { label: "Нова", style: "bg-[#E53333]/15 text-[#E53333] border border-[#E53333]/20" },
  contacted: { label: "Зв'язались", style: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20" },
  done: { label: "Виконано", style: "bg-green-500/15 text-green-400 border border-green-500/20" },
};

export default function AdminConsultations() {
  const [items, setItems] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/admin/consultations");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function changeStatus(id: string, status: string) {
    await fetch("/api/admin/consultations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setItems((prev) => prev.map((c) => c.id === id ? { ...c, status: status as Consultation["status"] } : c));
  }

  const newCount = items.filter((c) => c.status === "new").length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Заявки на консультацію</h1>
          <p className="text-gray-500 text-sm">
            {items.length} всього
            {newCount > 0 && <span className="ml-2 text-[#E53333]">· {newCount} нових</span>}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-64">
          <div className="w-8 h-8 border-2 border-[#E53333]/30 border-t-[#E53333] rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-[#1A1A1A] border border-white/10 p-16 text-center">
          <svg className="w-12 h-12 text-gray-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-gray-500">Заявок ще немає</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((c) => (
            <div key={c.id} className={`bg-[#1A1A1A] border transition-colors p-5 ${c.status === "new" ? "border-[#E53333]/20" : "border-white/10"}`}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-semibold">{c.name}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 ${statusConfig[c.status].style}`}>
                      {statusConfig[c.status].label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-400 mb-3">
                    <a href={`tel:${c.phone}`} className="text-[#E53333] hover:underline font-medium">
                      {c.phone}
                    </a>
                    {c.service && <span>Послуга: {c.service}</span>}
                    {c.time && <span>Час: {c.time}</span>}
                  </div>
                  {c.message && (
                    <p className="text-gray-500 text-sm bg-[#111111] px-4 py-3 border border-white/5">
                      &ldquo;{c.message}&rdquo;
                    </p>
                  )}
                  <p className="text-gray-700 text-xs mt-2">
                    {new Date(c.createdAt).toLocaleString("uk-UA")}
                  </p>
                </div>

                {/* Status change */}
                <div className="flex flex-wrap sm:flex-col gap-2 flex-shrink-0">
                  {(["new", "contacted", "done"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => changeStatus(c.id, s)}
                      className={`text-xs px-3 py-1.5 transition-all border ${
                        c.status === s
                          ? statusConfig[s].style
                          : "border-white/10 text-gray-500 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {statusConfig[s].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
