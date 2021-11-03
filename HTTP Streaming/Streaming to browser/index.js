const { createServer } = require("http");
const { stat, createReadStream } = require("fs");
const { promisify } = require("util");

const fileName = "./testvid.mp4";
const fileInfo = promisify(stat);

createServer(async(req, res) => {
  const { size } = await fileInfo(fileName); // megkapjuk a
  res.writeHead(200, {
    "Content-Length": size, //opcionális, ez csak arra van, hogy ezt a statisztikai infót is átadjuk, ha kell
    "Content-Type": "video/mp4",
  });
  createReadStream(fileName).pipe(res);
}).listen(3000, () => console.log("Server running - 3000"));
