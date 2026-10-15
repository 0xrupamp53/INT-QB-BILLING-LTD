import { describe, expect, it } from 'vitest';
import { engagements } from '@/lib/service-details';

describe('Owner-approved engagement pricing', () => {
 it('sets the first range to $20,000–$40,000', () => {
  expect([engagements[0].minPrice, engagements[0].maxPrice]).toEqual([20000, 40000]);
 });
 it('sets the second range to $75,000–$200,000', () => {
  expect([engagements[1].minPrice, engagements[1].maxPrice]).toEqual([75000, 200000]);
 });
 it('sets the third range to $15,000–$40,000 per month', () => {
  expect([engagements[2].minPrice, engagements[2].maxPrice, engagements[2].period]).toEqual([15000, 40000, 'month']);
 });
});