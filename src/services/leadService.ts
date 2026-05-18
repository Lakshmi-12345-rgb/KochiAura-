import { Inquiry } from '../types';

// Mock initial storage
let leads: Inquiry[] = [];

export const leadService = {
  submitInquiry: async (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>): Promise<Inquiry> => {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newInquiry: Inquiry = {
      ...inquiry,
      id: `lead-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'New'
    };
    
    // In a real app, this would be a POST to /api/inquiries
    leads.push(newInquiry);
    console.log('Lead Saved:', newInquiry);
    
    return newInquiry;
  },

  getAllLeads: () => leads,
  
  clearLeads: () => { leads = []; }
};
