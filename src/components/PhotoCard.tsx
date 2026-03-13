import { Heart, Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Photo } from "@/hooks/useFetchPhotos";

interface PhotoCardProps {
  photo: Photo;
  isFavourite: boolean;
  onToggleFavourite: (id: string) => void;
  index: number;
}

const PhotoCard = ({ photo, isFavourite, onToggleFavourite, index }: PhotoCardProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-gallery transition-all duration-500 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden relative bg-muted">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-muted" />
        )}
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${loaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top-right heart button (visible on hover or if favourited) */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => onToggleFavourite(photo.id)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
            isFavourite
              ? "bg-heart/20 opacity-100"
              : "bg-black/30 opacity-0 group-hover:opacity-100"
          }`}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          <Heart
            size={18}
            className={
              isFavourite
                ? "fill-heart text-heart drop-shadow-sm"
                : "text-white/90 hover:text-heart transition-colors"
            }
          />
        </motion.button>

        {/* Bottom overlay info (on hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <div className="flex items-center gap-2">
            <a
              href={photo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              aria-label="View on Unsplash"
            >
              <ExternalLink size={14} className="text-white" />
            </a>
            <a
              href={photo.download_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              aria-label="Download photo"
            >
              <Download size={14} className="text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{photo.author}</p>
          <p className="text-xs text-muted-foreground">
            {photo.width} × {photo.height}
          </p>
        </div>
        <span className="text-[10px] font-mono tracking-wider text-muted-foreground/60 uppercase">
          #{photo.id}
        </span>
      </div>
    </motion.div>
  );
};

export default PhotoCard;
