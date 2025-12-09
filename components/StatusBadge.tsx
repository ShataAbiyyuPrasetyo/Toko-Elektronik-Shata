import React from 'react';
import { StockStatus } from '../types';

interface Props {
  status: StockStatus | string;
}

export const StatusBadge: React.FC<Props> = ({ status }) => {
  switch (status) {
    case StockStatus.IN_STOCK:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"></span>
          In Stock
        </span>
      );
    case StockStatus.LOW_STOCK:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-900/30 text-amber-400 border border-amber-800">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5"></span>
          Low Stock
        </span>
      );
    case StockStatus.OUT_OF_STOCK:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/30 text-red-400 border border-red-800">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1.5"></span>
          Out of Stock
        </span>
      );
    default:
      return <span className="text-slate-400 text-xs">{status}</span>;
  }
};