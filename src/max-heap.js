const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.length = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);	
	}

	pop() {
		if (this.isEmpty()) {
			return;
		}

		const root = this.detachRoot();
		this.restoreRootFromLastInsertedNode(root);
		this.shiftNodeDown(this.root);

		return root.data;
	}

	detachRoot() {
		const root = this.root;
		this.root = null;

		if (this.size() == 1) {
			return root;
		}

		const rootIndex = this.parentNodes.indexOf(root);
		if (rootIndex != -1) {
			this.parentNodes.splice(rootIndex, 1);
		}
		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.size() == 1) {
			this.root = null;
			this.length = 0;
			return;
		}

		const lastInsertedNode = this.parentNodes.pop();

		if (this.parentNodes.indexOf(lastInsertedNode.parent) == -1 && lastInsertedNode.parent != detached) {
			this.parentNodes.unshift(lastInsertedNode.parent);
		}
		if (lastInsertedNode.parent == detached) {
			this.parentNodes.unshift(lastInsertedNode);
		}

		lastInsertedNode.remove();

		this.root = lastInsertedNode;
		this.root.parent = null;
		this.root.left = detached.left;
		this.root.right = detached.right;

		if (this.root.left) {
			this.root.left.parent = this.root;
		}
		if (this.root.right) {
			this.root.right.parent = this.root;
		}	

		this.length--;
	}

	size() {
		return this.length; 
	}

	isEmpty() {
		return this.size() === 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.length = 0;
	}

	insertNode(node) {
		if (this.isEmpty()) {
			this.root = node;		
			this.root.parent = null;
			this.root.left = null;
			this.root.right = null;
			this.parentNodes.push(this.root);
			this.length = 1;
			return true;
		}

		this.parentNodes[0].appendChild(node);

		if (this.parentNodes[0].left && this.parentNodes[0].right) {
			this.parentNodes.shift();
		}
		this.parentNodes.push(node);

		this.length++;
		 
		return true;
	}

	shiftNodeUp(node) {
		if (node.parent && node.priority > node.parent.priority) {

			const nodeIndex = this.parentNodes.indexOf(node);
			const nodeParentIndex = this.parentNodes.indexOf(node.parent);	
			if (nodeIndex != -1) {
				this.parentNodes[nodeIndex] = node.parent;
			}
			if (nodeParentIndex != -1) {
				this.parentNodes[nodeParentIndex] = node;
			}

			node.swapWithParent();
			if (!node.parent) {
				this.root = node;
			}

			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if (!node) {
			return;
		}
		if (!node.left && !node.right) {
			return;
		}

		if ((node.left && node.right && node.left.priority > node.right.priority) || (node.left && !node.right)) {
			if (node.priority < node.left.priority) {
				const left = node.left;

				const nodeIndex = this.parentNodes.indexOf(node);
				const nodeLeftIndex = this.parentNodes.indexOf(node.left);	
				if (nodeIndex != -1) {
					this.parentNodes[nodeIndex] = node.left;
				}
				if (nodeLeftIndex != -1) {
					this.parentNodes[nodeLeftIndex] = node;
				}

				node.left.swapWithParent();
				if (!left.parent) {
					this.root = left;
				}

				this.shiftNodeDown(node);
				return; 
			}
		}
		if ((node.left && node.right && node.right.priority > node.left.priority) || (!node.left && node.right)){
			if (node.right && node.priority < node.right.priority) {
				const right = node.right;

				const nodeIndex = this.parentNodes.indexOf(node);
				const nodeRightIndex = this.parentNodes.indexOf(node.right);	
				if (nodeIndex != -1) {
					this.parentNodes[nodeIndex] = node.right;
				}
				if (nodeRightIndex != -1) {
					this.parentNodes[nodeRightIndex] = node;
				}

				node.right.swapWithParent();
				if (!right.parent) {
					this.root = right;
				}

				this.shiftNodeDown(node); 
				return;
			}
		} 	
	}
}

module.exports = MaxHeap;
