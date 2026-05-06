'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { MessageCircle, User, Phone, Scissors, Clock, DollarSign, Loader2 } from 'lucide-react';
import type { BookingData } from './CustomerBookingClient';

interface FormValues {
  customerName: string;
  customerPhone: string;
}

interface Props {
  booking: BookingData;
  t: Record<string, string>;
  isRtl: boolean;
  onBack: () => void;
  onConfirmed: (name: string, phone: string) => void;
}

export default function StepBookingForm({ booking, t, isRtl, onBack, onConfirmed }: Props) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const buildWhatsAppMessage = (name: string, phone: string) => {
    const barberName = booking.barber?.name || '';
    const serviceName = booking.service?.name || '';
    const time = booking.timeSlot?.time || '';
    const price = booking.service?.price || 0;

    const msg = isRtl
      ? `مرحباً ${barberName}،\nأريد حجز موعد عبر تطبيق موعدي.\n\nالاسم: ${name}\nالجوال: ${phone}\nالخدمة: ${serviceName}\nالوقت: ${time}\nالسعر: ${price} ريال\n\nشكراً 🙏`
      : `Hello ${barberName},\nI'd like to book an appointment via Mo3idi.\n\nName: ${name}\nPhone: ${phone}\nService: ${serviceName}\nTime: ${time}\nPrice: ${price} SAR\n\nThank you 🙏`;

    return encodeURIComponent(msg);
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    // Backend integration: POST /api/bookings with booking data + customer info
    await new Promise(r => setTimeout(r, 1200));

    const barberPhone = booking.barber?.phone || '966512345678';
    const waMessage = buildWhatsAppMessage(data.customerName, data.customerPhone);
    const waUrl = `https://wa.me/${barberPhone}?text=${waMessage}`;

    // Save to localStorage
    const savedBookings = JSON.parse(localStorage.getItem('mo3idi_bookings') || '[]');
    savedBookings.push({
      id: `booking-${Date.now()}`,
      ...booking,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    });
    localStorage.setItem('mo3idi_bookings', JSON.stringify(savedBookings));

    setLoading(false);
    toast.success(isRtl ? 'تم الحجز! جاري فتح واتساب...' : 'Booking confirmed! Opening WhatsApp...');

    setTimeout(() => {
      window.open(waUrl, '_blank');
      onConfirmed(data.customerName, data.customerPhone);
    }, 800);
  };

  return (
    <div className="space-y-4">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-white">{t.fillDetails}</h2>
        <p className="text-sm mt-1" style={{ color: 'hsl(0 0% 50%)' }}>
          {isRtl ? 'أدخل بياناتك لتأكيد الحجز' : 'Enter your details to confirm the booking'}
        </p>
      </div>

      {/* Booking Summary */}
      <div className="rounded-xl p-4 space-y-3" style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 18%)' }}>
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'hsl(43 52% 54%)' }}>
          {isRtl ? 'ملخص الحجز' : 'Booking Summary'}
        </p>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User size={13} style={{ color: 'hsl(0 0% 40%)' }} />
              <span className="text-xs" style={{ color: 'hsl(0 0% 50%)' }}>{t.bookingFor}</span>
            </div>
            <span className="text-xs font-semibold text-white">{booking.barber?.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scissors size={13} style={{ color: 'hsl(0 0% 40%)' }} />
              <span className="text-xs" style={{ color: 'hsl(0 0% 50%)' }}>{t.service}</span>
            </div>
            <span className="text-xs font-semibold text-white">{booking.service?.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={13} style={{ color: 'hsl(0 0% 40%)' }} />
              <span className="text-xs" style={{ color: 'hsl(0 0% 50%)' }}>{t.time}</span>
            </div>
            <span className="text-xs font-semibold text-white">{booking.timeSlot?.time}</span>
          </div>
          <div className="h-px" style={{ background: 'hsl(0 0% 18%)' }} />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign size={13} style={{ color: 'hsl(43 52% 54%)' }} />
              <span className="text-xs font-semibold" style={{ color: 'hsl(43 52% 54%)' }}>{t.total}</span>
            </div>
            <span className="text-sm font-bold font-tabular" style={{ color: 'hsl(43 62% 67%)' }}>
              {booking.service?.price} {t.sar}
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-white flex items-center gap-1.5">
            <User size={13} style={{ color: 'hsl(43 52% 54%)' }} />
            {t.yourName}
          </label>
          <input
            {...register('customerName', { required: t.nameRequired })}
            type="text"
            placeholder={t.namePlaceholder}
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-opacity-40 outline-none transition-all duration-150 focus:ring-2"
            style={{
              background: 'hsl(0 0% 10%)',
              border: errors.customerName ? '1px solid hsl(0 72% 51%)' : '1px solid hsl(0 0% 18%)',
              color: 'white',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'hsl(43 52% 54%)'; e.currentTarget.style.boxShadow = '0 0 0 2px hsl(43 52% 54% / 0.15)'; }}
            onBlur={e => { if (!errors.customerName) { e.currentTarget.style.borderColor = 'hsl(0 0% 18%)'; e.currentTarget.style.boxShadow = 'none'; } }}
          />
          {errors.customerName && (
            <p className="text-xs" style={{ color: 'hsl(0 72% 60%)' }}>{errors.customerName.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-white flex items-center gap-1.5">
            <Phone size={13} style={{ color: 'hsl(43 52% 54%)' }} />
            {t.yourPhone}
          </label>
          <input
            {...register('customerPhone', {
              required: t.phoneRequired,
              pattern: { value: /^[+\d\s()-]{9,16}$/, message: t.phoneInvalid },
            })}
            type="tel"
            placeholder={t.phonePlaceholder}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-150"
            style={{
              background: 'hsl(0 0% 10%)',
              border: errors.customerPhone ? '1px solid hsl(0 72% 51%)' : '1px solid hsl(0 0% 18%)',
              color: 'white',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'hsl(43 52% 54%)'; e.currentTarget.style.boxShadow = '0 0 0 2px hsl(43 52% 54% / 0.15)'; }}
            onBlur={e => { if (!errors.customerPhone) { e.currentTarget.style.borderColor = 'hsl(0 0% 18%)'; e.currentTarget.style.boxShadow = 'none'; } }}
          />
          {errors.customerPhone && (
            <p className="text-xs" style={{ color: 'hsl(0 72% 60%)' }}>{errors.customerPhone.message}</p>
          )}
        </div>

        {/* WhatsApp Note */}
        <div
          className="flex items-start gap-3 px-4 py-3 rounded-xl"
          style={{ background: 'hsl(120 40% 20% / 0.15)', border: '1px solid hsl(120 40% 30% / 0.3)' }}
        >
          <MessageCircle size={16} style={{ color: '#25d366', flexShrink: 0, marginTop: 1 }} />
          <p className="text-xs leading-relaxed" style={{ color: 'hsl(0 0% 60%)' }}>
            {isRtl
              ? 'سيتم فتح واتساب مع رسالة تأكيد جاهزة للإرسال إلى الحلاق' :'WhatsApp will open with a pre-filled confirmation message ready to send to the barber'}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="flex-1 py-4 rounded-xl text-sm font-semibold transition-all duration-150 hover:opacity-80 active:scale-95 disabled:opacity-40"
            style={{ background: 'hsl(0 0% 13%)', border: '1px solid hsl(0 0% 18%)', color: 'hsl(0 0% 70%)' }}
          >
            ← {t.back}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-[2] py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 whatsapp-btn text-white"
            style={{ minWidth: 0 }}
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> {isRtl ? 'جاري...' : 'Sending...'}</>
            ) : (
              <><MessageCircle size={16} /> {t.confirmWhatsApp}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}