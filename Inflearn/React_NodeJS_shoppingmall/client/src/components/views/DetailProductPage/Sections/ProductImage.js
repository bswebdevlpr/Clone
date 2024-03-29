import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";

function ProductImage(props) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      let images = [];
      props.detail.images.map((item) => {
        images.push({
          original: `https://clone-swart.vercel.app/${item}`,
          thumbnail: `https://clone-swart.vercel.app/${item}`,
        });
      });
      setImages(images);
    } else {
    }
  }, [props.detail]);

  const images = [];

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
}

export default ProductImage;
