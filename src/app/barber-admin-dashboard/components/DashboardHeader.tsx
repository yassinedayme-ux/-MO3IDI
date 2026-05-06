'use client';

import React from 'react';
import { Scissors, Globe, Bell, LogOut } from 'lucide-react';
import Link from 'next/link';
import type { DashLang } from './BarberDashboardClient';

interface Props {
  lang: DashLang;
  setLang: (l: DashLang) => void;
  isRtl: boolean;
}

export default function DashboardHeader({ lang, setLang, isRtl }: Props) {
  const today = new Date();
  const dateStr = today.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-40 border-b" style={{ background: 'rgba(15,15,15,0.97)', backdropFilter: 'blur(12px)', borderColor: 'hsl(0 0% 18%)' }}>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Logo + Context */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(35 42% 42%), hsl(43 62% 67%))' }}>
            <Scissors size={18} className="text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base" style={{ color: 'hsl(43 62% 67%)' }}>
                {lang === 'ar' ? 'موعدي' : 'Mo3idi'}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: 'hsl(43 52% 54% / 0.15)', color: 'hsl(43 62% 67%)' }}
              >
                {lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
              </span>
            </div>
            <p className="text-xs" style={{ color: 'hsl(0 0% 45%)' }}>{dateStr}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <button
            className="relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150 hover:opacity-80 active:scale-95"
            style={{ background: 'hsl(0 0% 13%)', border: '1px solid hsl(0 0% 18%)' }}
          >
            <Bell size={16} style={{ color: 'hsl(0 0% 60%)' }} />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: 'hsl(0 72% 51%)' }}
            />
          </button>

          {/* Lang Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 hover:opacity-80 active:scale-95"
            style={{ background: 'hsl(0 0% 13%)', border: '1px solid hsl(0 0% 18%)', color: 'hsl(43 62% 67%)' }}
          >
            <Globe size={13} />
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>

          {/* Logout */}
          <Link
            href="/sign-up-login-screen"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 hover:opacity-80 active:scale-95"
            style={{ background: 'hsl(0 0% 13%)', border: '1px solid hsl(0 0% 18%)', color: 'hsl(0 0% 55%)' }}
          >
            <LogOut size={13} />
            {lang === 'ar' ? 'خروج' : 'Logout'}
          </Link>
        </div>
      </div>
    </header>
  );
}