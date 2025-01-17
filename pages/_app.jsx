// src/pages/_app.tsx
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { SongProvider } from '../contexts/SongContext';
import { moduleManager } from '../lib/moduleManager';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const initializeModules = async () => {
      try {
        await moduleManager.initializeModule('kathy');
        await moduleManager.initializeModule('luma');
      } catch (error) {
        console.error('Failed to initialize modules:', error);
      }
    };

    initializeModules();
  }, []);

  return (
    <SongProvider>
      <Component {...pageProps} />
    </SongProvider>
  );
}

export default MyApp;
