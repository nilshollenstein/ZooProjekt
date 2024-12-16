const express = require("express");
const path = require("path");

const PORT = process.env.PORT | 8080;

const app = new express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public'));


app.get("/", (req, res)=>{
    res.render("index.ejs");
})
app.get("/tickets", (req, res)=>{
    res.render("tickets.ejs");
})
app.get("/map", (req, res)=>{
    res.render("map.ejs");
})
app.get("/groups", (req, res)=>{
    res.render("map.ejs");
})
app.get("/wiki", (req, res)=>{
    res.render("map.ejs");
})
app.get("/wiki/:animal", (req, res)=>{
    let animal = req.params.animal;
    
    res.render("map.ejs");
})
app.get("/buy", (req, res)=>{
    res.render("map.ejs");
})



app.listen(PORT, ()=>{
    console.log(`Server ist running at port: ${PORT}`)
})
