import Gallery from "../components/Gallery";
import GallerySearch from "../components/GallerySearch";
export default function HomePage() {
  return (
    <>
      <main className="p-4">
        <h2 className="text-xl mb-2">Suche:</h2>
        <GallerySearch />
        <h2 className="text-xl my-10">Übersicht aktueller Gemälde:</h2>
        <Gallery />
      </main>
    </>
  );
}
