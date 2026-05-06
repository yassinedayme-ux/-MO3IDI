'use client';

import React, { useState } from 'react';
import { Toaster } from 'sonner';
import BookingHeader from './BookingHeader';
import StepProgress from './StepProgress';
import StepSelectBarber from './StepSelectBarber';
import StepSelectService from './StepSelectService';
import StepSelectTime from './StepSelectTime';
import StepBookingForm from './StepBookingForm';
import BookingConfirmed from './BookingConfirmed';

export type Language = 'en' | 'ar';

export interface Barber {
  id: string;
  name: string;
  nameAr: string;
  specialty: string;
  specialtyAr: string;
  rating: number;
  reviewCount: number;
  distance: string;
  distanceAr: string;
  available: boolean;
  waitTime: string;
  waitTimeAr: string;
  photo: string;
  photoAlt: string;
  shopName: string;
  shopNameAr: string;
  phone: string;
}

export interface Service {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  duration: number;
  icon: string;
  popular?: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  time24: string;
  available: boolean;
}

export interface BookingData {
  barber: Barber | null;
  service: Service | null;
  timeSlot: TimeSlot | null;
  customerName: string;
  customerPhone: string;
}

export const translations = {
  en: {
    appName: 'Mo3idi',
    tagline: 'Your appointment, your style',
    findBarbers: 'Nearby Barbers',
    location: 'Riyadh, Al Olaya',
    step1: 'Barber',
    step2: 'Service',
    step3: 'Time',
    step4: 'Book',
    next: 'Next',
    back: 'Back',
    bookNow: 'Book Now',
    confirmWhatsApp: 'Confirm via WhatsApp',
    cashOnArrival: 'Cash on Arrival',
    available: 'Available',
    busy: 'Busy',
    min: 'min',
    sar: 'SAR',
    rating: 'Rating',
    reviews: 'reviews',
    away: 'away',
    waitTime: 'Wait',
    selectBarber: 'Choose Your Barber',
    selectService: 'Choose Your Service',
    selectTime: 'Choose Your Time',
    fillDetails: 'Your Details',
    yourName: 'Full Name',
    yourPhone: 'Phone Number',
    namePlaceholder: 'e.g. Mohammed Al-Rashid',
    phonePlaceholder: '+966 5X XXX XXXX',
    nameRequired: 'Name is required',
    phoneRequired: 'Phone number is required',
    phoneInvalid: 'Enter a valid phone number',
    bookingFor: 'Booking for',
    service: 'Service',
    time: 'Time',
    total: 'Total',
    bookingConfirmed: 'Booking Confirmed!',
    confirmationSent: 'Your booking details have been sent to the barber.',
    newBooking: 'Make Another Booking',
    popular: 'Popular',
    today: 'Today',
    tomorrow: 'Tomorrow',
    noSlots: 'No available slots',
    selectAll: 'Please complete all steps',
    duration: 'Duration',
  },
  ar: {
    appName: 'موعدي',
    tagline: 'موعدك، أسلوبك',
    findBarbers: 'حلاقون قريبون',
    location: 'الرياض، العليا',
    step1: 'الحلاق',
    step2: 'الخدمة',
    step3: 'الوقت',
    step4: 'الحجز',
    next: 'التالي',
    back: 'رجوع',
    bookNow: 'احجز الآن',
    confirmWhatsApp: 'تأكيد عبر واتساب',
    cashOnArrival: 'الدفع عند الوصول',
    available: 'متاح',
    busy: 'مشغول',
    min: 'دقيقة',
    sar: 'ريال',
    rating: 'التقييم',
    reviews: 'تقييم',
    away: 'بعيد',
    waitTime: 'انتظار',
    selectBarber: 'اختر حلاقك',
    selectService: 'اختر خدمتك',
    selectTime: 'اختر وقتك',
    fillDetails: 'بياناتك',
    yourName: 'الاسم الكامل',
    yourPhone: 'رقم الجوال',
    namePlaceholder: 'مثال: محمد الراشد',
    phonePlaceholder: '+966 5X XXX XXXX',
    nameRequired: 'الاسم مطلوب',
    phoneRequired: 'رقم الجوال مطلوب',
    phoneInvalid: 'أدخل رقم جوال صحيح',
    bookingFor: 'الحجز لـ',
    service: 'الخدمة',
    time: 'الوقت',
    total: 'الإجمالي',
    bookingConfirmed: 'تم تأكيد الحجز!',
    confirmationSent: 'تم إرسال تفاصيل حجزك إلى الحلاق.',
    newBooking: 'حجز جديد',
    popular: 'الأكثر طلباً',
    today: 'اليوم',
    tomorrow: 'غداً',
    noSlots: 'لا توجد أوقات متاحة',
    selectAll: 'يرجى إكمال جميع الخطوات',
    duration: 'المدة',
  },
};

export default function CustomerBookingClient() {
  const [lang, setLang] = useState<Language>('en');
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingData>({
    barber: null,
    service: null,
    timeSlot: null,
    customerName: '',
    customerPhone: '',
  });
  const [confirmed, setConfirmed] = useState(false);

  const t = translations[lang];
  const isRtl = lang === 'ar';

  const handleConfirmed = (name: string, phone: string) => {
    setBooking(prev => ({ ...prev, customerName: name, customerPhone: phone }));
    setConfirmed(true);
  };

  const handleReset = () => {
    setBooking({ barber: null, service: null, timeSlot: null, customerName: '', customerPhone: '' });
    setStep(1);
    setConfirmed(false);
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen" style={{ background: '#0f0f0f' }}>
      <Toaster position="top-center" theme="dark" richColors />
      <BookingHeader lang={lang} setLang={setLang} t={t} />

      <main className="max-w-2xl mx-auto px-4 pb-16 pt-2">
        {confirmed ? (
          <div className="animate-slide-up">
            <BookingConfirmed booking={booking} t={t} isRtl={isRtl} onReset={handleReset} />
          </div>
        ) : (
          <>
            <StepProgress step={step} t={t} isRtl={isRtl} />
            <div className="animate-fade-in">
              {step === 1 && (
                <StepSelectBarber
                  lang={lang}
                  t={t}
                  isRtl={isRtl}
                  selected={booking.barber}
                  onSelect={(barber) => setBooking(prev => ({ ...prev, barber, service: null, timeSlot: null }))}
                  onNext={() => setStep(2)}
                />
              )}
              {step === 2 && (
                <StepSelectService
                  lang={lang}
                  t={t}
                  isRtl={isRtl}
                  selected={booking.service}
                  onSelect={(service) => setBooking(prev => ({ ...prev, service, timeSlot: null }))}
                  onNext={() => setStep(3)}
                  onBack={() => setStep(1)}
                />
              )}
              {step === 3 && (
                <StepSelectTime
                  t={t}
                  isRtl={isRtl}
                  selected={booking.timeSlot}
                  onSelect={(timeSlot) => setBooking(prev => ({ ...prev, timeSlot }))}
                  onNext={() => setStep(4)}
                  onBack={() => setStep(2)}
                />
              )}
              {step === 4 && (
                <StepBookingForm
                  booking={booking}
                  t={t}
                  isRtl={isRtl}
                  onBack={() => setStep(3)}
                  onConfirmed={handleConfirmed}
                />
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}