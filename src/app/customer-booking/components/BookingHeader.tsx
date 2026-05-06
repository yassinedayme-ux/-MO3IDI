'use client';

import React from 'react';
import { MapPin, Scissors, Globe } from 'lucide-react';

import type { Language } from './CustomerBookingClient';

interface Props {
  lang: Language;
  setLang: (l: Language) => void;
  t: Record<string, string>;
}

export default function BookingHeader({ lang, setLang, t }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b" style={{ background: 'rgba(15,15,15,0.95)', backdropFilter: 'blur(12px)', borderColor: 'hsl(0 0% 18%)' }}>
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(35 42% 42%), hsl(43 62% 67%))' }}>
            <Scissors size={16} className="text-black" />
          </div>
          <span className="font-bold text-lg" style={{ color: 'hsl(43 62% 67%)' }}>
            {t.appName}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 flex-1 justify-center">
          <MapPin size={13} style={{ color: 'hsl(43 52% 54%)' }} />
          <span className="text-xs font-medium" style={{ color: 'hsl(0 0% 60%)' }}>{t.location}</span>
        </div>

        {/* Language Toggle */}
        <button
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 hover:scale-105 active:scale-95"
          style={{ background: 'hsl(0 0% 13%)', border: '1px solid hsl(0 0% 18%)', color: 'hsl(43 62% 67%)' }}
        >
          <Globe size={13} />
          {lang === 'en' ? 'عربي' : 'EN'}
        </button>
      </div>
    </header>
  );
}