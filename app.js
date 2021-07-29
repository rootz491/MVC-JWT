const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const dataRoutes = require("./Routers/data.router");
const authRoutes = require("./Routers/auth.router");
const { isAuthenticated } = require("./Services/verification.service");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(_ => console.log(`Connection to DB Succesful`))
.catch(err => console.log(`Error in DB connection ${err}`));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use("/auth", authRoutes);
app.use("/api", isAuthenticated, dataRoutes);

app.use("/", (_, res) => {
    res.status(404).json({success: false, error: "endpoint not available"});
});

app.listen(process.env.PORT, _ => {
    console.log('server is running on http://localhost:3001');
});