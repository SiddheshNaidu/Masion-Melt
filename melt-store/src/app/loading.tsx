import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-melt-bg/50 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full border-2 border-melt-accent border-t-transparent animate-spin" />
        <span className="mt-4 text-[11px] uppercase tracking-widest text-melt-text-muted font-medium">
          Melt is warming up...
        </span>
      </div>
    </div>
  );
};

export default Loading;
