import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { POS } from './components/POS';
import { Assistant } from './components/Assistant';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'pos':
        return <POS />;
      case 'inventory':
      case 'ledger':
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-500">
            <svg className="w-20 h-20 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h2 className="text-xl font-serif">Module Under Construction</h2>
            <p className="mt-2 text-sm">The '{currentView}' module is defined in the architectural spec but not implemented in this demo.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Layout activeTab={currentView} onTabChange={setCurrentView}>
        {renderContent()}
      </Layout>
      <Assistant />
    </>
  );
};

export default App;