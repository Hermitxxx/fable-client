import {
  Swords,
  Rocket,
  Heart,
  Search,
  Ghost,
  Feather,
  BookMarked,
  Compass,
} from "lucide-react";

const genres = [
  { name: "Fantasy", icon: Swords, count: 420 },
  { name: "Sci-Fi", icon: Rocket, count: 310 },
  { name: "Romance", icon: Heart, count: 285 },
  { name: "Mystery", icon: Search, count: 195 },
  { name: "Horror", icon: Ghost, count: 140 },
  { name: "Literary Fiction", icon: Feather, count: 360 },
  { name: "Historical", icon: BookMarked, count: 210 },
  { name: "Adventure", icon: Compass, count: 275 },
];

export default function BrowseByGenre() {
  return (
    <section id="genres" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="section-heading text-3xl md:text-4xl">
            Browse by Genre
          </h2>
          <p className="mt-6 text-ink/60 max-w-lg">
            From epic fantasy to intimate literary fiction. Find the stories
            that speak to you.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <a
              key={genre.name}
              href={`/genres/${genre.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="card-ink p-5 flex flex-col items-center text-center gap-3 group cursor-pointer hover:bg-sun/10"
            >
              <div className="w-12 h-12 rounded-lg bg-wave/10 border-2 border-ink flex items-center justify-center transition-colors duration-200 group-hover:bg-sun/20">
                <genre.icon className="w-6 h-6 text-wave" strokeWidth={2} />
              </div>
              <div>
                <div className="text-sm font-bold">{genre.name}</div>
                <div className="text-xs text-ink/50 mt-0.5">
                  {genre.count} books
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
