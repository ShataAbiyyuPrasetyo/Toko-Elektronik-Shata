import { GoogleGenAI } from "@google/genai";
import { Product, Customer } from "../types";

// Initialize Gemini Client
// In a real app, strict error handling for missing API key should be enforced.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const generateFinancialInsight = async (
  query: string,
  contextData: { products: Product[], customers: Customer[] }
): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    const contextString = `
      You are an expert ERP Financial Controller named "Aurum AI".
      
      Current Inventory Snapshot:
      ${contextData.products.map(p => `- ${p.name} (Stock: ${p.stock}, Cost: ${p.cost}, Price: ${p.price})`).join('\n')}

      Current Customer Context:
      ${contextData.customers.map(c => `- ${c.name} (Debt: ${c.currentDebt}, Limit: ${c.creditLimit})`).join('\n')}

      Task: Answer the user's question with a professional, concise, and accounting-focused tone. 
      If the user asks about financial risk, highlight low stock vs high debt.
      Use currency format IDR (Indonesian Rupiah) notation where appropriate.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: [
        {
          role: 'user',
          parts: [
            { text: contextString },
            { text: `User Query: ${query}` }
          ]
        }
      ],
      config: {
        temperature: 0.2, // Low temperature for factual financial data
      }
    });

    return response.text || "I could not generate an insight at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while contacting the financial assistant.";
  }
};