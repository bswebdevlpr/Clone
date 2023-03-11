import React from "react";
import { Icon, Col, Card, Row, Carousel } from "antd";

function ImageSlider(props) {
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => {
          console.log(`https://clone-swart.vercel.app/${image}`, index);
          return (
            <div key={index}>
              <img
                style={{ width: "100%", maxHeight: "150px" }}
                src={`https://clone-swart.vercel.app/${image}`}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
