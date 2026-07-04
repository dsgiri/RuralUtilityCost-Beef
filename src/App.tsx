import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/views/HomeView';
import { AboutView } from './components/views/AboutView';
import { ContactView } from './components/views/ContactView';
import { LegalView } from './components/views/LegalView';
import { LicenseView } from './components/views/LicenseView';
import { TOOLS } from './data';

import { DisclaimerView } from './components/views/DisclaimerView';
import { ExampleCalculatorView } from './components/views/ExampleCalculatorView';

import { BeefCostOfProductionView } from './components/views/BeefCostOfProductionView';
import { FeedlotCloseoutView } from './components/views/FeedlotCloseoutView';
import { BreakEvenSalePriceView } from './components/views/BreakEvenSalePriceView';
import { ProfitPerHeadView } from './components/views/ProfitPerHeadView';
import { CattleFeedView } from './components/views/CattleFeedView';
import { PasturedBeefView } from './components/views/PasturedBeefView';
import { CarcassYieldView } from './components/views/CarcassYieldView';
import { ValueOfAdditionalGainView } from './components/views/ValueOfAdditionalGainView';

function AppContent() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('beef_ruralopstools_favorites');
    const legacySaved = localStorage.getItem('beef_ruralutilitycost_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse favorites');
      }
    } else if (legacySaved) {
      try {
        setFavorites(JSON.parse(legacySaved));
      } catch (e) {
        console.error('Failed to parse legacy favorites');
      }
    }
    setIsLoaded(true);
  }, []);

  // Save favorites to local storage when changed
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('beef_ruralopstools_favorites', JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fId => fId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans utility-grid">
      <Header />
      
      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={
            <HomeView 
              tools={TOOLS} 
              favorites={favorites} 
              toggleFavorite={toggleFavorite} 
            />
          } />
          <Route path="/about" element={<AboutView />} />
          <Route path="/contact" element={<ContactView />} />
          <Route path="/legal" element={<LegalView />} />
          <Route path="/license" element={<LicenseView />} />
          <Route path="/disclaimer" element={<DisclaimerView />} />
          <Route path="/calculator-example" element={<ExampleCalculatorView />} />
          <Route path="/cost-of-production" element={<BeefCostOfProductionView />} />
          <Route path="/feedlot-closeout" element={<FeedlotCloseoutView />} />
          <Route path="/break-even-price" element={<BreakEvenSalePriceView />} />
          <Route path="/profit-estimator" element={<ProfitPerHeadView />} />
          <Route path="/feed-calculator" element={<CattleFeedView />} />
          <Route path="/pastured-beef" element={<PasturedBeefView />} />
          <Route path="/carcass-yield" element={<CarcassYieldView />} />
          <Route path="/value-additional-gain" element={<ValueOfAdditionalGainView />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
