'use client';

import React from 'react';
import { CheckCircle2, MessageCircle, RefreshCw, Scissors } from 'lucide-react';
import type { BookingData } from './CustomerBookingClient';

interface Props {
  booking: BookingData;
  t: Record<string, string>;
  isRtl: boolean;
  onReset: () => void;
}

export default function BookingConfirmed({ booking, t, isRtl, onReset }: Props) {
  return (
    <div className="flex flex-col items-center text-center py-8 space-y-6">
      {/* Success Icon */}
      <div className="relative">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{ background: 'hsl(158 64% 40% / 0.15)', border: '2px solid hsl(158 64% 40% / 0.4)' }}
        >
          <CheckCircle2 size={44} style={{ color: 'hsl(158 64% 50%)' }} />
        </div>
        <div
          className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, hsl(35 42% 42%), hsl(43 52% 54%))' }}
        >
          <Scissors size={14} className="text-black" />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">{t.bookingConfirmed}</h2>
        <p className="text-sm" style={{ color: 'hsl(0 0% 55%)' }}>{t.confirmationSent}</p>
      </div>

      {/* Booking Details Card */}
      <div
        className="w-full rounded-2xl p-5 space-y-4 text-left"
        style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 18%)' }}
      >
        <div className="flex items-center gap-2 pb-3" style={{ borderBottom: '1px solid hsl(0 0% 18%)' }}>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, hsl(35 42% 42%), hsl(43 52% 54%))' }}
          >
            <Scissors size={14} className="text-black" />
          </div>
          <span className="font-bold text-white">{isRtl ? 'تفاصيل الحجز' : 'Appointment Details'}</span>
        </div>

        <div className="space-y-3">
          {[
            { label: isRtl ? 'الحلاق' : 'Barber', value: booking.barber?.name },
            { label: isRtl ? 'الصالون' : 'Shop', value: booking.barber?.shopName },
            { label: isRtl ? 'الخدمة' : 'Service', value: booking.service?.name },
            { label: isRtl ? 'الوقت' : 'Time', value: booking.timeSlot?.time },
            { label: isRtl ? 'الاسم' : 'Name', value: booking.customerName },
            { label: isRtl ? 'الجوال' : 'Phone', value: booking.customerPhone },
          ].map((row) => (
            <div key={`confirm-${row.label}`} className="flex items-center justify-between">
              <span className="text-xs" style={{ color: 'hsl(0 0% 45%)' }}>{row.label}</span>
              <span className="text-xs font-semibold text-white">{row.value}</span>
            </div>
          ))}
          <div className="pt-2 flex items-center justify-between" style={{ borderTop: '1px solid hsl(0 0% 18%)' }}>
            <span className="text-sm font-semibold" style={{ color: 'hsl(43 52% 54%)' }}>{t.total}</span>
            <span className="text-lg font-bold font-tabular" style={{ color: 'hsl(43 62% 67%)' }}>
              {booking.service?.price} {t.sar}
            </span>
          </div>
        </div>
      </div>

      {/* WhatsApp Reminder */}
      <div
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{ background: 'hsl(120 40% 20% / 0.12)', border: '1px solid hsl(120 40% 30% / 0.25)' }}
      >
        <MessageCircle size={18} style={{ color: '#25d366' }} />
        <p className="text-xs text-left" style={{ color: 'hsl(0 0% 60%)' }}>
          {isRtl
            ? 'تحقق من واتساب لتأكيد إرسال الرسالة إلى الحلاق' :'Check WhatsApp to confirm your message was sent to the barber'}
        </p>
      </div>

      {/* New Booking Button */}
      <button
        onClick={onReset}
        className="w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-150 hover:opacity-80 active:scale-95"
        style={{ background: 'hsl(0 0% 13%)', border: '1px solid hsl(0 0% 22%)', color: 'hsl(0 0% 70%)' }}
      >
        <RefreshCw size={15} />
        {t.newBooking}
      </button>
    </div>
  );
}