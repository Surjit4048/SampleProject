const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/car.routes")(app);

console.log("Your env = ", process.env.NODE_ENV);

const db = require("./models");
db.mongoose
    .connect(db.url, db.params)
    .catch(err => {
        console.log("Database connection failed.", err);
        process.exit();
    });

db.mongoose.connection.on("connected", () => {
    if (process.env.NODE_ENV !== "test") {
        console.log("MongoDb is connected.");
    }
});

db.mongoose.connection.on("disconnected", () => {
    if (process.env.NODE_ENV !== "test") {
        console.log("MongoDb is disconnected.");
    }

});

app.get("/", (req, res) => {
    res.json({ message: "End point to test in browser" });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;