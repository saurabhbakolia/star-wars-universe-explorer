import { describe, it, expect } from 'vitest';
import { extractIdFromUrl, formatNumber, formatDate } from './utils';

describe('utils', () => {
  describe('extractIdFromUrl', () => {
    it('should extract ID from URL', () => {
      expect(extractIdFromUrl('https://swapi.info/api/people/1/')).toBe('1');
      expect(extractIdFromUrl('https://swapi.info/api/starships/5')).toBe('5');
      expect(extractIdFromUrl('/people/42/')).toBe('42');
    });

    it('should return empty string if no ID found', () => {
      expect(extractIdFromUrl('https://swapi.info/api/people')).toBe('');
      expect(extractIdFromUrl('invalid-url')).toBe('');
    });
  });

  describe('formatNumber', () => {
    it('should format numbers with commas', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1000000)).toBe('1,000,000');
      expect(formatNumber('5000')).toBe('5,000');
    });

    it('should handle invalid numbers', () => {
      expect(formatNumber('invalid')).toBe('invalid');
      expect(formatNumber('unknown')).toBe('unknown');
    });
  });

  describe('formatDate', () => {
    it('should format date strings', () => {
      const formatted = formatDate('1977-05-25');
      expect(formatted).toContain('1977');
      expect(formatted).toContain('May');
    });

    it('should return original string for invalid dates', () => {
      expect(formatDate('invalid-date')).toBe('invalid-date');
    });
  });
});
