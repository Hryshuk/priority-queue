const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize ? maxSize : 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.size() >= this.maxSize) {
			throw new Error("the queue has max size!");
		}

		this.heap.push(data, priority);
	}

	shift() {
		if (this.isEmpty("The queue is empty")) {
			throw new Error();
		}

		return this.heap.pop();
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
