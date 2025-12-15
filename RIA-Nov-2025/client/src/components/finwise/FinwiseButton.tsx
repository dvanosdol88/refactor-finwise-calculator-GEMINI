import React from 'react';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';

interface FinwiseButtonProps extends ButtonProps {
  // Add any specific props if needed
}

export default function FinwiseButton({
  children,
  className,
  variant = 'default',
  ...props
}: FinwiseButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn(
        "rounded-full font-semibold transition-all hover-elevate active-elevate-2",
        // Only apply specific primary styling if it's the default variant, 
        // otherwise let the shadcn variant handle colors but keep the shape.
        variant === 'default' && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
