// function delay(seconds, callback) {
//   setTimeout(callback, seconds * 1000);
// }
// //itt először end first tick fut le, és akkor fut le a One seconds, mitán 1 mp eltelik.

// delay(1, () => {
//   console.log("One seconds");
// });

// console.log("end first tick");

// const delay = (seconds) =>
//   new Promise((resolves, rejects) => {
//     setTimeout(resolves, seconds * 1000);
//   });
// delay(1).then(() => console.log("The delay"));
// console.log("end first tick");

// a resolve-n keresztül üzenet küldés
const delay = (seconds) =>
  new Promise((resolves, rejects) => {
    setTimeout(() => {
      resolves("The long delay has ended");
    }, seconds * 1000);
  });
// delay(1).then((message) => console.log(message));
// a fenti helyett ez is megy
delay(1)
  .then(console.log)
  .then(() => 42) //itt return-eljük a 42-t és továbbadjuk a kövi then-nek
  .then((number) => console.log(`Hello world: ${number}`));

console.log("end first tick");
