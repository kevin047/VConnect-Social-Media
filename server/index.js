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
import authRoutes from "./routes/auth.js"
import { register } from "./controllers/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/authorization/auth.js";
import connectDBase from "./middleware/database/connect.js";

import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";


// Configurations

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
// app.use(bodyParser.json({limit:"30mb", extended:true}))
// app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use(express.json({limit:"30mb"}))
app.use(express.urlencoded({limit:"30mb", extended:true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// File Storage
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public/assets');
    },
    filename: (req,file,cb)=>{
        cb(null, file.originalname);
    }
});

const upload = multer({ storage })

// Routes
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);

app.use("/auth", authRoutes);
app.use("/users",userRoutes);
app.use("/posts",postRoutes);


// DB Setup
const PORT = process.env.PORT || 7401;

const connect_db = async ()=>{
    try{
        let connected = await connectDBase(process.env.MONGO_URI).then(()=>{console.log('DB connected')})
        app.listen(PORT,()=>{
            console.log(`Server at port ${PORT} listening.`)
        })

        // User.insertMany(users);
        // Post.insertMany(posts);
    }
    catch(error){
        console.log(error)
    }
}

connect_db()