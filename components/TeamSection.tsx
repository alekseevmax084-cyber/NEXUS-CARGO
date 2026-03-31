"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Link2 } from "lucide-react";

const TEAM = [
  {
    name: "Андрей Волков",
    role: "Генеральный директор",
    bio: "20 лет в международной логистике. Ранее — вице-президент крупнейшего европейского экспедитора. Под его руководством компания выросла с 3 до 847 сотрудников.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&q=80",
  },
  {
    name: "Елена Краснова",
    role: "Директор по операциям",
    bio: "Эксперт в мультимодальных перевозках. Выстроила операционную систему компании с нуля. Сертификат CIPS, 15 лет опыта.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&q=80",
  },
  {
    name: "Михаил Чен",
    role: "Директор по развитию (Азия)",
    bio: "Руководит офисами в Китае, Японии и Сингапуре. Носитель китайского языка. Построил партнёрскую сеть из 200+ агентов в Азии.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&q=80",
  },
  {
    name: "Ирина Соколова",
    role: "Финансовый директор",
    bio: "CFA charterholder. Управляет финансами холдинга с оборотом 8 млрд рублей. Привлекла стратегическое финансирование для расширения в 2021 году.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&q=80",
  },
];

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="team" className="py-32 bg-[#F8F8F8]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-[family-name:var(--font-montserrat)] text-[11px] font-600 tracking-[0.15em] uppercase text-[#8C9BAB]">
            Команда
          </span>
          <div className="mt-4 border-l-4 border-[#0052CC] pl-5">
            <h2
              className="font-[family-name:var(--font-montserrat)] font-700 text-[#0A0A0F] leading-[1.1] tracking-[-0.02em]"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
            >
              847 профессионалов.
              <br />
              Ваш груз в надёжных руках.
            </h2>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white border border-[#E8ECF0] rounded-2xl overflow-hidden group transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] relative"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
            >
              {/* Blue top accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#0052CC] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left z-10" />

              {/* Photo */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-[family-name:var(--font-montserrat)] font-600 text-[#0A0A0F] text-base">
                      {member.name}
                    </h3>
                    <div className="font-[family-name:var(--font-montserrat)] text-[11px] font-600 tracking-wider uppercase text-[#0052CC] mt-1">
                      {member.role}
                    </div>
                  </div>
                  <button className="text-[#C8D0D8] hover:text-[#0052CC] transition-colors mt-0.5 shrink-0">
                    <Link2 size={16} />
                  </button>
                </div>
                <p className="font-[family-name:var(--font-inter)] text-[#5A6472] text-sm leading-[1.6] mt-3">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
