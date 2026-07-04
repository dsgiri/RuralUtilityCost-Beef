import React from 'react';

export function ContactView() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-white min-h-[60vh]">
      <h1 className="text-4xl font-bold text-earth-dark mb-6 tracking-tight">Contact Us</h1>
      
      <div className="prose prose-lg text-gray-700 space-y-6">
        <p>
          As part of the Rural Ops Tools network, all inquiries relating to the <strong>Beef</strong> app tools or the master site are processed centrally.
        </p>
        
        <div className="bg-earth-light p-6 rounded-lg border border-gray-200 mt-8 text-center max-w-md mx-auto">
          <p className="font-semibold text-gray-900 mb-2">Master Site Inquiries</p>
          <p className="text-rural-blue mb-4">hello@ruralopstools.com</p>
          <p className="text-sm border-t border-gray-300 pt-4 text-gray-600">
            Please include "Beef App" in your subject line if your inquiry relates to our cattle production tools.
          </p>
        </div>
      </div>
    </div>
  );
}
