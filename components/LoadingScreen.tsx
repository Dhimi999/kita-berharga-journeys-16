
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-sm animate-pulse">
        Kita Berharga
      </h1>
      <div className="mt-4 h-1 w-24 bg-muted-foreground/20 rounded-full overflow-hidden">
        <div className="h-full bg-primary animate-progress-bar rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
