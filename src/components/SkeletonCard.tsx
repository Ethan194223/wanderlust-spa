/* src/components/SkeletonCard.tsx */
export default function SkeletonCard() {
  return (
    <article
      className="
        w-full                                 /* ← NEW: let the grid stretch it */
        rounded-2xl shadow p-4 flex flex-col bg-white
        animate-pulse transition-colors duration-200
      "
    >
      {/* fake image */}
      <div className="h-40 w-full bg-gray-200 rounded-xl mb-4" />

      {/* fake text lines */}
      <div className="space-y-2">
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
      </div>
    </article>
  );
}
