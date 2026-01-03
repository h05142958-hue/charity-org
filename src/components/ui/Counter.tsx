import { useEffect, useState, useRef } from 'react';

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

export default function Counter({ target, suffix = '', duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('ar-SA');
  };

  return (
    <div ref={counterRef} className="text-4xl md:text-5xl font-bold">
      {formatNumber(count)}{suffix}
    </div>
  );
}
