import { useCallback, useEffect, useState } from "react";
import { Photo, PhotoWithStatus } from "../types";
import { getDisabledPhotos } from "../utils/storage";

export const usePhotos = (showEnabled: boolean) => {
  const [photos, setPhotos] = useState<PhotoWithStatus[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const disabled = await getDisabledPhotos();
      const disabledSet = new Set(disabled);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos"
      );
      const data: Photo[] = await response.json();
      const allPhotos: PhotoWithStatus[] = data.map((photo) => ({
        ...photo,
        isEnabled: !disabledSet.has(`${photo.albumId}-${photo.id}`),
      }));

      setPhotos(
        showEnabled
          ? allPhotos.filter((p) => p.isEnabled)
          : allPhotos.filter((p) => !p.isEnabled)
      );
    } catch (e) {
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  }, [showEnabled]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return { photos, loading, fetchPhotos, setPhotos };
};
