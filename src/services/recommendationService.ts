import { Property } from '../types';

export interface UserPreferences {
  budget: number; // Max budget in INR (normalized if needed)
  location?: string;
  bedrooms?: number;
  amenities: string[];
  lifestyle: string[];
  investmentGoals: 'Appreciation' | 'Rental' | 'Lifestyle' | 'Legacy';
}

export function recommendProperties(properties: Property[], prefs: UserPreferences): Property[] {
  return properties.filter(prop => {
    // 1. Budget check (conservative 10% buffer)
    if (prefs.budget && prop.priceNumeric > prefs.budget * 1.1) return false;

    // 2. Bedroom check
    if (prefs.bedrooms && prop.bedrooms < prefs.bedrooms) return false;

    // 3. Location check (simple substring match)
    if (prefs.location && !prop.location.toLowerCase().includes(prefs.location.toLowerCase())) {
       // Allow some flexibility or just log for now
    }

    return true;
  }).sort((a, b) => {
    // Scoring logic
    let scoreA = 0;
    let scoreB = 0;

    // Lifestyle & Amenities match
    prefs.amenities.forEach(amenity => {
      if (a.features.some(aAm => aAm.toLowerCase().includes(amenity.toLowerCase()))) scoreA += 2;
      if (b.features.some(bAm => bAm.toLowerCase().includes(amenity.toLowerCase()))) scoreB += 2;
    });

    // Investment goal matching (simulated heuristics)
    if (prefs.investmentGoals === 'Legacy' && a.type === 'Heritage Villa') scoreA += 5;
    if (prefs.investmentGoals === 'Legacy' && b.type === 'Heritage Villa') scoreB += 5;
    
    if (prefs.investmentGoals === 'Appreciation' && a.location.includes('Marine Drive')) scoreA += 5;
    if (prefs.investmentGoals === 'Appreciation' && b.location.includes('Marine Drive')) scoreB += 5;

    return scoreB - scoreA;
  });
}
