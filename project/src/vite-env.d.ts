/// <reference types="vite/client" />

// Global type declarations for external libraries
declare global {
  interface Window {
    particlesJS: (elementId: string, config: any) => void;
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    clarity: (...args: any[]) => void;
  }
}

export {};