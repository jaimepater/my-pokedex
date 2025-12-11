interface PokemonDetailsDescriptionProps {
  description: string;
}

export function PokemonDetailsDescription({
  description,
}: PokemonDetailsDescriptionProps) {
  return (
    <div className="px-6 mb-4 text-center">
      <p className="text-muted-foreground text-xs">{description}</p>
    </div>
  );
}
