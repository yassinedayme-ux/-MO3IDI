'use client';

import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import DashboardHeader from './DashboardHeader';
import AvailabilityToggle from './AvailabilityToggle';
import DashboardStats from './DashboardStats';
import AppointmentTimeline from './AppointmentTimeline';
import WeeklyChart from './WeeklyChart';
import ServicesManager from './ServicesManager';

export type DashLang = 'en' | 'ar';

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  service: string;
  serviceAr: string;
  time: string;
  duration: number;
  price: number;
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
}

export interface AdminService {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  duration: number;
  active: boolean;
}

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'appt-001', customerName: 'Mohammed Al-Rashid', customerPhone: '+966 512 345 678', service: 'Full Package', serviceAr: 'الباقة الكاملة', time: '09:00 AM', duration: 60, price: 60, status: 'completed' },
  { id: 'appt-002', customerName: 'Abdullah Al-Otaibi', customerPhone: '+966 523 456 789', service: 'Haircut', serviceAr: 'قصة شعر', time: '10:30 AM', duration: 30, price: 40, status: 'completed' },
  { id: 'appt-003', customerName: 'Faisal Al-Ghamdi', customerPhone: '+966 534 567 890', service: 'Beard Trim', serviceAr: 'تشذيب اللحية', time: '11:30 AM', duration: 20, price: 25, status: 'in-progress' },
  { id: 'appt-004', customerName: 'Turki Al-Shammari', customerPhone: '+966 545 678 901', service: 'Haircut', serviceAr: 'قصة شعر', time: '12:30 PM', duration: 30, price: 40, status: 'upcoming' },
  { id: 'appt-005', customerName: 'Nasser Al-Dossary', customerPhone: '+966 556 789 012', service: 'Full Package', serviceAr: 'الباقة الكاملة', time: '02:00 PM', duration: 60, price: 60, status: 'upcoming' },
  { id: 'appt-006', customerName: 'Sultan Al-Harbi', customerPhone: '+966 567 890 123', service: 'Beard Trim', serviceAr: 'تشذيب اللحية', time: '03:30 PM', duration: 20, price: 25, status: 'upcoming' },
  { id: 'appt-007', customerName: 'Khaled Al-Mutairi', customerPhone: '+966 578 901 234', service: 'Haircut', serviceAr: 'قصة شعر', time: '04:30 PM', duration: 30, price: 40, status: 'upcoming' },
];

export const MOCK_SERVICES: AdminService[] = [
  { id: 'svc-001', name: 'Haircut', nameAr: 'قصة شعر', price: 40, duration: 30, active: true },
  { id: 'svc-002', name: 'Beard Trim', nameAr: 'تشذيب اللحية', price: 25, duration: 20, active: true },
  { id: 'svc-003', name: 'Full Package', nameAr: 'الباقة الكاملة', price: 60, duration: 60, active: true },
  { id: 'svc-004', name: 'Kids Cut', nameAr: 'قصة أطفال', price: 20, duration: 20, active: true },
  { id: 'svc-005', name: 'Hair Color', nameAr: 'صبغ الشعر', price: 80, duration: 90, active: false },
];

export default function BarberDashboardClient() {
  const [lang, setLang] = useState<DashLang>('en');
  const [isAvailable, setIsAvailable] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [services, setServices] = useState<AdminService[]>(MOCK_SERVICES);

  const isRtl = lang === 'ar';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen" style={{ background: '#0f0f0f' }}>
      <Toaster position="top-center" theme="dark" richColors />
      <DashboardHeader lang={lang} setLang={setLang} isRtl={isRtl} />

      <main className="max-w-screen-xl mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Availability Toggle — prominent at top */}
        <AvailabilityToggle
          isAvailable={isAvailable}
          setIsAvailable={setIsAvailable}
          isRtl={isRtl}
          lang={lang}
        />

        {/* Stats */}
        <DashboardStats appointments={appointments} isRtl={isRtl} lang={lang} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Appointments — takes 2/3 */}
          <div className="xl:col-span-2">
            <AppointmentTimeline
              appointments={appointments}
              setAppointments={setAppointments}
              isRtl={isRtl}
              lang={lang}
            />
          </div>
          {/* Weekly Chart — takes 1/3 */}
          <div>
            <WeeklyChart isRtl={isRtl} lang={lang} />
          </div>
        </div>

        {/* Services Manager */}
        <ServicesManager
          services={services}
          setServices={setServices}
          isRtl={isRtl}
          lang={lang}
        />
      </main>
    </div>
  );
}