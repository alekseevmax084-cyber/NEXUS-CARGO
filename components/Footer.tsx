import { Link2, Send, ExternalLink } from "lucide-react";

const LINKS = {
  Услуги: [
    "Авиаперевозки",
    "Морские перевозки",
    "Автоперевозки",
    "Железнодорожные",
    "Складская логистика",
    "Таможенное оформление",
  ],
  Компания: [
    "О компании",
    "Команда",
    "Карьера",
    "Партнёрам",
    "Новости",
    "Контакты",
  ],
  Ресурсы: [
    "Блог",
    "Калькулятор доставки",
    "Отслеживание груза",
    "Таможенный справочник",
    "FAQ",
    "API для бизнеса",
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0F] relative">
      {/* Blue top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#0052CC]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="font-[family-name:var(--font-montserrat)] font-700 text-white text-xl">
                NEXUS
              </span>
              <span className="font-[family-name:var(--font-montserrat)] font-700 text-[#0052CC] text-xl ml-1">
                CARGO
              </span>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[#5A6472] text-sm leading-[1.7] max-w-xs mb-6">
              «Надёжность измеряется не словами. Она измеряется доставленными
              грузами.»
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { icon: Link2, label: "LinkedIn" },
                { icon: Send, label: "Telegram" },
                { icon: ExternalLink, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#8C9BAB] hover:text-white hover:border-white/30 transition-all"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(LINKS).map(([category, items]) => (
              <div key={category}>
                <div className="font-[family-name:var(--font-montserrat)] text-[11px] font-600 tracking-[0.15em] uppercase text-[#8C9BAB] mb-4">
                  {category}
                </div>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item}>
                      <button className="font-[family-name:var(--font-inter)] text-[#5A6472] text-sm hover:text-white transition-colors text-left">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-inter)] text-[#5A6472] text-sm">
            © 2026 NEXUS CARGO. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <button className="font-[family-name:var(--font-inter)] text-[#5A6472] text-xs hover:text-white transition-colors">
              Политика конфиденциальности
            </button>
            <button className="font-[family-name:var(--font-inter)] text-[#5A6472] text-xs hover:text-white transition-colors">
              Пользовательское соглашение
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
