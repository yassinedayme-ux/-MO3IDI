'use client';

import React from 'react';
import { Star, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import type { Barber, Language } from './CustomerBookingClient';

const BARBERS: Barber[] = [
{
  id: 'barber-001',
  name: 'Ahmed Al-Qahtani',
  nameAr: 'أحمد القحطاني',
  specialty: 'Fade & Modern Cuts',
  specialtyAr: 'قصات فيد وعصرية',
  rating: 4.9,
  reviewCount: 312,
  distance: '0.3 km',
  distanceAr: '٣٠٠ م',
  available: true,
  waitTime: 'Now',
  waitTimeAr: 'الآن',
  photo: "https://img.rocket.new/generatedImages/rocket_gen_img_15697265b-1767745147562.png",
  photoAlt: 'Ahmed Al-Qahtani, male barber with short beard smiling in barbershop',
  shopName: 'Royal Cuts Riyadh',
  shopNameAr: 'رويال كتس الرياض',
  phone: '966512345678'
},
{
  id: 'barber-002',
  name: 'Khalid Al-Dosari',
  nameAr: 'خالد الدوسري',
  specialty: 'Beard Shaping & Skin Fades',
  specialtyAr: 'تشكيل لحية وقصات سكين',
  rating: 4.8,
  reviewCount: 198,
  distance: '0.7 km',
  distanceAr: '٧٠٠ م',
  available: true,
  waitTime: '~10 min',
  waitTimeAr: '~١٠ دقائق',
  photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1eb41f749-1768723778001.png",
  photoAlt: 'Khalid Al-Dosari, young male barber with neat hair in professional attire',
  shopName: 'The Gentleman\'s Den',
  shopNameAr: 'ذا جنتلمان',
  phone: '966523456789'
},
{
  id: 'barber-003',
  name: 'Omar Bin Saleh',
  nameAr: 'عمر بن صالح',
  specialty: 'Classic & Traditional Cuts',
  specialtyAr: 'قصات كلاسيكية وتقليدية',
  rating: 4.7,
  reviewCount: 445,
  distance: '1.1 km',
  distanceAr: '١.١ كم',
  available: false,
  waitTime: '~25 min',
  waitTimeAr: '~٢٥ دقيقة',
  photo: "https://img.rocket.new/generatedImages/rocket_gen_img_18349626c-1773119735658.png",
  photoAlt: 'Omar Bin Saleh, middle-aged barber with glasses and warm smile',
  shopName: 'Heritage Barbershop',
  shopNameAr: 'حلاقة التراث',
  phone: '966534567890'
},
{
  id: 'barber-004',
  name: 'Faisal Al-Harbi',
  nameAr: 'فيصل الحربي',
  specialty: 'Kids & Family Cuts',
  specialtyAr: 'قصات أطفال وعائلية',
  rating: 4.6,
  reviewCount: 87,
  distance: '1.4 km',
  distanceAr: '١.٤ كم',
  available: true,
  waitTime: '~5 min',
  waitTimeAr: '~٥ دقائق',
  photo: "https://img.rocket.new/generatedImages/rocket_gen_img_18349626c-1773119735658.png",
  photoAlt: 'Faisal Al-Harbi, friendly barber with casual shirt and bright smile',
  shopName: 'Family Cuts Studio',
  shopNameAr: 'ستوديو القصات العائلية',
  phone: '966545678901'
}];


interface Props {
  lang: Language;
  t: Record<string, string>;
  isRtl: boolean;
  selected: Barber | null;
  onSelect: (b: Barber) => void;
  onNext: () => void;
}

export default function StepSelectBarber({ lang, t, isRtl, selected, onSelect, onNext }: Props) {
  return (
    <div className="space-y-4">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-white">{t.selectBarber}</h2>
        <p className="text-sm mt-1" style={{ color: 'hsl(0 0% 50%)' }}>
          {lang === 'ar' ? 'اختر من الحلاقين المتاحين بالقرب منك' : 'Choose from available barbers near you'}
        </p>
      </div>

      <div className="space-y-3">
        {BARBERS.map((barber) =>
        <button
          key={barber.id}
          onClick={() => barber.available && onSelect(barber)}
          disabled={!barber.available}
          className={`w-full text-left rounded-xl p-4 barber-card-hover transition-all ${
          selected?.id === barber.id ? 'barber-card-selected' : ''} ${
          !barber.available ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
          style={{
            background: selected?.id === barber.id ? 'hsl(43 52% 54% / 0.08)' : 'hsl(0 0% 10%)',
            border: `1px solid ${selected?.id === barber.id ? 'hsl(43 52% 54%)' : 'hsl(0 0% 18%)'}`
          }}>
          
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-xl overflow-hidden">
                  <AppImage
                  src={barber.photo}
                  alt={barber.photoAlt}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover" />
                
                </div>
                <span
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2"
                style={{
                  background: barber.available ? 'hsl(158 64% 40%)' : 'hsl(0 72% 51%)',
                  borderColor: '#0f0f0f'
                }} />
              
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-white text-sm">
                      {lang === 'ar' ? barber.nameAr : barber.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'hsl(43 52% 54%)' }}>
                      {lang === 'ar' ? barber.specialtyAr : barber.specialty}
                    </p>
                  </div>
                  {selected?.id === barber.id &&
                <CheckCircle2 size={18} style={{ color: 'hsl(43 62% 67%)', flexShrink: 0 }} />
                }
                </div>

                <p className="text-xs mt-1" style={{ color: 'hsl(0 0% 45%)' }}>
                  {lang === 'ar' ? barber.shopNameAr : barber.shopName}
                </p>

                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star size={11} fill="hsl(43 62% 67%)" style={{ color: 'hsl(43 62% 67%)' }} />
                    <span className="text-xs font-semibold text-white font-tabular">{barber.rating}</span>
                    <span className="text-xs" style={{ color: 'hsl(0 0% 40%)' }}>({barber.reviewCount})</span>
                  </div>

                  {/* Distance */}
                  <div className="flex items-center gap-1">
                    <MapPin size={11} style={{ color: 'hsl(0 0% 40%)' }} />
                    <span className="text-xs" style={{ color: 'hsl(0 0% 50%)' }}>
                      {lang === 'ar' ? barber.distanceAr : barber.distance}
                    </span>
                  </div>

                  {/* Wait time */}
                  <div className="flex items-center gap-1">
                    <Clock size={11} style={{ color: barber.available ? 'hsl(158 64% 40%)' : 'hsl(0 72% 51%)' }} />
                    <span
                    className="text-xs font-medium"
                    style={{ color: barber.available ? 'hsl(158 64% 40%)' : 'hsl(0 72% 51%)' }}>
                    
                      {lang === 'ar' ? barber.waitTimeAr : barber.waitTime}
                    </span>
                  </div>

                  {/* Status badge */}
                  <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{
                    background: barber.available ? 'hsl(158 64% 40% / 0.15)' : 'hsl(0 72% 51% / 0.15)',
                    color: barber.available ? 'hsl(158 64% 50%)' : 'hsl(0 72% 60%)'
                  }}>
                  
                    {barber.available ? t.available : t.busy}
                  </span>
                </div>
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Next Button */}
      <div className="pt-2">
        <button
          onClick={onNext}
          disabled={!selected}
          className="w-full py-4 rounded-xl text-sm font-bold gold-btn">
          
          {t.next} →
        </button>
      </div>
    </div>);

}