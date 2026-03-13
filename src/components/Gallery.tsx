import { useReducer, useState, useCallback, useMemo, useEffect } from "react";
import { useFetchPhotos } from "@/hooks/useFetchPhotos";
import PhotoCard from "./PhotoCard";
import SearchInput from "./SearchInput";
import { Loader2 } from "lucide-react";

type FavouritesState = Set<string>;
type FavouritesAction = { type: "TOGGLE_FAVOURITE"; id: string } | { type: "INIT"; ids: string[] };

function favouritesReducer(state: FavouritesState, action: FavouritesAction): FavouritesState {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const next = new Set(state);
      if (next.has(action.id)) {
        next.delete(action.id);
      } else {
        next.add(action.id);
      }
      return next;
    }
    case "INIT":
      return new Set(action.ids);
    default:
      return state;
  }
}

function loadFavourites(): string[] {
  try {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos();
  const [search, setSearch] = useState("");
  const [favourites, dispatch] = useReducer(favouritesReducer, new Set<string>());

  // Load persisted favourites on mount
  useEffect(() => {
    dispatch({ type: "INIT", ids: loadFavourites() });
  }, []);

  // Persist favourites to localStorage
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify([...favourites]));
  }, [favourites]);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleToggleFavourite = useCallback((id: string) => {
    dispatch({ type: "TOGGLE_FAVOURITE", id });
  }, []);

  const filteredPhotos = useMemo(() => {
    if (!search.trim()) return photos;
    const q = search.toLowerCase();
    return photos.filter((p) => p.author.toLowerCase().includes(q));
  }, [photos, search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-destructive text-lg">Failed to load photos: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <SearchInput value={search} onChange={handleSearch} />
      </div>

      {filteredPhotos.length === 0 ? (
        <p className="text-center text-muted-foreground">No photos match your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.has(photo.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
