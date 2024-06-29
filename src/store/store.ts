import { configureStore } from '@reduxjs/toolkit';
import calculatorReducer from './slices/calculatorSlice';

const store = configureStore({
  reducer: {
    calculator: calculatorReducer,
    // Add other reducers/slices here if any
  },
  // Other middleware, dev tools setup, etc.
});

export default store;
