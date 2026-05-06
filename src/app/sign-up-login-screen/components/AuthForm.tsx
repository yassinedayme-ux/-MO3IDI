'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  Eye, EyeOff, Mail, Lock, User, Phone, Globe,
  Scissors, ChevronRight, Loader2, Copy, Check,
} from 'lucide-react';
import type { AuthLang, AuthMode, AuthRole } from './AuthClient';

interface LoginValues {
  email: string;
  password: string;
  remember: boolean;
}

interface SignupValues {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  role: AuthRole;
  terms: boolean;
}

interface Props {
  lang: AuthLang;
  setLang: (l: AuthLang) => void;
  mode: AuthMode;
  setMode: (m: AuthMode) => void;
  isRtl: boolean;
}

const DEMO_CREDENTIALS = [
  { role: 'Barber', roleAr: 'حلاق', email: 'ahmed@mo3idi.sa', password: 'barber2026' },
  { role: 'Customer', roleAr: 'عميل', email: 'mohammed@mo3idi.sa', password: 'customer2026' },
];

export default function AuthForm({ lang, setLang, mode, setMode, isRtl }: Props) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<AuthRole>('barber');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const loginForm = useForm<LoginValues>({ defaultValues: { remember: false } });
  const signupForm = useForm<SignupValues>({ defaultValues: { role: 'barber', terms: false } });

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const fillCredentials = (email: string, password: string) => {
    loginForm.setValue('email', email);
    loginForm.setValue('password', password);
    toast.success(lang === 'ar' ? 'تم ملء البيانات' : 'Credentials filled');
  };

  const onLogin = async (data: LoginValues) => {
    // Backend integration: POST /api/auth/login { email, password }
    await new Promise(r => setTimeout(r, 1200));
    const match = DEMO_CREDENTIALS.find(c => c.email === data.email && c.password === data.password);
    if (!match) {
      loginForm.setError('email', {
        message: lang === 'ar' ?'بيانات غير صحيحة — استخدم الحسابات التجريبية أدناه' :'Invalid credentials — use the demo accounts below to sign in',
      });
      return;
    }
    toast.success(lang === 'ar' ? `مرحباً! جاري التوجيه...` : `Welcome back! Redirecting...`);
    setTimeout(() => {
      if (match.role === 'Barber') {
        router.push('/barber-admin-dashboard');
      } else {
        router.push('/customer-booking');
      }
    }, 800);
  };

  const onSignup = async (data: SignupValues) => {
    // Backend integration: POST /api/auth/register
    await new Promise(r => setTimeout(r, 1400));
    toast.success(lang === 'ar' ? 'تم إنشاء الحساب بنجاح!' : 'Account created successfully!');
    setTimeout(() => {
      if (data.role === 'barber') router.push('/barber-admin-dashboard');
      else router.push('/customer-booking');
    }, 800);
  };

  const t = {
    en: {
      welcome: 'Welcome back',
      welcomeSub: 'Sign in to your Mo3idi account',
      createAccount: 'Create your account',
      createSub: 'Join Mo3idi — free for barbers & customers',
      email: 'Email Address',
      password: 'Password',
      fullName: 'Full Name',
      phone: 'Phone Number',
      role: 'I am a',
      barber: 'Barber',
      customer: 'Customer',
      remember: 'Remember me',
      forgotPassword: 'Forgot password?',
      signIn: 'Sign In',
      signUp: 'Create Account',
      noAccount: "Don\'t have an account?",
      hasAccount: 'Already have an account?',
      signUpLink: 'Sign up',
      signInLink: 'Sign in',
      terms: 'I agree to the Terms of Service and Privacy Policy',
      demoTitle: 'Demo Accounts',
      useAccount: 'Use',
      emailPlaceholder: 'ahmed@mo3idi.sa',
      passwordPlaceholder: '••••••••',
      namePlaceholder: 'Mohammed Al-Rashid',
      phonePlaceholder: '+966 5X XXX XXXX',
    },
    ar: {
      welcome: 'مرحباً بعودتك',
      welcomeSub: 'سجّل دخولك إلى حساب موعدي',
      createAccount: 'أنشئ حسابك',
      createSub: 'انضم إلى موعدي — مجاني للحلاقين والعملاء',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      fullName: 'الاسم الكامل',
      phone: 'رقم الجوال',
      role: 'أنا',
      barber: 'حلاق',
      customer: 'عميل',
      remember: 'تذكرني',
      forgotPassword: 'نسيت كلمة المرور؟',
      signIn: 'تسجيل الدخول',
      signUp: 'إنشاء حساب',
      noAccount: 'ليس لديك حساب؟',
      hasAccount: 'لديك حساب بالفعل؟',
      signUpLink: 'سجّل الآن',
      signInLink: 'سجّل دخولك',
      terms: 'أوافق على شروط الخدمة وسياسة الخصوصية',
      demoTitle: 'الحسابات التجريبية',
      useAccount: 'استخدم',
      emailPlaceholder: 'ahmed@mo3idi.sa',
      passwordPlaceholder: '••••••••',
      namePlaceholder: 'محمد الراشد',
      phonePlaceholder: '+966 5X XXX XXXX',
    },
  }[lang];

  const inputBase = {
    background: 'hsl(0 0% 9%)',
    border: '1px solid hsl(0 0% 20%)',
    color: 'white',
  };

  const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = 'hsl(43 52% 54%)';
    e.currentTarget.style.boxShadow = '0 0 0 2px hsl(43 52% 54% / 0.15)';
  };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = 'hsl(0 0% 20%)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Mobile Logo */}
      <div className="flex lg:hidden items-center justify-center gap-2 mb-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, hsl(35 42% 42%), hsl(43 62% 67%))' }}
        >
          <Scissors size={18} className="text-black" />
        </div>
        <span className="text-xl font-bold" style={{ color: 'hsl(43 62% 67%)' }}>
          {lang === 'ar' ? 'موعدي' : 'Mo3idi'}
        </span>
      </div>

      {/* Lang Toggle */}
      <div className="flex justify-end">
        <button
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 hover:opacity-80 active:scale-95"
          style={{ background: 'hsl(0 0% 13%)', border: '1px solid hsl(0 0% 20%)', color: 'hsl(43 62% 67%)' }}
        >
          <Globe size={13} />
          {lang === 'en' ? 'عربي' : 'EN'}
        </button>
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          {mode === 'login' ? t.welcome : t.createAccount}
        </h2>
        <p className="text-sm mt-1" style={{ color: 'hsl(0 0% 50%)' }}>
          {mode === 'login' ? t.welcomeSub : t.createSub}
        </p>
      </div>

      {/* Mode Tabs */}
      <div
        className="flex rounded-xl p-1"
        style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 18%)' }}
      >
        {(['login', 'signup'] as AuthMode[]).map((m) => (
          <button
            key={`tab-${m}`}
            onClick={() => setMode(m)}
            className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
              background: mode === m ? 'linear-gradient(135deg, hsl(35 42% 42%), hsl(43 52% 54%))' : 'transparent',
              color: mode === m ? '#0f0f0f' : 'hsl(0 0% 50%)',
            }}
          >
            {m === 'login' ? t.signIn : t.signUp}
          </button>
        ))}
      </div>

      {/* LOGIN FORM */}
      {mode === 'login' && (
        <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4 animate-fade-in">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-white flex items-center gap-1.5">
              <Mail size={13} style={{ color: 'hsl(43 52% 54%)' }} />
              {t.email}
            </label>
            <input
              {...loginForm.register('email', {
                required: lang === 'ar' ? 'البريد مطلوب' : 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: lang === 'ar' ? 'بريد غير صحيح' : 'Invalid email' },
              })}
              type="email"
              placeholder={t.emailPlaceholder}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                ...inputBase,
                border: loginForm.formState.errors.email ? '1px solid hsl(0 72% 51%)' : '1px solid hsl(0 0% 20%)',
              }}
              onFocus={inputFocus}
              onBlur={inputBlur}
            />
            {loginForm.formState.errors.email && (
              <p className="text-xs" style={{ color: 'hsl(0 72% 60%)' }}>
                {loginForm.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Lock size={13} style={{ color: 'hsl(43 52% 54%)' }} />
                {t.password}
              </label>
              <button
                type="button"
                className="text-xs transition-all hover:opacity-70"
                style={{ color: 'hsl(43 52% 54%)' }}
              >
                {t.forgotPassword}
              </button>
            </div>
            <div className="relative">
              <input
                {...loginForm.register('password', { required: lang === 'ar' ? 'كلمة المرور مطلوبة' : 'Password is required' })}
                type={showPassword ? 'text' : 'password'}
                placeholder={t.passwordPlaceholder}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all pr-11"
                style={{
                  ...inputBase,
                  border: loginForm.formState.errors.password ? '1px solid hsl(0 72% 51%)' : '1px solid hsl(0 0% 20%)',
                }}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 -translate-y-1/2 right-3 transition-all hover:opacity-70"
                style={{ color: 'hsl(0 0% 40%)' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {loginForm.formState.errors.password && (
              <p className="text-xs" style={{ color: 'hsl(0 72% 60%)' }}>
                {loginForm.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Remember */}
          <div className="flex items-center gap-2">
            <input
              {...loginForm.register('remember')}
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded accent-yellow-500"
            />
            <label htmlFor="remember" className="text-xs" style={{ color: 'hsl(0 0% 55%)' }}>
              {t.remember}
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loginForm.formState.isSubmitting}
            className="w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 gold-btn"
          >
            {loginForm.formState.isSubmitting
              ? <><Loader2 size={16} className="animate-spin" /> {lang === 'ar' ? 'جاري الدخول...' : 'Signing in...'}</>
              : <>{t.signIn} <ChevronRight size={16} /></>
            }
          </button>

          {/* Switch mode */}
          <p className="text-center text-sm" style={{ color: 'hsl(0 0% 50%)' }}>
            {t.noAccount}{' '}
            <button
              type="button"
              onClick={() => setMode('signup')}
              className="font-semibold transition-all hover:opacity-70"
              style={{ color: 'hsl(43 62% 67%)' }}
            >
              {t.signUpLink}
            </button>
          </p>

          {/* Demo Credentials */}
          <div
            className="rounded-xl p-4 space-y-3"
            style={{ background: 'hsl(43 52% 54% / 0.06)', border: '1px solid hsl(43 52% 54% / 0.2)' }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'hsl(43 52% 54%)' }}>
              🔑 {t.demoTitle}
            </p>
            <div className="space-y-2">
              {DEMO_CREDENTIALS.map((cred) => (
                <div
                  key={`cred-${cred.role}`}
                  className="flex items-center justify-between gap-2 rounded-lg px-3 py-2"
                  style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 18%)' }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold" style={{ color: 'hsl(43 62% 67%)' }}>
                      {lang === 'ar' ? cred.roleAr : cred.role}
                    </p>
                    <p className="text-xs truncate font-tabular" style={{ color: 'hsl(0 0% 55%)' }}>
                      {cred.email}
                    </p>
                    <p className="text-xs font-tabular" style={{ color: 'hsl(0 0% 40%)' }}>
                      {cred.password}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleCopy(cred.email, `email-${cred.role}`)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:opacity-70"
                      style={{ background: 'hsl(0 0% 15%)', color: 'hsl(0 0% 50%)' }}
                      title="Copy email"
                    >
                      {copiedField === `email-${cred.role}` ? <Check size={11} style={{ color: 'hsl(158 64% 50%)' }} /> : <Copy size={11} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => fillCredentials(cred.email, cred.password)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 hover:opacity-80 active:scale-95"
                      style={{ background: 'hsl(43 52% 54% / 0.2)', color: 'hsl(43 62% 67%)' }}
                    >
                      {t.useAccount}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      )}

      {/* SIGNUP FORM */}
      {mode === 'signup' && (
        <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4 animate-fade-in">
          {/* Role Selector */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-white">{t.role}</label>
            <div className="grid grid-cols-2 gap-3">
              {(['barber', 'customer'] as AuthRole[]).map((role) => (
                <button
                  key={`role-${role}`}
                  type="button"
                  onClick={() => {
                    setSelectedRole(role);
                    signupForm.setValue('role', role);
                  }}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150"
                  style={{
                    background: selectedRole === role ? 'hsl(43 52% 54% / 0.12)' : 'hsl(0 0% 10%)',
                    border: `1px solid ${selectedRole === role ? 'hsl(43 52% 54%)' : 'hsl(0 0% 20%)'}`,
                    color: selectedRole === role ? 'hsl(43 62% 67%)' : 'hsl(0 0% 55%)',
                  }}
                >
                  {role === 'barber' ? <Scissors size={15} /> : <User size={15} />}
                  {role === 'barber' ? t.barber : t.customer}
                </button>
              ))}
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-white flex items-center gap-1.5">
              <User size={13} style={{ color: 'hsl(43 52% 54%)' }} />
              {t.fullName}
            </label>
            <input
              {...signupForm.register('fullName', { required: lang === 'ar' ? 'الاسم مطلوب' : 'Full name is required' })}
              type="text"
              placeholder={t.namePlaceholder}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                ...inputBase,
                border: signupForm.formState.errors.fullName ? '1px solid hsl(0 72% 51%)' : '1px solid hsl(0 0% 20%)',
              }}
              onFocus={inputFocus}
              onBlur={inputBlur}
            />
            {signupForm.formState.errors.fullName && (
              <p className="text-xs" style={{ color: 'hsl(0 72% 60%)' }}>
                {signupForm.formState.errors.fullName.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-white flex items-center gap-1.5">
              <Phone size={13} style={{ color: 'hsl(43 52% 54%)' }} />
              {t.phone}
            </label>
            <input
              {...signupForm.register('phone', {
                required: lang === 'ar' ? 'الجوال مطلوب' : 'Phone is required',
                pattern: { value: /^[+\d\s()-]{9,16}$/, message: lang === 'ar' ? 'رقم غير صحيح' : 'Invalid phone number' },
              })}
              type="tel"
              placeholder={t.phonePlaceholder}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                ...inputBase,
                border: signupForm.formState.errors.phone ? '1px solid hsl(0 72% 51%)' : '1px solid hsl(0 0% 20%)',
              }}
              onFocus={inputFocus}
              onBlur={inputBlur}
            />
            {signupForm.formState.errors.phone && (
              <p className="text-xs" style={{ color: 'hsl(0 72% 60%)' }}>
                {signupForm.formState.errors.phone.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-white flex items-center gap-1.5">
              <Mail size={13} style={{ color: 'hsl(43 52% 54%)' }} />
              {t.email}
            </label>
            <input
              {...signupForm.register('email', {
                required: lang === 'ar' ? 'البريد مطلوب' : 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: lang === 'ar' ? 'بريد غير صحيح' : 'Invalid email' },
              })}
              type="email"
              placeholder={t.emailPlaceholder}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                ...inputBase,
                border: signupForm.formState.errors.email ? '1px solid hsl(0 72% 51%)' : '1px solid hsl(0 0% 20%)',
              }}
              onFocus={inputFocus}
              onBlur={inputBlur}
            />
            {signupForm.formState.errors.email && (
              <p className="text-xs" style={{ color: 'hsl(0 72% 60%)' }}>
                {signupForm.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-white flex items-center gap-1.5">
              <Lock size={13} style={{ color: 'hsl(43 52% 54%)' }} />
              {t.password}
            </label>
            <div className="relative">
              <input
                {...signupForm.register('password', {
                  required: lang === 'ar' ? 'كلمة المرور مطلوبة' : 'Password is required',
                  minLength: { value: 8, message: lang === 'ar' ? 'كلمة المرور يجب أن تكون ٨ أحرف على الأقل' : 'Minimum 8 characters' },
                })}
                type={showPassword ? 'text' : 'password'}
                placeholder={t.passwordPlaceholder}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all pr-11"
                style={{
                  ...inputBase,
                  border: signupForm.formState.errors.password ? '1px solid hsl(0 72% 51%)' : '1px solid hsl(0 0% 20%)',
                }}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 -translate-y-1/2 right-3 transition-all hover:opacity-70"
                style={{ color: 'hsl(0 0% 40%)' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {signupForm.formState.errors.password && (
              <p className="text-xs" style={{ color: 'hsl(0 72% 60%)' }}>
                {signupForm.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input
              {...signupForm.register('terms', {
                required: lang === 'ar' ? 'يجب الموافقة على الشروط' : 'You must agree to the terms',
              })}
              type="checkbox"
              id="terms"
              className="w-4 h-4 mt-0.5 rounded accent-yellow-500 flex-shrink-0"
            />
            <label htmlFor="terms" className="text-xs leading-relaxed" style={{ color: 'hsl(0 0% 55%)' }}>
              {t.terms}
            </label>
          </div>
          {signupForm.formState.errors.terms && (
            <p className="text-xs -mt-2" style={{ color: 'hsl(0 72% 60%)' }}>
              {signupForm.formState.errors.terms.message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={signupForm.formState.isSubmitting}
            className="w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 gold-btn"
          >
            {signupForm.formState.isSubmitting
              ? <><Loader2 size={16} className="animate-spin" /> {lang === 'ar' ? 'جاري الإنشاء...' : 'Creating account...'}</>
              : <>{t.signUp} <ChevronRight size={16} /></>
            }
          </button>

          {/* Switch mode */}
          <p className="text-center text-sm" style={{ color: 'hsl(0 0% 50%)' }}>
            {t.hasAccount}{' '}
            <button
              type="button"
              onClick={() => setMode('login')}
              className="font-semibold transition-all hover:opacity-70"
              style={{ color: 'hsl(43 62% 67%)' }}
            >
              {t.signInLink}
            </button>
          </p>
        </form>
      )}

      {/* Nav Links */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <a
          href="/customer-booking"
          className="text-xs transition-all hover:opacity-70 flex items-center gap-1"
          style={{ color: 'hsl(0 0% 40%)' }}
        >
          <Scissors size={11} />
          {lang === 'ar' ? 'تصفح الحجوزات' : 'Browse Booking'}
        </a>
        <span style={{ color: 'hsl(0 0% 25%)' }}>·</span>
        <a
          href="/barber-admin-dashboard"
          className="text-xs transition-all hover:opacity-70 flex items-center gap-1"
          style={{ color: 'hsl(0 0% 40%)' }}
        >
          <User size={11} />
          {lang === 'ar' ? 'لوحة الحلاق' : 'Barber Dashboard'}
        </a>
      </div>
    </div>
  );
}