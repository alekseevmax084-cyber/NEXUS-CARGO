"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import StarRating from "./ui/StarRating";

const TESTIMONIALS = [
  {
    text: "Работаем с NEXUS CARGO 6 лет. За это время — ни одного сорванного срока. Для производственной компании это критически важно. Рекомендую без оговорок.",
    author: "Сергей Антонов",
    role: "Директор по логистике, ГК «Промтех»",
    initials: "СА",
  },
  {
    text: "Перешли от другого экспедитора после того, как NEXUS вытащил наш груз из Шанхая за 72 часа в период ковидных ограничений. Профессионализм высшего уровня.",
    author: "Анна Белова",
    role: "CEO, Retail Group",
    initials: "АБ",
  },
  {
    text: "Таможенное оформление, которое раньше занимало 3 дня, теперь занимает 4 часа. Брокеры NEXUS знают своё дело лучше, чем кто-либо на рынке.",
    author: "Дмитрий Орлов",
    role: "ВЭД-менеджер, TechImport",
    initials: "ДО",
  },
  {
    text: "Негабаритный груз весом 180 тонн из Германии в Якутск. Казалось невозможным. NEXUS доставил точно в срок и в рамках бюджета.",
    author: "Павел Кузнецов",
    role: "Технический директор, СибирьСтрой",
    initials: "ПК",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [paused]);

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
            Клиенты
          </span>
          <h2
            className="font-[family-name:var(--font-montserrat)] font-700 text-white mt-4 leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
          >
            12 000 компаний доверяют
            <br />
            нам свои грузы
          </h2>
          <div className="w-16 h-px bg-[#0052CC] mx-auto mt-5" />
        </motion.div>

        {/* Desktop — all cards */}
        <div
          className="hidden lg:grid grid-cols-2 gap-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white/5 border border-white/8 rounded-2xl p-8 hover:bg-white/8 transition-colors duration-300"
            >
              <StarRating />
              <p className="font-[family-name:var(--font-inter)] text-[#C8D0D8] text-base leading-[1.7] mt-5 mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0052CC] flex items-center justify-center text-white font-[family-name:var(--font-montserrat)] font-700 text-sm shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="font-[family-name:var(--font-montserrat)] font-600 text-white text-sm">
                    {t.author}
                  </div>
                  <div className="font-[family-name:var(--font-inter)] text-[#8C9BAB] text-xs mt-0.5">
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile — carousel */}
        <div
          className="lg:hidden"
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="bg-white/5 border border-white/8 rounded-2xl p-8"
          >
            <StarRating />
            <p className="font-[family-name:var(--font-inter)] text-[#C8D0D8] text-base leading-[1.7] mt-5 mb-6">
              &ldquo;{TESTIMONIALS[currentIndex].text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0052CC] flex items-center justify-center text-white font-[family-name:var(--font-montserrat)] font-700 text-sm">
                {TESTIMONIALS[currentIndex].initials}
              </div>
              <div>
                <div className="font-[family-name:var(--font-montserrat)] font-600 text-white text-sm">
                  {TESTIMONIALS[currentIndex].author}
                </div>
                <div className="font-[family-name:var(--font-inter)] text-[#8C9BAB] text-xs mt-0.5">
                  {TESTIMONIALS[currentIndex].role}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? "bg-[#0052CC] w-6" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
