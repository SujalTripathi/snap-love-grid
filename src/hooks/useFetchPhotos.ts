import { useState, useEffect } from "react";

export interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export function useFetchPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPhotos() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://picsum.photos/v2/list?limit=30", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data: Photo[] = await res.json();
        setPhotos(data);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
    return () => controller.abort();
  }, []);

  return { photos, loading, error };
}
