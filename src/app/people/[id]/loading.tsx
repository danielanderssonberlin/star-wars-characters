export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="h-4 w-32 bg-gray-900 rounded animate-pulse" />
      <div className="pb-8 border-b border-gray-800 space-y-4">
        <div className="h-12 w-2/3 bg-gray-900 rounded animate-pulse" />
        <div className="h-4 w-1/3 bg-gray-900 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="h-64 bg-gray-900/50 rounded-xl animate-pulse" />
        <div className="h-64 md:col-span-2 bg-gray-900/50 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}
