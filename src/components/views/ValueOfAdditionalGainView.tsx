import React, { useState } from 'react';
import { CalculatorDisclaimer } from '../disclaimer/CalculatorDisclaimer';

export function ValueOfAdditionalGainView() {
  const [currentWeight, setCurrentWeight] = useState(700);
  const [currentPriceCwt, setCurrentPriceCwt] = useState(240);
  
  const [targetWeight, setTargetWeight] = useState(850);
  const [projectedPriceCwt, setProjectedPriceCwt] = useState(215); 
  
  const [costOfGain, setCostOfGain] = useState(1.10); // $/lb of gain
  const [daysRequired, setDaysRequired] = useState(60);
  const [carryingCostPerDay, setCarryingCostPerDay] = useState(0.45); // yardage/interest

  const currentRevenue = (currentWeight / 100) * currentPriceCwt;
  const projectedRevenue = (targetWeight / 100) * projectedPriceCwt;
  
  const revenueGained = projectedRevenue - currentRevenue;
  
  const poundsGained = targetWeight - currentWeight;
  const feedCost = poundsGained * costOfGain;
  const carryingCost = daysRequired * carryingCostPerDay;
  const totalCostOfAdditionalGain = feedCost + carryingCost;
  
  const netValueOfGain = revenueGained - totalCostOfAdditionalGain;
  const breakevenCostOfGain = poundsGained > 0 ? revenueGained / poundsGained : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white min-h-[60vh]">
      {/* 1. Above the Fold */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-800 rounded">ENTERPRISE ANALYSIS</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Value of Additional Gain</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-3xl">Determine if keeping and feeding cattle to a heavier target weight is economically justified compared to selling today.</p>
      </div>

      {/* 2. The Calculator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* Input Column (Left) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Current State (Sell Now)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Current Wt (lbs)</label>
                <input type="number" value={currentWeight} onChange={(e) => setCurrentWeight(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($/cwt)</label>
                <input type="number" value={currentPriceCwt} onChange={(e) => setCurrentPriceCwt(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Future State (Keep Feeding)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Target Wt (lbs)</label>
                <input type="number" value={targetWeight} onChange={(e) => setTargetWeight(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Proj. Price ($/cwt)</label>
                <input type="number" value={projectedPriceCwt} onChange={(e) => setProjectedPriceCwt(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Cost to Add Gain</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Cost of Gain ($/lb)</label>
                <input type="number" value={costOfGain} onChange={(e) => setCostOfGain(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Days Required</label>
                <input type="number" value={daysRequired} onChange={(e) => setDaysRequired(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Carrying Cost ($/day)</label>
                <input type="number" value={carryingCostPerDay} onChange={(e) => setCarryingCostPerDay(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Output Column (Right) */}
        <div className="lg:col-span-4">
          <div className="sticky top-6">
            <div className={`border rounded-xl shadow-lg p-6 mb-4 ${netValueOfGain >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <h2 className="text-xl font-bold text-slate-900 mb-6">Gain Economics</h2>
              
              <div className="space-y-6">
                <div>
                   <span className="block text-sm font-bold text-slate-500 uppercase mb-1">Net Value of Gain</span>
                   <span className={`text-5xl font-black ${netValueOfGain >= 0 ? 'text-green-700' : 'text-red-700'}`}>${netValueOfGain.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                   <span className="text-sm text-slate-600 block mt-1">(per head)</span>
                </div>
                
                <div className="pt-4 border-t border-slate-200 border-opacity-60 flex justify-between items-center">
                   <span className="block text-sm font-bold text-slate-500 uppercase">Value of Added Wt</span>
                   <span className="text-xl font-black text-slate-800">+${revenueGained.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                </div>
                
                <div className="pt-2 flex justify-between items-center">
                   <span className="block text-sm font-bold text-slate-500 uppercase">Cost to Add Wt</span>
                   <span className="text-xl font-black text-slate-800">-${totalCostOfAdditionalGain.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-slate-900 rounded-lg text-center w-full">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Max Breakeven COG</span>
                <span className="text-2xl font-black text-white">${breakevenCostOfGain.toLocaleString(undefined, {maximumFractionDigits: 2})} <span className="text-sm font-normal">/ lb</span></span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Copy Results
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
              <li><strong>Value of Added Weight:</strong> Projected Revenue - Current Revenue.</li>
              <li><strong>Cost to Add Weight:</strong> (Lbs Gained × Cost of Gain) + (Days Required × Carrying Cost).</li>
              <li><strong>Net Value of Gain:</strong> Value of Added Weight - Cost to Add Weight.</li>
              <li><strong>Breakeven COG:</strong> The maximum you can spend per pound of gain before losing money on the decision to hold the cattle.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Key Definitions</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>Price Slide:</strong> Heavier cattle generally sell for less per pound (cwt) than lighter cattle. You must account for this drop in price when projecting future revenue.</li>
              <li><strong>Carrying Cost:</strong> Daily non-feed expenses such as yardage, labor, and interest on the cattle note.</li>
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
              <span>Why did my cattle gain value but I still lost money?</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="text-gray-600 mt-2 px-4 pb-4">
              This usually happens due to the "price slide." Even though the animal is heavier and worth more total dollars, the price per pound dropped significantly. If your cost to put on those extra pounds was higher than the incremental value gained, your net return is negative.
            </div>
          </details>
        </div>
      </div>

      {/* Assumptions & Disclaimer */}
      <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-600 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-2">Assumptions & Disclaimer</h3>
        <p className="mb-2">This analysis assumes the animal survives the additional feeding period and meets the target weight. Risk increases with time on feed.</p>
        <CalculatorDisclaimer toolSpecificNotice="Future prices are estimates. Consider using hedging tools if margins are tight." />
      </div>
    </div>
  );
}
