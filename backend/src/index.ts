require("dotenv").config();
import { AppDataSource } from "./data-source";
import * as express from "express";
import categoryRoute from "./routes/categoryRoute";
import productRotute from "./routes/productRoute";
import authRouter from "./routes/authRoute";
import cartRoute from "./routes/cartRotue";
import orderRoter from "./routes/orderRoute";
import userRoute from "./routes/userRoute";
import * as cors from "cors";
import AppError from "./utils/appError";
import handleErrors = require("./controllers/errorController");
import * as cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import { upload } from "./middlewares/multer";
import { v2 as cloudinary } from "cloudinary";
import { cloud } from "./utils/Cloudinary";
import helmet from "helmet";

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});
app.use(helmet());

app.use(express.json());
app.use(cookieParser());
app.use("/api", limiter);
app.use(
  cors({
    origin: "http://127.0.0.1:5500", // Adjust this to match your frontend origin
    credentials: true,
  })
);
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_SECRET_KEY,
// });
// app
//   .route("/upload")
//   .post(
//     upload.array("images"),
//     async (req: express.Request, res: express.Response) => {
//       console.log(req.files);

//       res.send(req.files);
//     }
//   );
app.use("/api", authRouter);
app.use("/api", categoryRoute);
app.use("/api", productRotute);
app.use("/api", cartRoute);

app.use("/api", orderRoter);
app.use("/api", userRoute);

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
