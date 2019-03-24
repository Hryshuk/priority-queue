class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
			node.parent = this;
			return true;
		}
		if (!this.right) {
			this.right = node;
			node.parent = this;
			return true;
		}
		return true;
	}

	removeChild(node) {
		if (this.left == node) {
			this.left = null;
			node.parent = null;
			return true;
		} else if (this.right == node) {
			this.right = null;
			node.parent = null;
			return true;
		}
		
		throw new Error('The node is not a child of this node!');
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
			return true;
		}
		return false;
	}

	swapWithParent() {
		if (!this.parent) {
			return false;
		}

		const thisParent = this.parent;
		const thisParentParent = this.parent.parent;
		const thisLeft = this.left;
		const thisRight = this.right;

		if (thisParentParent) {
			this.parent =  thisParentParent;

			if (thisParentParent.left == thisParent) {
				thisParentParent.left = this;
			} else if (thisParentParent.right == thisParent) {
				thisParentParent.right = this;
			}
		} else {
			this.parent = null;
		}
		thisParent.parent = this;

		if (thisParent.left == this) {
			if (thisParent.right) {
				thisParent.right.parent = this;
			}
			this.left = thisParent;
			this.right = thisParent.right;
		} else if (thisParent.right == this) {
			if (thisParent.left) {
				thisParent.left.parent = this;	
			}
			this.right = thisParent;
			this.left = thisParent.left;
		}
		
		thisParent.left = thisLeft;
		thisParent.right = thisRight;
		if (thisLeft) {
			thisLeft.parent = thisParent;
		}
		if (thisRight) {
			thisRight.parent = thisParent;
		}
	
		return true;
	}
}

module.exports = Node;
