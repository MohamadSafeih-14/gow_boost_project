// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import calculatorReducer, { CalculatorState } from './calculatorSlice';
// Import other reducers here if available

export type RootState = {
  calculator: CalculatorState;
  // Other slices if available
};

const rootReducer = combineReducers({
  calculator: calculatorReducer,
  // Other reducers if available
});

export default rootReducer;
