import { Skeleton } from "@/components/ui/skeleton";

export default function GenerateLoading() {
  return (
    <div className="bg-[#f6f8f7] h-screen overflow-hidden flex flex-col">
      {/* Navbar skeleton */}
      <div className="h-16 bg-white border-b border-primary/10 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-56 rounded-full hidden md:block" />
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
      </div>
      {/* Main */}
      <main className="flex-1 flex overflow-hidden">
        <aside className="w-full md:w-[400px] bg-white/50 border-r border-primary/10 p-6 space-y-8">
          <div className="space-y-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-5 w-36" />
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        </aside>
        <section className="hidden md:flex flex-1 items-center justify-center">
          <Skeleton className="aspect-a4 h-[70vh] rounded-lg" />
        </section>
      </main>
    </div>
  );
}
