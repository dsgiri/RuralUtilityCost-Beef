import React from 'react';

export function AboutView() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-white min-h-[60vh]">
      <h1 className="text-4xl font-bold text-earth-dark mb-6 tracking-tight">About Rural Ops Tools | Beef</h1>
      
      <div className="prose prose-lg text-gray-700 space-y-6">
        <p>
          The <strong>Beef</strong> app is a specialized branch of the Rural Ops Tools master ecosystem (ruralopstools.com). Our focus is entirely on cattle economics, production planning, and profitability.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
        <p>
          We aim to help cattle producers, feedlot managers, and direct-market beef sellers make practical decisions using clear, simple estimator tools. The agribusiness environment requires careful planning; we provide the calculators to simplify complex economic forecasting.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Shared Ecosystem</h2>
        <p>
          This application shares branding, core philosophy, and legal frameworks with the broader Rural Ops Tools website. We believe in providing trustworthy, rural-focused tools that are accessible everywhere, particularly securely on mobile devices out in the field.
        </p>
      </div>
    </div>
  );
}
