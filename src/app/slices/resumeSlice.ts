import { createSlice } from '@reduxjs/toolkit';

export const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    value: [
      {
        id: 'cb2039b4-1b5a-4297-b146-aca0695c7899',
        todo: 'Hello there, welcome to my to-do list app',
        completion: false,
      },
      {
        id: 'cb2039b4-1b5a-4297-b146-aca06sdauh99',
        todo: 'You can click me or the circle to my left to mark me as completed',
        completion: false,
      },
      {
        id: 'cb2039b4-1b5a-4397-b146-acdagsdavh99',
        todo: 'You can click or tap on the trash icon to delete me',
        completion: true,
      },
    ],
  },
  reducers: {},
});

export default resumeSlice.reducer;
