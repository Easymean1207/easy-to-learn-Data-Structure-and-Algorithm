import { Heap } from './heapForOthers.mjs';

class PriorityQueue {
  constructor() {
    this.heap = new Heap();
  }

  enqueue(data) {
    this.heap.insert(data);
  }

  dequeue() {
    // return this.heap.remove();
    return this.heap.remove().getData();
  }
}

class Enemy {
  constructor(name, health) {
    this.name = name;
    this.health = health;
    this.priority = health;
  }
}

let priorityQueue = new PriorityQueue();

priorityQueue.enqueue(new Enemy('슬라임', 10));
priorityQueue.enqueue(new Enemy('고블린', 30));
priorityQueue.enqueue(new Enemy('오크', 20));
priorityQueue.enqueue(new Enemy('레드 드래곤', 210));
priorityQueue.enqueue(new Enemy('블루 드래곤', 210));
priorityQueue.enqueue(new Enemy('와이번', 100));
priorityQueue.enqueue(new Enemy('골드 드래곤', 250));

console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
