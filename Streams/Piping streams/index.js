/**
* With pipe, it handles all the backpressure, draining and resuming etc with lesser code
* pipe function can pass data from any readableStream to any writableStream
*/
const { createReadStream, createWriteStream } = require("fs");

const readStream = createReadStream("./testvid.mp4");
const writeStream = createWriteStream("./copy.mp4");


readStream
  .pipe(writeStream)
  .on("close", () => console.log("File Copied!"))
  .on("error", console.error);

// let's write text
const textStream = createWriteStream("./file1.txt");

process.stdin.pipe(textStream);

/**
 * We can write into textStream from console in several ways
 *
 * 1. Allow readStream to open and enter your data, then it is auto piped into textStream
 * 2. echo on console and use `unix` pipe into our node process e.g echo "hello world" | node .
 * 3. Read from a file on console and unix pipe it into node program e.g cat ../sample.txt | node .
 *
 * Basically, data is passed into node program from all the 3 above, get into the readable stdin
 * then piped into writable textStream
 */