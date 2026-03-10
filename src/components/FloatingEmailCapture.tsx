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
    <div className="fixed right-6 bottom-6 z-50 max-w-xs w-full p-4 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl border border-[#E5E7EB]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-sans text-sm font-semibold text-[#111111]">
            Get launch updates
          </p>
          <p className="font-sans text-xs text-[#666666] mt-1">
            Join the list for the latest updates and new projects.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="text-[#999999] hover:text-[#111111] transition-colors duration-150"
          aria-label="Dismiss email signup"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 px-3 py-2 rounded-full border border-[#DDDDDD] bg-white text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#111111]"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-full bg-[#111111] text-white text-sm font-medium hover:bg-[#333333] transition-colors duration-150 disabled:opacity-40"
        >
          {isSubscribed ? 'Subscribed' : 'Join'}
        </button>
      </form>

      {isSubscribed && (
        <p className="mt-2 text-xs font-sans text-[#111111]">Thanks for joining!</p>
      )}
    </div>
  );
}
