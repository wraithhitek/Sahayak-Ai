
declare global {
  interface Window {
    google: any; // Or a more specific type if you have one
    googleTranslateElementInit: () => void;
  }
}

// This empty export is needed to treat the file as a module.
export {};
