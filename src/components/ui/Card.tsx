import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-card dark:shadow-none overflow-hidden transition-all duration-200",
          hoverEffect && "hover:shadow-card-hover hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5",
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
