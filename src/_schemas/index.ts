import { z } from "zod";

export const ArtworkSchema = z.object({
  id: z.number(),
  title: z.string(),
  artist_display: z.string(),
  description: z.string(),
  image_id: z.string().nullable().optional(),
  main_reference_number: z.string(),
  thumbnail: z
    .object({
      lqip: z.string(),
      width: z.number(),
      height: z.number(),
      alt_text: z.string(),
    })
    .nullable()
    .optional(),
});

//   description: z.string().nullable().optional(),

export const ArtworksSchema = z.array(ArtworkSchema);
