import { PokemonGrid } from './PokemonGrid';
import { PokemonSearchBar } from './PokemonSearchBar';
import { PokemonSortMenu } from './PokemonSortMenu';
import { PokeBall } from '@/components/PokeBall';
// import { Zap } from 'lucide-react'; // Placeholder if needed

export function PokemonListPage() {
  return (
    <div className="min-h-screen bg-[#dc0a2d] font-sans">
      {/* Red Header Area */}
      <header className="px-4 pt-4 pb-6">
        <div className="flex items-baseline gap-4 mb-3">
          <PokeBall className="w-5 h-5 text-white" />
          <h1 className="text-2xl font-bold text-white">Pokédex</h1>
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
