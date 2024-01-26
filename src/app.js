var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mysql = require("mysql2");

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const DB_HOST = process.env.DB_HOST || "127.0.0.3";

const DB_USER = process.env.DB_USER || "root";

const DB_PASSWORD = process.env.DB_PASSWORD || "";

const DB_NAME = process.env.DB_NAME || "blogexam";

const DB_PORT = process.env.DB_PORT || 3306;

/* The code `var connection = mysql.createPool({ ... })` is creating a connection pool to a MySQL
database. */
var connection = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
});

/* The code `app.get("/blogs", function (req, res) { ... })` is defining a route for the GET request to
"/blogs". When this route is accessed, it executes the callback function. */
app.get("/blogs", function (req, res) {
  connection.query("SELECT * FROM articles", function (error, result) {
    if (error) {
      res.send(error);
    } else {
      res.send(result);
    }
  });
});

/* The code `app.get("/blogs/:id", function (req, res) { ... })` is defining a route for the GET
request to "/blogs/:id". This route expects a parameter `id` in the URL. When this route is
accessed, it executes the callback function. */
app.get("/blogs/:id", function (req, res) {
  var id = req.params.id;

  connection.query(
    `SELECT * FROM articles WHERE id=${id}`,
    function (error, result) {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    }
  );
});

/* The code `app.post("/blogs", function (req, res) { ... })` is defining a route for the POST request
to "/blogs". When this route is accessed, it executes the callback function. */
app.post("/blogs", function (req, res) {
  var title = req.body.title;
  var author = req.body.author;
  var date = req.body.date;
  var content = req.body.content;

  connection.query(
    "INSERT INTO articles (title, author, date, content) VALUES (?, ?, ?, ?)",
    [title, author, date, content],
    function (error, result) {
      if (error) {
        res.send(error);
      } else {
        res.send("Blog creado correctamente");
      }
    }
  );
});

/* The code `app.put("/blogs/:id", function (req, res) { ... })` is defining a route for the PUT
request to "/blogs/:id". This route expects a parameter `id` in the URL. When this route is
accessed, it executes the callback function. */
app.put("/blogs/:id", function (req, res) {
  var id = req.params.id;

  var title = req.body.title;
  var author = req.body.author;
  var date = req.body.date;
  var content = req.body.content;

  console.log(req.body, "data", title, author, date, content);

  connection.query(
    `UPDATE articles SET title = ?, author = ?, date = ?, content = ? WHERE id = ?`,
    [title, author, date, content, id],
    function (error, result) {
      if (error) {
        res.send(error);
      } else {
        res.send("Blog actualizado correctamente");
      }
    }
  );
});

/* The code `app.delete("/blogs/:id", function (req, res) { ... })` is defining a route for the DELETE
request to "/blogs/:id". This route expects a parameter `id` in the URL. When this route is
accessed, it executes the callback function. */
app.delete("/blogs/:id", function (req, res) {
  var id = req.params.id;

  connection.query(
    "DELETE FROM articles WHERE id = ?",
    [id],
    function (error, result) {
      if (error) {
        res.send(error);
      } else {
        res.send("Blog eliminado correctamente");
      }
    }
  );
});

/* The code `app.listen(3008, function () {
  console.log("Servidor iniciado en el puerto 3008");
});` is starting the server and listening for incoming requests on port 3008. Once the server is
started, it will log the message "Servidor iniciado en el puerto 3008" to the console. */
app.listen(3000, function () {
  console.log("Servidor iniciado en el puerto 3000");
});
