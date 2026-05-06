'use client';

import React from 'react';
import { Scissors, Smile, Package, CheckCircle2, Clock, Flame } from 'lucide-react';
import type { Service, Language } from './CustomerBookingClient';

const SERVICES: Service[] = [
  {
    id: 'service-haircut',
    name: 'Haircut',
    nameAr: 'قصة شعر',
    description: 'Classic or modern cut, wash & style included',
    descriptionAr: 'قصة كلاسيكية أو عصرية مع غسيل وتصفيف',
    price: 40,
    duration: 30,
    icon: 'scissors',
    popular: false,
  },
  {
    id: 'service-beard',
    name: 'Beard Trim',
    nameAr: 'تشذيب اللحية',
    description: 'Shape, line-up & hot towel finish',
    descriptionAr: 'تشكيل وتحديد مع فوطة ساخنة',
    price: 25,
    duration: 20,
    icon: 'smile',
    popular: false,
  },
  {
    id: 'service-full',
    name: 'Full Package',
    nameAr: 'الباقة الكاملة',
    description: 'Haircut + Beard + Scalp massage & styling',
    descriptionAr: 'قصة + لحية + مساج فروة الرأس وتصفيف',
    price: 60,
    duration: 60,
    icon: 'package',
    popular: true,
  },
];

const iconMap: Record<string, React.ReactNode> = {
  scissors: <Scissors size={22} />,
  smile: <Smile size={22} />,
  package: <Package size={22} />,
};

interface Props {
  lang: Language;
  t: Record<string, string>;
  isRtl: boolean;
  selected: Service | null;
  onSelect: (s: Service) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepSelectService({ lang, t, isRtl, selected, onSelect, onNext, onBack }: Props) {
  return (
    <div className="space-y-4">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-white">{t.selectService}</h2>
        <p className="text-sm mt-1" style={{ color: 'hsl(0 0% 50%)' }}>
          {lang === 'ar' ? 'اختر الخدمة التي تريدها' : 'Select the service you need'}
        </p>
      </div>

      <div className="space-y-3">
        {SERVICES.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelect(service)}
            className={`w-full text-left rounded-xl p-4 service-card-hover transition-all ${
              selected?.id === service.id ? 'service-card-selected' : ''
            }`}
            style={{
              background: selected?.id === service.id ? 'hsl(43 52% 54% / 0.08)' : 'hsl(0 0% 10%)',
              border: `1px solid ${selected?.id === service.id ? 'hsl(43 52% 54%)' : 'hsl(0 0% 18%)'}`,
            }}
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: selected?.id === service.id
                    ? 'linear-gradient(135deg, hsl(35 42% 42%), hsl(43 52% 54%))'
                    : 'hsl(0 0% 13%)',
                  color: selected?.id === service.id ? '#0f0f0f' : 'hsl(43 52% 54%)',
                }}
              >
                {iconMap[service.icon]}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-sm">
                    {lang === 'ar' ? service.nameAr : service.name}
                  </span>
                  {service.popular && (
                    <span
                      className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: 'hsl(38 92% 50% / 0.15)', color: 'hsl(38 92% 60%)' }}
                    >
                      <Flame size={10} />
                      {t.popular}
                    </span>
                  )}
                </div>
                <p className="text-xs mt-0.5" style={{ color: 'hsl(0 0% 45%)' }}>
                  {lang === 'ar' ? service.descriptionAr : service.description}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Clock size={11} style={{ color: 'hsl(0 0% 40%)' }} />
                  <span className="text-xs" style={{ color: 'hsl(0 0% 45%)' }}>
                    {service.duration} {t.min}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="font-bold text-lg font-tabular" style={{ color: 'hsl(43 62% 67%)' }}>
                  {service.price}
                </span>
                <span className="text-xs" style={{ color: 'hsl(0 0% 40%)' }}>{t.sar}</span>
                {selected?.id === service.id && (
                  <CheckCircle2 size={16} style={{ color: 'hsl(43 62% 67%)' }} />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Cash on Arrival Badge */}
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-xl"
        style={{ background: 'hsl(43 52% 54% / 0.08)', border: '1px solid hsl(43 52% 54% / 0.25)' }}
      >
        <span style={{ color: 'hsl(43 62% 67%)' }}>💵</span>
        <span className="text-xs font-medium" style={{ color: 'hsl(43 62% 67%)' }}>
          {t.cashOnArrival} — {lang === 'ar' ? 'لا يوجد دفع مسبق' : 'No prepayment required'}
        </span>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-xl text-sm font-semibold transition-all duration-150 hover:opacity-80 active:scale-95"
          style={{ background: 'hsl(0 0% 13%)', border: '1px solid hsl(0 0% 18%)', color: 'hsl(0 0% 70%)' }}
        >
          ← {t.back}
        </button>
        <button
          onClick={onNext}
          disabled={!selected}
          className="flex-[2] py-4 rounded-xl text-sm font-bold gold-btn"
        >
          {t.next} →
        </button>
      </div>
    </div>
  );
}