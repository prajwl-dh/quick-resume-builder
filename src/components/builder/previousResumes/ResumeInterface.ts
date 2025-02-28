export interface ResumeInterface {
  id: string;
  fileName?: string;
  title: string;
  last_accessed: string;
  profile: ResumeProfile;
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

export interface ResumeState {
  value: ResumeInterface[];
}
