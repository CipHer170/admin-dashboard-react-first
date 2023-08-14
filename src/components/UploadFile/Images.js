import React, { useCallback, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import { createPortal } from "react-dom";
function Images({ img, id }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(0);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <>
      <img
        src={img}
        alt="image_product"
        onClick={() => openImageViewer(id)}
        width={"100px"}
      />
      {isViewerOpen &&
        createPortal(
          <ImageViewer
            className="ImageViewer"
            src={[img]}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
          />,
          document.body
        )}
    </>
  );
}

export default Images;
