import { PokemonDetailsView } from './PokemonDetailsView';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PokemonDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return <PokemonDetailsView id={id} />;
}
