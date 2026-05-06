'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { BarChart2 } from 'lucide-react';
import type { DashLang } from './BarberDashboardClient';

// Backend integration: GET /api/analytics/weekly-bookings
const weeklyData = [
  { day: 'Mon', dayAr: 'الإث', bookings: 5, revenue: 200 },
  { day: 'Tue', dayAr: 'الثل', bookings: 8, revenue: 340 },
  { day: 'Wed', dayAr: 'الأر', bookings: 6, revenue: 255 },
  { day: 'Thu', dayAr: 'الخم', bookings: 11, revenue: 470 },
  { day: 'Fri', dayAr: 'الجم', bookings: 14, revenue: 590 },
  { day: 'Sat', dayAr: 'السب', bookings: 12, revenue: 510 },
  { day: 'Sun', dayAr: 'الأح', bookings: 7, revenue: 285 },
];

const todayIndex = 6; // Sunday = today

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
  lang: DashLang;
}

function CustomTooltip({ active, payload, label, lang }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      className="rounded-xl px-3 py-2 text-xs shadow-xl"
      style={{ background: 'hsl(0 0% 15%)', border: '1px solid hsl(0 0% 22%)', color: 'white' }}
    >
      <p className="font-bold mb-1" style={{ color: 'hsl(43 62% 67%)' }}>{label}</p>
      <p>{lang === 'ar' ? 'الحجوزات' : 'Bookings'}: <span className="font-bold">{payload[0]?.value}</span></p>
    </div>
  );
}

interface Props {
  isRtl: boolean;
  lang: DashLang;
}

export default function WeeklyChart({ isRtl, lang }: Props) {
  const total = weeklyData.reduce((s, d) => s + d.bookings, 0);
  const peak = weeklyData.reduce((a, b) => a.bookings > b.bookings ? a : b);

  return (
    <div
      className="rounded-2xl p-5 h-full"
      style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 18%)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart2 size={15} style={{ color: 'hsl(43 52% 54%)' }} />
          <span className="font-semibold text-white text-sm">
            {lang === 'ar' ? 'حجوزات الأسبوع' : 'Weekly Bookings'}
          </span>
        </div>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-bold font-tabular"
          style={{ background: 'hsl(0 0% 15%)', color: 'hsl(0 0% 50%)' }}
        >
          {total} {lang === 'ar' ? 'حجز' : 'total'}
        </span>
      </div>

      {/* Mini stats */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 rounded-xl p-3 text-center" style={{ background: 'hsl(43 52% 54% / 0.08)', border: '1px solid hsl(43 52% 54% / 0.2)' }}>
          <p className="text-lg font-bold font-tabular" style={{ color: 'hsl(43 62% 67%)' }}>{peak.bookings}</p>
          <p className="text-xs mt-0.5" style={{ color: 'hsl(0 0% 45%)' }}>
            {lang === 'ar' ? 'الذروة' : 'Peak'} ({lang === 'ar' ? peak.dayAr : peak.day})
          </p>
        </div>
        <div className="flex-1 rounded-xl p-3 text-center" style={{ background: 'hsl(0 0% 13%)', border: '1px solid hsl(0 0% 18%)' }}>
          <p className="text-lg font-bold font-tabular text-white">{Math.round(total / 7)}</p>
          <p className="text-xs mt-0.5" style={{ color: 'hsl(0 0% 45%)' }}>
            {lang === 'ar' ? 'يومي' : 'Daily avg'}
          </p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid stroke="hsl(0 0% 16%)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey={lang === 'ar' ? 'dayAr' : 'day'}
            tick={{ fill: 'hsl(0 0% 40%)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'hsl(0 0% 40%)', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip lang={lang} />} cursor={{ fill: 'hsl(0 0% 15%)' }} />
          <Bar dataKey="bookings" radius={[4, 4, 0, 0]}>
            {weeklyData.map((entry, index) => (
              <Cell
                key={`cell-${entry.day}`}
                fill={index === todayIndex ? 'hsl(43 52% 54%)' : 'hsl(0 0% 22%)'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-center mt-1" style={{ color: 'hsl(0 0% 35%)' }}>
        <span style={{ color: 'hsl(43 62% 67%)' }}>■</span> {lang === 'ar' ? 'اليوم' : 'Today'}
      </p>
    </div>
  );
}