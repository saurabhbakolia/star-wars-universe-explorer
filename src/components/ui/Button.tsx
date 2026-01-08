import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sw-dark disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-sw-gold text-sw-dark hover:bg-sw-gold/90 focus:ring-sw-gold',
      secondary: 'bg-sw-blue text-sw-gray hover:bg-sw-blue/80 focus:ring-sw-blue',
      outline: 'border-2 border-sw-gold text-sw-gold hover:bg-sw-gold/10 focus:ring-sw-gold',
      ghost: 'text-sw-gray hover:bg-white/5 focus:ring-sw-gray',
    };
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
