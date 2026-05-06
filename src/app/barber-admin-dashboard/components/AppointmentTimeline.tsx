'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Phone, CheckCircle2, XCircle, Clock, Scissors, ChevronDown } from 'lucide-react';
import type { Appointment, DashLang } from './BarberDashboardClient';

interface Props {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  isRtl: boolean;
  lang: DashLang;
}

const statusConfig = {
  upcoming: { label: 'Upcoming', labelAr: 'قادم', color: 'hsl(217 91% 60%)', bg: 'hsl(217 91% 60% / 0.12)' },
  'in-progress': { label: 'In Progress', labelAr: 'جارٍ', color: 'hsl(43 62% 67%)', bg: 'hsl(43 52% 54% / 0.12)' },
  completed: { label: 'Completed', labelAr: 'مكتمل', color: 'hsl(158 64% 50%)', bg: 'hsl(158 64% 40% / 0.12)' },
  cancelled: { label: 'Cancelled', labelAr: 'ملغى', color: 'hsl(0 72% 60%)', bg: 'hsl(0 72% 51% / 0.12)' },
};

export default function AppointmentTimeline({ appointments, setAppointments, isRtl, lang }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const updateStatus = (id: string, status: Appointment['status']) => {
    // Backend integration: PATCH /api/appointments/:id/status
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    toast.success(
      lang === 'ar' ?'تم تحديث حالة الموعد'
        : `Appointment marked as ${status}`
    );
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 18%)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid hsl(0 0% 18%)' }}>
        <div className="flex items-center gap-2">
          <Scissors size={16} style={{ color: 'hsl(43 52% 54%)' }} />
          <span className="font-semibold text-white text-sm">
            {lang === 'ar' ? 'مواعيد اليوم' : "Today's Appointments"}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-bold font-tabular"
            style={{ background: 'hsl(43 52% 54% / 0.15)', color: 'hsl(43 62% 67%)' }}
          >
            {appointments.length}
          </span>
        </div>
        <span className="text-xs" style={{ color: 'hsl(0 0% 40%)' }}>
          {lang === 'ar' ? 'الأحد ١٢ أبريل' : 'Sun, Apr 12'}
        </span>
      </div>

      {/* List */}
      <div className="divide-y" style={{ borderColor: 'hsl(0 0% 15%)' }}>
        {appointments.map((appt) => {
          const sc = statusConfig[appt.status];
          const isExpanded = expandedId === appt.id;

          return (
            <div
              key={appt.id}
              className="transition-all duration-200"
              style={{ background: appt.status === 'in-progress' ? 'hsl(43 52% 54% / 0.04)' : 'transparent' }}
            >
              {/* Main Row */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : appt.id)}
                className="w-full text-left px-5 py-4 flex items-center gap-3 hover:bg-white/[0.02] transition-colors"
              >
                {/* Time */}
                <div className="w-16 flex-shrink-0">
                  <p className="text-xs font-bold font-tabular text-white">{appt.time}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'hsl(0 0% 40%)' }}>{appt.duration}m</p>
                </div>

                {/* Timeline dot */}
                <div className="relative flex-shrink-0 flex flex-col items-center">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: sc.color, boxShadow: appt.status === 'in-progress' ? `0 0 8px ${sc.color}` : 'none' }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{appt.customerName}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'hsl(0 0% 45%)' }}>
                    {lang === 'ar' ? appt.serviceAr : appt.service}
                  </p>
                </div>

                {/* Price */}
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold font-tabular" style={{ color: 'hsl(43 62% 67%)' }}>{appt.price} SAR</p>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: sc.bg, color: sc.color }}
                  >
                    {lang === 'ar' ? sc.labelAr : sc.label}
                  </span>
                </div>

                <ChevronDown
                  size={14}
                  style={{
                    color: 'hsl(0 0% 40%)',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </button>

              {/* Expanded Actions */}
              {isExpanded && (
                <div
                  className="px-5 pb-4 flex items-center gap-2 flex-wrap animate-fade-in"
                  style={{ borderTop: '1px solid hsl(0 0% 14%)' }}
                >
                  <div className="flex items-center gap-1.5 flex-1 min-w-0 pt-3">
                    <Phone size={12} style={{ color: 'hsl(0 0% 40%)' }} />
                    <span className="text-xs font-tabular" style={{ color: 'hsl(0 0% 55%)' }}>
                      {appt.customerPhone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-3">
                    {appt.status !== 'completed' && appt.status !== 'cancelled' && (
                      <button
                        onClick={() => updateStatus(appt.id, 'completed')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 hover:opacity-80 active:scale-95"
                        style={{ background: 'hsl(158 64% 40% / 0.15)', color: 'hsl(158 64% 50%)', border: '1px solid hsl(158 64% 40% / 0.3)' }}
                      >
                        <CheckCircle2 size={12} />
                        {lang === 'ar' ? 'مكتمل' : 'Complete'}
                      </button>
                    )}
                    {appt.status === 'upcoming' && (
                      <button
                        onClick={() => updateStatus(appt.id, 'in-progress')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 hover:opacity-80 active:scale-95"
                        style={{ background: 'hsl(43 52% 54% / 0.15)', color: 'hsl(43 62% 67%)', border: '1px solid hsl(43 52% 54% / 0.3)' }}
                      >
                        <Clock size={12} />
                        {lang === 'ar' ? 'ابدأ' : 'Start'}
                      </button>
                    )}
                    {appt.status !== 'completed' && appt.status !== 'cancelled' && (
                      <button
                        onClick={() => updateStatus(appt.id, 'cancelled')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 hover:opacity-80 active:scale-95"
                        style={{ background: 'hsl(0 72% 51% / 0.12)', color: 'hsl(0 72% 60%)', border: '1px solid hsl(0 72% 51% / 0.25)' }}
                      >
                        <XCircle size={12} />
                        {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {appointments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 space-y-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'hsl(0 0% 13%)', border: '1px solid hsl(0 0% 18%)' }}
          >
            <Scissors size={24} style={{ color: 'hsl(0 0% 35%)' }} />
          </div>
          <p className="text-sm font-semibold" style={{ color: 'hsl(0 0% 50%)' }}>
            {lang === 'ar' ? 'لا توجد مواعيد اليوم' : 'No appointments today'}
          </p>
          <p className="text-xs text-center max-w-xs" style={{ color: 'hsl(0 0% 35%)' }}>
            {lang === 'ar' ? 'شارك رابط حجزك مع عملائك' : 'Share your booking link with customers'}
          </p>
        </div>
      )}
    </div>
  );
}