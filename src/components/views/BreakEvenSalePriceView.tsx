import React, { useState } from 'react';
import { CalculatorDisclaimer } from '../disclaimer/CalculatorDisclaimer';

export function BreakEvenSalePriceView() {
  const [purchaseCost, setPurchaseCost] = useState(1350); 
  const [feedingCosts, setFeedingCosts] = useState(500); 
  const [vetCosts, setVetCosts] = useState(25);
  const [interestCosts, setInterestCosts] = useState(35);
  const [projectedSaleWeight, setProjectedSaleWeight] = useState(1400); 
  const [deathLossPercent, setDeathLossPercent] = useState(1.5);
  
  const totalCost = purchaseCost + feedingCosts + vetCosts + interestCosts;
  const effectiveSaleWeight = projectedSaleWeight * (1 - (deathLossPercent / 100));
  
  const breakevenCwt = effectiveSaleWeight > 0 ? (totalCost / effectiveSaleWeight) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white min-h-[60vh]">
      {/* 1. Above the Fold */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-800 rounded">BREAK-EVEN PRICE</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Break-Even Sale Price Calculator</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-3xl">Determine the minimum sale price (per hundredweight) needed to cover all rearing and feeding expenses.</p>
      </div>

      {/* 2. The Calculator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* Input Column (Left) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Costs Per Head ($)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Purchase Cost</label>
                <input type="number" value={purchaseCost} onChange={(e) => setPurchaseCost(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">All-in Feeding & Yardage</label>
                <input type="number" value={feedingCosts} onChange={(e) => setFeedingCosts(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Health & Veterinary</label>
                <input type="number" value={vetCosts} onChange={(e) => setVetCosts(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Interest / Financing</label>
                <input type="number" value={interestCosts} onChange={(e) => setInterestCosts(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Sale Assumptions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Projected Sale Weight (lbs)</label>
                <input type="number" value={projectedSaleWeight} onChange={(e) => setProjectedSaleWeight(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Death Loss (%)</label>
                <input type="number" value={deathLossPercent} onChange={(e) => setDeathLossPercent(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded flex justify-between items-center">
               <div className="text-sm text-slate-600 font-bold uppercase tracking-wider">Total All-In Cost Per Head</div>
               <div className="text-xl font-bold text-slate-900">${totalCost.toLocaleString(undefined, {maximumFractionDigits: 2})}</div>
            </div>
          </div>
        </div>

        {/* Output Column (Right) */}
        <div className="lg:col-span-4">
          <div className="sticky top-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-8 mb-4 flex flex-col items-center text-center">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Break-Even Sale Price</h2>
              
              <div className="text-5xl font-black text-white mb-2">
                ${breakevenCwt.toLocaleString(undefined, {maximumFractionDigits: 2})}
              </div>
              <div className="text-2xl text-slate-400 font-medium mb-6">per cwt</div>
              
              <p className="text-slate-400 text-sm">
                This is the minimum market price you must receive to exactly cover your total investment of <strong>${totalCost.toLocaleString()}</strong> per head (accounting for a {deathLossPercent}% death loss).
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download Report
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
              <li><strong>Total Cost:</strong> Sum of Purchase Cost, Feeding Costs, Vet Costs, and Interest.</li>
              <li><strong>Effective Sale Weight:</strong> The projected sale weight multiplied by (1 - Death Loss %).</li>
              <li><strong>Break-Even Price:</strong> (Total Cost / Effective Sale Weight) × 100 to convert to price per hundredweight (cwt).</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Key Definitions</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>All-in Feeding & Yardage:</strong> The total cost of feed and daily overhead for the entire feeding period.</li>
              <li><strong>Death Loss:</strong> The expected percentage of animals that will not survive to sale, distributing their cost over the survivors.</li>
              <li><strong>Hundredweight (cwt):</strong> A standard unit of weight in the cattle industry equal to 100 pounds.</li>
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
              <span>Why is the break-even price higher than I expected?</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="text-gray-600 mt-2 px-4 pb-4">
              Break-even prices are highly sensitive to both the initial purchase cost of the feeder cattle and feed prices. Additionally, factoring in death loss accurately raises the break-even price, as the surviving cattle must cover the cost of the losses.
            </div>
          </details>
        </div>
      </div>

      {/* Assumptions & Disclaimer */}
      <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-600 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-2">Assumptions & Disclaimer</h3>
        <p className="mb-2">This tool assumes static input costs and a linear death loss distribution. It is intended for quick planning.</p>
        <CalculatorDisclaimer toolSpecificNotice="Future market prices are not guaranteed." />
      </div>
    </div>
  );
}
