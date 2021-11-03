// a resolve-n keresztül üzenet küldés
const delay = (seconds) =>
  new Promise((resolves, rejects) => {
    if (seconds > 3) {
      rejects(new Error(`${seconds} is too long`));
    }
    setTimeout(() => {
      resolves("The long delay has ended");
    }, seconds * 1000);
  });
// delay(1).then((message) => console.log(message));
// a fenti helyett ez is megy
delay(4)
  .then(console.log)
  .then(() => 42) //itt return-eljük a 42-t és továbbadjuk a kövi then-nek
  .then((number) => console.log(`Hello world: ${number}`))
  .catch((err) => console.log(`error: ${err.message}`));

console.log("end first tick");
