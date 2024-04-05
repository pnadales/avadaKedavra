const express = require('express')
const app = express()

const usuarios = [
    "Juan",
    "Jocelyn",
    "Astrid",
    "Maria",
    "Ignacia",
    "Javier",
    "Brian"
]

app.listen(3000, () => {
    console.log('Servidor inicializado en puerto 3000')
})

//Ruta que muestra el objeto que contiene los usuarios
app.get("/abracadabra/usuarios", (req, res) => {
    res.send({ usuarios });
})

//Middleware que verifica si el usuario ingresado en la ruta existe en arreglo dentro del objeto
//Si el usuario existe continua a la ruta correspondiente, si no muestra una imagen
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    usuarios.includes(req.params.usuario) ? next() : res.redirect('/who.jpeg')
})

//Se define la carpetta assets como directorio publico del servidor
app.use(express.static("assets"));

//Ruta que luego de pasar por el middleware muestra el sitio
app.get("/abracadabra/juego/:usuario", (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//Ruta que muestra la imagen correspondiente en caso de coincidir el numero de la ruta con el generado aleatoriamente
app.get("/abracadabra/conejo/:n", (req, res) => {
    const nAleatorio = Math.floor(Math.random() * 4) + 1;
    nAleatorio == req.params.n ? res.redirect('/conejito.jpg') : res.redirect('/voldemort.jpg')

})

//Ruta por defecto para las direcciones no definidas
app.get("*", (req, res) => {
    res.send("Pagina no encontrada :c")
})
