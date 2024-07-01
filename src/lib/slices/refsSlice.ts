import { createSlice } from '@reduxjs/toolkit';

interface RefState {
  [key: string]: React.RefObject<HTMLElement>;
}

const initialState: RefState = {};

const refsSlice = createSlice({
  name: 'refs',
  initialState,
  reducers: {
    setRef: (state, action) => {
      state[action.payload.key] = action.payload.ref;
    },
  },
});

export const { setRef } = refsSlice.actions;
export default refsSlice.reducer;
