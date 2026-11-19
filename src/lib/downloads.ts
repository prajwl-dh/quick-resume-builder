import type { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';

function fileSlug(value: string, limit = 80) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, limit);
}

/** The name shown when the resume is saved as a PDF. */
export function pdfFileName(resume: ResumeInterface) {
  const name =
    resume.profile.fullName?.trim() || resume.fileName?.trim() || 'resume';
  return `${fileSlug(name) || 'resume'}.pdf`;
}

export function downloadJson(resume: ResumeInterface) {
  const slug = (resume.fileName || resume.title || 'resume')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
  const blob = new Blob([JSON.stringify({ version: 1, resumes: [resume] }, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${slug || 'resume'}.quick-resume.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
