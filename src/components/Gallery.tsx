import { useReducer, useState, useCallback, useMemo, useEffect } from "react";
import { useFetchPhotos } from "@/hooks/useFetchPhotos";
import PhotoCard from "./PhotoCard";
import SearchInput from "./SearchInput";
import { Loader2, Heart, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);
  const [favourites, dispatch] = useReducer(favouritesReducer, new Set<string>());

  useEffect(() => {
    dispatch({ type: "INIT", ids: loadFavourites() });
  }, []);

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
    let result = photos;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.author.toLowerCase().includes(q));
    }
    if (showFavouritesOnly) {
      result = result.filter((p) => favourites.has(p.id));
    }
    return result;
  }, [photos, search, showFavouritesOnly, favourites]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-sm text-muted-foreground animate-pulse">Loading photos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="p-4 rounded-2xl bg-destructive/10">
          <p className="text-destructive font-medium">Failed to load photos</p>
        </div>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <SearchInput
          value={search}
          onChange={handleSearch}
          resultCount={filteredPhotos.length}
          totalCount={photos.length}
        />
        <button
          onClick={() => setShowFavouritesOnly((prev) => !prev)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all shrink-0 ${
            showFavouritesOnly
              ? "bg-heart/10 border-heart/30 text-heart"
              : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
          }`}
        >
          <Heart size={16} className={showFavouritesOnly ? "fill-heart" : ""} />
          Favourites
          {favourites.size > 0 && (
            <span className={`text-xs font-mono px-1.5 py-0.5 rounded-md ${
              showFavouritesOnly ? "bg-heart/20" : "bg-muted"
            }`}>
              {favourites.size}
            </span>
          )}
        </button>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {filteredPhotos.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 gap-3"
          >
            <LayoutGrid size={40} className="text-muted-foreground/30" />
            <p className="text-muted-foreground">
              {showFavouritesOnly ? "No favourites yet. Heart some photos!" : "No photos match your search."}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {filteredPhotos.map((photo, i) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={i}
                isFavourite={favourites.has(photo.id)}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
