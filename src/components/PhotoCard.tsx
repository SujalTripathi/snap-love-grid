import { Heart } from "lucide-react";
import type { Photo } from "@/hooks/useFetchPhotos";

interface PhotoCardProps {
  photo: Photo;
  isFavourite: boolean;
  onToggleFavourite: (id: string) => void;
}

const PhotoCard = ({ photo, isFavourite, onToggleFavourite }: PhotoCardProps) => {
  return (
    <div className="group rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-gallery transition-shadow duration-300">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="flex items-center justify-between p-4">
        <span className="text-sm font-medium text-foreground truncate mr-2">
          {photo.author}
        </span>
        <button
          onClick={() => onToggleFavourite(photo.id)}
          className="shrink-0 p-1.5 rounded-full hover:bg-accent transition-colors"
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          <Heart
            size={20}
            className={
              isFavourite
                ? "fill-heart text-heart"
                : "text-muted-foreground hover:text-heart transition-colors"
            }
          />
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
