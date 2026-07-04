import React, { useState } from 'react';
import { CalculatorDisclaimer } from '../disclaimer/CalculatorDisclaimer';

export function FeedlotCloseoutView() {
  const [purchaseWeight, setPurchaseWeight] = useState(750);
  const [purchasePricePerCwt, setPurchasePricePerCwt] = useState(180);
  
  const [daysOnFeed, setDaysOnFeed] = useState(150);
  const [adg, setAdg] = useState(3.2); // Average Daily Gain
  const [feedConversion, setFeedConversion] = useState(6.5); // lbs of feed per lb of gain
  const [feedCostPerTon, setFeedCostPerTon] = useState(250); // Dry matter basis
  
  const [yardagePerDay, setYardagePerDay] = useState(0.45);
  const [interestPerHead, setInterestPerHead] = useState(25);
  const [vetCosts, setVetCosts] = useState(15);
  const [deathLossPercent, setDeathLossPercent] = useState(1.5);
  
  const [salePricePerCwt, setSalePricePerCwt] = useState(165);
  const [saleWeight, setSaleWeight] = useState(1350); 

  // Calculations
  const purchaseCost = (purchaseWeight / 100) * purchasePricePerCwt;
  const totalGain = daysOnFeed * adg;
  const estimatedFinalWeight = purchaseWeight + totalGain;
  
  const totalFeedRequiredLbs = totalGain * feedConversion;
  const feedCostPerLb = feedCostPerTon / 2000;
  const totalFeedCost = totalFeedRequiredLbs * feedCostPerLb;
  
  const totalYardage = daysOnFeed * yardagePerDay;
  const totalOperatingCosts = totalFeedCost + totalYardage + vetCosts + interestPerHead;
  
  const totalCost = purchaseCost + totalOperatingCosts;
  
  const effectiveSaleWeight = saleWeight * (1 - (deathLossPercent / 100));
  const revenuePerHead = (effectiveSaleWeight / 100) * salePricePerCwt;
  
  const netReturn = revenuePerHead - totalCost;
  const costOfGain = totalGain > 0 ? totalOperatingCosts / totalGain : 0;
  
  const breakevenSalePrice = effectiveSaleWeight > 0 ? (totalCost / effectiveSaleWeight) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white min-h-[60vh]">
      {/* 1. Above the Fold */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-800 rounded">FEEDLOT CLOSEOUT</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Feedlot Closeout Calculator</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-3xl">Analyze the final financial performance of a finished pen of cattle at the end of the feeding period.</p>
      </div>

      {/* 2. The Calculator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* Input Column (Left) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Purchase & Setup</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Purchase Wt (lbs)</label>
                <input type="number" value={purchaseWeight} onChange={(e) => setPurchaseWeight(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Purchase Price ($/cwt)</label>
                <input type="number" value={purchasePricePerCwt} onChange={(e) => setPurchasePricePerCwt(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Days on Feed</label>
                <input type="number" value={daysOnFeed} onChange={(e) => setDaysOnFeed(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">ADG (lbs/day)</label>
                <input type="number" value={adg} onChange={(e) => setAdg(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Death Loss (%)</label>
                <input type="number" value={deathLossPercent} onChange={(e) => setDeathLossPercent(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Feed & Operating</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Feed Conversion (lbs feed / lb gain)</label>
                <input type="number" value={feedConversion} onChange={(e) => setFeedConversion(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Feed Cost ($/Ton)</label>
                <input type="number" value={feedCostPerTon} onChange={(e) => setFeedCostPerTon(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
               <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Yardage ($/day)</label>
                <input type="number" value={yardagePerDay} onChange={(e) => setYardagePerDay(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Interest ($/hd)</label>
                <input type="number" value={interestPerHead} onChange={(e) => setInterestPerHead(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Veterinary ($/hd)</label>
                <input type="number" value={vetCosts} onChange={(e) => setVetCosts(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Sale Assumptions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Sale Weight (lbs)</label>
                <div className="text-xs text-gray-500 mb-1">Estimated final: {estimatedFinalWeight.toFixed(0)} lbs</div>
                <input type="number" value={saleWeight} onChange={(e) => setSaleWeight(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Sale Price ($/cwt)</label>
                <div className="text-xs text-gray-500 mb-1">&nbsp;</div>
                <input type="number" value={salePricePerCwt} onChange={(e) => setSalePricePerCwt(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Output Column (Right) */}
        <div className="lg:col-span-4">
          <div className="sticky top-6">
            <div className={`border rounded-xl shadow-sm p-6 mb-4 ${netReturn >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <h2 className="text-xl font-bold text-slate-900 mb-6">Closeout Results</h2>
              
              <div className="space-y-6">
                <div>
                   <span className="block text-sm font-bold text-slate-500 uppercase mb-1">Net Return (Per Head)</span>
                   <span className={`text-5xl font-black ${netReturn >= 0 ? 'text-green-700' : 'text-red-700'}`}>${netReturn.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                </div>
                
                <div className="pt-4 border-t border-slate-200 border-opacity-50">
                   <span className="block text-sm font-bold text-slate-500 uppercase mb-1">Cost of Gain (COG)</span>
                   <span className="text-2xl font-black text-slate-800">${costOfGain.toLocaleString(undefined, {maximumFractionDigits: 2})} <span className="text-lg font-medium text-slate-600">/lb</span></span>
                </div>
                
                <div className="pt-4 border-t border-slate-200 border-opacity-50">
                   <span className="block text-sm font-bold text-slate-500 uppercase mb-1">Breakeven Sale Price</span>
                   <span className="text-2xl font-black text-slate-800">${breakevenSalePrice.toLocaleString(undefined, {maximumFractionDigits: 2})} <span className="text-lg font-medium text-slate-600">/cwt</span></span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white bg-opacity-60 rounded-lg border border-slate-100">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                   <span>Initial Cost:</span>
                   <span className="font-semibold">${(purchaseCost).toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                   <span>Operating Cost:</span>
                   <span className="font-semibold">${(totalOperatingCosts).toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-800 font-bold border-t border-slate-200 pt-1 mt-1">
                   <span>Total Cost:</span>
                   <span>${(totalCost).toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Save Closeout Report
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
              <li><strong>Total Cost:</strong> Purchase Cost + Feed Cost + Yardage + Vet + Interest.</li>
              <li><strong>Cost of Gain:</strong> Total Operating Costs divided by Total Gain (in lbs).</li>
              <li><strong>Effective Sale Weight:</strong> Target sale weight adjusted downward by the expected death loss percentage.</li>
              <li><strong>Breakeven Price:</strong> Total Cost divided by the Effective Sale Weight (in hundredweight).</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Key Definitions</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>ADG (Average Daily Gain):</strong> The average amount of weight an animal gains each day on feed.</li>
              <li><strong>Feed Conversion:</strong> Pounds of feed required to produce one pound of live animal gain. Lower is better.</li>
              <li><strong>Yardage:</strong> A daily fee charged (or allocated) per head to cover non-feed operational expenses like equipment, labor, and facilities.</li>
              <li><strong>CWT:</strong> Hundredweight (100 lbs). Market prices are typically quoted in $/cwt.</li>
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
              <span>What is a good Cost of Gain (COG)?</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="text-gray-600 mt-2 px-4 pb-4">
              Cost of gain varies heavily based on corn and forage prices. Historically, anything under $1.00/lb was excellent, but with higher modern feed costs, COG can frequently range from $1.10 to $1.35+. The lower your feed conversion ratio, the lower your COG.
            </div>
          </details>
          <details className="group border border-gray-200 rounded-lg bg-white">
            <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-gray-900">
              <span>Why do I factor Death Loss into the Sale Weight?</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="text-gray-600 mt-2 px-4 pb-4">
              Instead of tracking a dead animal as a total loss separately, a standard economic approach is to reduce the average sale weight of the entire pen by the death loss percentage. This spreads the loss across the surviving animals to give you an accurate per-head breakeven for the pen.
            </div>
          </details>
        </div>
      </div>

      {/* Assumptions & Disclaimer */}
      <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-600 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-2">Assumptions & Disclaimer</h3>
        <p className="mb-2">This tool assumes linear daily gain and consistent feed conversion throughout the feeding period, which in reality follows a curve. It also assumes static feed pricing.</p>
        <CalculatorDisclaimer toolSpecificNotice="Actual closeout figures may vary based on exact animal performance and local basis." />
      </div>
    </div>
  );
}
