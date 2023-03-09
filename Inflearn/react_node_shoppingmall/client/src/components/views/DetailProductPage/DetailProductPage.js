import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import { Row, Col } from "antd";

const instance = axios.create({
  baseURL: "https://clone-h1vkmrwaw-bswebdevlpr.vercel.app",
});

function DetailProductPage(props) {
  const productId = props.match.params.productId;

  const [Product, setProduct] = useState({});

  useEffect(() => {
    instance
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((res) => {
        setProduct(res.data[0]);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Product.title}</h1>
      </div>

      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          {/* PRODUCT IMAGE */}
          <ProductImage detail={Product} />
        </Col>

        <Col lg={12} sm={24}>
          {/* PRODUCT INFO */}
          <ProductInfo detail={Product} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailProductPage;
