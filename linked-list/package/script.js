const LinkedList = function (headVal, tailVal) {
    let tail = Node(tailVal);
    let head = Node(headVal, tail);

    function getHead() {
        return this.head;
    }

    function getTail() {
        return this.tail;
    }

    function prepend(value) {
        this.head = Node(value, this.head);
    }

    function append(value) {
        this.tail.next = Node(value);
        this.tail = this.tail.next;
    }

    function getSize() {
        let count = 0;
        let node = this.head;

        while (node !== null) {
            count++;
            node = node.next;
        }
        return count;
    }

    // RETURNS ITEM AT THE GIVEN INDEX (0 BASED)
    function getItemAt(index) {
        let curItem = this.head;
        for (let i = 0; i < index; i++) {
            curItem = curItem.next;
        }
        return curItem;
    }

    function pop() {
        let node = this.head;

        while (node.next.next !== null) {
            node = node.next;
        }
        node.next = null;
        this.tail = node;
    }

    function contains(value) {
        let node = this.head;

        while (node !== null) {
            if (node.value === value) return true;
            else node = node.next;
        }
        return false;
    }

    function find(value) {
        let node = this.head;
        let index = 0;

        while (node !== null) {
            if (node.value === value) return index;
            else {
                node = node.next;
                index++;
            }
        }
        return null;
    }

    function insertAt(value, index) {
        // IF INDEX IS 0 PREPENDS
        if (index === 0) prepend.call(this, value);
        else {
            let node = this.head;
            for (let i = 0; i < index - 1; i++) {
                if (node === null) return "Wrong Index";
                node = node.next;
            }

            const newNode = Node(value);
            const nextNode = node.next;
            const preNode = node;

            // IF INDEX IS LAST ELEMENT APPENDS
            if (nextNode === null) append.call(this, value);
            // OR INSERTS AT THE GIVEN INDEX
            else {
                preNode.next = newNode;
                newNode.next = nextNode;
            }
        }
    }

    function removeAt(index) {
        // REMOVES HEAD
        if (index === 0) {
            this.head = this.head.next;
        } else {
            let node = this.head;
            for (let i = 0; i < index - 1; i++) {
                if (node === null) return "Wrong Index";
                node = node.next;
            }
            const preNode = node;
            const nextNode = node.next.next;
            preNode.next = nextNode;

            // IF REMOVED ITEM IS TAIL, UPDATES TAIL
            if (nextNode === null) {
                this.tail = preNode;
            }
        }
    }

    function toString() {
        let str = "";
        let node = this.head;
        while (node !== null) {
            str = str + `( ${node.value} ) -> `;
            node = node.next;
        }
        return str + "null";
    }

    return {
        head,
        tail,
        getHead,
        getTail,
        prepend,
        append,
        getSize,
        getItemAt,
        pop,
        contains,
        find,
        insertAt,
        removeAt,
        toString,
    };
};

const Node = function (value = null, next = null) {
    return { value, next };
};

export { LinkedList, Node };
