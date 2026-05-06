'use client';

import React, { useState } from 'react';
import { Toaster } from 'sonner';
import AuthBrand from './AuthBrand';
import AuthForm from './AuthForm';

export type AuthLang = 'en' | 'ar';
export type AuthMode = 'login' | 'signup';
export type AuthRole = 'barber' | 'customer';

export default function AuthClient() {
  const [lang, setLang] = useState<AuthLang>('en');
  const [mode, setMode] = useState<AuthMode>('login');

  const isRtl = lang === 'ar';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen flex" style={{ background: '#0f0f0f' }}>
      <Toaster position="top-center" theme="dark" richColors />

      {/* Brand Panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%]">
        <AuthBrand lang={lang} isRtl={isRtl} />
      </div>

      {/* Form Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-12 xl:px-16 relative">
        <AuthForm
          lang={lang}
          setLang={setLang}
          mode={mode}
          setMode={setMode}
          isRtl={isRtl}
        />
      </div>
    </div>
  );
}