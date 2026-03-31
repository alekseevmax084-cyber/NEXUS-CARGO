"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, Play } from "lucide-react";

const Globe = dynamic(() => import("./ui/Globe"), { ssr: false });

const STATS = [
  { value: "16 лет", label: "На рынке" },
  { value: "180+", label: "Стран" },
  { value: "2.4 млн т", label: "Грузов в год" },
  { value: "12 000", label: "Клиентов" },
];

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function HeroSection() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen bg-[#0A0A0F] overflow-hidden flex flex-col">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0052CC]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#0052CC]/8 rounded-full blur-3xl" />

      {/* Main content */}
      <div className="relative flex-1 max-w-7xl mx-auto px-6 lg:px-8 flex items-center pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 w-full items-center">
          {/* Left — Text */}
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-6 lg:pr-12"
          >
            <motion.div variants={fadeUp}>
              <span className="font-[family-name:var(--font-montserrat)] text-[11px] font-600 tracking-[0.15em] uppercase text-[#8C9BAB]">
                Международная логистика · С 2008 · 180+ Стран
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-[family-name:var(--font-montserrat)] font-700 text-white leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: "clamp(42px, 5.5vw, 76px)" }}
            >
              Ваш груз.
              <br />
              Любая точка
              <br />
              <span className="text-[#0052CC]">мира.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-[family-name:var(--font-inter)] text-[#8C9BAB] text-lg leading-[1.7] max-w-md"
            >
              Мы перемещаем 2,4 миллиона тонн груза ежегодно.
              Авиа, море, авто, железная дорога — единая экосистема
              логистики для вашего бизнеса.
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center gap-4 flex-wrap">
              <button
                onClick={scrollToContact}
                className="flex items-center gap-2 bg-[#0052CC] text-white px-8 py-4 rounded-full text-sm font-[family-name:var(--font-montserrat)] font-600 hover:bg-[#0041a8] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,82,204,0.4)]"
              >
                Рассчитать стоимость
                <ArrowRight size={16} />
              </button>
              <button
                onClick={scrollToAbout}
                className="flex items-center gap-2 border border-white/25 text-white/80 px-8 py-4 rounded-full text-sm font-[family-name:var(--font-montserrat)] font-500 hover:border-white/60 hover:text-white transition-all duration-300"
              >
                <Play size={14} className="fill-white/80" />
                О компании
              </button>
            </motion.div>

            {/* Trust marks */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#0A0A0F] bg-[#1a2a3a]"
                  />
                ))}
              </div>
              <span className="text-[#8C9BAB] text-sm font-[family-name:var(--font-inter)]">
                12 000+ компаний доверяют нам
              </span>
            </motion.div>
          </motion.div>

          {/* Right — Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="relative h-[400px] lg:h-[580px] hidden sm:block"
          >
            <Globe />
            {/* Floating labels */}
            <div className="absolute top-[15%] right-[10%] bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 pointer-events-none">
              <div className="text-white text-xs font-[family-name:var(--font-montserrat)] font-600">
                Shanghai
              </div>
              <div className="text-[#0052CC] text-[10px] font-[family-name:var(--font-montserrat)] tracking-wide">
                АКТИВНЫЙ ХАБ
              </div>
            </div>
            <div className="absolute bottom-[25%] left-[5%] bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 pointer-events-none">
              <div className="text-white text-xs font-[family-name:var(--font-montserrat)] font-600">
                Frankfurt
              </div>
              <div className="text-[#B8960C] text-[10px] font-[family-name:var(--font-montserrat)] tracking-wide">
                ЕВРОПЕЙСКИЙ ХАБ
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div className="relative border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/8">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                className="py-7 px-6 lg:px-8 text-center lg:text-left"
              >
                <div
                  className="font-[family-name:var(--font-montserrat)] font-700 text-white text-2xl lg:text-3xl"
                  style={{ color: "#B8960C" }}
                >
                  {stat.value}
                </div>
                <div className="font-[family-name:var(--font-inter)] text-[#8C9BAB] text-sm mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
