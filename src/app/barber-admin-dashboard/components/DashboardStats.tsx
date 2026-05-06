'use client';

import React from 'react';
import { CalendarCheck, Banknote, Clock, TrendingUp } from 'lucide-react';
import type { Appointment, DashLang } from './BarberDashboardClient';

interface Props {
  appointments: Appointment[];
  isRtl: boolean;
  lang: DashLang;
}

export default function DashboardStats({ appointments, isRtl, lang }: Props) {
  const total = appointments.length;
  const completed = appointments.filter(a => a.status === 'completed').length;
  const revenue = appointments
    .filter(a => a.status === 'completed' || a.status === 'in-progress')
    .reduce((sum, a) => sum + a.price, 0);
  const upcoming = appointments.filter(a => a.status === 'upcoming').length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      id: 'stat-total',
      label: lang === 'ar' ? 'حجوزات اليوم' : "Today\'s Bookings",
      value: total,
      suffix: '',
      icon: <CalendarCheck size={20} />,
      color: 'hsl(43 52% 54%)',
      bg: 'hsl(43 52% 54% / 0.1)',
      border: 'hsl(43 52% 54% / 0.3)',
      trend: '+2 vs yesterday',
      trendAr: '+٢ عن أمس',
      trendPositive: true,
    },
    {
      id: 'stat-revenue',
      label: lang === 'ar' ? 'الإيرادات' : 'Revenue',
      value: revenue,
      suffix: lang === 'ar' ? ' ر' : ' SAR',
      icon: <Banknote size={20} />,
      color: 'hsl(158 64% 50%)',
      bg: 'hsl(158 64% 40% / 0.1)',
      border: 'hsl(158 64% 40% / 0.3)',
      trend: '+SAR 25 vs avg',
      trendAr: '+٢٥ ر عن المتوسط',
      trendPositive: true,
    },
    {
      id: 'stat-upcoming',
      label: lang === 'ar' ? 'المواعيد القادمة' : 'Upcoming',
      value: upcoming,
      suffix: '',
      icon: <Clock size={20} />,
      color: 'hsl(217 91% 60%)',
      bg: 'hsl(217 91% 60% / 0.1)',
      border: 'hsl(217 91% 60% / 0.3)',
      trend: 'Next: 12:30 PM',
      trendAr: 'القادم: ١٢:٣٠ م',
      trendPositive: true,
    },
    {
      id: 'stat-rate',
      label: lang === 'ar' ? 'معدل الإنجاز' : 'Completion Rate',
      value: completionRate,
      suffix: '%',
      icon: <TrendingUp size={20} />,
      color: completionRate >= 80 ? 'hsl(158 64% 50%)' : 'hsl(38 92% 60%)',
      bg: completionRate >= 80 ? 'hsl(158 64% 40% / 0.1)' : 'hsl(38 92% 50% / 0.1)',
      border: completionRate >= 80 ? 'hsl(158 64% 40% / 0.3)' : 'hsl(38 92% 50% / 0.3)',
      trend: 'Good performance',
      trendAr: 'أداء جيد',
      trendPositive: completionRate >= 80,
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.id}
          className="rounded-2xl p-4 space-y-3"
          style={{ background: s.bg, border: `1px solid ${s.border}` }}
        >
          <div className="flex items-center justify-between">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `${s.bg}`, color: s.color, border: `1px solid ${s.border}` }}
            >
              {s.icon}
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold font-tabular text-white">
              {s.value}{s.suffix}
            </p>
            <p className="text-xs font-medium mt-0.5" style={{ color: 'hsl(0 0% 55%)' }}>{s.label}</p>
          </div>
          <p className="text-xs" style={{ color: s.trendPositive ? 'hsl(158 64% 50%)' : 'hsl(0 72% 60%)' }}>
            {isRtl ? s.trendAr : s.trend}
          </p>
        </div>
      ))}
    </div>
  );
}