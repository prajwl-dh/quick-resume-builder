import {
  ResumeEducation,
  ResumeProfile,
  ResumeSkills,
  ResumeState,
} from '@/components/builder/previousResumes/ResumeInterface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { ResumeWorkExperience } from '../../components/builder/previousResumes/ResumeInterface';

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
          profile: {
            fullName: action.payload.fullName,
          },
          experience: [],
          education: [],
          skills: [],
        },
      ];
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

    updateResumeProfile: (
      state,
      action: PayloadAction<{
        id: string;
        key: keyof ResumeProfile;
        value: any;
      }>
    ) => {
      const { id, key, value } = action.payload;
      state.value = state.value.map((resume) => {
        if (resume.id === id) {
          resume.profile[key] = value;
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    addCustomProfileField: (
      state,
      action: PayloadAction<{
        id: string;
        key: keyof ResumeProfile;
        value: { fieldName: string; fieldValue: any };
      }>
    ) => {
      const { id, key, value } = action.payload;

      state.value = state.value.map((resume) => {
        if (resume.id === id) {
          const fieldValue = resume.profile[key];

          if (Array.isArray(fieldValue)) {
            // Check if an object with the same fieldName exists in the array
            const updatedArray = fieldValue.map((item) => {
              if (item.fieldName === value.fieldName) {
                // Update the existing object
                return {
                  ...item,
                  fieldValue: value.fieldValue,
                };
              }
              return item;
            });

            // If the fieldName doesn't exist, add the new object to the array
            const newArray = updatedArray.some(
              (item) => item.fieldName === value.fieldName
            )
              ? updatedArray
              : [...updatedArray, value];

            return {
              ...resume,
              profile: { ...resume.profile, [key]: newArray },
            };
          } else {
            // If fieldValue is not an array, create a new array with the new object
            return {
              ...resume,
              profile: { ...resume.profile, [key]: [value] },
            };
          }
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    deleteCustomProfileField: (
      state,
      action: PayloadAction<{
        id: string;
        key: keyof ResumeProfile;
        fieldName: string;
      }>
    ) => {
      const { id, key, fieldName } = action.payload;

      state.value = state.value.map((resume) => {
        if (resume.id === id) {
          const fieldValue = resume.profile[key];

          if (Array.isArray(fieldValue)) {
            // Filter out the object with the specified fieldName
            const updatedArray = fieldValue.filter(
              (item) => item.fieldName !== fieldName
            );

            return {
              ...resume,
              profile: { ...resume.profile, [key]: updatedArray },
            };
          }
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    updateResumeWorkExperience: (
      state,
      action: PayloadAction<{
        id: string;
        index: number;
        value: ResumeWorkExperience;
      }>
    ) => {
      const { id, index, value } = action.payload;

      state.value = state.value.map((resume) => {
        if (resume.id === id) {
          return {
            ...resume,
            experience: resume.experience
              ? resume?.experience?.map((exp, i) => (i === index ? value : exp))
              : [value],
          };
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    addNewResumeWorkExperience: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      const { id } = action.payload;

      state.value = state.value.map((resume) => {
        if (resume.id === id) {
          resume.experience?.push({
            companyName: '',
            jobTitle: '',
            jobDate: '',
            jobDescription: '',
          });
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    deleteResumeWorkExperience: (
      state,
      action: PayloadAction<{ id: string; index: number }>
    ) => {
      const { id, index } = action.payload;

      state.value = state.value.map((resume) =>
        resume.id === id
          ? {
              ...resume,
              experience: resume.experience
                ? resume.experience.filter((_, i) => i !== index)
                : [],
            }
          : resume
      );
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    updateResumeEducation: (
      state,
      action: PayloadAction<{
        id: string;
        index: number;
        value: ResumeEducation;
      }>
    ) => {
      const { id, index, value } = action.payload;

      state.value = state.value.map((resume) => {
        if (resume.id === id) {
          return {
            ...resume,
            education: resume.education
              ? resume?.education?.map((edu, i) => (i === index ? value : edu))
              : [value],
          };
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    addNewResumeEducation: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      state.value = state.value.map((resume) => {
        if (resume.id === id) {
          resume.education?.push({
            schoolName: '',
            schoolDate: '',
            schoolMajor: '',
            schoolGPA: '',
            schoolDescription: '',
          });
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    deleteResumeEducation: (
      state,
      action: PayloadAction<{ id: string; index: number }>
    ) => {
      const { id, index } = action.payload;

      state.value = state.value.map((resume) =>
        resume.id === id
          ? {
              ...resume,
              education: resume.education
                ? resume.education.filter((_, i) => i !== index)
                : [],
            }
          : resume
      );
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    updateResumeSkills: (
      state,
      action: PayloadAction<{
        id: string;
        index: number;
        value: ResumeSkills;
      }>
    ) => {
      const { id, index, value } = action.payload;

      state.value = state.value.map((resume) => {
        if (resume.id === id) {
          return {
            ...resume,
            skills: resume.skills
              ? resume?.skills?.map((skill, i) => (i === index ? value : skill))
              : [value],
          };
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    addNewResumeSkills: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      state.value = state.value.map((resume) => {
        if (resume.id === id) {
          resume.skills?.push({
            skillRelevantSkills: '',
          });
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    deleteResumeSkills: (
      state,
      action: PayloadAction<{ id: string; index: number }>
    ) => {
      const { id, index } = action.payload;

      state.value = state.value.map((resume) =>
        resume.id === id
          ? {
              ...resume,
              skills: resume.skills
                ? resume.skills.filter((_, i) => i !== index)
                : [],
            }
          : resume
      );
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
  updateResumeProfile,
  addCustomProfileField,
  deleteCustomProfileField,
  updateResumeWorkExperience,
  addNewResumeWorkExperience,
  deleteResumeWorkExperience,
  updateResumeEducation,
  addNewResumeEducation,
  deleteResumeEducation,
  updateResumeSkills,
  addNewResumeSkills,
  deleteResumeSkills,
} = resumeSlice.actions;
export default resumeSlice.reducer;
