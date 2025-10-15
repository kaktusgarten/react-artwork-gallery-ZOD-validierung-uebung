export default function AboutPage() {
  return (
    <>
      <main className="p-4">
        <h2 className="text-xl mb-5">Über dieses Projekt</h2>
        <p className="text-xl mb-10">
          1. Auf dieser React Site wurde folgendes verwendet:
        </p>
        <div className="flex gap-7">
          <div className="">
            <ul className="px-5 list-disc">
              <li>Vite</li>
              <li>Typescript</li>
              <li>React</li>
              <li>React-Router</li>
              <li>TailwindCss</li>
              <li>DailyUi</li>
              <li>React Context API</li>
              <li>Prodected-Layout</li>
              <li>ZOD</li>
              <li>useFetch() HOOK, siehe hooks/useFetch.tsx</li>
            </ul>
          </div>
          <div>
            Siehe:{" "}
            <a href="https://zod.dev/" target="_blank" className="underline">
              https://zod.dev/
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
