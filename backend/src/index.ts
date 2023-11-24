require("dotenv").config();
import { AppDataSource } from "./data-source";
import * as express from "express";
import categoryRoute from "./routes/categoryRoute";
import productRotute from "./routes/productRoute";
import authRouter from "./routes/authRoute";
import cartRoute from "./routes/cartRotue";
import orderRoter from "./routes/orderRoute";
import * as cors from "cors";
import AppError from "./utils/appError";
import handleErrors = require("./controllers/errorController");
import * as cookieParser from "cookie-parser";
// import Cloudinary from "./utils/Cloudinary";
import { upload } from "./middlewares/multer";
import { v2 as cloudinary } from "cloudinary";
import { cloud } from "./utils/Cloudinary";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_SECRET_KEY,
// });
// app
//   .route("/upload")
//   .post(
//     upload.single("image"),
//     async (req: express.Request, res: express.Response) => {
//       const { secure_url } = await cloud.uploader.upload(req.file.path, {
//         folder: "category",
//       });
//       console.log(req.file.path);

//       res.send(secure_url);
//     }
//   );

app.use("/api", categoryRoute);
app.use("/api", productRotute);
app.use("/api", authRouter);
app.use("/api", cartRoute);
app.use("/api", orderRoter);

app.all("*", (req, res, next) => {
  // const err: any= new Error(`Cant't find ${req.originalUrl} on server`);
  // err.status = 'fail'
  // err.statusCode = 404;
  next(new AppError(`Cant't find ${req.originalUrl} on server`, 404));
});

app.use(handleErrors);

AppDataSource.initialize()
  .then(async () => {
    app.listen(3000, () => console.log("app is running"));
  })
  .catch((error) => console.log(error));
