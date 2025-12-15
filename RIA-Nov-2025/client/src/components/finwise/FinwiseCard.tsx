import React from 'react';
import { cn } from '@/lib/utils';

interface FinwiseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function FinwiseCard({
  children,
  className,
  ...props
}: FinwiseCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-card border border-border shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
