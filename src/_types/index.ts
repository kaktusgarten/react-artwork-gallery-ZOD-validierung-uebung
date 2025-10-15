type ArtworkType = {
  artist_display: string;
  description: string;
  id: number;
  image_id: string;
  main_reference_number: string;
  thumbnail: {
    lqip: string;
    width: number;
    height: number;
    alt_text: string;
  };
  title: string;
};

export type { ArtworkType };
