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
            <h3 className="font-bold text-xl">{artwork.title}</h3>
            <p className="mb-5">{artwork.artist_display}</p>
            <div className="grid sm:[grid-template-columns:30%_1fr] gap-5">
              <div>
                <img
                  src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                  alt={artwork.thumbnail?.alt_text || "Vorschau"}
                  className="h-auto w-auto object-contain max-h-[300px]"
                />
              </div>
              <div>
                <h4 className="font-bold">Beschreibung:</h4>
                {/* Hier werden zusätzlich HTML Tags aus der description entfernt: */}
                {artwork.description?.replace(/<[^>]+>/g, "") ?? ""}
              </div>
            </div>
          </article>
        ))
      )}

      <div className="border p-5">
        Kunstwerke mit unvollständigem Datensatz (Bezüglich der fehlenden
        "Description"):
      </div>

      {invalidArtworks.length === 0 ? (
        <p>Lade Daten...</p>
      ) : (
        invalidArtworks.map((invalidArtwork) => (
          <article
            key={invalidArtwork.article.id}
            className="p-5  m-5 bg-white text-black rounded-xl"
          >
            <h3 className="font-bold text-xl">
              {invalidArtwork.article.title}
            </h3>
            <p>{invalidArtwork.article.artist_display}</p>
          </article>
        ))
      )}
    </>
  );
}
