const fs = require("fs");

const readStream = fs.createReadStream("./testvid.mp4");

// FLOWING MODE

readStream.on("data", (chunk) => {
  console.log("reading little chunk\n", chunk);
});

readStream.on("data", (chunk) => {
  console.log("reading chunk length\n", chunk.length);
});
readStream.on("end", (chunk) => {
  console.log("read stream finished");
});

readStream.on("error", (error) => {
  console.log("an error has occured");
  console.error(error);
});

//be lehet kérni egyenfént
// process.stdin.on("data", (chunk) => {
//   const text = chunk.toString().trim();
//   console.log("echo: ", text);
// });

// (none flowing) mode
readStream.pause();
process.stdin.on("data", (chunk) => {
  if (chunk.toString().trim() !== "finish") {
    return readStream.read();
  }
  readStream.resume();
});
