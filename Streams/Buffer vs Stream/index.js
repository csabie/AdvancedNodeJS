// run: node --trace_gc index.js
//trace_gc = trace garbage collector. Amikor elindutunk egy ilyen folyamatot memóriát foglal és ezzel a trace_gc-vel felügyeljük, hogy mennyit fogyaszt és felszabadul leállíás után

// BUFFER
// Load the whole content into a buffer/ into memory once before wrting it out to user

// const http = require("http");
// const media = "./testvid.mp4";
// const fs = require("fs");

// http
//   .createServer((req, res) => {
//     fs.readFile(media, (err, data) => {
//       if (err) console.log({ err });

//       res.writeHeader(200, { "Content-Type": "video/mp4" });
//       res.end(data);
//     });
//   })
//   .listen(3000, () => {
//     console.log("buffer - port 3000");
//   });

// STREAM

// read the content chunk by chunk

const http = require("http");
const fs = require("fs");
const media = "./testvid.mp4";

http
  .createServer((req, res) => {
    res.writeHeader(200, { "Content-Type": "video/mp4" });
    fs.createReadStream(media).pipe(res).on("error", console.log);
  })
  .listen(3000, () => console.log("stream - port 3000"));
