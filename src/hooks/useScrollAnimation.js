import { useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          hasAnimated.current = true;
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return ref;
};

export const useScrollProgress = () => {
  const [progress, setProgress] = window.React?.useState ? window.React.useState(0) : [0, () => {}];

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const newProgress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
      setProgress(newProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};
