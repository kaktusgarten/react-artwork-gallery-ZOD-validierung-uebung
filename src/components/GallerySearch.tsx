import { useState, useEffect } from "react";
import type { ArtworkType } from "../_types";
import GallerySearchForm from "./GallerySearchForm";

export default function GallerySearch() {
  //
  // States
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<ArtworkType[] | null>(null);
  //
  // Search Action
  const searchAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search: any = formData.get("search") ?? "";
    setSearchTerm(search);
  };
  //
  // use Effekt
  useEffect(() => {
    if (!searchTerm) return; // Abbrechen, falls noch keine Suche (Damit der useEffect nicht initial sofort los geht !)
    const getSearch = async () => {
      try {
        const res = await fetch(
          `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}`
        );
        const resData = await res.json();
        console.log(resData);
        setSearchResult(resData.data);
      } catch (error) {}
    };
    getSearch();
  }, [searchTerm]);

  return (
    <>
      <div>
        <div>
          <GallerySearchForm searchAction={searchAction} />
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 p-2">
          {searchResult?.map((artwork) => (
            <article
              key={artwork.id}
              className="p-5 m-2 bg-white text-black rounded-xl"
            >
              <h3 className="text-md font-bold">{artwork.title}</h3>
              <p>ID: {artwork.id}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
