import { PokemonGrid } from './PokemonGrid';
import { PokemonSearchBar } from './PokemonSearchBar';
import { PokemonSortMenu } from './PokemonSortMenu';
// import { Zap } from 'lucide-react'; // Placeholder if needed

export function PokemonListPage() {
  return (
    <div className="min-h-screen bg-[#dc0a2d] font-sans">
      {/* Red Header Area */}
      <header className="px-4 pt-4 pb-6">
        <div className="flex items-center gap-4 mb-3">
          {/* Pokeball Icon (CSS or SVG) */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-10 h-10 text-white"
          >
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
            <path d="M2.5 12h19" />
            <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path d="M12 22v-6" />{' '}
            {/* Adjusted to look more like a simplified pokeball */}
          </svg>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Pokédex
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <PokemonSearchBar />
          </div>
          <PokemonSortMenu />
        </div>
      </header>

      {/* Main Card Container */}
      <main className="bg-[#f7f7f7] min-h-[calc(100vh-180px)] rounded-t-[2.5rem] px-2 py-4 md:p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] mx-auto max-w-[98%]">
        <PokemonGrid />
      </main>
    </div>
  );
}
