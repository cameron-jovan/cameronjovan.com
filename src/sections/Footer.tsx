import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Featured logo components (simplified text-based logos)
const RedfinLogo = () => (
  <svg viewBox="0 0 120 30" className="h-6 sm:h-7 w-auto">
    <text x="0" y="22" className="fill-current font-sans font-bold text-lg">Redfin</text>
  </svg>
);

const VoyageATLLogo = () => (
  <svg viewBox="0 0 120 30" className="h-6 sm:h-7 w-auto">
    <text x="0" y="22" className="fill-current font-serif font-semibold text-lg">VoyageATL</text>
  </svg>
);

const CanvasRebelLogo = () => (
  <svg viewBox="0 0 140 30" className="h-6 sm:h-7 w-auto">
    <text x="0" y="22" className="fill-current font-sans font-medium text-lg tracking-wide">CANVAS REBEL</text>
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      // Submit to Basin endpoint
      const result = await fetch('https://usebasin.com/f/20a8040e7fb0', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (result.ok) {
        setIsSubscribed(true);
        setEmail('');
        setTimeout(() => setIsSubscribed(false), 3000);
      }
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full py-12 sm:py-16 bg-white border-t border-[#EEEEEE]"
      style={{ position: 'relative', zIndex: 10 }}
    >
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          className="flex flex-col items-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Featured In Section */}
          <div className="text-center mb-10">
            <p className="font-sans text-xs uppercase tracking-[0.15em] text-[#666666] mb-5">
              Featured In
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-[#999999]">
              <a 
                href="https://redfin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#111111] transition-colors duration-200"
              >
                <RedfinLogo />
              </a>
              <a 
                href="https://voyageatl.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#111111] transition-colors duration-200"
              >
                <VoyageATLLogo />
              </a>
              <a 
                href="https://canvasrebel.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#111111] transition-colors duration-200"
              >
                <CanvasRebelLogo />
              </a>
            </div>
          </div>

          {/* Email Signup */}
          <div className="w-full max-w-md mb-10">
            <p className="font-sans text-sm text-[#666666] text-center mb-4">
              Get Launch Updates
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white border border-[#DDDDDD] rounded-full font-sans text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#111111] transition-colors duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#111111] text-white font-sans text-sm font-medium rounded-full hover:bg-[#333333] transition-colors duration-200 whitespace-nowrap"
              >
                {isSubscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-[#EEEEEE] mb-6" />

          {/* Copyright */}
          <p className="font-sans text-xs text-[#666666] text-center">
            &copy; 2026 Cameron Jo&apos;van
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
