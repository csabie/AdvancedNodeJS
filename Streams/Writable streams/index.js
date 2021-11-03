// elkészítjük a videónk egy másolatát
const { createReadStream, createWriteStream, write } = require("fs");
const readStream = createReadStream("./testvid.mp4");
const writeStream = createWriteStream("./copy.mp4");

readStream.on("data", (chunk) => {
  //amit kiolvasunk azt elkezdjük írni egy destinációba
  writeStream.write(chunk);
});

readStream.on("error", (error) => {
  console.log("an error has occured");
  console.error(error);
});

readStream.on("end", (chunk) => {
  writeStream.end();
});

writeStream.on("close", () => {
  // mintha console.log lenne
  process.stdout.write("filed copied\n");
});
