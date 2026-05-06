'use client';

import React from 'react';
import { Scissors, Star, MapPin, Clock } from 'lucide-react';
import type { AuthLang } from './AuthClient';

interface Props {
  lang: AuthLang;
  isRtl: boolean;
}

const testimonials = [
  {
    id: 'test-001',
    name: 'Mohammed Al-Rashid',
    nameAr: 'محمد الراشد',
    text: 'Booking my weekly cut takes less than 30 seconds now.',
    textAr: 'حجز موعدي الأسبوعي أصبح أقل من ٣٠ ثانية.',
    rating: 5,
    location: 'Riyadh',
    locationAr: 'الرياض',
  },
  {
    id: 'test-002',
    name: 'Abdullah Al-Harbi',
    nameAr: 'عبدالله الحربي',
    text: 'My clients love the WhatsApp confirmation. No more no-shows.',
    textAr: 'عملائي يحبون تأكيد الواتساب. لا غياب بعد الآن.',
    rating: 5,
    location: 'Jeddah',
    locationAr: 'جدة',
  },
];

export default function AuthBrand({ lang, isRtl }: Props) {
  return (
    <div
      className="relative w-full flex flex-col justify-between p-10 xl:p-14 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, hsl(0 0% 8%) 0%, hsl(0 0% 5%) 100%)',
        borderRight: '1px solid hsl(0 0% 15%)',
      }}
    >
      {/* Background decorative elements */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10"
        style={{ background: 'hsl(43 52% 54%)', transform: 'translate(30%, -30%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-8"
        style={{ background: 'hsl(43 52% 54%)', transform: 'translate(-30%, 30%)' }}
      />

      {/* Logo */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-12">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, hsl(35 42% 42%), hsl(43 62% 67%))' }}
          >
            <Scissors size={22} className="text-black" />
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: 'hsl(43 62% 67%)' }}>
              {lang === 'ar' ? 'موعدي' : 'Mo3idi'}
            </p>
            <p className="text-xs" style={{ color: 'hsl(0 0% 45%)' }}>
              {lang === 'ar' ? 'منصة حجز الحلاقين' : 'Barber Booking Platform'}
            </p>
          </div>
        </div>

        {/* Hero copy */}
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl xl:text-5xl font-bold leading-tight text-white">
            {lang === 'ar' ? (
              <>
                احجز موعدك<br />
                <span style={{ color: 'hsl(43 62% 67%)' }}>في ثوانٍ</span>
              </>
            ) : (
              <>
                Book Your Cut<br />
                <span style={{ color: 'hsl(43 62% 67%)' }}>In Seconds</span>
              </>
            )}
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'hsl(0 0% 55%)' }}>
            {lang === 'ar' ?'اكتشف أفضل الحلاقين القريبين منك، اختر خدمتك، وأكد موعدك عبر واتساب.' :'Discover top barbers near you, pick your service, and confirm your appointment via WhatsApp.'}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { value: '2,400+', valueAr: '+٢٤٠٠', label: 'Bookings', labelAr: 'حجز' },
            { value: '140+', valueAr: '+١٤٠', label: 'Barbers', labelAr: 'حلاق' },
            { value: '4.9★', valueAr: '٤.٩★', label: 'Avg Rating', labelAr: 'تقييم' },
          ].map((stat) => (
            <div
              key={`stat-${stat.label}`}
              className="rounded-xl p-4 text-center"
              style={{ background: 'hsl(43 52% 54% / 0.08)', border: '1px solid hsl(43 52% 54% / 0.2)' }}
            >
              <p className="text-xl font-bold font-tabular" style={{ color: 'hsl(43 62% 67%)' }}>
                {lang === 'ar' ? stat.valueAr : stat.value}
              </p>
              <p className="text-xs mt-1" style={{ color: 'hsl(0 0% 50%)' }}>
                {lang === 'ar' ? stat.labelAr : stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="relative z-10 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'hsl(0 0% 40%)' }}>
          {lang === 'ar' ? 'ماذا يقول عملاؤنا' : 'What our users say'}
        </p>
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="rounded-xl p-4"
            style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 17%)' }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm"
                style={{ background: 'hsl(43 52% 54% / 0.2)', color: 'hsl(43 62% 67%)' }}
              >
                {(lang === 'ar' ? t.nameAr : t.name).charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-white truncate">
                    {lang === 'ar' ? t.nameAr : t.name}
                  </p>
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={`star-${t.id}-${i}`} size={10} fill="hsl(43 62% 67%)" style={{ color: 'hsl(43 62% 67%)' }} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={9} style={{ color: 'hsl(0 0% 40%)' }} />
                  <span className="text-xs" style={{ color: 'hsl(0 0% 40%)' }}>
                    {lang === 'ar' ? t.locationAr : t.location}
                  </span>
                </div>
                <p className="text-xs mt-1.5 leading-relaxed" style={{ color: 'hsl(0 0% 60%)' }}>
                  "{lang === 'ar' ? t.textAr : t.text}"
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Live indicator */}
        <div className="flex items-center gap-2 pt-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs" style={{ color: 'hsl(0 0% 45%)' }}>
              {lang === 'ar' ? '٣٨ حلاق متاح الآن' : '38 barbers available now'}
            </span>
          </div>
          <span style={{ color: 'hsl(0 0% 30%)' }}>·</span>
          <div className="flex items-center gap-1.5">
            <Clock size={10} style={{ color: 'hsl(0 0% 40%)' }} />
            <span className="text-xs" style={{ color: 'hsl(0 0% 45%)' }}>
              {lang === 'ar' ? 'متوسط الانتظار ٨ دقائق' : 'Avg wait 8 min'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}