import { useState } from "react";

const Supplement = ({ details }) => {
  const ITEMS_PER_PAGE = 800;
  const detailsCheck = details || [];

  const [detailShow, setDetailShow] = useState(ITEMS_PER_PAGE);
  const [data] = useState(detailsCheck);

  const handleLoadMore = () => {
    setDetailShow((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  const handleLoadClose = () => {
    setDetailShow((prevCount) => prevCount - ITEMS_PER_PAGE);
  };

  return (
    <div>
      <span> &nbsp;{detailsCheck?.slice(0, detailShow)}</span>
      {detailShow < data?.length && (
        <button
          onClick={handleLoadMore}
          style={{ border: "none", backgroundColor: "inherit" }}
        >
          ...더보기
        </button>
      )}
      {detailShow > ITEMS_PER_PAGE && (
        <button
          onClick={handleLoadClose}
          style={{ border: "none", backgroundColor: "inherit" }}
        >
          ...접기
        </button>
      )}
    </div>
  );
};

export default Supplement;
