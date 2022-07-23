const express = require("express");

const dotenv = require("dotenv");

dotenv.config();

const dbConnect = require("./config/db/dbConnect");

const userRoutes = require("./route/users/usersRoute");





const { errorHandler, notFound } = require("./middlewares/error/errorHandler");


const postRoute = require("./route/posts/postRoute");


const categoryRoute = require('./route/category/category')


const commentRoute = require('./route/comments/Comment')


const app = express();

dbConnect();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute)
app.use('/api/categories', categoryRoute)


app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running ${PORT}`));