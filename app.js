const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./model/blog.js");
const { result } = require("lodash");

const app = express();

// Définir le moteur de template
app.set("view engine", "ejs");

// Middleware & fichiers statiques
app.use(express.static("public"));
app.use(morgan("morgan"));

// add blog
app.get("/add-blog", (req, res) => {  
    
    const blog = new Blog({
        title: "new blog 2",
        snippet: "about my new blog 2",
        body:"more about my new blog",
    })
    blog.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
    })



app.get("/all-blog", (req, res) => {    
    Blog.find()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));

});


app.get("/single-blog", (req, res) => {    
    Blog.findById('67a070a48d59b49c7086e2f0')
        .then((result)=> res.send(result)
        .catch((err)=> console.log(err)))

});

// Connexion à la base de données (MongoDB)
const mongoURI = "mongodb+srv://beny:Beny1234@cluster0.oszwg.mongodb.net/node-course?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log(" Connecté à la base de données !");
    app.listen(3000, () => console.log("Serveur en écoute sur le port 3000"));
  })
  .catch((err) => console.error(" Erreur de connexion MongoDB :", err));

// Page d'accueil avec blogs
app.get("/", (req, res) => {
  const blogs = [
    { title: "Nader trouve la NASA", snippet: "Lorem ipsum dolor sit amet..." },
    { title: "Ghassem découvre Git", snippet: "Lorem ipsum dolor sit amet..." },
    { title: "Jerard trouve LeBonCoin", snippet: "Lorem ipsum dolor sit amet..." },
  ];
  res.render("index", { title: "Home", blogs });
});

// Page About
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Page de création d'un blog
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

// Redirection
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// Page 404 (toujours à la fin)
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
