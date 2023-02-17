import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row, Carousel } from "antd";
import ImageSlider from "../../utils/ImageSlider";

function LandingPage() {
  const [Products, setProducts] = useState([]);

  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card cover={<ImageSlider images={product.images} />}>
          <meta title={product.title} description={`${product.price}`} />
        </Card>
      </Col>
    );
  });

  useEffect(() => {
    let body = {};

    axios.post("/api/product/products").then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setProducts(res.data.productInfo);
      } else {
        alert("Failed to bring products");
      }
    });
  }, []);

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Enjoy your jazzy life <Icon type="rocket" />
        </h2>
      </div>

      <Row gutter={[16, 16]}>{renderCards}</Row>

      <div style={{ justifyContent: "center" }}>
        <button>더보기</button>
      </div>
    </div>
  );
}

export default LandingPage;
