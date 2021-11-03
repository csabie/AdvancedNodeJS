// elkészítjük a videónk egy másolatát
const { createReadStream, createWriteStream, write } = require("fs");
const readStream = createReadStream("./testvid.mp4");
// highWaterMark olyan mintha meg lenne jelölve az edény amelybe öntenénk vizet, hogy addig lehet tölteni.
//minél nagyobb a highWaterMark, annál több adatot dolgoz fel egy huzamban, tehát több memóriát is fogyaszt
const writeStream = createWriteStream(
  "./copy.mp4"
  // { highWaterMark: 162990 }
);

readStream.on("data", (chunk) => {
  //amit kiolvasunk azt elkezdjük írni egy destinációba

  const result = writeStream.write(chunk);
  //backpressure
  if (!result) {
    console.log("backpressure");
    readStream.pause();
  }
});

readStream.on("error", (error) => {
  console.log("an error has occured");
  console.error(error);
});

readStream.on("end", () => {
  writeStream.end();
});

writeStream.on("drain", () => {
  console.log("drained");
  readStream.resume();
});

writeStream.on("close", () => {
  // mintha console.log lenne
  process.stdout.write("filed copied\n");
});
