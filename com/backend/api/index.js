const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

////connction database////
const mongoose = require("mongoose");

const uri = "mongodb://localhost/Brief_million";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection is done");
});

///routes///
const adminRouter = require("./routes/AdminRoute");
app.use("/admin", adminRouter);

const parRouter = require("./routes/ParticipantRoute");
app.use("/participant", parRouter);


app.listen(1099, () => console.log('Server started on port 1010'));