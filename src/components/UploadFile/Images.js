import React, { useCallback, useState } from "react";
import ImageViewer from "react-simple-image-viewer";

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
    <div>
      <img
        src={img}
        alt="image_product"
        onClick={() => openImageViewer(id)}
        width="300"
      />

      {isViewerOpen && (
        <div>
          <ImageViewer
            src={[img]}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
          />
        </div>
      )}
    </div>
  );
}

export default Images;
