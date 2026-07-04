import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../Hero';
import { Favorites } from '../Favorites';
import { ToolGrid } from '../ToolGrid';
import { Tool } from '../../types';

interface HomeViewProps {
  tools: Tool[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export function HomeView({ tools, favorites, toggleFavorite }: HomeViewProps) {
  const navigate = useNavigate();
  return (
    <div className="pb-12">
      <Hero />
      <Favorites 
        tools={tools} 
        favorites={favorites} 
        toggleFavorite={toggleFavorite} 
        onLaunch={(id) => {
          const tool = tools.find(t => t.id === id);
          if (tool && tool.slug) {
            navigate(`/${tool.slug}`);
          }
        }}
      />
      <ToolGrid 
        tools={tools} 
        favorites={favorites} 
        toggleFavorite={toggleFavorite} 
        onLaunch={(id) => {
          const tool = tools.find(t => t.id === id);
          if (tool && tool.slug) {
            navigate(`/${tool.slug}`);
          }
        }}
      />
      
      {/* Information Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-5 sm:p-6">
            <h2 className="text-sm font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Tool Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div className="flex items-center gap-3 p-3 border border-gray-50 rounded bg-gray-50/50 hover:bg-white cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs flex-shrink-0">FP</div>
                <span className="text-xs font-semibold truncate">Feed Planning</span>
              </div>
              <div className="flex items-center gap-3 p-3 border border-gray-50 rounded bg-gray-50/50 hover:bg-white cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded bg-green-100 text-green-900 flex items-center justify-center font-bold text-xs flex-shrink-0">YP</div>
                <span className="text-xs font-semibold truncate">Yield/Carcass</span>
              </div>
              <div className="flex items-center gap-3 p-3 border border-gray-50 rounded bg-gray-50/50 hover:bg-white cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded bg-orange-100 text-orange-900 flex items-center justify-center font-bold text-xs flex-shrink-0">PB</div>
                <span className="text-xs font-semibold truncate">Pasture Beef</span>
              </div>
              <div className="flex items-center gap-3 p-3 border border-gray-50 rounded bg-gray-50/50 hover:bg-white cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs flex-shrink-0">EA</div>
                <span className="text-xs font-semibold truncate">Enterprise Analysis</span>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900 text-white rounded-lg p-5 sm:p-6 relative overflow-hidden">
            <div className="relative z-10 flex flex-col h-full">
              <h2 className="text-sm font-bold mb-2 text-blue-300">Decision Support Guarantee</h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-4 flex-grow">
                Beef is part of the Rural Ops Tools ecosystem. Our tools are designed for agricultural professionals to run "What If" scenarios with real-world accuracy. All data is processed locally in your browser for maximum privacy.
              </p>
              <div className="flex items-center gap-2 mt-auto">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-mono uppercase tracking-widest">All Modules Online</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-10">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="white">
                <path d="M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
