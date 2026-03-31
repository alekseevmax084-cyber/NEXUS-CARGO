"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

const OFFICES = [
  { city: "Шанхай", address: "Pudong District, Lu Jia Zui", phone: "+86 21 0000-0000" },
  { city: "Франкфурт", address: "Flughafen Frankfurt, Terminal B", phone: "+49 69 0000-0000" },
  { city: "Дубай", address: "JAFZA, Jebel Ali Free Zone", phone: "+971 4 000-0000" },
  { city: "Сингапур", address: "One Raffles Place, CBD", phone: "+65 6000-0000" },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    from: "",
    to: "",
    cargoType: "",
    weight: "",
    weightUnit: "кг",
    volume: "",
    volumeUnit: "м³",
    comment: "",
  });

  const required = ["company", "name", "phone", "email", "from", "to", "cargoType", "weight", "volume"];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    required.forEach((field) => {
      if (!form[field as keyof typeof form].trim()) {
        newErrors[field] = "Обязательное поле";
      }
    });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Введите корректный email";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const inputClass = (field: string) =>
    `w-full border rounded-xl px-4 py-3 text-sm font-[family-name:var(--font-inter)] text-[#0A0A0F] bg-[#F8F8F8] outline-none transition-all focus:border-[#0052CC] focus:bg-white ${
      errors[field] ? "border-red-400 bg-red-50" : "border-[#E8ECF0]"
    }`;

  return (
    <section id="contact" className="py-32 bg-[#F8F8F8]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-[family-name:var(--font-montserrat)] text-[11px] font-600 tracking-[0.15em] uppercase text-[#8C9BAB]">
            Связаться
          </span>
          <div className="mt-4 border-l-4 border-[#0052CC] pl-5">
            <h2
              className="font-[family-name:var(--font-montserrat)] font-700 text-[#0A0A0F] leading-[1.1] tracking-[-0.02em]"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
            >
              Рассчитайте стоимость
              <br />
              доставки за 15 минут
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-[#E8ECF0] rounded-2xl p-12 text-center"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="text-green-500" size={32} />
                  </motion.div>
                  <h3 className="font-[family-name:var(--font-montserrat)] font-700 text-[#0A0A0F] text-xl mb-3">
                    Заявка принята
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-[#5A6472] leading-[1.6]">
                    Менеджер свяжется с вами в течение
                    <span className="text-[#0052CC] font-500"> 15 минут</span>.
                    <br />
                    Мы проанализируем ваш запрос и предложим
                    оптимальное решение.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="bg-white border border-[#E8ECF0] rounded-2xl p-8 space-y-5"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                >
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-[family-name:var(--font-montserrat)] text-xs font-600 tracking-wider uppercase text-[#5A6472] mb-2">
                        Компания *
                      </label>
                      <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="ООО «Компания»"
                        className={inputClass("company")}
                      />
                      {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company}</p>}
                    </div>
                    <div>
                      <label className="block font-[family-name:var(--font-montserrat)] text-xs font-600 tracking-wider uppercase text-[#5A6472] mb-2">
                        Имя *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Иван Иванов"
                        className={inputClass("name")}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-[family-name:var(--font-montserrat)] text-xs font-600 tracking-wider uppercase text-[#5A6472] mb-2">
                        Телефон *
                      </label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+7 (495) 000-00-00"
                        className={inputClass("phone")}
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block font-[family-name:var(--font-montserrat)] text-xs font-600 tracking-wider uppercase text-[#5A6472] mb-2">
                        Email *
                      </label>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="ivan@company.ru"
                        className={inputClass("email")}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-[family-name:var(--font-montserrat)] text-xs font-600 tracking-wider uppercase text-[#5A6472] mb-2">
                        Откуда *
                      </label>
                      <input
                        name="from"
                        value={form.from}
                        onChange={handleChange}
                        placeholder="Шанхай, Китай"
                        className={inputClass("from")}
                      />
                      {errors.from && <p className="text-red-400 text-xs mt-1">{errors.from}</p>}
                    </div>
                    <div>
                      <label className="block font-[family-name:var(--font-montserrat)] text-xs font-600 tracking-wider uppercase text-[#5A6472] mb-2">
                        Куда *
                      </label>
                      <input
                        name="to"
                        value={form.to}
                        onChange={handleChange}
                        placeholder="Москва, Россия"
                        className={inputClass("to")}
                      />
                      {errors.to && <p className="text-red-400 text-xs mt-1">{errors.to}</p>}
                    </div>
                  </div>

                  {/* Cargo type */}
                  <div>
                    <label className="block font-[family-name:var(--font-montserrat)] text-xs font-600 tracking-wider uppercase text-[#5A6472] mb-2">
                      Тип перевозки *
                    </label>
                    <select
                      name="cargoType"
                      value={form.cargoType}
                      onChange={handleChange}
                      className={`${inputClass("cargoType")} cursor-pointer`}
                    >
                      <option value="">Выберите вид транспорта</option>
                      <option value="air">Авиаперевозка</option>
                      <option value="sea">Морская перевозка</option>
                      <option value="road">Автоперевозка</option>
                      <option value="rail">Железнодорожная</option>
                      <option value="warehouse">Складская логистика</option>
                    </select>
                    {errors.cargoType && <p className="text-red-400 text-xs mt-1">{errors.cargoType}</p>}
                  </div>

                  {/* Weight & Volume */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-[family-name:var(--font-montserrat)] text-xs font-600 tracking-wider uppercase text-[#5A6472] mb-2">
                        Вес груза *
                      </label>
                      <div className="flex gap-2">
                        <input
                          name="weight"
                          value={form.weight}
                          onChange={handleChange}
                          placeholder="1000"
                          className={`${inputClass("weight")} flex-1`}
                        />
                        <select
                          name="weightUnit"
                          value={form.weightUnit}
                          onChange={handleChange}
                          className="border border-[#E8ECF0] rounded-xl px-3 py-3 text-sm font-[family-name:var(--font-inter)] text-[#5A6472] bg-[#F8F8F8] outline-none focus:border-[#0052CC] cursor-pointer"
                        >
                          <option>кг</option>
                          <option>тонн</option>
                        </select>
                      </div>
                      {errors.weight && <p className="text-red-400 text-xs mt-1">{errors.weight}</p>}
                    </div>
                    <div>
                      <label className="block font-[family-name:var(--font-montserrat)] text-xs font-600 tracking-wider uppercase text-[#5A6472] mb-2">
                        Объём *
                      </label>
                      <div className="flex gap-2">
                        <input
                          name="volume"
                          value={form.volume}
                          onChange={handleChange}
                          placeholder="5"
                          className={`${inputClass("volume")} flex-1`}
                        />
                        <select
                          name="volumeUnit"
                          value={form.volumeUnit}
                          onChange={handleChange}
                          className="border border-[#E8ECF0] rounded-xl px-3 py-3 text-sm font-[family-name:var(--font-inter)] text-[#5A6472] bg-[#F8F8F8] outline-none focus:border-[#0052CC] cursor-pointer"
                        >
                          <option>м³</option>
                          <option>CBM</option>
                        </select>
                      </div>
                      {errors.volume && <p className="text-red-400 text-xs mt-1">{errors.volume}</p>}
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block font-[family-name:var(--font-montserrat)] text-xs font-600 tracking-wider uppercase text-[#5A6472] mb-2">
                      Комментарий
                    </label>
                    <textarea
                      name="comment"
                      value={form.comment}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Дополнительные требования, особенности груза..."
                      className="w-full border border-[#E8ECF0] rounded-xl px-4 py-3 text-sm font-[family-name:var(--font-inter)] text-[#0A0A0F] bg-[#F8F8F8] outline-none focus:border-[#0052CC] focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0052CC] text-white py-4 rounded-full font-[family-name:var(--font-montserrat)] font-600 text-sm hover:bg-[#0A0A0F] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,82,204,0.35)]"
                  >
                    Получить расчёт
                  </button>

                  <p className="text-center font-[family-name:var(--font-inter)] text-[#8C9BAB] text-xs">
                    Ответим в течение 15 минут в рабочее время
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contacts sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="space-y-6"
          >
            {/* Main office */}
            <div className="bg-white border border-[#E8ECF0] rounded-2xl p-7" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <div className="font-[family-name:var(--font-montserrat)] text-[11px] font-600 tracking-[0.15em] uppercase text-[#0052CC] mb-4">
                Москва · Головной офис
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={15} className="text-[#8C9BAB] mt-0.5 shrink-0" />
                  <span className="font-[family-name:var(--font-inter)] text-[#5A6472] text-sm">
                    ул. Профсоюзная, 65, офис 401
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={15} className="text-[#8C9BAB] shrink-0" />
                  <span className="font-[family-name:var(--font-inter)] text-[#0A0A0F] text-sm font-500">
                    +7 (495) 000-00-00
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={15} className="text-[#8C9BAB] shrink-0" />
                  <span className="font-[family-name:var(--font-inter)] text-[#0052CC] text-sm">
                    info@nexuscargo.ru
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={15} className="text-[#8C9BAB] shrink-0" />
                  <span className="font-[family-name:var(--font-inter)] text-[#5A6472] text-sm">
                    Пн–Пт 9:00–19:00
                  </span>
                </div>
              </div>
            </div>

            {/* Other offices */}
            <div>
              <div className="font-[family-name:var(--font-montserrat)] text-[11px] font-600 tracking-[0.15em] uppercase text-[#8C9BAB] mb-4">
                Зарубежные офисы
              </div>
              <div className="grid grid-cols-2 gap-3">
                {OFFICES.map((office) => (
                  <div
                    key={office.city}
                    className="bg-white border border-[#E8ECF0] rounded-xl p-4"
                    style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                  >
                    <div className="font-[family-name:var(--font-montserrat)] font-600 text-[#0A0A0F] text-sm mb-1">
                      {office.city}
                    </div>
                    <div className="font-[family-name:var(--font-inter)] text-[#8C9BAB] text-xs leading-[1.4] mb-2">
                      {office.address}
                    </div>
                    <div className="font-[family-name:var(--font-inter)] text-[#0052CC] text-xs">
                      {office.phone}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Promise */}
            <div className="bg-[#0052CC] rounded-2xl p-6 text-white">
              <div className="font-[family-name:var(--font-montserrat)] font-700 text-lg mb-2">
                Ответим за 15 минут
              </div>
              <p className="font-[family-name:var(--font-inter)] text-white/70 text-sm leading-[1.6]">
                В рабочее время наши менеджеры всегда на связи.
                Гарантируем ответ в течение 15 минут после получения заявки.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
