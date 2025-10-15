import { useEffect, useRef, useState } from "react";

export default function ModalDetails({ id }: { id: number | null }) {
  const infoModal = useRef<HTMLDialogElement | null>(null);
  const [detailInfos, setDetailInfos] = useState();

  useEffect(() => {
    if (!id || !infoModal.current) return;

    const getArtworkDetails = async () => {
      try {
        const res = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
        const resData = await res.json();
        setDetailInfos(resData);
        console.log(resData);
      } catch (error) {}
    };

    getArtworkDetails();

    infoModal.current?.showModal();
  }, [id]);

  return (
    <>
      <dialog ref={infoModal} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">Details</h3>
          {detailInfos?.data.image_id ? (
            <img
              src={`https://www.artic.edu/iiif/2/${detailInfos.data.image_id}/full/843,/0/default.jpg`}
              alt={detailInfos.data.title || "Artwork"}
            />
          ) : (
            <p>Kein Bild verfügbar</p>
          )}

          <p className="pt-4">Infos zum Bild ID: {id}</p>
          <p className="py-4 font-bold text-xl">
            <span className="italic text-amber-100 pr-5">Titel:</span>{" "}
            {detailInfos?.data.title}
          </p>
          <p>
            <span className="italic text-amber-100 pr-5">Dimension: </span>{" "}
            {detailInfos?.data.dimensions}
          </p>
          <p>
            <span className="italic text-amber-100 pr-5">
              Main Reference number:{" "}
            </span>{" "}
            {detailInfos?.data.main_reference_number}
          </p>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
