const fs = require("fs");
const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const readdir = promisify(fs.readdir);
const beep = () => process.stdout.write("\x07");

const delay = (seconds) =>
  new Promise((resolves) => {
    setTimeout(resolves, seconds * 1000);
  });

// Promise.all([
//   writeFile("readme.md", "Hello World"),
//   writeFile("readme.txt", "Hello World"),
//   writeFile("readme.json", '{"hello": "world"}'),
// ])
//   .then(() => readdir(__dirname))
//   .then(console.log);

Promise.all([delay(5), delay(2), delay(3)]) //itt a másodpercek összeadódnak, és annyit kell várni a végéig
  .then(() => readdir(__dirname))
  .then(console.log);

// Promise.race([delay(5), delay(2), delay(3)]) //itt 2 mp-t kell várni a végéig, mert a legrövidebb idő ér célba
//   .then(() => readdir(__dirname))
//   .then(console.log);
