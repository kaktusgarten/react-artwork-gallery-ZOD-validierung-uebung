import { useEffect, useState } from "react";
import { getArtworks } from "../data/GetArtworks";
import type { ArtworkType } from "../_types";

export default function Gallery() {
  const [artworks, setArtworks] = useState<ArtworkType[]>([]);

  useEffect(() => {
    const fetchArtworksData = async () => {
      const artworksData = await getArtworks();

      console.log(artworksData.data);

      setArtworks(artworksData.data);
    };
    fetchArtworksData();
  }, []);

  return (
    <>
      {artworks.length === 0 ? (
        <p>Lade Daten...</p>
      ) : (
        artworks.map((artwork) => (
          <div
            key={artwork.id}
            className="p-5  m-5 bg-white text-black rounded-xl"
          >
            <h3 className="font-bold">{artwork.title}</h3>
            <p>{artwork.artist_display}</p>
          </div>
        ))
      )}
    </>
  );
}
