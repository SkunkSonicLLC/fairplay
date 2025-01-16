import React from 'react';
import KathySystem from '../components/KathySystem';
import LumaSystem from '../components/LumaSystem';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Fair Play</h1>
      <div className="space-y-12">
        <KathySystem />
        <LumaSystem />
      </div>
    </div>
  );
}
