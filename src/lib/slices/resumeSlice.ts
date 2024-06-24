import { ResumeState } from '@/components/builder/ResumeInterface';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ResumeState = {
  value: JSON.parse(localStorage.getItem('resume') ?? 'null'),
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
      localStorage.setItem('resume', JSON.stringify(state.value));
    },
    createNewResume: (state, action) => {
      state.value = [
        ...state.value,
        {
          id: action.payload,
          last_accessed: new Date().toUTCString(),
        },
      ];
      localStorage.setItem('resume', JSON.stringify(state.value));
    },
    deleteResume: (state, action) => {
      state.value = state.value.filter(
        (resume) => resume.id !== action.payload
      );
      localStorage.setItem('resume', JSON.stringify(state.value));
    },
  },
});

export const { updateLastAccessed, createNewResume, deleteResume } =
  resumeSlice.actions;
export default resumeSlice.reducer;
