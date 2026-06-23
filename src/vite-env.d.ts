/// <reference types="vite/client" />

declare module '@fontsource-variable/inter';
declare module '@fontsource/geist-sans/500.css';
declare module '@fontsource/geist-sans/600.css';
declare module '@fontsource/noto-sans-devanagari/400.css';

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
