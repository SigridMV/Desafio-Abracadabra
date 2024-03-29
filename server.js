const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000;

// Definir carpeta assets como carpeta pública del servidor
app.use(express.static("assets"));

// Ruta raíz
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Arreglo de nombres
const usuarios = [
  "Juan",
  "Jocelyn",
  "Astrid",
  "María",
  "Ignacia",
  "Javier",
  "Brian",
];

// Ruta GET para devolver arreglo de usuarios en formato JSON
app.get("/abracadabra/usuarios", (req, res) => {
  res.send(JSON.stringify(usuarios, null, 1));
});

// Middleware para validar el usuario
const validarUsuarioMiddleware = (req, res, next) => {
  const usuario = req.params.usuario;

  if (usuarios.includes(usuario)) {
    next(); 
  } else {
    res.sendFile(path.join(__dirname, "assets/img", "who.jpeg")); 
  }
};

// Ruta para validar el usuario y permitir acceso si es válido
app.get('/abracadabra/juego/:usuario', validarUsuarioMiddleware, (req, res) => {
  res.send('Acceso permitido al juego para el usuario: ' + req.params.usuario);
});

// Ruta GET
app.get("/abracadabra/conejo/:n", (req, res) => {
  const n = parseInt(req.params.n);
  const randomNumber = Math.floor(Math.random() * 4) + 1;
  let imagePath = "";

  if (n === randomNumber) {
    imagePath = "conejito.jpg";
  } else {
    imagePath = "voldemort.jpg";
  }

  res.sendFile(path.join(__dirname, "assets/img", imagePath));
});

// Ruta genérica para responder a peticiones de rutas no definidas
// en el servidor
app.get("*", (req, res) => {
  res.send("<center><h1>Esta página no existe...</h1></center>");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
