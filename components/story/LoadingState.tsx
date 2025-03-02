
export const LoadingState = () => {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="h-96 bg-muted/30 rounded-xl animate-pulse mb-6"></div>
        <div className="h-8 bg-muted/30 rounded-lg animate-pulse w-3/4 mb-4"></div>
        <div className="h-4 bg-muted/30 rounded-lg animate-pulse w-1/2 mb-12"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 bg-muted/30 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
};
