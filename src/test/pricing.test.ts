import { describe, expect, it } from 'vitest';
import { engagements } from '@/lib/service-details';

describe('Owner-approved engagement pricing', () => {
 it('sets the first range to $2,000–$4,000', () => {
  expect([engagements[0].minPrice, engagements[0].maxPrice, engagements[0].price]).toEqual([2000, 4000, '$2,000 to $4,000']);
 });
 it('sets the second range to $4,000–$6,000', () => {
  expect([engagements[1].minPrice, engagements[1].maxPrice, engagements[1].price]).toEqual([4000, 6000, '$4,000 to $6,000']);
 });
 it('sets the third range to a one-time $6,000–$9,000 project fee', () => {
  expect([engagements[2].minPrice, engagements[2].maxPrice, engagements[2].period, engagements[2].price]).toEqual([6000, 9000, 'project', '$6,000 to $9,000']);
 });
 it('sets all engagement prices as one-time project fees', () => {
  expect(engagements.map(({ period }) => period)).toEqual(['project', 'project', 'project']);
 });
});