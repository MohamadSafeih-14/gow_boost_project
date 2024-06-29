import { createSlice, PayloadAction } from '@reduxjs/toolkit';




export type CalculatorState = {
  startRank: string;
  startDivision: number;
  endRank: string;
  endDivision: number;
  server: string;
  lpRange: string;
  boostType: string;
  spells: boolean;
  offlineVpn: boolean;
  priorityOrder: boolean
  queueType: string;
  result: number | null;
};


const initialState: CalculatorState = {
  startRank: 'Silver',
  startDivision: 4,
  endRank: 'Gold',
  endDivision: 4,
  server: 'EUW',
  lpRange: '0 - 20',
  boostType: 'Solo',
  spells: false,
  offlineVpn: false,
  priorityOrder: false,
  queueType: 'Solo/Duo',
  result: 0,
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setStartRank: (state, action: PayloadAction<string>) => {
      state.startRank = action.payload;
    },
    setEndRank: (state, action: PayloadAction<string>) => {
      state.endRank = action.payload;
    },
    setStartDivision: (state, action: PayloadAction<number>) => {
      state.startDivision = action.payload;
    },
    setEndDivision: (state, action: PayloadAction<number>) => {
      state.endDivision = action.payload;
    },
    setServer1: (state, action: PayloadAction<string>) => {
      state.server = action.payload;
    },
    setLpRange: (state, action: PayloadAction<string>) => {
      state.lpRange = action.payload;
    },
    setBoostType: (state, action: PayloadAction<string>) => {
      state.boostType = action.payload;
    },
    setSpells: (state, action: PayloadAction<boolean>) => {
      state.spells = action.payload
    },
    setOfflineVpn: (state, action: PayloadAction<boolean>) => {
      state.offlineVpn = action.payload
    },
    setPriorityOrder: (state, action: PayloadAction<boolean>) => {
      state.priorityOrder = action.payload
    },
    setQueueType: (state, action: PayloadAction<string>) => {
      state.queueType = action.payload
    },
    setResult: (state, action: PayloadAction<number | null>) => {
      state.result = action.payload;
    },
  },
});

export const {
  setStartRank,
  setEndRank,
  setStartDivision,
  setEndDivision,
  setServer1,
  setQueueType,
  setLpRange,
  setBoostType,
  setSpells,
  setOfflineVpn,
  setPriorityOrder,
  setResult,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
