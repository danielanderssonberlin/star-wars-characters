import { fetchPerson, fetchFromUrl, extractId } from "@/lib/swapi";
import { Planet, Film } from "@/types/swapi";
import Link from "next/link";
import { ArrowLeft, User, Globe, Film as FilmIcon } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PersonPage({ params }: PageProps) {
  const { id } = await params;
  
  try {
    const person = await fetchPerson(id);
    
    // Fetch homeworld
    const homeworld = await fetchFromUrl<Planet>(person.homeworld);
    
    // Fetch films (limited for performance, though usually only a few)
    const films = await Promise.all(
      person.films.map(url => fetchFromUrl<Film>(url))
    );

    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-400 transition-colors mb-4 group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" /> Back to characters
        </Link>

        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-800">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">
              {person.name}
            </h2>
            <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
              <span className="flex items-center gap-1.5"><User className="size-4 text-yellow-600" /> {person.gender}</span>
              <span className="flex items-center gap-1.5"><Globe className="size-4 text-yellow-600" /> {homeworld.name}</span>
            </div>
          </div>
          <div className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-500 text-xs font-bold uppercase tracking-widest">
            Birth Year: {person.birth_year}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Physical Attributes */}
          <section className="bg-gray-900/10 border border-gray-800 rounded-xl p-6 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-6">Physical Attributes</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
              <Attribute label="Height" value={person.height === "unknown" ? "Unknown" : `${person.height}cm`} />
              <Attribute label="Mass" value={person.mass === "unknown" ? "Unknown" : `${person.mass}kg`} />
              <Attribute label="Hair" value={person.hair_color} />
              <Attribute label="Eyes" value={person.eye_color} />
              <Attribute label="Skin" value={person.skin_color} />
            </div>
          </section>

          {/* Homeworld Details */}
          <section className="bg-gray-900/10 border border-gray-800 rounded-xl p-6 space-y-4 md:col-span-2">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
              <Globe className="size-3" /> Homeworld: {homeworld.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Attribute label="Climate" value={homeworld.climate} />
              <Attribute label="Terrain" value={homeworld.terrain} />
              <Attribute label="Population" value={homeworld.population === "unknown" ? "Unknown" : Number(homeworld.population).toLocaleString('en-US')} />
            </div>
          </section>
        </div>

        {/* Appearances */}
        <section className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
            <FilmIcon className="size-3" /> Appearances ({films.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {films.map((film, i) => (
              <div key={i} className="p-4 bg-gray-900/10 border border-gray-800 rounded-lg flex items-center justify-between group hover:border-yellow-500/20 transition-colors">
                <div>
                  <h4 className="font-semibold text-white group-hover:text-yellow-400 transition-colors">{film.title}</h4>
                  <p className="text-xs text-gray-500">Released: {new Date(film.release_date).toLocaleDateString('en-US')}</p>
                </div>
                <div className="size-8 rounded bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                  {film.episode_id}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-2xl mx-auto p-12 text-center space-y-6">
        <h2 className="text-3xl font-bold text-white">I have a bad feeling about this...</h2>
        <p className="text-gray-500">The character you are looking for does not exist in our archives or the Force is weak right now.</p>
        <Link href="/" className="inline-block px-6 py-3 bg-yellow-500 text-black font-bold uppercase tracking-widest rounded hover:bg-yellow-400 transition-colors">
          Return to List
        </Link>
      </div>
    );
  }
}

function Attribute({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-tighter text-gray-600">{label}</p>
      <p className="text-white capitalize">{value}</p>
    </div>
  );
}
