const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //Hacer el path dinamico
  let filepath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  console.log(filepath);

  //Sacar la extensión del filepath
  let extName = path.extname(filepath);
  console.log(extName);

  //tipo de contenido inicial
  let contentType = "text/html";

  //Establecer el contentType según la extensión del recurso
  switch (extName) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
    case ".jpeg":
      contentType = "image/jpeg";
      break;
  }

  //Leer el archivo que corresponda
  fs.readFile(filepath, (err, data) => {
      if(err){
          if(err.code == "ENOENT"){
              //Mostrar la 404.html
              fs.readFile(
                  path.join(__dirname, "public", "404.html"),
                  (err, data) => {
                      if(err) throw err
                      res.writeHead(404, { "Content-Type":"text/html"})
                      res.end(data, 'utf-8')
                  }
                  )
          }else{
              //Error en el server
              res.writeHead(500);
              res.end(`Error en el servidor: ${error.code}`)
          }
        console.log(err)
      }else{
          //Sevir el archivo
         res.writeHead(200, {"Content-type": contentType})
         res.end(data, 'utf-8')
      }
  })
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Servidor escuchando en el puerto ${PORT}`));
