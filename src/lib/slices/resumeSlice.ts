import {
  ResumeInterface,
  ResumeState,
} from '@/components/builder/previousResumes/ResumeInterface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Function to check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const testKey = '__testLocalStorageAvailability__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// Initial state setup
let initialState: ResumeState;
if (isLocalStorageAvailable()) {
  initialState = {
    value: JSON.parse(localStorage.getItem('resume') ?? '[]'),
  };
} else {
  initialState = {
    value: [],
  };
}

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
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },
    createNewResume: (state, action) => {
      state.value = [
        ...state.value,
        {
          id: action.payload.id,
          fileName: action.payload.fileName,
          title: action.payload.title,
          last_accessed: new Date().toUTCString(),
          fullName: action.payload.fullName,
        },
      ];
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },
    updateResume: (
      state,
      action: PayloadAction<{
        id: string;
        key: keyof ResumeInterface;
        value: any;
      }>
    ) => {
      const { id, key, value } = action.payload;
      state.value = state.value.map((resume) => {
        if (resume.id === id) {
          resume[key] = value;
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },
    deleteResume: (state, action) => {
      state.value = state.value.filter(
        (resume) => resume.id !== action.payload
      );
      localStorage?.setItem('resume', JSON.stringify(state.value));
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
        localStorage?.setItem('resume', JSON.stringify(state.value));
      }
    },
    renameResume: (state, action) => {
      state.value = state.value.map((resume) => {
        if (resume.id === action.payload.id) {
          resume.fileName = action.payload.fileName;
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },
  },
});

export const {
  updateLastAccessed,
  createNewResume,
  deleteResume,
  duplicateResume,
  renameResume,
  updateResume,
} = resumeSlice.actions;
export default resumeSlice.reducer;
