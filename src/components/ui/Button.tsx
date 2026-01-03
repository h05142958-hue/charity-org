import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 inline-flex items-center justify-center';

  const variants = {
    primary: 'bg-yellow-400 hover:bg-yellow-500 text-gray-900',
    secondary: 'bg-teal-700 hover:bg-teal-800 text-white',
    outline: 'border-2 border-white hover:bg-white hover:text-gray-900 text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
