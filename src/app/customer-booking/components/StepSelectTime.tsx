'use client';

import React, { useMemo } from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import type { TimeSlot } from './CustomerBookingClient';

// Backend integration: fetch real availability from barber's calendar API
function generateSlots(): TimeSlot[] {
  const now = new Date();
  const slots: TimeSlot[] = [];
  const bookedIndices = new Set([1, 3, 6, 8, 11, 14]);

  for (let i = 0; i < 16; i++) {
    const slotTime = new Date(now.getTime() + (i + 1) * 60 * 60 * 1000);
    const hours = slotTime.getHours();
    const minutes = '00';
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const h12 = hours % 12 || 12;
    const isToday = slotTime.getDate() === now.getDate();
    const dayLabel = isToday ? 'Today' : 'Tomorrow';

    slots.push({
      id: `slot-${i + 1}`,
      time: `${dayLabel} ${h12}:${minutes} ${ampm}`,
      time24: `${String(hours).padStart(2, '0')}:${minutes}`,
      available: !bookedIndices.has(i),
    });
  }
  return slots;
}

interface Props {
  t: Record<string, string>;
  isRtl: boolean;
  selected: TimeSlot | null;
  onSelect: (s: TimeSlot) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepSelectTime({ t, isRtl, selected, onSelect, onNext, onBack }: Props) {
  const slots = useMemo(() => generateSlots(), []);

  const todaySlots = slots.filter(s => s.time.startsWith('Today'));
  const tomorrowSlots = slots.filter(s => s.time.startsWith('Tomorrow'));

  return (
    <div className="space-y-4">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-white">{t.selectTime}</h2>
        <p className="text-sm mt-1" style={{ color: 'hsl(0 0% 50%)' }}>
          {isRtl ? 'اختر وقتاً مناسباً لك' : 'Pick a time that works for you'}
        </p>
      </div>

      {/* Today */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={14} style={{ color: 'hsl(43 52% 54%)' }} />
          <span className="text-sm font-semibold" style={{ color: 'hsl(43 62% 67%)' }}>{t.today}</span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'hsl(43 52% 54% / 0.12)', color: 'hsl(43 62% 67%)' }}>
            {todaySlots.filter(s => s.available).length} {isRtl ? 'متاح' : 'available'}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {todaySlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => slot.available && onSelect(slot)}
              disabled={!slot.available}
              className={`py-3 px-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                !slot.available
                  ? 'slot-booked'
                  : selected?.id === slot.id
                  ? 'slot-selected' :'slot-available'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="font-bold text-sm">
                  {slot.time.replace('Today ', '')}
                </span>
                {selected?.id === slot.id && <CheckCircle2 size={12} style={{ color: 'hsl(43 62% 67%)' }} />}
                {!slot.available && (
                  <span className="text-xs" style={{ color: 'hsl(0 0% 35%)' }}>
                    {isRtl ? 'محجوز' : 'Booked'}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tomorrow */}
      {tomorrowSlots.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={14} style={{ color: 'hsl(0 0% 40%)' }} />
            <span className="text-sm font-semibold" style={{ color: 'hsl(0 0% 60%)' }}>{t.tomorrow}</span>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'hsl(0 0% 13%)', color: 'hsl(0 0% 45%)' }}>
              {tomorrowSlots.filter(s => s.available).length} {isRtl ? 'متاح' : 'available'}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {tomorrowSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => slot.available && onSelect(slot)}
                disabled={!slot.available}
                className={`py-3 px-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  !slot.available
                    ? 'slot-booked'
                    : selected?.id === slot.id
                    ? 'slot-selected' :'slot-available'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="font-bold text-sm">
                    {slot.time.replace('Tomorrow ', '')}
                  </span>
                  {selected?.id === slot.id && <CheckCircle2 size={12} style={{ color: 'hsl(43 62% 67%)' }} />}
                  {!slot.available && (
                    <span className="text-xs" style={{ color: 'hsl(0 0% 35%)' }}>
                      {isRtl ? 'محجوز' : 'Booked'}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 py-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: 'hsl(0 0% 13%)', border: '1px solid hsl(43 52% 54%)' }} />
          <span className="text-xs" style={{ color: 'hsl(0 0% 50%)' }}>{isRtl ? 'متاح' : 'Available'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: 'hsl(43 52% 54% / 0.15)', border: '1px solid hsl(43 52% 54%)' }} />
          <span className="text-xs" style={{ color: 'hsl(0 0% 50%)' }}>{isRtl ? 'مختار' : 'Selected'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: 'hsl(0 0% 8%)', border: '1px solid hsl(0 0% 18%)' }} />
          <span className="text-xs" style={{ color: 'hsl(0 0% 50%)' }}>{isRtl ? 'محجوز' : 'Booked'}</span>
        </div>
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