// src/pages/index.tsx
import type { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../components/layout/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Welcome to FairPlay</span>
            <span className="block text-indigo-600">Creative Writing Game</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Choose your creative journey with either the Kathy System or Luma System.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Link 
              href="/kathy"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 mx-2"
            >
              Kathy System
            </Link>
            <Link
              href="/luma"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 mx-2"
            >
              Luma System
            </Link>
          </div>
        </div>

        {/* System descriptions */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Kathy System
              </h3>
              <div className="mt-2 text-sm text-gray-500">
                <p>
                  A 4x4 grid system focusing on environmental and community themes.
                  Perfect for collaborative storytelling and social impact narratives.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Luma System
              </h3>
              <div className="mt-2 text-sm text-gray-500">
                <p>
                  A 5x5 grid system exploring light, motion, and experimental themes.
                  Ideal for creative expression and artistic exploration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
