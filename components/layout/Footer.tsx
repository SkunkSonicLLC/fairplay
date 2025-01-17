import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Systems
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link 
                  href="/kathy" 
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Kathy System
                </Link>
              </li>
              <li>
                <Link 
                  href="/luma" 
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Luma System
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link 
                  href="/guide" 
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  User Guide
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              About
            </h3>
            <p className="mt-4 text-base text-gray-500">
              FairPlay is a creative writing game that combines environmental awareness
              with artistic expression through the Kathy and Luma systems.
            </p>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-base text-gray-400">
            © {new Date().getFullYear()} FairPlay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
