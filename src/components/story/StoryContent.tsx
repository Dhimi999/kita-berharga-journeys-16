
interface StoryContentProps {
  content: string;
}

export const StoryContent = ({ content }: StoryContentProps) => {
  return (
    <div className="prose prose-lg max-w-none mb-12 px-0 sm:px-2 md:px-4 lg:px-6">
      <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
    </div>
  );
};
