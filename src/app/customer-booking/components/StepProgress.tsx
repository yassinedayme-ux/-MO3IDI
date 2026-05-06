'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface Props {
  step: number;
  t: Record<string, string>;
  isRtl: boolean;
}

export default function StepProgress({ step, t, isRtl }: Props) {
  const steps = [
    { num: 1, label: t.step1 },
    { num: 2, label: t.step2 },
    { num: 3, label: t.step3 },
    { num: 4, label: t.step4 },
  ];

  return (
    <div className="py-6">
      {/* Progress bar */}
      <div className="relative flex items-center justify-between mb-2">
        <div className="absolute inset-x-0 top-4 h-0.5" style={{ background: 'hsl(0 0% 18%)' }} />
        <div
          className="absolute top-4 h-0.5 transition-all duration-500"
          style={{
            background: 'linear-gradient(90deg, hsl(35 42% 42%), hsl(43 62% 67%))',
            width: `${((step - 1) / 3) * 100}%`,
            left: isRtl ? 'auto' : 0,
            right: isRtl ? 0 : 'auto',
          }}
        />
        {steps.map((s) => (
          <div key={`step-${s.num}`} className="relative flex flex-col items-center gap-1.5 z-10">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
              style={{
                background:
                  s.num < step
                    ? 'hsl(158 64% 40%)'
                    : s.num === step
                    ? 'linear-gradient(135deg, hsl(35 42% 42%), hsl(43 52% 54%))'
                    : 'hsl(0 0% 13%)',
                border:
                  s.num === step
                    ? '2px solid hsl(43 62% 67%)'
                    : s.num < step
                    ? '2px solid hsl(158 64% 40%)'
                    : '2px solid hsl(0 0% 18%)',
                color: s.num < step ? '#fff' : s.num === step ? '#0f0f0f' : 'hsl(0 0% 40%)',
              }}
            >
              {s.num < step ? <Check size={14} /> : s.num}
            </div>
            <span
              className="text-xs font-medium whitespace-nowrap"
              style={{ color: s.num === step ? 'hsl(43 62% 67%)' : s.num < step ? 'hsl(158 64% 40%)' : 'hsl(0 0% 40%)' }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}