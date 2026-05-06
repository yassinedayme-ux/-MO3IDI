'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, X, Loader2, Tag } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { AdminService, DashLang } from './BarberDashboardClient';

interface ServiceFormValues {
  name: string;
  nameAr: string;
  price: number;
  duration: number;
}

interface Props {
  services: AdminService[];
  setServices: React.Dispatch<React.SetStateAction<AdminService[]>>;
  isRtl: boolean;
  lang: DashLang;
}

export default function ServicesManager({ services, setServices, isRtl, lang }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<AdminService | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<ServiceFormValues>();

  const openAdd = () => {
    setEditingService(null);
    reset();
    setShowModal(true);
  };

  const openEdit = (svc: AdminService) => {
    setEditingService(svc);
    setValue('name', svc.name);
    setValue('nameAr', svc.nameAr);
    setValue('price', svc.price);
    setValue('duration', svc.duration);
    setShowModal(true);
  };

  const onSubmit = async (data: ServiceFormValues) => {
    // Backend integration: POST /api/services or PATCH /api/services/:id
    await new Promise(r => setTimeout(r, 800));
    if (editingService) {
      setServices(prev => prev.map(s => s.id === editingService.id ? { ...s, ...data } : s));
      toast.success(lang === 'ar' ? 'تم تحديث الخدمة' : 'Service updated');
    } else {
      const newSvc: AdminService = {
        id: `svc-${Date.now()}`,
        ...data,
        active: true,
      };
      setServices(prev => [...prev, newSvc]);
      toast.success(lang === 'ar' ? 'تمت إضافة الخدمة' : 'Service added');
    }
    setShowModal(false);
    reset();
  };

  const toggleActive = async (id: string) => {
    setSavingId(id);
    await new Promise(r => setTimeout(r, 400));
    // Backend integration: PATCH /api/services/:id/toggle
    setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
    setSavingId(null);
  };

  const deleteService = async (id: string) => {
    setDeletingId(id);
    await new Promise(r => setTimeout(r, 600));
    // Backend integration: DELETE /api/services/:id
    setServices(prev => prev.filter(s => s.id !== id));
    setDeletingId(null);
    toast.success(lang === 'ar' ? 'تم حذف الخدمة' : 'Service deleted');
  };

  return (
    <>
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 18%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid hsl(0 0% 18%)' }}>
          <div className="flex items-center gap-2">
            <Tag size={15} style={{ color: 'hsl(43 52% 54%)' }} />
            <span className="font-semibold text-white text-sm">
              {lang === 'ar' ? 'إدارة الخدمات' : 'Services Management'}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-bold font-tabular"
              style={{ background: 'hsl(43 52% 54% / 0.15)', color: 'hsl(43 62% 67%)' }}
            >
              {services.length}
            </span>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-150 hover:opacity-80 active:scale-95 gold-btn"
          >
            <Plus size={13} />
            {lang === 'ar' ? 'إضافة خدمة' : 'Add Service'}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid hsl(0 0% 15%)' }}>
                {[
                  lang === 'ar' ? 'الخدمة' : 'Service',
                  lang === 'ar' ? 'السعر' : 'Price',
                  lang === 'ar' ? 'المدة' : 'Duration',
                  lang === 'ar' ? 'الحالة' : 'Status',
                  lang === 'ar' ? 'الإجراءات' : 'Actions',
                ].map((col) => (
                  <th
                    key={`col-${col}`}
                    className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-left"
                    style={{ color: 'hsl(0 0% 40%)' }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.map((svc, i) => (
                <tr
                  key={svc.id}
                  className="transition-colors hover:bg-white/[0.02]"
                  style={{ borderBottom: i < services.length - 1 ? '1px solid hsl(0 0% 13%)' : 'none' }}
                >
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-white">{lang === 'ar' ? svc.nameAr : svc.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'hsl(0 0% 40%)' }}>
                      {lang === 'ar' ? svc.name : svc.nameAr}
                    </p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-bold font-tabular" style={{ color: 'hsl(43 62% 67%)' }}>
                      {svc.price}
                    </span>
                    <span className="text-xs ml-1" style={{ color: 'hsl(0 0% 40%)' }}>SAR</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-white font-tabular">{svc.duration}</span>
                    <span className="text-xs ml-1" style={{ color: 'hsl(0 0% 40%)' }}>
                      {lang === 'ar' ? 'د' : 'min'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => toggleActive(svc.id)}
                      disabled={savingId === svc.id}
                      className="flex items-center gap-1.5 transition-all duration-150 hover:opacity-70 active:scale-95"
                    >
                      {savingId === svc.id ? (
                        <Loader2 size={16} className="animate-spin" style={{ color: 'hsl(0 0% 40%)' }} />
                      ) : svc.active ? (
                        <ToggleRight size={20} style={{ color: 'hsl(158 64% 50%)' }} />
                      ) : (
                        <ToggleLeft size={20} style={{ color: 'hsl(0 0% 35%)' }} />
                      )}
                      <span
                        className="text-xs font-semibold"
                        style={{ color: svc.active ? 'hsl(158 64% 50%)' : 'hsl(0 0% 40%)' }}
                      >
                        {svc.active
                          ? (lang === 'ar' ? 'مفعّل' : 'Active')
                          : (lang === 'ar' ? 'معطّل' : 'Inactive')
                        }
                      </span>
                    </button>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(svc)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 hover:opacity-80 active:scale-95"
                        style={{ background: 'hsl(43 52% 54% / 0.12)', color: 'hsl(43 62% 67%)' }}
                        title={lang === 'ar' ? 'تعديل' : 'Edit'}
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => deleteService(svc.id)}
                        disabled={deletingId === svc.id}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 hover:opacity-80 active:scale-95 disabled:opacity-40"
                        style={{ background: 'hsl(0 72% 51% / 0.12)', color: 'hsl(0 72% 60%)' }}
                        title={lang === 'ar' ? 'حذف' : 'Delete'}
                      >
                        {deletingId === svc.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {services.length === 0 && (
          <div className="flex flex-col items-center py-10 space-y-3">
            <Tag size={28} style={{ color: 'hsl(0 0% 30%)' }} />
            <p className="text-sm" style={{ color: 'hsl(0 0% 45%)' }}>
              {lang === 'ar' ? 'لا توجد خدمات بعد' : 'No services yet'}
            </p>
            <button onClick={openAdd} className="text-xs gold-btn px-4 py-2 rounded-lg font-bold">
              {lang === 'ar' ? 'أضف خدمتك الأولى' : 'Add your first service'}
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div
            className="w-full max-w-md rounded-2xl p-6 animate-slide-up"
            style={{ background: 'hsl(0 0% 12%)', border: '1px solid hsl(0 0% 22%)' }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-white text-base">
                {editingService
                  ? (lang === 'ar' ? 'تعديل الخدمة' : 'Edit Service')
                  : (lang === 'ar' ? 'إضافة خدمة جديدة' : 'Add New Service')
                }
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-70"
                style={{ background: 'hsl(0 0% 18%)', color: 'hsl(0 0% 55%)' }}
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name EN */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white">
                  {lang === 'ar' ? 'الاسم بالإنجليزية' : 'Service Name (English)'}
                </label>
                <input
                  {...register('name', { required: 'Required' })}
                  type="text"
                  placeholder="e.g. Haircut"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                  style={{
                    background: 'hsl(0 0% 9%)',
                    border: errors.name ? '1px solid hsl(0 72% 51%)' : '1px solid hsl(0 0% 20%)',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'hsl(43 52% 54%)'; }}
                  onBlur={e => { if (!errors.name) e.currentTarget.style.borderColor = 'hsl(0 0% 20%)'; }}
                />
                {errors.name && <p className="text-xs" style={{ color: 'hsl(0 72% 60%)' }}>{errors.name.message}</p>}
              </div>

              {/* Name AR */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white">
                  {lang === 'ar' ? 'الاسم بالعربية' : 'Service Name (Arabic)'}
                </label>
                <input
                  {...register('nameAr', { required: 'Required' })}
                  type="text"
                  dir="rtl"
                  placeholder="مثال: قصة شعر"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                  style={{
                    background: 'hsl(0 0% 9%)',
                    border: errors.nameAr ? '1px solid hsl(0 72% 51%)' : '1px solid hsl(0 0% 20%)',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'hsl(43 52% 54%)'; }}
                  onBlur={e => { if (!errors.nameAr) e.currentTarget.style.borderColor = 'hsl(0 0% 20%)'; }}
                />
                {errors.nameAr && <p className="text-xs" style={{ color: 'hsl(0 72% 60%)' }}>{errors.nameAr.message}</p>}
              </div>

              {/* Price + Duration */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white">
                    {lang === 'ar' ? 'السعر (ريال)' : 'Price (SAR)'}
                  </label>
                  <input
                    {...register('price', { required: 'Required', min: { value: 1, message: 'Min 1' }, valueAsNumber: true })}
                    type="number"
                    placeholder="40"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                    style={{
                      background: 'hsl(0 0% 9%)',
                      border: errors.price ? '1px solid hsl(0 72% 51%)' : '1px solid hsl(0 0% 20%)',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'hsl(43 52% 54%)'; }}
                    onBlur={e => { if (!errors.price) e.currentTarget.style.borderColor = 'hsl(0 0% 20%)'; }}
                  />
                  {errors.price && <p className="text-xs" style={{ color: 'hsl(0 72% 60%)' }}>{errors.price.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white">
                    {lang === 'ar' ? 'المدة (دقيقة)' : 'Duration (min)'}
                  </label>
                  <input
                    {...register('duration', { required: 'Required', min: { value: 5, message: 'Min 5' }, valueAsNumber: true })}
                    type="number"
                    placeholder="30"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                    style={{
                      background: 'hsl(0 0% 9%)',
                      border: errors.duration ? '1px solid hsl(0 72% 51%)' : '1px solid hsl(0 0% 20%)',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'hsl(43 52% 54%)'; }}
                    onBlur={e => { if (!errors.duration) e.currentTarget.style.borderColor = 'hsl(0 0% 20%)'; }}
                  />
                  {errors.duration && <p className="text-xs" style={{ color: 'hsl(0 72% 60%)' }}>{errors.duration.message}</p>}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-150 hover:opacity-80 active:scale-95"
                  style={{ background: 'hsl(0 0% 16%)', border: '1px solid hsl(0 0% 22%)', color: 'hsl(0 0% 65%)' }}
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 gold-btn"
                >
                  {isSubmitting
                    ? <><Loader2 size={14} className="animate-spin" /> {lang === 'ar' ? 'جاري الحفظ...' : 'Saving...'}</>
                    : (editingService
                        ? (lang === 'ar' ? 'حفظ التغييرات' : 'Save Changes')
                        : (lang === 'ar' ? 'إضافة الخدمة' : 'Add Service'))
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}