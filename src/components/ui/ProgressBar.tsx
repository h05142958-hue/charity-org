import { useEffect, useState } from 'react';

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

export default function ProgressBar({ percentage, className = '' }: ProgressBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, 200);

    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className={`w-full bg-gray-200 rounded-full h-3 overflow-hidden ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-teal-700 to-teal-600 rounded-full transition-all duration-1500 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
