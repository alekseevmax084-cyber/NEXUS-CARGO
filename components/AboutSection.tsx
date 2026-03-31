"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TIMELINE = [
  { year: "2008", text: "Основание компании, первые 3 клиента" },
  { year: "2011", text: "Открытие офисов в Шанхае и Франкфурте" },
  { year: "2014", text: "Собственный склад класса А в Москве (15 000 м²)" },
  { year: "2017", text: "Запуск авиационного направления, 40 стран" },
  { year: "2020", text: "Цифровая трансформация: собственная TMS-система" },
  { year: "2024", text: "180+ стран, 12 000 активных клиентов" },
];

function TimelineItem({
  year,
  text,
  index,
}: {
  year: string;
  text: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex gap-5 relative"
    >
      {/* Line */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-[#0052CC] mt-1 shrink-0 z-10" />
        {index < TIMELINE.length - 1 && (
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
            className="w-px bg-[#E8ECF0] flex-1 mt-1"
            style={{ minHeight: "40px" }}
          />
        )}
      </div>
      <div className="pb-8">
        <div
          className="font-[family-name:var(--font-montserrat)] font-700 text-[#0052CC] text-sm mb-1"
          style={{ letterSpacing: "0.05em" }}
        >
          {year}
        </div>
        <div className="font-[family-name:var(--font-inter)] text-[#5A6472] text-sm leading-[1.6]">
          {text}
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-[family-name:var(--font-montserrat)] text-[11px] font-600 tracking-[0.15em] uppercase text-[#8C9BAB]">
            О компании
          </span>
          <div className="mt-4 border-l-4 border-[#0052CC] pl-5">
            <h2
              className="font-[family-name:var(--font-montserrat)] font-700 text-[#0A0A0F] leading-[1.1] tracking-[-0.02em]"
              style={{ fontSize: "clamp(32px, 3.5vw, 52px)" }}
            >
              Мы строили эту компанию
              <br />
              16 лет. Груз за грузом.
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="font-[family-name:var(--font-inter)] text-[#5A6472] leading-[1.8] text-base">
              NEXUS CARGO основана в 2008 году в Москве двумя логистами с опытом
              работы в международных экспедиторских компаниях. Начав с небольшого
              офиса и трёх клиентов, мы выросли в холдинг с представительствами
              в 24 странах.
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[#5A6472] leading-[1.8] text-base">
              Наша философия проста: логистика — это не перевозка грузов. Это
              управление временем, рисками и репутацией клиента. Каждый груз мы
              сопровождаем так, будто это наш собственный.
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[#5A6472] leading-[1.8] text-base">
              Сегодня NEXUS CARGO — это 847 сотрудников, собственный парк
              транспорта, сертифицированные склады класса А в Москве,
              Санкт-Петербурге и Новосибирске, и партнёрская сеть в 180 странах
              мира.
            </p>

            {/* Key numbers */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E8ECF0]">
              {[
                { num: "24", label: "Страны присутствия" },
                { num: "847", label: "Сотрудников" },
                { num: "3", label: "Склада класса А" },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    className="font-[family-name:var(--font-montserrat)] font-700 text-3xl"
                    style={{ color: "#B8960C" }}
                  >
                    {item.num}
                  </div>
                  <div className="font-[family-name:var(--font-inter)] text-[#8C9BAB] text-xs mt-1 leading-[1.4]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <div className="font-[family-name:var(--font-montserrat)] text-[11px] font-600 tracking-[0.15em] uppercase text-[#8C9BAB] mb-8">
              История компании
            </div>
            {TIMELINE.map((item, i) => (
              <TimelineItem key={item.year} {...item} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
