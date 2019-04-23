const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "njk");

const checkMiddleware = (req, res, next) => {
  if (req.body.idade === "") {
    return res.redirect("/");
  } else {
    return next();
  }//
};

app.get("/", (req, res) => {
  return res.render("index");
});

app.get("/major", checkMiddleware, (req, res) => {
  const { idade } = req.query;

  return res.render("major", { idade });
});

app.get("/minor", checkMiddleware, (req, res) => {
  const { idade } = req.query;

  return res.render("minor", { idade });
});

app.post("/check", checkMiddleware, (req, res) => {
  const idade = req.body.idade;

  if (idade > 18) {
    return res.redirect(`/major?idade=${idade}`);
  } else {
    return res.redirect(`/minor?idade=${idade}`);
  }
});

app.listen(3000);
