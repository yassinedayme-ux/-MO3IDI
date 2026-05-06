'use client';

import React from 'react';
import { toast } from 'sonner';
import { Zap, ZapOff } from 'lucide-react';
import type { DashLang } from './BarberDashboardClient';

interface Props {
  isAvailable: boolean;
  setIsAvailable: (v: boolean) => void;
  isRtl: boolean;
  lang: DashLang;
}

export default function AvailabilityToggle({ isAvailable, setIsAvailable, isRtl, lang }: Props) {
  const handleToggle = () => {
    const next = !isAvailable;
    setIsAvailable(next);
    // Backend integration: PATCH /api/barbers/:id/availability { available: next }
    toast.success(
      lang === 'ar' ? next ?'أنت الآن متاح للحجوزات': 'تم تعيينك كمشغول' : next ?'You are now available for bookings' : 'Status set to Busy'
    );
  };

  return (
    <div
      className="flex items-center justify-between px-5 py-4 rounded-2xl"
      style={{
        background: isAvailable ? 'hsl(158 64% 40% / 0.1)' : 'hsl(0 72% 51% / 0.1)',
        border: `1px solid ${isAvailable ? 'hsl(158 64% 40% / 0.4)' : 'hsl(0 72% 51% / 0.4)'}`,
        transition: 'all 0.3s ease',
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: isAvailable ? 'hsl(158 64% 40% / 0.2)' : 'hsl(0 72% 51% / 0.2)',
          }}
        >
          {isAvailable
            ? <Zap size={18} style={{ color: 'hsl(158 64% 50%)' }} />
            : <ZapOff size={18} style={{ color: 'hsl(0 72% 60%)' }} />
          }
        </div>
        <div>
          <p className="font-bold text-white text-sm">
            {lang === 'ar' ? isAvailable ?'متاح للحجوزات': 'مشغول الآن' : isAvailable ?'Available for Bookings' : 'Currently Busy'
            }
          </p>
          <p className="text-xs" style={{ color: 'hsl(0 0% 50%)' }}>
            {lang === 'ar' ? isAvailable ?'العملاء يمكنهم حجز موعد معك': 'لن تظهر في نتائج البحث' : isAvailable ?'Customers can book appointments with you' : 'You won\'t appear in search results'
            }
          </p>
        </div>
      </div>

      {/* Toggle Switch */}
      <button
        onClick={handleToggle}
        className="relative w-14 h-7 rounded-full transition-all duration-300 flex-shrink-0 toggle-track"
        style={{
          background: isAvailable ? 'hsl(158 64% 40%)' : 'hsl(0 0% 25%)',
        }}
        role="switch"
        aria-checked={isAvailable}
      >
        <span
          className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md toggle-thumb"
          style={{
            left: isAvailable ? (isRtl ? '4px' : 'calc(100% - 24px)') : (isRtl ? 'calc(100% - 24px)' : '4px'),
          }}
        />
      </button>
    </div>
  );
}