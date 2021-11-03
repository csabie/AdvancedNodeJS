//npm i multiparty
const { createServer } = require("http");
const { stat, createReadStream, createWriteStream } = require("fs");
const { promisify } = require("util");

const multiparty = require("multiparty");
const { on } = require("events");

const fileName = "./testvid.mp4";
const fileInfo = promisify(stat);

const respondWithVideo = async (req, res) => {
  const { size } = await fileInfo(fileName); // megkapjuk a file információk közül a size-t
  const range = req.headers.range;

  if (range) {
    //range:  bytes=0-
    let [start, end] = range.replace(/bytes=/, "").split("-");
    start = parseInt(start, 10);
    end = end ? parseInt(end, 10) : size - 1;

    //206 - partial content, tehát nem az egész videót küldi át
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": "video/mp4",
    });
    createReadStream(fileName, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": size, //opcionális, ez csak arra van, hogy ezt a statisztikai infót is átadjuk, ha kell
      "Content-Type": "video/mp4",
    });
    createReadStream(fileName).pipe(res);
  }
};

createServer((req, res) => {
  if (req.method === "POST") {
    let form = new multiparty.Form();
    form.on("part", (part) => {
      part.pipe(createWriteStream(`./${part.filename}`)).on("close", () => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<h1>File uploaded: ${part.filename}</h1>`);
      });
    });
    form.parse(req);
  } else if (req.url === "/video") {
    respondWithVideo(req, res);
  } else {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.end(`
      <form enctype="multipart/form-data" method="POST" action="/">
        <input type="file" name="upload-file" />
        <button>Upload field</button>
      </form>
      `);
  }
}).listen(3000, () => console.log("Server running - 3000"));
