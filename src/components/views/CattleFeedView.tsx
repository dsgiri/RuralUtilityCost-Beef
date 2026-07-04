import React, { useState } from 'react';
import { CalculatorDisclaimer } from '../disclaimer/CalculatorDisclaimer';

interface FeedIngredient {
  id: string;
  name: string;
  costPerTon: number;
  lbsPerDay: number;
  dryMatterPercent: number;
}

export function CattleFeedView() {
  const [numCattle, setNumCattle] = useState(100);
  const [feedingPeriod, setFeedingPeriod] = useState(120); // days
  
  const [ingredients, setIngredients] = useState<FeedIngredient[]>([
    { id: '1', name: 'Alfalfa Hay', costPerTon: 180, lbsPerDay: 8, dryMatterPercent: 88 },
    { id: '2', name: 'Corn (Rolled)', costPerTon: 210, lbsPerDay: 12, dryMatterPercent: 86 },
    { id: '3', name: 'Distillers Grains', costPerTon: 240, lbsPerDay: 4, dryMatterPercent: 90 },
  ]);

  const addIngredient = () => {
    setIngredients([...ingredients, { id: Date.now().toString(), name: 'New Ingredient', costPerTon: 0, lbsPerDay: 0, dryMatterPercent: 85 }]);
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const updateIngredient = (id: string, field: keyof FeedIngredient, value: string | number) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, [field]: typeof value === 'string' && field !== 'name' ? Number(value) : value } : ing
    ));
  };

  let totalLbsPerDayAsFed = 0;
  let totalLbsPerDayDM = 0;
  let dailyCostPerHead = 0;

  ingredients.forEach(ing => {
    totalLbsPerDayAsFed += ing.lbsPerDay;
    totalLbsPerDayDM += ing.lbsPerDay * (ing.dryMatterPercent / 100);
    dailyCostPerHead += (ing.lbsPerDay / 2000) * ing.costPerTon;
  });

  const totalCostPerHead = dailyCostPerHead * feedingPeriod;
  const totalCostHerd = totalCostPerHead * numCattle;
  const totalFeedTonsAsFed = (totalLbsPerDayAsFed * feedingPeriod * numCattle) / 2000;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white min-h-[60vh]">
      {/* 1. Above the Fold */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-800 rounded">FEED PLANNING</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Cattle Feed Calculator</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-3xl">Formulate basic rations and estimate total feed requirements and costs for a cattle operation over a set period.</p>
      </div>

      {/* 2. The Calculator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* Input Column (Left) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Herd Data</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Cattle</label>
                <input type="number" value={numCattle} onChange={(e) => setNumCattle(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Feeding Period Length (Days)</label>
                <input type="number" value={feedingPeriod} onChange={(e) => setFeedingPeriod(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 text-gray-900 focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Ration Ingredients</h3>
              <button onClick={addIngredient} className="text-sm bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded shadow transition-colors">+ Add Ingredient</button>
            </div>
            
            <div className="p-6 space-y-4">
              {ingredients.map(ing => (
                <div key={ing.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end border border-gray-100 bg-gray-50 p-4 rounded-lg">
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Ingredient Name</label>
                    <input type="text" value={ing.name} onChange={(e) => updateIngredient(ing.id, 'name', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Cost ($/Ton)</label>
                    <input type="number" value={ing.costPerTon} onChange={(e) => updateIngredient(ing.id, 'costPerTon', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">DM %</label>
                    <input type="number" value={ing.dryMatterPercent} onChange={(e) => updateIngredient(ing.id, 'dryMatterPercent', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Lbs/Head/Day (As Fed)</label>
                    <input type="number" value={ing.lbsPerDay} onChange={(e) => updateIngredient(ing.id, 'lbsPerDay', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="sm:col-span-1 flex justify-end">
                    <button onClick={() => removeIngredient(ing.id)} className="text-red-500 hover:text-white hover:bg-red-500 w-8 h-8 rounded flex items-center justify-center transition-colors mb-1" title="Remove">✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Output Column (Right) */}
        <div className="lg:col-span-4">
          <div className="sticky top-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 mb-4">
              <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-2">Feed Requirements</h2>
              
              <div className="space-y-6">
                <div>
                   <span className="block text-sm font-bold text-slate-400 uppercase mb-1">Total Herd Feed Cost</span>
                   <span className="text-4xl font-black text-white">${totalCostHerd.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                
                <div className="pt-4 border-t border-slate-700">
                   <span className="block text-sm font-bold text-slate-400 uppercase mb-1">Total Tons Required</span>
                   <span className="text-3xl font-black text-blue-400">{totalFeedTonsAsFed.toLocaleString(undefined, {maximumFractionDigits: 1})}</span>
                   <span className="text-sm text-slate-400 ml-2">Tons (As Fed)</span>
                </div>
                
                <div className="pt-4 border-t border-slate-700">
                   <span className="block text-sm font-bold text-slate-400 uppercase mb-1">Daily Cost / Head</span>
                   <span className="text-2xl font-black text-white">${dailyCostPerHead.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-slate-800 rounded-lg">
                <div className="flex justify-between text-sm text-slate-300 mb-2">
                   <span>Daily Ration (As Fed):</span>
                   <span className="font-bold text-white">{totalLbsPerDayAsFed.toFixed(1)} lbs/hd</span>
                </div>
                <div className="flex justify-between text-sm text-slate-300">
                   <span>Daily Ration (DM):</span>
                   <span className="font-bold text-white">{totalLbsPerDayDM.toFixed(1)} lbs/hd</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download Mix Sheet
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
              <li><strong>Daily Cost Per Head:</strong> Sum of ((Lbs As Fed / 2000) × Cost Per Ton) for each ingredient.</li>
              <li><strong>Total Herd Feed Cost:</strong> Daily Cost Per Head × Number of Cattle × Feeding Period.</li>
              <li><strong>Total Tons Required:</strong> (Total Lbs As Fed per day × Feeding Period × Number of Cattle) / 2000.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Key Definitions</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>As Fed:</strong> The actual physical weight of the feed as it is delivered to the bunk, including moisture content.</li>
              <li><strong>Dry Matter (DM):</strong> The nutrient-dense portion of the feed after all water has been removed. Nutritional requirements are balanced on a dry matter basis.</li>
              <li><strong>Ration:</strong> The specific daily mix of feed ingredients provided to an animal.</li>
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
              <span>Why do I need to input Dry Matter (DM) percentage?</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="text-gray-600 mt-2 px-4 pb-4">
              Cattle eat based on dry matter volume. For example, 30 lbs of wet silage (30% DM) contains only 9 lbs of actual dry matter, whereas 10 lbs of dry corn (90% DM) contains 9 lbs of dry matter. Tracking both As Fed and DM ensures you are providing enough actual nutrition, not just water weight.
            </div>
          </details>
        </div>
      </div>

      {/* Assumptions & Disclaimer */}
      <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-600 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-2">Assumptions & Disclaimer</h3>
        <p className="mb-2">This is a gross volume estimator. It does not balance rations for protein, energy (TDN), vitamins, or minerals.</p>
        <CalculatorDisclaimer toolSpecificNotice="Always consult a qualified livestock nutritionist for exact rationing and feed balancing." />
      </div>
    </div>
  );
}
