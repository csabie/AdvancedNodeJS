const { Readable } = require("stream");

//adottak különböző hegycsúcsok. Egy olyan stream-et kell létrehozni, ahol egyenként átadódnak a csúcsaim
const peaks = ["adee", "iee", "yakudh", "sulop", "potilo", "wertu"];

class StreamFromArray extends Readable {
  constructor(array) {
    // super({ encoding: "utf-8" });
    super({ objectMode: true });

    this.array = array;
    this.index = 0;
  }
  _read() {
    if (this.index <= this.array.length) {
      // const chunk = this.array[this.index];
      const chunk = {
        data: this.array[this.index],
        index: this.index,
      };
      this.push(chunk);
      this.index += 1;
    } else {
      this.push(null);
    }
  }
}

const peakStream = new StreamFromArray(peaks);

peakStream.on("data", (chunk) => console.log(chunk));

peakStream.on("end", () => console.log("done!"));
