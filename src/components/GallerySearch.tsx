import { useState, useEffect } from "react";
import type { ArtworkType } from "../_types";
import { ArtworkSchema } from "../_schemas";

export default function GallerySearch() {
  //
  // States
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [searchResult, setSearchResult] = useState<ArtworkType[] | null>(null);
  //
  // Search Action
  const searchAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search: any = formData.get("search") ?? "";
    setSearchTerms(search);
  };
  //
  // use Effekt
  useEffect(() => {
    if (!searchTerms) return; // Abbrechen, falls noch keine Suche (Damit der useEffect nicht initial sofort los geht !)
    const getSearch = async () => {
      try {
        const res = await fetch(
          `https://api.artic.edu/api/v1/artworks/search?q=${searchTerms}`
        );
        const resData = await res.json();
        console.log(resData);
      } catch (error) {}
    };
    getSearch();
  }, [searchTerms]);

  return (
    <>
      <div>
        <form onSubmit={searchAction}>
          <fieldset className="fieldset p-4 md:max-w-3/4 flex gap-5">
            <label className="input">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                name="search"
                required
                placeholder="Search"
                className=""
              />
            </label>

            <button type="submit" className="btn btn-neutral w-1/4">
              Suche
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
