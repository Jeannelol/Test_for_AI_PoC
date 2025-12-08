import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost';
  size?: 'default' | 'icon';
}

const Button: React.FC<ButtonProps> = ({ className, variant = 'default', size = 'default', ...props }) => {
  const styles = clsx(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
    variant === 'ghost'
      ? 'bg-transparent hover:bg-gray-100 text-gray-700'
      : 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
    size === 'icon' ? 'h-10 w-10' : 'h-10 px-4 py-2',
    className
  );

  return <button className={styles} {...props} />;
};

export { Button };
