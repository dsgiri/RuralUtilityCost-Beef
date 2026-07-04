import React, { useState } from 'react';
import { CalculatorDisclaimer } from '../disclaimer/CalculatorDisclaimer';

export function CarcassYieldView() {
  const [liveWeight, setLiveWeight] = useState(1350);
  const [dressingPercent, setDressingPercent] = useState(62);
  const [retailYieldPercent, setRetailYieldPercent] = useState(65); 

  const hotCarcassWeight = liveWeight * (dressingPercent / 100);
  const totalRetailBeef = hotCarcassWeight * (retailYieldPercent / 100);
  const fatAndBoneLoss = hotCarcassWeight - totalRetailBeef;

  const chuck = totalRetailBeef * 0.29;
  const round = totalRetailBeef * 0.22;
  const loin = totalRetailBeef * 0.16;
  const rib = totalRetailBeef * 0.11;
  const brisketFlankPlate = totalRetailBeef * 0.22; 

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white min-h-[60vh]">
      {/* 1. Above the Fold */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-800 rounded">YIELD & CARCASS</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Carcass Yield Estimator</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-3xl">Forecast hanging weight and retail cut yields based on live animal weight.</p>
      </div>

      {/* 2. The Calculator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* Input Column (Left) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Animal Specs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Live Animal Weight (lbs)</label>
                <input type="number" value={liveWeight} onChange={(e) => setLiveWeight(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Dressing Percentage (%) <span className="font-normal text-xs text-gray-500">(Typical 58-63%)</span></label>
                <input type="number" value={dressingPercent} onChange={(e) => setDressingPercent(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Retail Cutting Yield (%) <span className="font-normal text-xs text-gray-500">(Of hanging weight, typically 60-65%)</span></label>
                <input type="number" value={retailYieldPercent} onChange={(e) => setRetailYieldPercent(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-4 mb-4">Estimated Primal Yield (lbs)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-slate-50 rounded border border-slate-100">
                 <span className="block text-xs font-semibold text-slate-500 uppercase mb-1">Chuck (29%)</span>
                 <span className="text-2xl font-bold text-slate-900">{chuck.toFixed(0)}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded border border-slate-100">
                 <span className="block text-xs font-semibold text-slate-500 uppercase mb-1">Round (22%)</span>
                 <span className="text-2xl font-bold text-slate-900">{round.toFixed(0)}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded border border-slate-100">
                 <span className="block text-xs font-semibold text-slate-500 uppercase mb-1">Loin (16%)</span>
                 <span className="text-2xl font-bold text-slate-900">{loin.toFixed(0)}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded border border-slate-100">
                 <span className="block text-xs font-semibold text-slate-500 uppercase mb-1">Rib (11%)</span>
                 <span className="text-2xl font-bold text-slate-900">{rib.toFixed(0)}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded border border-slate-100">
                 <span className="block text-xs font-semibold text-slate-500 uppercase mb-1">Other (22%)</span>
                 <span className="text-2xl font-bold text-slate-900">{brisketFlankPlate.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Output Column (Right) */}
        <div className="lg:col-span-4">
          <div className="sticky top-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 mb-4">
              <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-2">Weight Progression</h2>
              
              <div className="space-y-4">
                 <div className="flex justify-between items-center bg-slate-800 p-4 rounded-lg">
                    <span className="font-medium text-slate-300">Live Weight</span>
                    <span className="font-bold text-white">{liveWeight.toFixed(0)} lbs</span>
                 </div>
                 
                 <div className="flex justify-center text-slate-500 text-sm italic">
                    ↓ Drop: {(liveWeight - hotCarcassWeight).toFixed(0)} lbs (Hide, organs)
                 </div>
                 
                 <div className="flex justify-between items-center bg-slate-700 p-4 rounded-lg">
                    <span className="font-medium text-slate-200">Hot Carcass (Hanging)</span>
                    <span className="font-bold text-white">{hotCarcassWeight.toFixed(0)} lbs</span>
                 </div>
                 
                 <div className="flex justify-center text-slate-500 text-sm italic">
                    ↓ Trim: {fatAndBoneLoss.toFixed(0)} lbs (Fat, bone)
                 </div>
                 
                 <div className="flex justify-between items-center bg-blue-900 p-4 rounded-lg border-2 border-blue-500 shadow-inner">
                    <span className="font-bold text-white">Total Retail Beef</span>
                    <span className="text-2xl font-black text-white">{totalRetailBeef.toFixed(0)} lbs</span>
                 </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Print Yield Chart
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
              <li><strong>Hot Carcass Weight:</strong> Live Weight × Dressing Percentage.</li>
              <li><strong>Total Retail Beef:</strong> Hot Carcass Weight × Retail Yield Percentage.</li>
              <li><strong>Primal Estimates:</strong> Approximate industry averages applied to the Total Retail Beef.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Key Definitions</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>Dressing Percentage:</strong> The proportion of the live animal's weight that makes up the hot carcass. The rest is known as the "drop" (hide, head, feet, internal organs).</li>
              <li><strong>Retail Cutting Yield:</strong> The percentage of the hanging weight that ends up as packaged meat after trimming fat and removing bone. Heavily dependent on whether cuts are boneless or bone-in.</li>
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
              <span>Why do I lose so much weight from live to retail?</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="text-gray-600 mt-2 px-4 pb-4">
              It's standard biology. Roughly 38-42% of a live steer is hide, blood, and organs (lost during dressing). Of the remaining carcass, another 35-40% is bone, excess fat, and moisture lost during hanging. Ultimately, only about 40% of the live animal weight becomes retail meat.
            </div>
          </details>
        </div>
      </div>

      {/* Assumptions & Disclaimer */}
      <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-600 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-2">Assumptions & Disclaimer</h3>
        <p className="mb-2">Primal yield percentages are industry averages. Actual yields depend heavily on individual animal genetics, degree of finish, and the specific cutting instructions given to the processor.</p>
        <CalculatorDisclaimer toolSpecificNotice="Expect variations of +/- 5% in actual yields." />
      </div>
    </div>
  );
}
