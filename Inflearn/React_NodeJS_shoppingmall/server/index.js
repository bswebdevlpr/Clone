const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

// const mongoose = require("mongoose");
// mongoose
//   .connect(config.mongoURI, { useNewUrlParser: true })
//   .then(() => console.log("DB connected"))
//   .catch(err => console.error(err));

const mongoose = require("mongoose");
const connect = mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "*", // 출처 허용 옵션
    credential: "true", // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  })
);

// 클라이언트에서 전송되는 데이터를 서버에서 분석해서 가져올 수 있기 위해 사용.
//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/uploads", express.static("./uploads"));

app.use("/api/users", require("./routes/users"));
app.use("/api/product", require("./routes/product"));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client

// // Serve static assets if in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   // All the javascript and css files will be read and served from this folder
//   app.use(express.static("client/build"));

//   // index.html for all page routes    html or routing and naviagtion
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
//   });
// }

const port = process.env.PORT || 5000;

//get for every Route
app.get("/", (req, res) => {
  res.json({ msg: "BS's Shop Server" });
});

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
