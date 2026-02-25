import Link from "next/link";
import { fetchPeople, extractId } from "@/lib/swapi";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function CharactersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || "";

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold uppercase tracking-widest text-blue-500">
          Characters
        </h2>
        
        <form action="/" method="get" className="relative max-w-sm w-full">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search characters..."
            className="w-full bg-gray-400/50 border border-blue-500/20 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500 placeholder:text-foreground/50 transition-colors"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 size-4" />
        </form>
      </div>

      <Suspense key={`${page}-${search}`} fallback={<div className="text-blue-500 animate-pulse">Loading characters...</div>}>
        <CharacterList page={page} search={search} />
      </Suspense>
    </div>
  );
}

async function CharacterList({ page, search }: { page: number; search: string }) {
  try {
    const data = await fetchPeople(page, search);
    const totalPages = Math.ceil(data.count / 10);

    if (data.results.length === 0) {
      return <p className="text-gray-500 py-12 text-center border border-gray-900 rounded-lg bg-gray-900/10">No characters found matching your search.</p>;
    }

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.results.map((person) => {
            const id = extractId(person.url);
            return (
              <Link 
                key={id}
                href={`/people/${id}`}
                className="group p-6 bg-gray-900/20 border border-gray-800 rounded-lg hover:border-blue-500/50 transition-all hover:bg-blue-500/5 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    {person.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-0.5 text-xs rounded border uppercase">
                      Birth: {person.birth_year}
                    </span>
                    <span className="px-2 py-0.5 text-xs rounded border uppercase">
                      Gender: {person.gender}
                    </span>
                  </div>
                </div>
                <div className="text-blue-600 text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Profile <ChevronRight className="size-4" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 py-8">
            <Link
              href={{ query: { page: page - 1, search: search || undefined } }}
              className={`p-2 rounded-full border border-gray-800 hover:border-blue-500 transition-colors ${page <= 1 ? "pointer-events-none opacity-20" : ""}`}
            >
              <ChevronLeft />
            </Link>
            
            <div className="text-sm font-medium text-gray-500">
              Page <span className="text-blue-500">{page}</span> of {totalPages}
            </div>

            <Link
              href={{ query: { page: page + 1, search: search || undefined } }}
              className={`p-2 rounded-full border border-gray-800 hover:border-blue-500 transition-colors ${page >= totalPages ? "pointer-events-none opacity-20" : ""}`}
            >
              <ChevronRight />
            </Link>
          </div>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="p-8 bg-red-950/20 border border-red-500/50 rounded-lg text-red-400">
        <h3 className="text-lg font-bold mb-2">Error Loading Data</h3>
        <p className="text-sm opacity-80">{error instanceof Error ? error.message : "Something went wrong"}</p>
        <button className="mt-4 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 rounded text-xs transition-colors">
          Retry
        </button>
      </div>
    );
  }
}
