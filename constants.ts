import { Customer, Product, StockStatus } from './types';

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'C001', name: 'PT. Tech Solutions', email: 'procure@techsol.id', creditLimit: 50000000, currentDebt: 12000000, tier: 'Platinum' },
  { id: 'C002', name: 'John Doe (Retail)', email: 'john.d@gmail.com', creditLimit: 5000000, currentDebt: 0, tier: 'Standard' },
  { id: 'C003', name: 'CV. Maju Mundur', email: 'finance@majumundur.com', creditLimit: 25000000, currentDebt: 24000000, tier: 'Gold' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'P001', sku: 'LAP-MBP-14', name: 'MacBook Pro 14" M3', category: 'Laptops', price: 28000000, cost: 24000000, stock: 15, minStockLevel: 5, imageUrl: 'https://picsum.photos/100/100' },
  { id: 'P002', sku: 'LAP-XPS-13', name: 'Dell XPS 13 Plus', category: 'Laptops', price: 22000000, cost: 18500000, stock: 3, minStockLevel: 5, imageUrl: 'https://picsum.photos/101/101' },
  { id: 'P003', sku: 'PHN-IP15-PM', name: 'iPhone 15 Pro Max', category: 'Smartphones', price: 24000000, cost: 21000000, stock: 42, minStockLevel: 10, imageUrl: 'https://picsum.photos/102/102' },
  { id: 'P004', sku: 'ACC-MON-4K', name: 'LG Ultrafine 4K Monitor', category: 'Accessories', price: 8000000, cost: 6000000, stock: 0, minStockLevel: 8, imageUrl: 'https://picsum.photos/103/103' },
  { id: 'P005', sku: 'AUD-SON-XM5', name: 'Sony WH-1000XM5', category: 'Audio', price: 5500000, cost: 4200000, stock: 8, minStockLevel: 10, imageUrl: 'https://picsum.photos/104/104' },
];

export const getStockStatus = (stock: number, min: number): StockStatus => {
  if (stock === 0) return StockStatus.OUT_OF_STOCK;
  if (stock < min) return StockStatus.LOW_STOCK;
  return StockStatus.IN_STOCK;
};

export const VAT_RATE = 0.11;