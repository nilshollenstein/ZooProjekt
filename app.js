const express = require("express");
const path = require("path");

const PORT = process.env.PORT | 8080;

const app = new express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public'));

app.get("/", (req, res)=>{
    res.render("index.ejs");
})


app.listen(PORT, ()=>{
    console.log(`Server ist running at port: ${PORT}`)
})
