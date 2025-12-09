import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { id: 'pos', label: 'Sales / POS', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 'inventory', label: 'Inventory', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { id: 'ledger', label: 'General Ledger', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-950 overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 flex flex-col border-r border-slate-800 bg-slate-950">
        <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-800">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-900 font-bold font-serif text-xl shadow-lg shadow-amber-500/20">
            A
          </div>
          <span className="hidden lg:block ml-3 font-serif font-semibold text-slate-100 tracking-wide">
            AURUM<span className="text-amber-500">LEDGER</span>
          </span>
        </div>

        <nav className="flex-1 py-6 space-y-2 px-3">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 group ${
                activeTab === item.id 
                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === item.id ? 2 : 1.5} d={item.icon} />
              </svg>
              <span className="hidden lg:block ml-3 font-medium text-sm">{item.label}</span>
              {activeTab === item.id && (
                <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <img src="https://ui-avatars.com/api/?name=Admin+User&background=D4AF37&color=0f172a" alt="User" className="w-10 h-10 rounded-full border-2 border-slate-800" />
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-slate-200">Admin Controller</p>
              <p className="text-xs text-slate-500">Finance Dept</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-950 relative">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-30">
          <h2 className="text-lg font-medium text-slate-200 uppercase tracking-widest text-xs">
            {menuItems.find(i => i.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">USD/IDR</span>
              <span className="text-sm text-emerald-400 font-mono">15,450.00 <span className="text-[10px]">▲ 0.2%</span></span>
            </div>
            <button className="text-slate-400 hover:text-amber-500 transition-colors relative">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Dynamic View */}
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/10 via-slate-950 to-slate-950 pointer-events-none"></div>
          {children}
        </div>
      </main>
    </div>
  );
};