export interface ResumeInterface {
  id: string;
  fileName?: string;
  title: string;
  last_accessed: string;
  profile: ResumeProfile;
  skills: ResumeSkills[];
  experience: ResumeWorkExperience[];
  education: ResumeEducation[];
  projects: ResumeProjects[];
}

export interface ResumeProfile {
  fullName?: string;
  intro?: string;
  email?: string;
  location?: string;
  phone?: string;
  website?: string;
  linkedIn?: string;
  gitHub?: string;
  profileCustomField?: [{ fieldName: string; fieldValue: string }];
  summary?: string;
}

export interface ResumeSkills {
  skillRelevantSkills?: string;
}

export interface ResumeWorkExperience {
  companyName?: string;
  jobTitle?: string;
  jobDate?: string;
  jobDescription?: string;
}

export interface ResumeEducation {
  schoolName?: string;
  schoolDate?: string;
  schoolMajor?: string;
  schoolGPA?: string;
  schoolDescription?: string;
}

export interface ResumeProjects {
  projectName?: string;
  projectDescription?: string;
}

export interface ResumeState {
  value: ResumeInterface[];
}
