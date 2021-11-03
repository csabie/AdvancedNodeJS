// function hideString(str, done) {
//   //a next tick-el már async, mivel csak akkor futtatja a blokkon belüli részt, amikor már a console.log("end"); lefutott
//   process.nextTick(() => {
//     done(str.replace(new RegExp("[a-zA-Z]", "g"), "X"));
//   });
// }

// hideString("Hello World", (hidden) => {
//   console.log(hidden);
// });

// console.log("end");

function delay(seconds, callback) {
  setTimeout(callback, seconds * 1000);
}
//itt először start delays fut le, és akkor fut le a Two seconds, mitán 2 mp eltelik.
console.log("Start delays");
delay(2, () => {
  console.log("Two seconds");
  delay(1, () => {
    console.log("Three seconds");
    delay(1, () => {
      console.log("Four seconds");
    });
  });
});
