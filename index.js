import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register, registerHostel } from "./controllers/auth.js";
import AuthRoute from './routes/Auth.js'
import UserRoute from './routes/UserRoute.js'
import BookRoute from './routes/BooksRoute.js'
import ReviewRoute from './routes/Review.js'
import { verifyToken } from "./middleware/auth.js";
import { AddBook } from "./controllers/book.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "public/assets");
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   },
});
const upload = multer({ storage });


app.post("/auth/register_hostel", upload.single("picture"), registerHostel);
app.post("/auth/register", upload.single("picture"), register);
app.post("/add_book", verifyToken, upload.single("picture"), AddBook)
app.use('/bookApp', AuthRoute)
app.use('/bookApp', verifyToken, UserRoute)
app.use('/bookApp', verifyToken, BookRoute)
app.use('/bookApp', verifyToken, ReviewRoute)





const PORT = process.env.PORT || 6001;
mongoose
   .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
   })
   .catch((error) => console.log(`${error} did not connect`));