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

var connection = mysql.createPool({
  host: DB_HOST, // si la base de datos esta en un server diferente seria la direccion o IP en la que se encuentra
  user: DB_USER, // usuario de la base de datos
  password: DB_PASSWORD, // contraseña de la base de datos
  database: DB_NAME, // nombre de la base de datos
  port: DB_PORT,
});

// connection.connect(function (error) {
//   if (error) {
//     console.log(error); // Si hay un error al conectarse a la base de datos, lo mostramos en la consola
//   } else {
//     console.log("Conexion correcta a la base de datos"); // Si no hay errores, mostramos un mensaje de que la conexion fue correcta
//   }
// });

app.get("/blogs", function (req, res) {
  // Consultamos todos los blogs de la base de datos
  connection.query("SELECT * FROM articles", function (error, result) {
    if (error) {
      res.send(error); // Si hay un error en la consulta, lo enviamos como respuesta
    } else {
      res.send(result); // Si la consulta fue exitosa, enviamos todos los blogs como respuesta
    }
  });
});

// Endpoint para obtener un blog
app.get("/blogs/:id", function (req, res) {
  // Obtenemos el id del blog de la URL
  var id = req.params.id;

  // Consultamos el blog con el id especificado
  connection.query(
    `SELECT * FROM articles WHERE id=${id}`,
    function (error, result) {
      if (error) {
        res.send(error); // Si hay un error en la consulta, lo enviamos como respuesta
      } else {
        res.send(result); // Si la consulta fue exitosa, enviamos el blog como respuesta
      }
    }
  );
});

// Endpoint para crear un nuevo blog
app.post("/blogs", function (req, res) {
  // Obtenemos los datos del nuevo blog desde el body del request
  var title = req.body.title;
  var author = req.body.author;
  var date = req.body.date;
  var content = req.body.content;

  console.log(req.body, "data", title, author, date, content);

  // Insertamos el nuevo blog en la base de datos
  connection.query(
    "INSERT INTO articles (title, author, date, content) VALUES (?, ?, ?, ?)",
    [title, author, date, content],
    function (error, result) {
      if (error) {
        res.send(error); // Si hay un error en la consulta, lo enviamos como respuesta
      } else {
        res.send("Blog creado correctamente"); // Si la consulta fue exitosa, enviamos un mensaje de exito como respuesta
      }
    }
  );
});

// Endpoint para actualizar un blog
app.put("/blogs/:id", function (req, res) {
  // Obtenemos el id del blog a actualizar de la URL
  var id = req.params.id;

  // Obtenemos los datos actualizados del blog desde el body del request
  var title = req.body.title;
  var author = req.body.author;
  var date = req.body.date;
  var content = req.body.content;

  console.log(req.body, "data", title, author, date, content);

  // Actualizamos el blog en la base de datos
  connection.query(
    `UPDATE articles SET title = ?, author = ?, date = ?, content = ? WHERE id = ?`,
    [title, author, date, content, id],
    function (error, result) {
      if (error) {
        res.send(error); // Si hay un error en la consulta, lo enviamos como respuesta
      } else {
        res.send("Blog actualizado correctamente"); // Si la consulta fue exitosa, enviamos un mensaje de exito como respuesta
      }
    }
  );
});

// Endpoint para eliminar un blog
app.delete("/blogs/:id", function (req, res) {
  // Obtenemos el id del blog a eliminar de la URL
  var id = req.params.id;

  // Eliminamos el blog de la base de datos
  connection.query(
    "DELETE FROM articles WHERE id = ?",
    [id],
    function (error, result) {
      if (error) {
        res.send(error); // Si hay un error en la consulta, lo enviamos como respuesta
      } else {
        res.send("Blog eliminado correctamente"); // Si la consulta fue exitosa, enviamos un mensaje de exito como respuesta
      }
    }
  );
});

// Iniciamos el servidor en el puerto 3000
app.listen(3008, function () {
  console.log(
    "Servidor iniciado en el puerto 3008",
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT
  );
});
