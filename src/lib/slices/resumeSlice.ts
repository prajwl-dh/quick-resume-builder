import { ResumeState } from '@/components/builder/previousResumes/ResumeInterface';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState: ResumeState = {
  value: JSON.parse(localStorage.getItem('resume') ?? '[]'),
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
          id: action.payload.id,
          fileName: action.payload.fileName,
          fullName: action.payload.fullName,
          title: action.payload.title,
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
    duplicateResume: (state, action) => {
      const originalResume = state.value.find(
        (resume) => resume.id === action.payload
      );
      if (originalResume) {
        const newResume = {
          ...originalResume,
          id: uuidv4(),
          fileName: `${originalResume.fileName} copy`,
          last_accessed: new Date().toUTCString(),
        };
        state.value = [...state.value, newResume];
        localStorage.setItem('resume', JSON.stringify(state.value));
      }
    },
    renameResume: (state, action) => {
      state.value = state.value.map((resume) => {
        if (resume.id === action.payload.id) {
          resume.fileName = action.payload.fileName;
        }
        return resume;
      });
      localStorage.setItem('resume', JSON.stringify(state.value));
    },
  },
});

export const {
  updateLastAccessed,
  createNewResume,
  deleteResume,
  duplicateResume,
  renameResume,
} = resumeSlice.actions;
export default resumeSlice.reducer;
