import React, { useEffect } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    let body = {};

    axios.post("/api/product/products").then((res) => {
      if (res.data.success) {
        console.log(res.data);
      } else {
        alert("Failed to bring products");
      }
    });
  }, []);

  return <div></div>;
}

export default LandingPage;
