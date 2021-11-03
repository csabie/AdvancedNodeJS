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

const doStuffsSequentially = async () => {
  console.log("Starting");
  await delay(1);
  console.log("waiting");
  await delay(2);
  try {
    await writeFile("file.txt", "Sample File...");
    beep();
  } catch (err) {
    console.error(err);
  }
  console.log("file.txt created");
  await delay(3);
  await unlink("file.txt");
  beep();
  console.log("file.txt removed");

  return Promise.resolve();
};

doStuffsSequentially();

//read directory

async function start() {
  const files = await readdir(__dirname);
  console.log(files);
}

start();
