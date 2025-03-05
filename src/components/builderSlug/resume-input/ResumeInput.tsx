import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import Awards from './awards/Awards';
import Certifications from './certifications/Certifications';
import Education from './education/Education';
import Languages from './languages/Languages';
import Profile from './profile/Profile';
import Projects from './projects/Projects';
import References from './references/References';
import Skills from './skills/Skills';
import WorkExperience from './workExperience/WorkExperience';

export default function ResumeInput({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  return (
    <div className='flex lg:h-screen'>
      <div className='flex flex-col gap-14 lg:ml-64 p-4 w-full mt-14 lg:mt-0 lg:w-[35vw] 2xl:w-[40vw] overflow-x-hidden overflow-y-auto'>
        <Profile resume={resume} />
        <WorkExperience resume={resume} />
        <Education resume={resume} />
        <Skills resume={resume} />
        <Awards resume={resume} />
        <Certifications resume={resume} />
        <Projects resume={resume} />
        <References resume={resume} />
        <Languages resume={resume} />
      </div>
    </div>
  );
}
