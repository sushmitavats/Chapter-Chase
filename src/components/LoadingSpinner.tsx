import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex justify-center">
      <div className={`${sizeClasses[size]} animate-spin`}>
        <div className="w-full h-full rounded-full border-4 border-purple-200 border-t-purple-600"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;