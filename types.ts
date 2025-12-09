export enum StockStatus {
  IN_STOCK = 'IN_STOCK',
  LOW_STOCK = 'LOW_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  cost: number; // For COGS
  stock: number;
  minStockLevel: number;
  imageUrl: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  creditLimit: number;
  currentDebt: number;
  tier: 'Standard' | 'Gold' | 'Platinum';
}

export interface CartItem extends Product {
  quantity: number;
  discountPercent: number;
  taxCode: 'VAT_11' | 'EXEMPT';
}

export interface SalesOrder {
  id: string;
  customerId: string;
  items: CartItem[];
  subtotal: number;
  taxTotal: number;
  grandTotal: number;
  status: 'Draft' | 'Confirmed' | 'Posted';
  date: Date;
}

export interface DashboardMetric {
  label: string;
  value: string;
  change: string; // e.g., "+12%"
  isPositive: boolean;
}