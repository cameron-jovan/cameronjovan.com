import { useEffect, useState } from 'react';

export default function FloatingEmailCapture() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Auto-hide on small screens after a short delay to reduce visual clutter
    if (window.matchMedia('(max-width: 640px)').matches) {
      const timeout = setTimeout(() => setIsVisible(false), 8000);
      return () => clearTimeout(timeout);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed left-1/2 bottom-6 z-50 w-[min(92vw,600px)] -translate-x-1/2 rounded-full bg-white/70 backdrop-blur-lg px-4 py-3 shadow-lg border border-white/50">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <span className="whitespace-nowrap font-sans text-sm font-medium text-[#111111]">
          Get Launch Updates
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 min-w-[0] rounded-full border border-[#DDDDDD] bg-white/85 px-3 py-2 text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#111111]"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-[#111111] px-4 py-2 text-sm font-medium text-white hover:bg-[#333333] transition-colors duration-150 disabled:opacity-40"
        >
          {isSubscribed ? 'Subscribed' : 'Submit'}
        </button>
      </form>

      {isSubscribed && (
        <p className="mt-2 text-center text-xs font-sans text-[#111111] opacity-80">
          Thanks for joining!
        </p>
      )}
    </div>
  );
}
