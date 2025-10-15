import { useEffect, useState } from "react";
import { getArtworks } from "../data/GetArtworks";
import type { ArtworkType } from "../_types";
import { ArtworkSchema } from "../_schemas";

export default function Gallery() {
  const [validArtworks, setValidArtworks] = useState<ArtworkType[]>([]);
  const [invalidArtworks, setInvalidArtworks] = useState<any[]>([]);

  useEffect(() => {
    const fetchArtworksData = async () => {
      const artworksData = await getArtworks();

      // API liefert Array in artworksData.data
      const rawArtworks = artworksData.data;
      const valids: ArtworkType[] = [];
      const invalids: any[] = [];

      // Einzelne Validierung je Artwork
      rawArtworks.forEach((article: any, index: number) => {
        const parseResult = ArtworkSchema.safeParse(article);

        if (parseResult.success) {
          valids.push(parseResult.data);
        } else {
          invalids.push({
            index,
            article,
            errors: parseResult.error.issues,
          });
        }
      });

      // Ergebnis setzen
      setValidArtworks(valids);
      setInvalidArtworks(invalids);

      console.log(invalids);
    };

    fetchArtworksData();
  }, []);

  return (
    <>
      {validArtworks.length === 0 ? (
        <p>Lade Daten...</p>
      ) : (
        validArtworks.map((artwork) => (
          <article
            key={artwork.id}
            className="p-5  m-5 bg-white text-black rounded-xl"
          >
            <h3 className="font-bold">{artwork.title}</h3>
            <p>{artwork.artist_display}</p>
          </article>
        ))
      )}

      <div className="border p-5">
        Kunstwerke mit unvollständigem Datensatz (Bezüglich der fehlenden "Description"):
      </div>

      {invalidArtworks.length === 0 ? (
        <p>Lade Daten...</p>
      ) : (
        invalidArtworks.map((invalidArtwork) => (
          <article
            key={invalidArtwork.article.id}
            className="p-5  m-5 bg-white text-black rounded-xl"
          >
            <h3 className="font-bold">{invalidArtwork.article.title}</h3>
            <p>{invalidArtwork.article.artist_display}</p>
          </article>
        ))
      )}
    </>
  );
}
