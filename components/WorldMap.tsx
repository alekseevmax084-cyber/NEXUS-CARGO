"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const CITIES = [
  { name: "Москва", coords: [37.62, 55.75] as [number, number], routes: "СНГ, Европа, Азия" },
  { name: "Пекин", coords: [116.4, 39.9] as [number, number], routes: "Китай, Юго-Восточная Азия" },
  { name: "Шанхай", coords: [121.47, 31.23] as [number, number], routes: "Китай, Тихоокеанский регион" },
  { name: "Дубай", coords: [55.27, 25.2] as [number, number], routes: "Ближний Восток, Африка" },
  { name: "Франкфурт", coords: [8.68, 50.11] as [number, number], routes: "Европа, Западная Африка" },
  { name: "Лондон", coords: [-0.13, 51.51] as [number, number], routes: "UK, Северная Европа" },
  { name: "Нью-Йорк", coords: [-74.0, 40.71] as [number, number], routes: "США, Канада, Латинская Америка" },
  { name: "Сингапур", coords: [103.82, 1.35] as [number, number], routes: "АСЕАН, Австралия" },
  { name: "Токио", coords: [139.69, 35.68] as [number, number], routes: "Япония, Корея, Тихий океан" },
  { name: "Стамбул", coords: [28.98, 41.01] as [number, number], routes: "Турция, Восточная Европа" },
  { name: "Мумбаи", coords: [72.88, 19.07] as [number, number], routes: "Индия, Южная Азия" },
  { name: "Йоханнесбург", coords: [28.04, -26.2] as [number, number], routes: "Африка, Южная Африка" },
  { name: "Сан-Паулу", coords: [-46.63, -23.55] as [number, number], routes: "Бразилия, Латинская Америка" },
  { name: "Сидней", coords: [151.21, -33.87] as [number, number], routes: "Австралия, Океания" },
];

interface Props {
  isInView: boolean;
}

export default function WorldMap({ isInView }: Props) {
  const [tooltip, setTooltip] = useState<{
    name: string;
    routes: string;
    x: number;
    y: number;
  } | null>(null);

  return (
    <div className="relative bg-[#F8F8F8] rounded-2xl border border-[#E8ECF0] overflow-hidden"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
    >
      <ComposableMap
        projectionConfig={{ scale: 140, center: [20, 10] }}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#E8ECF0"
                stroke="#FFFFFF"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { fill: "#C8D0D8", outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {CITIES.map((city, i) => (
          <Marker
            key={city.name}
            coordinates={city.coords}
            onMouseEnter={(e) => {
              const rect = (
                e.currentTarget.closest("svg") as SVGElement
              )?.getBoundingClientRect();
              if (rect) {
                setTooltip({
                  name: city.name,
                  routes: city.routes,
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                });
              }
            }}
            onMouseLeave={() => setTooltip(null)}
          >
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
            >
              <circle r={8} fill="#0052CC" opacity={0.1} />
              <circle r={5} fill="#0052CC" opacity={0.2} />
              <circle r={3} fill="#0052CC" opacity={1} />
            </motion.g>
          </Marker>
        ))}
      </ComposableMap>

      {tooltip && (
        <div
          className="absolute pointer-events-none bg-[#0A0A0F] text-white rounded-xl px-4 py-3 shadow-xl z-10"
          style={{
            left: Math.min(tooltip.x + 12, 9999),
            top: tooltip.y - 60,
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
          }}
        >
          <div className="font-[family-name:var(--font-montserrat)] font-600 text-sm">
            {tooltip.name}
          </div>
          <div className="font-[family-name:var(--font-inter)] text-[#8C9BAB] text-xs mt-0.5">
            {tooltip.routes}
          </div>
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0A0A0F] rotate-45" />
        </div>
      )}
    </div>
  );
}
