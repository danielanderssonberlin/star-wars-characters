export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center gap-4">
        <div className="h-8 w-48 bg-gray-900 rounded animate-pulse" />
        <div className="h-10 w-64 bg-gray-900 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-900/50 rounded-lg animate-pulse border border-gray-800" />
        ))}
      </div>
    </div>
  );
}
