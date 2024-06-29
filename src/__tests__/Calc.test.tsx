import { calculatePrice, Rank, LPRange, Server, BoostType } from '../components/lolboosting/Calc';

describe('calculatePrice function', () => {
  it('calculates price correctly for given parameters', () => {
    // Given
    const startRank: Rank = 'Bronze';
    const startDivision = 4;
    const endRank: Rank = 'Bronze';
    const endDivision = 3;
    const server: Server = 'EUW';
    const lpRange: LPRange = '0 - 20';
    const boostType: BoostType = 'Solo';

    // When 
    const price = calculatePrice(startRank, startDivision, endRank, endDivision, server, lpRange, boostType);

    // Then
    expect(price).toBe(6); // Change this with the expected price based on the provided logic
  });

  // it('handles calculation for different parameters', () => {
  //   // Given
  //   // Add different sets of parameters for testing different scenarios

  //   // When
  //   // Call the calculatePrice function with different parameters

  //   // Then
  //   // Add assertions for each scenario
  // });
});
