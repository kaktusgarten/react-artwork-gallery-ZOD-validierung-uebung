// React Context API
// Daten die auf der ganzen Seite zur verfügung stehen
import { useState, createContext } from "react";

type KontextType = {
  sampleText: string;
  setSampleText: any; // jaja ..
  myToken: string | null;
  setMyToken: any; // jajaja ..
};

export const GesamtseitenContext = createContext<KontextType | null>(null);

export default function GesamtseitenContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Global vergügbare Daten hier erstellen:
  const [sampleText, setSampleText] = useState<string>(
    "Ich bin ein Sample Text. Juhe!"
  );
  // Hier Token einsetzen für Admin Bereich:
  const [myToken, setMyToken] = useState<string | null>(null);

  return (
    // Global verfügbare Daten hier nochmal eintragen:
    <GesamtseitenContext
      value={{
        sampleText,
        setSampleText,
        myToken,
        setMyToken,
      }}
    >
      {children}
    </GesamtseitenContext>
  );
}
