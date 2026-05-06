"use client";
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-yellow-600/30 bg-gray-900/50 p-8 text-center shadow-2xl backdrop-blur-sm">
        {/* اللوغو والسمية */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-yellow-500">MO3IDI</h1>
          <p className="text-sm text-gray-400">مرحباً بك في نظام إدارة المواعيد الذكي</p>
        </div>

        {/* فورم تسجيل الدخول */}
        <form className="mt-8 space-y-6 text-right" dir="rtl">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                required
                className="w-full rounded-lg border border-gray-700 bg-black/50 p-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">كلمة السر</label>
              <input
                type="password"
                required
                className="w-full rounded-lg border border-gray-700 bg-black/50 p-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                placeholder="********"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-yellow-600 py-3 font-bold text-black hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-600/20"
          >
            دخول للنظام
          </button>
        </form>

        <div className="text-sm text-gray-500">
          <p>للحصول على اشتراك، يرجى التواصل مع الإدارة</p>
        </div>
      </div>
    </div>
  );
}