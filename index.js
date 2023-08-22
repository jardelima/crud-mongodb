//initial config
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();

// read json
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

//  routes API
const personRoutes = require("./routes/personRoutes");

app.use("/person", personRoutes);

// initial route / endpoint
app.get("/", (req, res) => {
    // show req
    res.json({ message: "Connected!" });
})

// open a door
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.oyeh4pz.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => console.log(err));
