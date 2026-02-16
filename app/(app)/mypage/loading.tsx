export default function MyPageLoading() {
  return (
    <div className="bg-[#f6f8f7] text-slate-800 min-h-screen flex font-display">
      {/* Sidebar Skeleton (Desktop only) */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col">
        <div className="h-24 flex items-center px-8">
          <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
          <div className="ml-2 h-6 w-24 bg-slate-200 rounded animate-pulse" />
        </div>
        <nav className="flex-1 px-4 space-y-2 py-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-12 bg-slate-100 rounded-lg animate-pulse"
            />
          ))}
        </nav>
      </aside>

      {/* Main Content Skeleton */}
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 bg-[#f6f8f7]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-slate-200 rounded-full animate-pulse" />
        </header>

        <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
          {/* Stats Skeleton */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 bg-white rounded-2xl p-8 shadow-sm space-y-4">
              <div className="h-9 w-64 bg-slate-200 rounded animate-pulse" />
              <div className="h-5 w-80 bg-slate-100 rounded animate-pulse" />
              <div className="flex gap-4 mt-8">
                <div className="h-5 w-24 bg-slate-100 rounded animate-pulse" />
                <div className="h-5 w-24 bg-slate-100 rounded animate-pulse" />
              </div>
            </div>
            <div className="col-span-1 bg-white rounded-2xl p-8 shadow-sm border border-primary/20 space-y-4">
              <div className="h-6 w-24 bg-slate-200 rounded animate-pulse" />
              <div className="h-3 w-full bg-slate-100 rounded-full animate-pulse" />
              <div className="h-12 w-full bg-slate-100 rounded-full animate-pulse mt-6" />
            </div>
          </section>

          {/* Filter Skeleton */}
          <section className="flex justify-between items-center gap-4">
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-28 bg-slate-200 rounded-full animate-pulse"
                />
              ))}
            </div>
            <div className="h-10 w-64 bg-slate-200 rounded-full animate-pulse" />
          </section>

          {/* Grid Skeleton */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-3 shadow-sm">
                <div className="aspect-[3/4] rounded-2xl bg-slate-100 animate-pulse mb-3" />
                <div className="space-y-2 px-1">
                  <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-slate-100 rounded animate-pulse" />
                  <div className="flex gap-2 mt-2">
                    <div className="flex-1 h-9 bg-slate-100 rounded-lg animate-pulse" />
                    <div className="flex-1 h-9 bg-slate-100 rounded-lg animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
