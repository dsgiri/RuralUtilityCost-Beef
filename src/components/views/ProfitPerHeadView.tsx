import React, { useState } from 'react';
import { CalculatorDisclaimer } from '../disclaimer/CalculatorDisclaimer';

export function ProfitPerHeadView() {
  const [marketPrice, setMarketPrice] = useState(170); // $/cwt
  const [saleWeight, setSaleWeight] = useState(1400); // lbs
  const [totalCost, setTotalCost] = useState(2100); // $/head
  const [marketingFees, setMarketingFees] = useState(45); // $/head (trucking, commission, etc)

  const grossRevenue = (saleWeight / 100) * marketPrice;
  const netRevenue = grossRevenue - marketingFees;
  const expectedMargin = netRevenue - totalCost;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white min-h-[60vh]">
      {/* 1. Above the Fold */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-800 rounded">PROFITABILITY</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profit per Head Estimator</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-3xl">Quickly estimate potential profit margins by comparing current market price against expected production costs.</p>
      </div>

      {/* 2. The Calculator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* Input Column (Left) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Revenue Assumptions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Expected Sale Weight (lbs)</label>
                <input type="number" value={saleWeight} onChange={(e) => setSaleWeight(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Current Market Price ($/cwt)</label>
                <input type="number" value={marketPrice} onChange={(e) => setMarketPrice(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Cost Assumptions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Estimated Total Cost ($/head)</label>
                <input type="number" value={totalCost} onChange={(e) => setTotalCost(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Trucking & Marketing Fees ($/head)</label>
                <input type="number" value={marketingFees} onChange={(e) => setMarketingFees(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Output Column (Right) */}
        <div className="lg:col-span-4">
          <div className="sticky top-6">
            <div className={`border rounded-xl shadow-sm p-6 mb-4 ${expectedMargin >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <h2 className="text-xl font-bold text-slate-900 mb-6">Financial Summary</h2>
              
              <div className="space-y-6">
                <div>
                   <span className="block text-sm font-bold text-slate-500 uppercase mb-1">Expected Margin (Profit)</span>
                   <span className={`text-5xl font-black ${expectedMargin >= 0 ? 'text-green-700' : 'text-red-700'}`}>${expectedMargin.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                </div>
                
                <div className="pt-4 border-t border-slate-200 border-opacity-50 flex justify-between items-center">
                   <span className="block text-sm font-bold text-slate-500 uppercase mb-1">Gross Revenue</span>
                   <span className="text-xl font-black text-slate-800">${grossRevenue.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                </div>
                
                <div className="pt-2 flex justify-between items-center">
                   <span className="block text-sm font-bold text-slate-500 uppercase mb-1">Total Deductions</span>
                   <span className="text-xl font-black text-slate-800">${(totalCost + marketingFees).toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-200 border-opacity-50 text-center w-full">
                {expectedMargin >= 0 ? (
                   <span className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold tracking-wide uppercase w-full">Profitable Scenario</span>
                ) : (
                   <span className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold tracking-wide uppercase w-full">Operating at a Loss</span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Print Summary
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Below the Fold (Supporting Context) */}
      <div className="mb-16 border-t border-gray-200 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works & Definitions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Formula Breakdown</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>Gross Revenue:</strong> (Sale Weight / 100) × Current Market Price.</li>
              <li><strong>Total Deductions:</strong> Estimated Total Cost + Trucking & Marketing Fees.</li>
              <li><strong>Expected Margin:</strong> Gross Revenue - Total Deductions.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Key Definitions</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>Marketing Fees:</strong> Includes brand inspection, checkoff dollars, commission fees, and transportation to the sale facility.</li>
              <li><strong>CWT:</strong> Hundredweight. 1400 lbs equals 14 cwt.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Trust and Engagement Elements */}
      <div className="mb-16 border-t border-gray-200 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="group border border-gray-200 rounded-lg bg-white">
            <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-gray-900">
              <span>Should I include my labor in the total cost?</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="text-gray-600 mt-2 px-4 pb-4">
              Yes. Even if you are the sole owner-operator, you should assign a fair market value to your labor and include it in your Estimated Total Cost. Otherwise, you are subsidizing the operation with free labor rather than realizing a true business profit.
            </div>
          </details>
        </div>
      </div>

      {/* Assumptions & Disclaimer */}
      <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-600 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-2">Assumptions & Disclaimer</h3>
        <p className="mb-2">Estimates are for planning purposes and do not guarantee future profitability. Shrink is not automatically deducted here; adjust your sale weight to account for expected shrink.</p>
        <CalculatorDisclaimer toolSpecificNotice="Market prices fluctuate daily." />
      </div>
    </div>
  );
}
