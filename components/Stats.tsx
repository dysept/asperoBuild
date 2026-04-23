"use client";
import { motion } from "framer-motion";

const stats = [
  { value: "22", label: "роки досвіду" },
  { value: "500+", label: "завершених проектів" },
  { value: "150", label: "співробітників" },
  { value: "98%", label: "задоволених клієнтів" },
];

export default function Stats() {
  return (
    <section className="bg-[#E53333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`py-7 sm:py-8 px-4 sm:px-6 flex flex-col items-center text-center border-white/20 ${[
                "border-r border-b lg:border-b-0",
                "border-b lg:border-r lg:border-b-0",
                "border-r",
                "",
              ][i]}`}
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-1">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-white/70 uppercase tracking-widest font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
