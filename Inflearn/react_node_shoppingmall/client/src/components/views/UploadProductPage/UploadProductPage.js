import React, {useState} from 'react'
import {Typography, Button, Form, Input} from 'antd'
import FileUpload from "../../utils/FileUpload"

const {Title} = Typography
const {TextArea} = Input

const Continents = [
  {key: 1, value: "Africa"},
  {key: 2, value: "Europe"},
  {key: 3, value: "Asia"},
  {key: 4, value: "North America"},
  {key: 5, value: "South America"},
  {key: 6, value: "Australia"},
  {key: 7, value: "Antarctica"},
]

function UploadProductPage() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [continent, setContinent] = useState(1)
  const [images, setImages] = useState([])

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value)
  }

  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value)
  }

  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value)
  }

  const continentChangeHandler = (event) => {
    setContinent(event.currentTarget.value)
  }

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
      <div style={{textAlign: 'center', marginBottom: '2rem'}}>
        <Title level={2}>여행 상품 업로드</Title>
      </div>

      <form>
        <FileUpload/>

        <br/>
        <br/>
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={title}/>
        <br/>
        <br/>
        <label>실행</label>
        <TextArea onChange={descriptionChangeHandler} value={description}/>
        <br/>
        <br/>
        <label>가격($)</label>
        <Input type="number" onChange={priceChangeHandler} value={price}/>
        <br/>
        <br/>
        <select onChange={continentChangeHandler} value={continent}>
          {Continents.map(item => (
            <option key={item.key} value={item.key}>{item.value}</option>
          ))}
        </select>
        <br/>
        <br/>
        <button>
          확인
        </button>
      </form>
    </div>
  )
}

export default UploadProductPage