"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "./ui/CountUp";

const STATS = [
  {
    value: 180,
    suffix: "+",
    label: "Стран присутствия",
    desc: "Собственные агенты в 24 ключевых странах, партнёрская сеть по всему миру",
  },
  {
    value: 2.4,
    suffix: " млн",
    decimals: 1,
    label: "Тонн груза в год",
    desc: "Ежегодный объём перевозок по всем направлениям и видам транспорта",
  },
  {
    value: 847,
    suffix: "",
    label: "Сотрудников",
    desc: "Профессионалы в 24 странах: логисты, брокеры, операционные менеджеры",
  },
  {
    value: 12000,
    suffix: "",
    label: "Активных клиентов",
    desc: "Производственные компании, ритейлеры, импортёры и экспортёры",
  },
  {
    value: 99.2,
    suffix: "%",
    decimals: 1,
    label: "Доставлено в срок",
    desc: "Процент грузов, доставленных в согласованные сроки за последние 3 года",
  },
  {
    value: 16,
    suffix: " лет",
    label: "На рынке",
    desc: "С 2008 года — стабильный рост, цифровая трансформация, международная экспансия",
  },
];

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-32 bg-[#0A0A0F]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-[family-name:var(--font-montserrat)] text-[11px] font-600 tracking-[0.15em] uppercase text-[#8C9BAB]">
            Цифры
          </span>
          <h2
            className="font-[family-name:var(--font-montserrat)] font-700 text-white mt-4 leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
          >
            NEXUS в цифрах
          </h2>
          <div className="w-16 h-px bg-[#0052CC] mx-auto mt-5" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-[#0A0A0F] p-10 group hover:bg-[#0d1520] transition-colors duration-300"
            >
              <div
                className="font-[family-name:var(--font-montserrat)] font-700 leading-none mb-3"
                style={{
                  color: "#B8960C",
                  fontSize: "clamp(40px, 4vw, 60px)",
                }}
              >
                {isInView && (
                  <CountUp
                    end={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                    duration={2200}
                  />
                )}
              </div>
              <div className="font-[family-name:var(--font-montserrat)] font-600 text-white text-lg mb-3">
                {stat.label}
              </div>
              <div className="font-[family-name:var(--font-inter)] text-[#5A6472] text-sm leading-[1.6]">
                {stat.desc}
              </div>
              <div className="w-8 h-0.5 bg-[#0052CC] mt-5 group-hover:w-16 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
