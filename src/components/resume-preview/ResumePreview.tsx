export default function ResumePreview({
  setIsResumePreviewOpen,
}: {
  setIsResumePreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div onClick={() => setIsResumePreviewOpen((prev) => !prev)}>
      ResumePreview
    </div>
  );
}
