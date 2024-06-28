export interface ResumeInterface {
  id: string;
  fileName?: string;
  fullName?: string;
  title: string;
  last_accessed: string;
}

export interface ResumeState {
  value: ResumeInterface[];
}
