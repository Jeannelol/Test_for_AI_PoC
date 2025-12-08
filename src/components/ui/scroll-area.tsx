import React from 'react';
import clsx from 'clsx';

const ScrollArea: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div className={clsx('overflow-auto', className)} {...props}>
      {children}
    </div>
  );
};

export { ScrollArea };
