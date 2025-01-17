// import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  const linkClasses = (path: string) => `
    inline-flex items-center px-1 pt-1 text-sm font-medium
    ${isActive(path) 
      ? 'text-indigo-600 border-b-2 border-indigo-600' 
      : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'}
  `;

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                FairPlay
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/kathy"
                className={linkClasses('/kathy')}
              >
                Kathy System
              </Link>
              <Link
                href="/luma"
                className={linkClasses('/luma')}
              >
                Luma System
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Share Progress
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
