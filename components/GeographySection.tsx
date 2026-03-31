"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("./WorldMap"), {
  ssr: false,
  loading: () => (
    <div className="bg-[#F8F8F8] rounded-2xl border border-[#E8ECF0] h-[400px] flex items-center justify-center">
      <div className="text-[#8C9BAB] font-[family-name:var(--font-montserrat)] text-sm tracking-widest uppercase">
        Загрузка карты...
      </div>
    </div>
  ),
});

const REGIONS = [
  { name: "Европа", count: "45 стран" },
  { name: "Азия", count: "52 страны" },
  { name: "Америка", count: "38 стран" },
  { name: "Африка и Океания", count: "45+ стран" },
];

export default function GeographySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="geography" className="py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-[family-name:var(--font-montserrat)] text-[11px] font-600 tracking-[0.15em] uppercase text-[#8C9BAB]">
            География
          </span>
          <div className="mt-4 border-l-4 border-[#0052CC] pl-5">
            <h2
              className="font-[family-name:var(--font-montserrat)] font-700 text-[#0A0A0F] leading-[1.1] tracking-[-0.02em]"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
            >
              180+ стран.
              <br />
              Каждый континент.
            </h2>
          </div>
          <p className="font-[family-name:var(--font-inter)] text-[#5A6472] text-base mt-6 max-w-lg leading-[1.7]">
            Мы доставляем грузы туда, куда другие не решаются. Собственные
            агенты в 24 ключевых странах.
          </p>
        </motion.div>

        {/* Map — only on client to avoid hydration mismatch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <WorldMap isInView={isInView} />
        </motion.div>

        {/* Regions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
        >
          {REGIONS.map((region) => (
            <div
              key={region.name}
              className="bg-[#F8F8F8] border border-[#E8ECF0] rounded-xl p-6 text-center"
            >
              <div
                className="font-[family-name:var(--font-montserrat)] font-700 text-2xl"
                style={{ color: "#B8960C" }}
              >
                {region.count}
              </div>
              <div className="font-[family-name:var(--font-montserrat)] font-600 text-[#0A0A0F] text-sm mt-2">
                {region.name}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
