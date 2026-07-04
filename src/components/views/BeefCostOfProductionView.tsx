import React, { useState } from 'react';
import { CalculatorDisclaimer } from '../disclaimer/CalculatorDisclaimer';

export function BeefCostOfProductionView() {
  const [herdSize, setHerdSize] = useState(100);
  const [calfCropPercent, setCalfCropPercent] = useState(85);
  const [calfWeaningWeight, setCalfWeaningWeight] = useState(550);
  
  // Variable Costs
  const [feedCosts, setFeedCosts] = useState(15000); 
  const [pastureCosts, setPastureCosts] = useState(8000); 
  const [vetCosts, setVetCosts] = useState(2500); 
  const [breedingCosts, setBreedingCosts] = useState(3000); 
  const [operatingInterest, setOperatingInterest] = useState(1200); 
  
  // Fixed Costs
  const [laborCosts, setLaborCosts] = useState(10000); 
  const [equipmentDepreciation, setEquipmentDepreciation] = useState(6000); 
  
  const [deathLossPercent, setDeathLossPercent] = useState(2);

  const totalVariableCosts = feedCosts + pastureCosts + vetCosts + breedingCosts + operatingInterest;
  const totalFixedCosts = laborCosts + equipmentDepreciation;
  const totalCost = totalVariableCosts + totalFixedCosts;

  const costPerCow = herdSize > 0 ? totalCost / herdSize : 0;
  
  const calvesWeaned = herdSize * (calfCropPercent / 100) * (1 - (deathLossPercent / 100));
  const costPerCalf = calvesWeaned > 0 ? totalCost / calvesWeaned : 0;
  
  const totalCalfWeight = calvesWeaned * calfWeaningWeight;
  const costPerPound = totalCalfWeight > 0 ? totalCost / totalCalfWeight : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white min-h-[60vh]">
      {/* 1. Above the Fold */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-800 rounded">COST OF PRODUCTION</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Beef Cost of Production Calculator</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-3xl">Estimate total and per-head costs for cow-calf or backgrounding operations to determine your true cost of production and breakeven points.</p>
      </div>

      {/* 2. The Calculator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* Input Column (Left) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Production Metrics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Herd Size (Number of Cows)</label>
                <input type="number" value={herdSize} onChange={(e) => setHerdSize(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Calf Crop Percentage (%)</label>
                <input type="number" value={calfCropPercent} onChange={(e) => setCalfCropPercent(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Expected Weaning Weight (lbs)</label>
                <input type="number" value={calfWeaningWeight} onChange={(e) => setCalfWeaningWeight(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Death Loss (%)</label>
                <input type="number" value={deathLossPercent} onChange={(e) => setDeathLossPercent(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Variable Costs (Total $)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Feed Costs</label>
                <input type="number" value={feedCosts} onChange={(e) => setFeedCosts(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Pasture/Land Lease</label>
                <input type="number" value={pastureCosts} onChange={(e) => setPastureCosts(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Veterinary & Health</label>
                <input type="number" value={vetCosts} onChange={(e) => setVetCosts(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Breeding Costs (AI/Bull)</label>
                <input type="number" value={breedingCosts} onChange={(e) => setBreedingCosts(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Interest on Operating Capital</label>
                <input type="number" value={operatingInterest} onChange={(e) => setOperatingInterest(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Fixed Costs (Total $)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Labor Costs (Owned & Hired)</label>
                <input type="number" value={laborCosts} onChange={(e) => setLaborCosts(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Equipment & Depreciation</label>
                <input type="number" value={equipmentDepreciation} onChange={(e) => setEquipmentDepreciation(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Output Column (Right) */}
        <div className="lg:col-span-4">
          <div className="sticky top-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl shadow-sm p-6 mb-4">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Production Costs</h2>
              
              <div className="space-y-6">
                <div>
                   <span className="block text-sm font-bold text-slate-500 uppercase mb-1">Total Cost</span>
                   <span className="text-4xl font-black text-slate-900">${totalCost.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                
                <div className="pt-4 border-t border-slate-200">
                   <span className="block text-sm font-bold text-slate-500 uppercase mb-1">Cost Per Cow</span>
                   <span className="text-3xl font-black text-blue-700">${costPerCow.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                </div>
                
                <div className="pt-4 border-t border-slate-200">
                   <span className="block text-sm font-bold text-slate-500 uppercase mb-1">Cost Per Calf</span>
                   <span className="text-2xl font-black text-slate-800">${costPerCalf.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                </div>
                
                <div className="pt-4 border-t border-slate-200">
                   <span className="block text-sm font-bold text-slate-500 uppercase mb-1">Cost Per Lb of Calf</span>
                   <span className="text-2xl font-black text-slate-800">${costPerPound.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-slate-100">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                   <span>Variable Costs:</span>
                   <span className="font-semibold">${(totalVariableCosts).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                   <span>Fixed Costs:</span>
                   <span className="font-semibold">${(totalFixedCosts).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                   <span>Calves Weaned:</span>
                   <span className="font-semibold">{calvesWeaned.toFixed(1)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download Report
              </button>
              <button className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-5.368m0 5.368l3.89 2.14m-3.89-2.14l3.89-2.14m5 6.14l-3.89-2.14m3.89 2.14a3 3 0 100-5.368m-5 6.14l3.89 2.14M5 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Share Results
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
              <li><strong>Total Cost:</strong> Sum of all variable and fixed costs provided.</li>
              <li><strong>Cost Per Cow:</strong> Total cost divided by the total herd size.</li>
              <li><strong>Calves Weaned:</strong> Calculated using the Herd Size × (Calf Crop % / 100) × (1 - (Death Loss % / 100)).</li>
              <li><strong>Cost Per Calf:</strong> Total Cost divided by the number of Calves Weaned.</li>
              <li><strong>Cost Per Pound:</strong> Total Cost divided by (Calves Weaned × Expected Weaning Weight).</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Key Definitions</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>Calf Crop %:</strong> The percentage of cows exposed to breeding that successfully produce a calf.</li>
              <li><strong>Variable Costs:</strong> Expenses that fluctuate with herd size and production volume (e.g., feed, vet).</li>
              <li><strong>Fixed Costs:</strong> Expenses that remain relatively stable regardless of production levels (e.g., equipment depreciation, fixed labor).</li>
              <li><strong>Death Loss:</strong> Expected mortality rate of calves before weaning.</li>
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
              <span>Why is calculating cost per pound important?</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="text-gray-600 mt-2 px-4 pb-4">
              Cost per pound determines your breakeven price when selling calves. If your cost per pound is $1.50, any market price above that is profit. Knowing this metric is crucial for marketing decisions.
            </div>
          </details>
          <details className="group border border-gray-200 rounded-lg bg-white">
            <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-gray-900">
              <span>How do I determine equipment depreciation?</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="text-gray-600 mt-2 px-4 pb-4">
              A standard straight-line depreciation method is often used for planning: (Purchase Price - Salvage Value) / Useful Life in Years. Alternatively, consult your tax advisor for the depreciation schedules used on your tax returns.
            </div>
          </details>
        </div>
      </div>

      {/* Assumptions & Disclaimer */}
      <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-600 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-2">Assumptions & Disclaimer</h3>
        <p className="mb-2">This calculator assumes a simplified operation structure. It does not account for complex tax implications, specific financing structures, or highly variable regional market factors.</p>
        <CalculatorDisclaimer toolSpecificNotice="Beef market conditions and feed prices change rapidly. This tool is for educational and estimation purposes only." />
      </div>
    </div>
  );
}
