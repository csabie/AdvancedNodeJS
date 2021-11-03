const logUpdate = require("log-update");
const delay = (seconds) =>
  new Promise((resolves) => {
    setTimeout(resolves, seconds * 1000);
  });
const toX = () => "X";

const tasks = [
  delay(4),
  delay(6),
  delay(4),
  delay(3),
  delay(5),
  delay(7),
  delay(9),
  delay(10),
  delay(3),
  delay(5),
];

class PrmoiseQueue {
  constructor(promises = [], concurrentCount = 1) {
    this.concurrentCount = concurrentCount;
    this.total = promises.length;
    this.todo = promises;
    this.running = [];
    this.complete = [];
  }

  get runAnother() {
    return this.running.length < this.concurrentCount && this.todo.length; //bool-t ad vissza
  }

  graphTasks() {
    const { todo, running, complete } = this;
    logUpdate(`
      todo: [${todo.map(toX)}]
      running: [${running.map(toX)}]
      complete: [${complete.map(toX)}]

    `);
  }

  run() {
    while (this.runAnother) {
      let promise = this.todo.shift();
      promise.then(() => {
        this.complete.push(this.running.shift());
        this.graphTasks();

        this.run();
      });
      this.running.push(promise);
      this.graphTasks();
    }
  }
}

const delayQueue = new PrmoiseQueue(tasks, 2); // egy időben 2 task futtatása
delayQueue.run();
