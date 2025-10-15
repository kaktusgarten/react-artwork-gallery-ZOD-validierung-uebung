import * as z from "zod";
import { ArtworkSchema, ArtworksSchema } from "../_schemas";

// Braucht nicht mehr, das mach jetzt General "ZOD" mit z.infer
// Siehe: https://schurken.fandom.com/de/wiki/General_Zod_(DC_Comics) :-))
// Nein Im Ernst: https://zod.dev/basics
//
// type ArtworkType = {
//   artist_display: string;
//   description: string;
//   id: number;
//   image_id: string;
//   main_reference_number: string;
//   thumbnail: {
//     lqip: string;
//     width: number;
//     height: number;
//     alt_text: string;
//   };
//   title: string;
// };

type ArtworksType = z.infer<typeof ArtworksSchema>;
type ArtworkType = z.infer<typeof ArtworkSchema>;

export type { ArtworkType, ArtworksType };
