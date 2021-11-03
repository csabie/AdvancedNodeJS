// elkészítjük a videónk egy másolatát
const { createReadStream, createWriteStream } = require("fs");
const { Duplex, PassThrough } = require("stream");
const readStream = createReadStream("./testvid.mp4");
const writeStream = createWriteStream("./copy.mp4");

class Throttle extends Duplex {
  constructor(ms) {
    super();
    this.delay = ms;
  }

  _write(chunk, encoding, callback) {
    this.push(chunk);
    setTimeout(callback, this.delay);
  }

  _read() {}

  _final() {
    this.push(null);
  }
}

const report = new PassThrough();
const throttle = new Throttle(100);
let total = 0;

//ez a chunk-ok hosszának összegét írja ki
report.on("data", (chunk) => {
  total += chunk.length;
  console.log("bytes: ", total);
});

// az a lényege ennek a duplex-nek, hogy a readable és a writable közé bármit betehetünk
// esetünkben egy throttle és egy report is van
// egy duplex nem változtat az adaton.
readStream.pipe(throttle).pipe(report).pipe(writeStream);
