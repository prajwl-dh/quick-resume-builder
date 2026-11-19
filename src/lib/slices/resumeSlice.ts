import {
  DateRange,
  ResumeAwards,
  ResumeCertifications,
  ResumeEducation,
  ResumeLanguage,
  ResumeProfile,
  ResumeProjects,
  ResumeReferences,
  ResumeInterface,
  ResumeState,
  ResumeTheme,
  SectionKey,
  SkillGroup,
} from '@/components/builder/previousResumes/ResumeInterface';
import {
  DEFAULT_SECTION_ORDER,
  DEFAULT_THEME,
  EXAMPLE_RESUME_ID,
  createExampleResume,
  formatDateRange,
  languagesToLegacy,
  normalizeResume,
  skillsToLegacy,
} from '@/lib/resumeDefaults';
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

// Initial state setup. The example resume is always rebuilt from its default
// data on load so any experimentation with it is discarded on close/reopen.
let initialState: ResumeState;
if (isLocalStorageAvailable()) {
  let stored: unknown = [];
  try {
    stored = JSON.parse(localStorage.getItem('resume') ?? '[]');
  } catch (e) {
    stored = [];
  }
  const value = Array.isArray(stored) ? (stored as any[]) : [];
  initialState = {
    value: [
      ...value
        .filter((resume) => resume?.id !== EXAMPLE_RESUME_ID)
        .map((resume) => normalizeResume(resume)),
      createExampleResume(),
    ],
  };
} else {
  initialState = {
    value: [createExampleResume()],
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
            intro: action.payload.title,
          },
          skills: '',
          skillGroups: [{ id: uuidv4(), name: 'Skills', skills: [] }],
          experience: [],
          education: [],
          projects: [],
          certifications: [],
          awards: [],
          references: [],
          languages: '',
          languageItems: [],
          sectionOrder: [...DEFAULT_SECTION_ORDER],
          hiddenSections: [],
          theme: { ...DEFAULT_THEME },
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
        value: string;
      }>
    ) => {
      const { id, value } = action.payload;

      state.value = state.value.map((resume) => {
        if (resume.id === id) {
          return {
            ...resume,
            skills: value,
          };
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    updateResumeProject: (
      state,
      action: PayloadAction<{
        id: string;
        index: number;
        value: ResumeProjects;
      }>
    ) => {
      const { id, index, value } = action.payload;

      state.value = state.value.map((resume) => {
        if (resume.id === id) {
          return {
            ...resume,
            projects: resume.projects
              ? resume?.projects?.map((project, i) =>
                  i === index ? value : project
                )
              : [value],
          };
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    addNewResumeProject: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      state.value = state.value.map((resume) => {
        if (resume.id === id) {
          resume.projects?.push({
            projectName: '',
            projectDescription: '',
          });
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    deleteResumeProject: (
      state,
      action: PayloadAction<{ id: string; index: number }>
    ) => {
      const { id, index } = action.payload;

      state.value = state.value.map((resume) =>
        resume.id === id
          ? {
              ...resume,
              projects: resume.projects
                ? resume.projects.filter((_, i) => i !== index)
                : [],
            }
          : resume
      );
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    updateResumeCertification: (
      state,
      action: PayloadAction<{
        id: string;
        index: number;
        value: ResumeCertifications;
      }>
    ) => {
      const { id, index, value } = action.payload;

      state.value = state.value.map((resume) => {
        if (resume.id === id) {
          return {
            ...resume,
            certifications: resume.certifications
              ? resume?.certifications?.map((certification, i) =>
                  i === index ? value : certification
                )
              : [value],
          };
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    addNewResumeCertification: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      const { id } = action.payload;

      state.value = state.value.map((resume) => {
        if (resume.id === id) {
          resume.certifications?.push({
            certificationName: '',
            certificationDescription: '',
          });
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    deleteResumeCertification: (
      state,
      action: PayloadAction<{ id: string; index: number }>
    ) => {
      const { id, index } = action.payload;

      state.value = state.value.map((resume) =>
        resume.id === id
          ? {
              ...resume,
              certifications: resume.certifications
                ? resume.certifications.filter((_, i) => i !== index)
                : [],
            }
          : resume
      );
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    updateResumeAward: (
      state,
      action: PayloadAction<{
        id: string;
        index: number;
        value: ResumeAwards;
      }>
    ) => {
      const { id, index, value } = action.payload;

      state.value = state.value.map((resume) => {
        if (resume.id === id) {
          return {
            ...resume,
            awards: resume.awards
              ? resume?.awards?.map((award, i) => (i === index ? value : award))
              : [value],
          };
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    addNewResumeAward: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      state.value = state.value.map((resume) => {
        if (resume.id === id) {
          resume.awards?.push({
            awardName: '',
            awardDescription: '',
          });
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    deleteResumeAward: (
      state,
      action: PayloadAction<{ id: string; index: number }>
    ) => {
      const { id, index } = action.payload;

      state.value = state.value.map((resume) =>
        resume.id === id
          ? {
              ...resume,
              awards: resume.awards
                ? resume.awards.filter((_, i) => i !== index)
                : [],
            }
          : resume
      );
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    updateResumeReference: (
      state,
      action: PayloadAction<{
        id: string;
        index: number;
        value: ResumeReferences;
      }>
    ) => {
      const { id, index, value } = action.payload;

      state.value = state.value.map((resume) => {
        if (resume.id === id) {
          return {
            ...resume,
            references: resume.references
              ? resume?.references?.map((reference, i) =>
                  i === index ? value : reference
                )
              : [value],
          };
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    addNewResumeReference: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      state.value = state.value.map((resume) => {
        if (resume.id === id) {
          resume.references?.push({
            referenceName: '',
            referenceDescription: '',
          });
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    deleteResumeReference: (
      state,
      action: PayloadAction<{ id: string; index: number }>
    ) => {
      const { id, index } = action.payload;

      state.value = state.value.map((resume) =>
        resume.id === id
          ? {
              ...resume,
              references: resume.references
                ? resume.references.filter((_, i) => i !== index)
                : [],
            }
          : resume
      );
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    updateResumeLanguage: (
      state,
      action: PayloadAction<{
        id: string;
        value: string;
      }>
    ) => {
      const { id, value } = action.payload;

      state.value = state.value.map((resume) => {
        if (resume.id === id) {
          return {
            ...resume,
            languages: value,
          };
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    setSkillGroups: (
      state,
      action: PayloadAction<{ id: string; groups: SkillGroup[] }>
    ) => {
      const { id, groups } = action.payload;
      state.value = state.value.map((resume) =>
        resume.id === id
          ? { ...resume, skillGroups: groups, skills: skillsToLegacy(groups) }
          : resume
      );
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    setLanguageItems: (
      state,
      action: PayloadAction<{ id: string; items: ResumeLanguage[] }>
    ) => {
      const { id, items } = action.payload;
      state.value = state.value.map((resume) =>
        resume.id === id
          ? { ...resume, languageItems: items, languages: languagesToLegacy(items) }
          : resume
      );
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    updateEntryDateRange: (
      state,
      action: PayloadAction<{
        id: string;
        section: 'experience' | 'education';
        index: number;
        value: DateRange;
      }>
    ) => {
      const { id, section, index, value } = action.payload;
      const formatted = formatDateRange(value);
      state.value = state.value.map((resume) => {
        if (resume.id !== id) return resume;
        if (section === 'experience' && resume.experience?.[index]) {
          resume.experience[index].jobDateRange = value;
          resume.experience[index].jobDate = formatted;
        }
        if (section === 'education' && resume.education?.[index]) {
          resume.education[index].schoolDateRange = value;
          resume.education[index].schoolDate = formatted;
        }
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    reorderEntries: (
      state,
      action: PayloadAction<{
        id: string;
        section:
          | 'experience'
          | 'education'
          | 'projects'
          | 'certifications'
          | 'awards'
          | 'references';
        from: number;
        to: number;
      }>
    ) => {
      const { id, section, from, to } = action.payload;
      state.value = state.value.map((resume) => {
        if (resume.id !== id) return resume;
        const list = resume[section] as unknown as any[];
        if (!list || from < 0 || to < 0 || from >= list.length || to >= list.length) {
          return resume;
        }
        const [moved] = list.splice(from, 1);
        list.splice(to, 0, moved);
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    reorderSections: (
      state,
      action: PayloadAction<{ id: string; from: number; to: number }>
    ) => {
      const { id, from, to } = action.payload;
      state.value = state.value.map((resume) => {
        if (resume.id !== id) return resume;
        const order = [...(resume.sectionOrder ?? DEFAULT_SECTION_ORDER)];
        if (from < 0 || to < 0 || from >= order.length || to >= order.length) {
          return resume;
        }
        const [moved] = order.splice(from, 1);
        order.splice(to, 0, moved);
        resume.sectionOrder = order;
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    toggleSectionVisibility: (
      state,
      action: PayloadAction<{ id: string; section: SectionKey }>
    ) => {
      const { id, section } = action.payload;
      state.value = state.value.map((resume) => {
        if (resume.id !== id) return resume;
        const hidden = resume.hiddenSections ?? [];
        resume.hiddenSections = hidden.includes(section)
          ? hidden.filter((key) => key !== section)
          : [...hidden, section];
        return resume;
      });
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    updateResumeTheme: (
      state,
      action: PayloadAction<{ id: string; value: Partial<ResumeTheme> }>
    ) => {
      const { id, value } = action.payload;
      state.value = state.value.map((resume) =>
        resume.id === id
          ? { ...resume, theme: { ...(resume.theme ?? DEFAULT_THEME), ...value } }
          : resume
      );
      localStorage?.setItem('resume', JSON.stringify(state.value));
    },

    importResumes: (state, action: PayloadAction<ResumeInterface[]>) => {
      const incoming = (Array.isArray(action.payload) ? action.payload : [])
        .filter((resume) => resume && typeof resume === 'object' && resume.profile)
        .map((resume) =>
          normalizeResume({
            ...resume,
            id: uuidv4(),
            isExample: false,
            fileName: resume.fileName || 'Imported resume',
            last_accessed: new Date().toUTCString(),
          })
        );
      const example = state.value.filter((resume) => resume.isExample);
      state.value = [...state.value.filter((resume) => !resume.isExample), ...incoming, ...example];
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
  updateResumeProject,
  addNewResumeProject,
  deleteResumeProject,
  updateResumeCertification,
  addNewResumeCertification,
  deleteResumeCertification,
  updateResumeAward,
  addNewResumeAward,
  deleteResumeAward,
  updateResumeReference,
  addNewResumeReference,
  deleteResumeReference,
  updateResumeLanguage,
  setSkillGroups,
  setLanguageItems,
  updateEntryDateRange,
  reorderEntries,
  reorderSections,
  toggleSectionVisibility,
  updateResumeTheme,
  importResumes,
} = resumeSlice.actions;
export default resumeSlice.reducer;
