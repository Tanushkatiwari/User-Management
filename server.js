const express=require("express");
const mongoose=require("mongoose");
const route=require("./routes/routes.js")

const app=express();

app.use(express.json());
app.use("/" ,route)

//Database connection

mongoose.connect("mongodb+srv://tanushkatiwari47:mPl9zSENlWLDTfPx@cluster0.3nhkxth.mongodb.net/")
    .then(() => console.log("MongoDB connected"))
    .catch(() => console.log("MongoDB not connected"));
//creating server 

app.get("/", (req, res) => {
    res.send("Hello from express js");
});

let PORT = 4000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`server is running at port ${PORT}`);
    }
})

