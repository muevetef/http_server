const http = require("http")
const path = require('path')
const fs = require("fs")

const server = http.createServer((req, res) => {
    console.log(req.url)
    if(req.url === '/'){
        fs.readFile(
            path.join(__dirname, "public", "index.html"),
            (err, content) =>{
                if(err) throw err
                res.writeHead(200, {"Content-Type" : "text/html" })
                res.write(content)
                res.end()
            }
        )
    }else if(req.url === '/about'){
        fs.readFile(
            path.join(__dirname, "public", "about.html"),
            (err, content) =>{
                if(err) throw err
                res.writeHead(200, {"Content-Type" : "text/html" })
                res.write(content)
                res.end()
            }
        )
    } else if(req.url === '/api/mascotas'){
        //Ejemplo de respuesta JSON
        const mascotas = [
            {nombre: 'Bobby', tipo: "perro"},
            {nombre: 'Titty', tipo: 'Gato'}
        ]
        res.writeHead(200, {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        })
        res.end(JSON.stringify(mascotas))
    } 
    else {
        fs.readFile(
            path.join(__dirname, "public", "404.html"),
            (err, content) =>{
                if(err) throw err
                res.writeHead(404, {"Content-Type" : "text/html" })
                res.write(content)
                res.end()
            }
        )
    }

})

const PORT = process.env.PORT || 5000

server.listen(PORT, console.log(`Servidor escuchando en el puerto ${PORT}`))