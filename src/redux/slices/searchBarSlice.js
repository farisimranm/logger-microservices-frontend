import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  referenceNumber: '',
  module: [],
  action: [],
  logLevel: [],
  transactionTimestampStart: '',
  transactionTimestampEnd: '',
};

export const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState: {
    value: initialValue
  },
  reducers: {
    insertion: (state, action) => {
      state.value = action.payload
    },
    reset: (state) => {
      state.value = initialValue
    }
  },
})

export const { insertion, reset } = searchBarSlice.actions;

export default searchBarSlice.reducer;