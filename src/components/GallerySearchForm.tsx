export default function GallerySearchForm({ searchAction }){
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
