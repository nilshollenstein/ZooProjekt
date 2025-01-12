const express = require("express");
const path = require("path");
const env = require("dotenv").config();

const PORT = process.env.PORT | 8080;

const app = new express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public"));
app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/tickets", (req, res) => {
  res.render("tickets.ejs");
});
app.get("/map", (req, res) => {
  res.render("map.ejs");
});
app.get("/groups", (req, res) => {
  res.render("groups.ejs");
});
app.get("/wiki", (req, res) => {
  res.render("wiki.ejs");
});
app.get("/wiki/:animal", (req, res) => {
  let animal = req.params.animal;

  console.log(animal);

  res.render("wiki-entry.ejs");
});
app.get("/buy", (req, res) => {
  res.render("buy.ejs");
});
app.get("/redirect-twint", (req, res) => {
  res.redirect("https://www.twint.ch");
});

app.all("*", (req, res) => {
  res.status(404).render("404.ejs");
});

app.listen(PORT, () => {
  console.log(`Server ist running at port: ${PORT}`);
});
