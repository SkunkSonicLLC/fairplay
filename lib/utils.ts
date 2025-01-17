// src/lib/utils.ts
import { GridPosition } from '../types/core';

export const generateSessionId = (): string => {
  return `session_${Math.random().toString(36).substring(2, 15)}`;
};

export const validateVerse = (verse: string): boolean => {
  if (!verse || typeof verse !== 'string') return false;
  return verse.length >= 15 && verse.length <= 250;
};

export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): Promise<ReturnType<F>> => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    return new Promise(resolve => {
      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
  };
};

export const isValidGridPosition = (position: GridPosition, gridSize: number): boolean => {
  return (
    position.row >= 0 &&
    position.row < gridSize &&
    position.col >= 0 &&
    position.col < gridSize
  );
};

export const calculateProgress = (completed: number, total: number): number => {
  return Math.round((completed / total) * 100);
};

export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString();
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const setLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};

export const cleanupLocalStorage = (keys: string[]): void => {
  if (typeof window === 'undefined') return;
  keys.forEach(key => window.localStorage.removeItem(key));
};
