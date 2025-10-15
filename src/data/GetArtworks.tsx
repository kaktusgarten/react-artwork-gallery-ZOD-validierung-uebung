const getArtworks = async () => {
  try {
    const res = await fetch(
      "https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,main_reference_number,thumbnail,description,image_id"
    );
    const resData = await res.json();
    return resData;
  } catch (error) {
    console.log("Error: " + error);
  }
};

export { getArtworks };
