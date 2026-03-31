"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SERVICES = [
  {
    icon: "✈️",
    title: "Авиаперевозки",
    desc: "Срочная доставка грузов по всему миру. Собственные агентские соглашения с 40 авиакомпаниями. Консолидация сборных грузов.",
    time: "Сроки: 1–5 рабочих дней",
    tags: ["Отслеживание 24/7", "Страхование", "Таможня"],
  },
  {
    icon: "🚢",
    title: "Морские перевозки",
    desc: "FCL и LCL перевозки из всех ключевых портов мира. Работаем с Maersk, MSC, CMA CGM. Еженедельные отправки из Китая, Европы, США.",
    time: "Сроки: 15–45 дней",
    tags: ["Крупный габарит", "Опасные грузы", "Рефрижератор"],
  },
  {
    icon: "🚛",
    title: "Автоперевозки",
    desc: "Сборные и полные загрузки по России и СНГ. Собственный парк 120+ единиц техники. Тентованные, рефрижераторные, негабаритные.",
    time: "Сроки: 1–14 дней",
    tags: ["GPS-мониторинг", "Страхование", "Сопровождение"],
  },
  {
    icon: "🚂",
    title: "Железнодорожные",
    desc: "Контейнерные перевозки по маршруту Китай–Европа (новый Шёлковый путь). Сроки 12–18 дней против 30–40 морем. Оптимально для крупных партий.",
    time: "Сроки: 12–18 дней",
    tags: ["Стабильный транзит", "Цена/скорость", "Экология"],
  },
  {
    icon: "🏭",
    title: "Складская логистика",
    desc: "Ответственное хранение, кросс-докинг, фулфилмент. Собственные склады класса А: 45 000 м² в 3 городах. WMS-система с онлайн-доступом клиента.",
    time: "45 000 м² · 3 города",
    tags: ["Класс А", "WMS", "Таможенный склад"],
  },
  {
    icon: "📋",
    title: "Таможенное оформление",
    desc: "Полный цикл таможенного оформления импорта и экспорта. 35 сертифицированных брокеров. Работаем со всеми таможенными режимами.",
    time: "Среднее время: 4 часа",
    tags: ["35 брокеров", "Все режимы", "Гарантия"],
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-32 bg-[#F8F8F8]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-[family-name:var(--font-montserrat)] text-[11px] font-600 tracking-[0.15em] uppercase text-[#8C9BAB]">
            Услуги
          </span>
          <div className="mt-4 border-l-4 border-[#0052CC] pl-5">
            <h2
              className="font-[family-name:var(--font-montserrat)] font-700 text-[#0A0A0F] leading-[1.1] tracking-[-0.02em]"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
            >
              Полный цикл логистики —
              <br />
              от двери до двери
            </h2>
          </div>
          <p className="font-[family-name:var(--font-inter)] text-[#5A6472] text-base mt-6 max-w-xl leading-[1.7]">
            Шесть направлений, одна точка контакта. Вам не нужно искать разных
            подрядчиков — мы закрываем всю цепочку поставок.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-white border border-[#E8ECF0] p-8 rounded-2xl group transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] relative overflow-hidden cursor-default"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
            >
              {/* Blue top accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#0052CC] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

              <div className="text-3xl mb-5">{service.icon}</div>

              <h3
                className="font-[family-name:var(--font-montserrat)] font-600 text-[#0A0A0F] text-lg mb-3"
              >
                {service.title}
              </h3>

              <p className="font-[family-name:var(--font-inter)] text-[#5A6472] text-sm leading-[1.7] mb-4">
                {service.desc}
              </p>

              <div className="font-[family-name:var(--font-montserrat)] text-[11px] font-600 tracking-[0.1em] uppercase text-[#0052CC] mb-5">
                {service.time}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-[family-name:var(--font-montserrat)] text-[10px] font-600 tracking-wider uppercase px-3 py-1 rounded-full bg-[#F8F8F8] text-[#8C9BAB] border border-[#E8ECF0]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 text-center"
        >
          <p className="font-[family-name:var(--font-inter)] text-[#8C9BAB] text-sm mb-5">
            Не уверены, какое направление подходит?
          </p>
          <button
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-[#0052CC] text-white px-8 py-4 rounded-full text-sm font-[family-name:var(--font-montserrat)] font-600 hover:bg-[#0A0A0F] transition-all duration-300"
          >
            Обсудить с менеджером
          </button>
        </motion.div>
      </div>
    </section>
  );
}
