'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('melt-announcement-dismissed');
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('melt-announcement-dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="relative bg-melt-inverse-bg text-melt-inverse-text py-2.5 px-4 text-center z-50">
      <p className="text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.12em] font-sans">
        Free shipping on orders over ₹999&nbsp;&nbsp;|&nbsp;&nbsp;Pocket-sized. Always with you.
      </p>
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-melt-inverse-text/60 hover:text-melt-inverse-text transition-colors duration-200 p-1"
        aria-label="Dismiss announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
}
