import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'info' | 'danger' | 'neutral' | 'emergency' | 'coop';
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className,
  dot = false
}) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full shrink-0 transition-colors duration-200";

  const variants = {
    success: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80",
    warning: "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80",
    info: "bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/80",
    danger: "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/80",
    neutral: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700",
    emergency: "bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800 font-semibold pulse-emergency",
    coop: "bg-coop-50 dark:bg-coop-950/60 text-coop-800 dark:text-coop-300 border border-coop-300 dark:border-coop-800 font-semibold"
  };

  const dots = {
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    info: "bg-sky-500",
    danger: "bg-rose-500",
    neutral: "bg-slate-400 dark:bg-slate-500",
    emergency: "bg-red-600",
    coop: "bg-coop-600"
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5"
  };

  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}>
      {dot && <span className={clsx("w-1.5 h-1.5 rounded-full", dots[variant])} />}
      {children}
    </span>
  );
};
