import React, { useState, useMemo } from 'react';
import { Product, Customer, CartItem, StockStatus } from '../types';
import { MOCK_PRODUCTS, MOCK_CUSTOMERS, getStockStatus, VAT_RATE } from '../constants';
import { Button } from './Button';
import { StatusBadge } from './StatusBadge';

export const POS: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(MOCK_CUSTOMERS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Inventory Lookup Logic (Prompt A requirement)
  const availableProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const addToCart = (product: Product) => {
    if (product.stock <= 0) return; // Prevent adding OOS
    
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        // Check stock limit
        if (existing.quantity >= product.stock) return prev;
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, discountPercent: 0, taxCode: 'VAT_11' }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQty: number) => {
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    if (!product || newQty > product.stock || newQty < 1) return;
    
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  // Financial Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxTotal = subtotal * VAT_RATE;
  const grandTotal = subtotal + taxTotal;
  
  const isCreditLimitExceeded = selectedCustomer 
    ? (selectedCustomer.currentDebt + grandTotal) > selectedCustomer.creditLimit
    : false;

  return (
    <div className="grid grid-cols-12 gap-6 h-full p-6 text-slate-200">
      
      {/* Left Panel: Product Catalog & Lookup */}
      <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
        
        {/* Search Bar */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-4 rounded-xl shadow-xl">
          <div className="relative">
            <svg className="absolute left-4 top-3.5 h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search by SKU, Product Name, or Scan Barcode..." 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-slate-200 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all placeholder-slate-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto pb-4 custom-scrollbar">
          {availableProducts.map(product => {
            const status = getStockStatus(product.stock, product.minStockLevel);
            return (
              <div key={product.id} className="group bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-slate-500">{product.sku}</span>
                    <StatusBadge status={status} />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-slate-100 mb-1 leading-snug">{product.name}</h3>
                  <p className="text-amber-400 font-medium">Rp {product.price.toLocaleString('id-ID')}</p>
                </div>
                <div className="mt-4 flex justify-between items-center text-sm text-slate-400">
                  <span>Avail: <span className="text-slate-200 font-bold">{product.stock}</span></span>
                  <button 
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className="p-2 bg-slate-800 rounded-lg text-amber-500 hover:bg-amber-500 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Panel: Sales Order / Quotation */}
      <div className="col-span-12 lg:col-span-5 flex flex-col h-full">
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl flex flex-col h-full overflow-hidden">
          
          {/* Order Header */}
          <div className="p-6 border-b border-slate-800 bg-slate-900/50">
            <h2 className="font-serif text-xl font-bold text-amber-500 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Sales Order #SO-2024-0891
            </h2>
            
            {/* Customer Selector */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Customer</label>
              <select 
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:border-amber-500 outline-none"
                value={selectedCustomer?.id}
                onChange={(e) => setSelectedCustomer(MOCK_CUSTOMERS.find(c => c.id === e.target.value) || null)}
              >
                {MOCK_CUSTOMERS.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.tier})</option>
                ))}
              </select>
              {selectedCustomer && (
                <div className="flex justify-between text-xs mt-2 px-1">
                  <span className="text-slate-400">Limit: <span className="text-slate-200">{selectedCustomer.creditLimit.toLocaleString()}</span></span>
                  <span className={isCreditLimitExceeded ? "text-red-400 font-bold" : "text-emerald-400"}>
                    Available: {(selectedCustomer.creditLimit - selectedCustomer.currentDebt).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                <p className="font-serif italic">Cart is empty</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex-1 min-w-0 mr-4">
                    <h4 className="text-sm font-medium text-slate-200 truncate">{item.name}</h4>
                    <p className="text-xs text-slate-500 font-mono">{item.sku}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-slate-700 rounded-md">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-slate-800 text-slate-400">-</button>
                      <span className="px-2 text-sm text-slate-200 w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-slate-800 text-slate-400">+</button>
                    </div>
                    <div className="text-right w-24">
                      <div className="text-sm font-medium text-amber-500">{(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-slate-600 hover:text-red-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Totals & Actions */}
          <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-3">
            
            {isCreditLimitExceeded && (
              <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-3 flex items-start gap-3 mb-2">
                <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <div className="text-xs text-red-300">
                  <span className="font-bold block">Credit Limit Exceeded</span>
                  Customer balance will exceed limit. Manager approval required to post.
                </div>
              </div>
            )}

            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>VAT (11%)</span>
                <span>Rp {taxTotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-amber-400 font-serif font-bold text-xl pt-2 border-t border-slate-800">
                <span>Total</span>
                <span>Rp {grandTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <Button variant="secondary" className="w-full">
                Create Quote
              </Button>
              <Button 
                variant="primary" 
                className="w-full"
                disabled={cart.length === 0 || isCreditLimitExceeded}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};