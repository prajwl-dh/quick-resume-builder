export default function MobileResumePreview({
  setIsResumePreviewOpen,
}: {
  setIsResumePreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className='mt-14 px-2'
      onClick={() => setIsResumePreviewOpen((prev) => !prev)}
    >
      ResumePreview
    </div>
  );
}
