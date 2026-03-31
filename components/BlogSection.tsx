"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const POSTS = [
  {
    category: "Аналитика",
    readTime: "8 мин",
    title: "Китай–Россия 2026: новые маршруты и сроки после изменения регуляций",
    desc: "Анализ актуальных изменений в логистике между Китаем и Россией, новых транзитных коридоров и оптимальных маршрутов для импортёров.",
    img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&h=400&fit=crop&q=80",
  },
  {
    category: "Руководство",
    readTime: "6 мин",
    title: "FCL vs LCL: как выбрать тип контейнерной отправки и не переплатить",
    desc: "Полное руководство для импортёров: когда выгоден полный контейнер, когда сборный, и как рассчитать оптимальный вариант для вашего груза.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop&q=80",
  },
  {
    category: "Регуляции",
    readTime: "5 мин",
    title: "Таможенные изменения Q1 2026: что нужно знать импортёрам",
    desc: "Обзор ключевых изменений в таможенном законодательстве первого квартала 2026 года и их практическое влияние на ВЭД-операции.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop&q=80",
  },
];

export default function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="blog" className="py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16"
        >
          <div>
            <span className="font-[family-name:var(--font-montserrat)] text-[11px] font-600 tracking-[0.15em] uppercase text-[#8C9BAB]">
              Экспертиза
            </span>
            <div className="mt-4 border-l-4 border-[#0052CC] pl-5">
              <h2
                className="font-[family-name:var(--font-montserrat)] font-700 text-[#0A0A0F] leading-[1.1] tracking-[-0.02em]"
                style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
              >
                Знания, которые
                <br />
                экономят ваши деньги
              </h2>
            </div>
          </div>
          <button className="font-[family-name:var(--font-montserrat)] text-sm font-600 text-[#0052CC] border border-[#0052CC] px-6 py-3 rounded-full hover:bg-[#0052CC] hover:text-white transition-all duration-300 self-start lg:self-auto shrink-0">
            Все материалы
          </button>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white border border-[#E8ECF0] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-[family-name:var(--font-montserrat)] text-[10px] font-600 tracking-wider uppercase text-[#0052CC] bg-[#0052CC]/8 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="font-[family-name:var(--font-inter)] text-[#8C9BAB] text-xs">
                    {post.readTime} чтения
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-montserrat)] font-600 text-[#0A0A0F] text-base leading-[1.4] mb-3 group-hover:text-[#0052CC] transition-colors">
                  {post.title}
                </h3>

                <p className="font-[family-name:var(--font-inter)] text-[#5A6472] text-sm leading-[1.6] mb-6">
                  {post.desc}
                </p>

                <div className="flex items-center gap-2 text-[#0052CC] font-[family-name:var(--font-montserrat)] text-sm font-600">
                  Читать статью
                  <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
