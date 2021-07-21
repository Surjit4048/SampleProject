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
require("./routes/carRoutes")(app);

const db = require("./models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Database Connected!");
    })
    .catch(err => {
        console.log("Database connection failed.", err);
        process.exit();
    });

app.get("/", (req, res) => {
    res.json({ message: "End point to test in browser" });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});