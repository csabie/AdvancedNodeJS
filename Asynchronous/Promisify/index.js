const { promisify } = require("util");
const delay = (seconds, callback) => {
  if (seconds > 3) {
    callback(new Error(`${seconds} is too long`));
  } else {
    setTimeout(() => {
      callback(null, `The ${seconds} delay is over`);
    }, seconds * 1000);
  }
};

//ehelyett van egy primisify beépített library
// delay(4, (error, message) => {
//   if (error) {
//     console.log(error.message);
//   } else {
//     console.log(message);
//   }
// });

const promisifyDelay = promisify(delay);
promisifyDelay(4)
  .then(console.log)
  .catch((error) => console.log(`error: ${error.message}`));

// másik pl. egy nem async fv-re alkalmazzuk a promisify-t, hogy async legyen a writeFile. Valós életbeli pl.

// const fs = require("fs");
// const writeFile = promisify(fs.writeFile);

// writeFile("Sample.txt", "This is sample")
//   .then(() => console.log("file successfully created"))
//   .catch((err) => console.log("error creating file"));
