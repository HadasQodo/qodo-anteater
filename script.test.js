import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  fallbackFacts, 
  getCachedFacts, 
  setCachedFacts, 
  fetchFactsFromInternet, 
  getRandomFact 
} from './script.js';

describe('Anteater Facts', () => {
  beforeEach(() => {
    setCachedFacts([]);
    vi.clearAllMocks();
  });

  describe('getCachedFacts', () => {
    it('should return empty array initially', () => {
      expect(getCachedFacts()).toEqual([]);
    });

    it('should return cached facts after setting them', () => {
      const testFacts = ['fact1', 'fact2'];
      setCachedFacts(testFacts);
      expect(getCachedFacts()).toEqual(testFacts);
    });
  });

  describe('setCachedFacts', () => {
    it('should set facts when given an array', () => {
      const testFacts = ['fact1', 'fact2'];
      setCachedFacts(testFacts);
      expect(getCachedFacts()).toEqual(testFacts);
    });

    it('should not set facts when given non-array', () => {
      setCachedFacts('not an array');
      expect(getCachedFacts()).toEqual([]);
    });

    it('should filter out non-string facts', () => {
      const mixedFacts = ['valid fact', 123, 'another fact', null, 'third fact'];
      setCachedFacts(mixedFacts);
      expect(getCachedFacts()).toEqual(['valid fact', 'another fact', 'third fact']);
    });

    it('should handle empty array', () => {
      setCachedFacts([]);
      expect(getCachedFacts()).toEqual([]);
    });
  });

  describe('getRandomFact', () => {
    it('should return a fact from cached facts', async () => {
      const testFacts = ['fact1', 'fact2', 'fact3'];
      setCachedFacts(testFacts);
      const fact = await getRandomFact();
      expect(testFacts).toContain(fact);
    });

    it('should fetch facts if cache is empty', async () => {
      global.fetch = vi.fn(() => 
        Promise.reject(new Error('Network error'))
      );
      
      const fact = await getRandomFact();
      expect(fallbackFacts).toContain(fact);
    });
  });

  describe('fetchFactsFromInternet', () => {
    it('should return fallback facts on fetch error', async () => {
      global.fetch = vi.fn(() => 
        Promise.reject(new Error('Network error'))
      );
      
      const facts = await fetchFactsFromInternet();
      expect(facts).toEqual(fallbackFacts);
    });

    it('should return fallback facts on non-ok response', async () => {
      global.fetch = vi.fn(() => 
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not Found'
        })
      );
      
      const facts = await fetchFactsFromInternet();
      expect(facts).toEqual(fallbackFacts);
    });

    
    it('should return processed facts on successful fetch', async () => {
      global.fetch = vi.fn(() => 
        Promise.resolve({
          ok: true,
          status: 200,
          text: () => Promise.resolve('<html>Mock HTML content</html>')
        })
      );
      
      const facts = await fetchFactsFromInternet();
      expect(facts.length).toBeGreaterThan(10);
      expect(facts).toContain("Qodo Anteater never bugs out — it just sniffs out bugs!");
    });
  });
});