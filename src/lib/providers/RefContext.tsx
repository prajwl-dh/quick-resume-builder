import React from 'react';

interface RefTypes {
  profileRef: React.MutableRefObject<HTMLDivElement | null>;
  skillsRef: React.MutableRefObject<HTMLDivElement | null>;
  workExperienceRef: React.MutableRefObject<HTMLDivElement | null>;
  educationRef: React.MutableRefObject<HTMLDivElement | null>;
  projectsRef: React.MutableRefObject<HTMLDivElement | null>;
  certificationsRef: React.MutableRefObject<HTMLDivElement | null>;
  awardsRef: React.MutableRefObject<HTMLDivElement | null>;
  referencesRef: React.MutableRefObject<HTMLDivElement | null>;
  languagesRef: React.MutableRefObject<HTMLDivElement | null>;
}

const initialRefValue: RefTypes = {
  profileRef: React.createRef<HTMLDivElement>(),
  skillsRef: React.createRef<HTMLDivElement>(),
  workExperienceRef: React.createRef<HTMLDivElement>(),
  educationRef: React.createRef<HTMLDivElement>(),
  projectsRef: React.createRef<HTMLDivElement>(),
  certificationsRef: React.createRef<HTMLDivElement>(),
  awardsRef: React.createRef<HTMLDivElement>(),
  referencesRef: React.createRef<HTMLDivElement>(),
  languagesRef: React.createRef<HTMLDivElement>(),
};

const RefContext = React.createContext<RefTypes>(initialRefValue);

export default RefContext;
