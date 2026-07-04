import React, { useState } from 'react';
import { CalculatorDisclaimer } from '../disclaimer/CalculatorDisclaimer';

export function PasturedBeefView() {
  const [pastureAcres, setPastureAcres] = useState(100);
  const [pastureCostPerAcre, setPastureCostPerAcre] = useState(45);
  
  const [numAnimals, setNumAnimals] = useState(50);
  const [forageCostPerHead, setForageCostPerHead] = useState(150); // Supplemental forage/winter
  
  const [directMarketingPrice, setDirectMarketingPrice] = useState(7.50); // $/lb retail
  const [retailYieldPerHead, setRetailYieldPerHead] = useState(400); // lbs of retail cuts per animal
  
  const [processingFeePerHead, setProcessingFeePerHead] = useState(850);
  const [laborOverhead, setLaborOverhead] = useState(5000); // Total fixed overhead

  const totalPastureCost = pastureAcres * pastureCostPerAcre;
  const totalForageCost = numAnimals * forageCostPerHead;
  const totalProcessingCost = numAnimals * processingFeePerHead;
  
  const totalExpenses = totalPastureCost + totalForageCost + totalProcessingCost + laborOverhead;
  
  const grossRevenue = numAnimals * retailYieldPerHead * directMarketingPrice;
  const netProfit = grossRevenue - totalExpenses;
  
  const profitPerAcre = pastureAcres > 0 ? netProfit / pastureAcres : 0;
  const profitPerHead = numAnimals > 0 ? netProfit / numAnimals : 0;
  const roi = totalExpenses > 0 ? (netProfit / totalExpenses) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white min-h-[60vh]">
      {/* 1. Above the Fold */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-800 rounded">PASTURE-RAISED BEEF</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Pastured Beef Enterprise Planner</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-3xl">Plan grass-finished beef operations from pasture costs to direct consumer sales revenue.</p>
      </div>

      {/* 2. The Calculator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* Input Column (Left) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Production & Costs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Pasture Acres</label>
                <input type="number" value={pastureAcres} onChange={(e) => setPastureAcres(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Cost / Acre ($)</label>
                <input type="number" value={pastureCostPerAcre} onChange={(e) => setPastureCostPerAcre(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Animals</label>
                <input type="number" value={numAnimals} onChange={(e) => setNumAnimals(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Supp. Forage ($/hd)</label>
                <input type="number" value={forageCostPerHead} onChange={(e) => setForageCostPerHead(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Labor & Overhead ($ Total)</label>
                <input type="number" value={laborOverhead} onChange={(e) => setLaborOverhead(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Marketing & Processing</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Processing/Butcher Fee ($/hd)</label>
                <input type="number" value={processingFeePerHead} onChange={(e) => setProcessingFeePerHead(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Retail Yield (lbs/hd)</label>
                <input type="number" value={retailYieldPerHead} onChange={(e) => setRetailYieldPerHead(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Retail Price ($/lb)</label>
                <input type="number" value={directMarketingPrice} onChange={(e) => setDirectMarketingPrice(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Output Column (Right) */}
        <div className="lg:col-span-4">
          <div className="sticky top-6">
            <div className={`border rounded-xl shadow-lg p-6 mb-4 ${netProfit >= 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
              <h2 className="text-xl font-bold text-slate-900 mb-6">Financial Results</h2>
              
              <div className="space-y-6">
                <div>
                   <span className="block text-sm font-bold text-slate-500 uppercase mb-1">Net Profit</span>
                   <span className={`text-5xl font-black ${netProfit >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>${netProfit.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                
                <div className="pt-4 border-t border-slate-200 border-opacity-60 flex justify-between items-center">
                   <span className="block text-sm font-bold text-slate-500 uppercase">Gross Revenue</span>
                   <span className="text-xl font-black text-slate-800">${grossRevenue.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                
                <div className="pt-2 flex justify-between items-center">
                   <span className="block text-sm font-bold text-slate-500 uppercase">Profit / Head</span>
                   <span className="text-xl font-black text-slate-800">${profitPerHead.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>

                <div className="pt-2 flex justify-between items-center">
                   <span className="block text-sm font-bold text-slate-500 uppercase">Enterprise ROI</span>
                   <span className="text-xl font-black text-slate-800">{roi.toLocaleString(undefined, {maximumFractionDigits: 1})}%</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-200 border-opacity-60 text-center w-full">
                <span className={`inline-block px-4 py-2 rounded-lg text-sm font-bold tracking-wide ${netProfit >= 0 ? 'bg-emerald-200 text-emerald-900' : 'bg-red-200 text-red-900'}`}>
                  Profit Per Acre: ${profitPerAcre.toLocaleString(undefined, {maximumFractionDigits: 2})}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Export Plan
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
              <li><strong>Total Expenses:</strong> Pasture Costs + Forage + Processing Fees + Overhead.</li>
              <li><strong>Gross Revenue:</strong> Number of Animals × Retail Yield per Head × Retail Price.</li>
              <li><strong>Net Profit:</strong> Gross Revenue - Total Expenses.</li>
              <li><strong>ROI:</strong> (Net Profit / Total Expenses) × 100.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Key Definitions</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>Retail Yield:</strong> The actual pounds of packaged meat returned from the butcher. This is significantly less than the live animal weight.</li>
              <li><strong>Processing Fee:</strong> The cost charged by the butcher for slaughter, cut, wrap, and freezing. In direct-to-consumer models, the farmer often absorbs or passes on this cost.</li>
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
              <span>Why are processing costs so high?</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="text-gray-600 mt-2 px-4 pb-4">
              Local, USDA-inspected custom processing is labor-intensive. It usually includes a kill fee plus a per-pound charge on the hanging weight. When direct marketing, processing is often the single largest expense per animal.
            </div>
          </details>
        </div>
      </div>

      {/* Assumptions & Disclaimer */}
      <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-600 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-2">Assumptions & Disclaimer</h3>
        <p className="mb-2">This is a high-level enterprise planner. Marketing costs (website, advertising, farmers market fees) should be factored into overhead.</p>
        <CalculatorDisclaimer toolSpecificNotice="Consumer demand and pasture yields can fluctuate wildly." />
      </div>
    </div>
  );
}
