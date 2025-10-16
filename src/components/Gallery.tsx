import { useEffect, useState } from "react";
import { getArtworks } from "../data/GetArtworks";
import type { ArtworkType } from "../_types";
import { ArtworkSchema } from "../_schemas";
import ModalDetails from "./ModalDetails";

export default function Gallery() {
  const [validArtworks, setValidArtworks] = useState<ArtworkType[]>([]);
  const [invalidArtworks, setInvalidArtworks] = useState<any[]>([]);
  const [id, setId] = useState<number | null>(null);

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
      <ModalDetails id={id} />

      <div className="grid xl:grid-cols-2">
        {validArtworks.length === 0 ? (
          <p className="mb-10 p-5 text-2xl">
            Lade Daten...... Scheint nix mehr zu geben das dem Schema
            entspricht.
            <br></br>
            Gestern ging´s noch. Ich erwarte im Schema eine "Description"...
          </p>
        ) : (
          validArtworks.map((artwork) => (
            <article
              onClick={() => {
                setId(artwork.id);
              }}
              key={artwork.id}
              className="p-5 pb-10 m-5 bg-white text-black rounded-xl cursor-pointer"
            >
              <h3 className="font-bold text-2xl pb-3 font-serif">
                {artwork.title}
              </h3>
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
      </div>
      <div className="p-5 bg-black text-white">
        Es folgen Kunstwerke mit unvollständigem Datensatz - Kunstwerke mit
        fehlender "Description":
      </div>
      <div className="grid grid-cols-2">
        {invalidArtworks.length === 0 ? (
          <p>Lade Daten...</p>
        ) : (
          invalidArtworks.map((invalidArtwork) => (
            // ARTICLE CARD
            <article
              onClick={() => {
                setId(invalidArtwork.article.id);
              }}
              key={invalidArtwork.article.id}
              className="hyphens-auto font-serif p-5 m-5 bg-white text-black rounded-xl grid sm:grid-cols-[120px_1fr] cursor-pointer"
            >
              <div className="">
                <img
                  className="max-h-[100px] max-w-[100px] object-contain"
                  src={`https://www.artic.edu/iiif/2/${invalidArtwork.article.image_id}/full/843,/0/default.jpg`}
                />
              </div>
              <div>
                <h3 className="font-bold text-xl">
                  {invalidArtwork.article.title}
                </h3>
                <p>{invalidArtwork.article.artist_display}</p>
              </div>
            </article>
          ))
        )}
      </div>
    </>
  );
}
