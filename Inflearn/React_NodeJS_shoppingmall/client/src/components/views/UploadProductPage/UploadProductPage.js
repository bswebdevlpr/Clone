import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://clone-swart.vercel.app",
});

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Twice" },
  { key: 2, value: "Japan" },
  { key: 3, value: "Jazz" },
];

function UploadProductPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [continent, setContinent] = useState(1);
  const [images, setImages] = useState([]);

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
  };

  const continentChangeHandler = (event) => {
    setContinent(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!title || !description || !price || !continent || !images) {
      return alert("모든 값을 넣어야합니다.");
    }

    // 서버에 채운 값들을 request로 보낸다.

    const body = {
      // 로그인 된 사람의 ID
      writer: props.user.userData._id,
      title: title,
      description: description,
      price: price,
      continent: continent,
      images: images,
    };

    instance.post("/api/product", body).then((res) => {
      if (res.data.success) {
        alert("Upload success");
        props.history.push("/");
      } else {
        alert("Upload fail");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>여행 상품 업로드</Title>
      </div>

      <form onSubmit={submitHandler}>
        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={title} />
        <br />
        <br />
        <label>실행</label>
        <TextArea onChange={descriptionChangeHandler} value={description} />
        <br />
        <br />
        <label>가격($)</label>
        <Input type="number" onChange={priceChangeHandler} value={price} />
        <br />
        <br />
        <select onChange={continentChangeHandler} value={continent}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button type="submit">확인</button>
      </form>
    </div>
  );
}

export default UploadProductPage;
