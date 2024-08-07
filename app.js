import express from "express";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const port = 3000;

// Set up EJS as the view engine
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Store posts in memory (will not persist between server restarts)
let posts = [];

// Home route - display all posts
app.get("/", (req, res) => {
  res.render("home", { posts });
});

// Create post route - display create form
app.get("/create", (req, res) => {
  res.render("create");
});

// Handle post creation
app.post("/create", (req, res) => {
  const { title, content } = req.body;
  const id = Date.now().toString();
  posts.push({ id, title, content });
  res.redirect("/");
});

// Handle post deletion
app.post("/delete/:id", (req, res) => {
  posts = posts.filter((p) => p.id !== req.params.id);
  res.redirect("/");
});

// Edit post route - display edit form
app.get("/edit/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (post) {
    res.render("edit", { post });
  } else {
    res.redirect("/");
  }
});

// Handle edit post form submission
app.post("/edit/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

//Listen
app.listen(port, () => {
  console.log(`Blog app listening at http://localhost:${port}`);
});
