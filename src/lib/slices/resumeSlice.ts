import { ResumeState } from '@/components/builder/ResumeInterface';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ResumeState = {
  value: [
    {
      id: 'cb2039b4-1b5a-4297-b146-aca0695c7899',
      title: 'Software Engineer - Prajwal Dhungana',
      last_accessed: '',
    },
    {
      id: 'cb2039b4-1b5a-4297-b146-aca0695c7900',
      title: 'Software Engineer - Pragya Dhungana',
      last_accessed: '',
    },
    {
      id: 'cb2039b4-1b5a-4297-b146-aca0695c7901',
      title: 'Software Engineer - Kushum Dhungana',
      last_accessed: '',
    },
  ],
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    updateLastAccessed: (state, action) => {
      state.value = state.value.map((resume) => {
        if (resume.id === action.payload) {
          resume.last_accessed = new Date().toUTCString();
        }
        return resume;
      });
    },
  },
});

export const { updateLastAccessed } = resumeSlice.actions;
export default resumeSlice.reducer;
