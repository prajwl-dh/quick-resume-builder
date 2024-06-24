export interface ResumeInterface {
  id: string;
  title?: string;
  last_accessed?: string;
}

export interface ResumeState {
  value: ResumeInterface[];
}
