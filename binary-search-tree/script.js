const Node = function (data, left = null, right = null) {
    return { data, left, right };
};

const Tree = function (arr) {
    // SORT ARRAY AND REMOVE DUBLICATES
    arr = [...new Set(arr)];
    arr.sort((a, b) => a - b);

    function _buildTree(arr, start, end) {
        if (start > end) return null;

        // REMOVE DUBLICATES AND SORT THE ARRAY

        const mid = Math.floor((start + end) / 2);
        const node = Node(arr[mid]);

        node.left = _buildTree(arr, start, mid - 1);
        node.right = _buildTree(arr, mid + 1, end);
        return node;
    }
    // RECURSIVE INSERT CALL
    function _insertRec(root, data) {
        if (root === null) {
            root = Node(data);
            return root;
        }
        if (data < root.data) root.left = _insertRec(root.left, data);
        else if (data > root.data) root.right = _insertRec(root.right, data);
        return root;
    }

    function insertData(data) {
        this.root = _insertRec(this.root, data);
    }

    function _deleteRec(root, data) {
        if (root === null) {
            return root;
        }

        // MOVING DOWN THE TREE RECURSIVELY UNTIL THE NODE IS FOUND
        if (data < root.data) root.left = _deleteRec(root.left, data);
        else if (data > root.data) root.right = _deleteRec(root.right, data);
        // IF NODE IS FOUND
        else {
            // IF NODE HAS 1 CHILD OR DOES NOT HAVE CHILD DELETES THE LEAF NODE
            if (root.left === null) return root.right;
            else if (root.right === null) return root.left;
            // IF NODE HAS 2 CHILDS REPLACES THE NODE WITH INORDERED SUCCESSOR (SMALLEST IN THE RIGHT SUBTREE)
            root.data = _minValue(root.right);
            // DELETES THE REPLACED NODE
            root.right = _deleteRec(root.right, root.data);
        }

        return root;
    }
    // FINDS THE SMALLEST IN THE RIGHT SUBTREE
    function _minValue(root) {
        let minv = root.data;
        while (root.left !== null) {
            minv = root.left.data;
            root = root.left;
        }

        return minv;
    }

    function deleteData(data) {
        this.root = _deleteRec(this.root, data);
    }

    // RECURSIVE HELPER FUNCTION FOR FIND
    function _findRec(root, data) {
        if (data < root.data) return _findRec(root.left, data);
        else if (data > root.data) return _findRec(root.right, data);

        return root;
    }

    // FINDS NODE
    function find(data) {
        console.log(_findRec(this.root, data));
    }

    // LEVEL ORDER TRAVERSE
    function levelOrder() {
        const result = [];

        if (this.root === null) return result;
        const queue = [this.root];

        while (queue.length > 0) {
            let curNode = queue.shift();
            result.push(curNode.data);

            if (curNode.left !== null) queue.push(curNode.left);
            if (curNode.right !== null) queue.push(curNode.right);
        }

        return result;
    }

    // PREORDER TRAVERSE RECURSIVE HELPER FUNCTION
    function _preorder(root, result) {
        if (root === null) return;
        result.push(root.data);
        _preorder(root.left, result);
        _preorder(root.right, result);
    }

    // PREORDER TRAVERSE
    function preorder() {
        const result = [];
        _preorder(this.root, result);
        return result;
    }

    // INORDER TRAVERSE RECURSIVE HELPER FUNCTION
    function _inorderRec(root, result) {
        if (root === null) return;
        _inorderRec(root.left, result);
        result.push(root.data);
        _inorderRec(root.right, result);
    }

    // INORDER TRAVERSE
    function inorder() {
        const result = [];
        _inorderRec(this.root, result);
        return result;
    }

    // POSTORDER TRAVERSE RECURSIVE HELPER FUNCTION
    function _postorderRec(root, result) {
        if (root === null) return;
        _postorderRec(root.left, result);
        _postorderRec(root.right, result);
        result.push(root.data);
    }

    // POSTORDER TRAVERSE
    function postorder() {
        const result = [];
        _postorderRec(this.root, result);
        return result;
    }

    function height(root) {
        if (root === null) return -1;
        else {
            let left = height(root.left);
            let right = height(root.right);

            return Math.max(left, right) + 1;
        }
    }

    function depth(val, root = this.root) {
        if (root === null) return -1;

        let dist = -1;

        if (
            root.data === val ||
            (dist = depth(val, root.left)) >= 0 ||
            (dist = depth(val, root.right)) >= 0
        )
            return dist + 1;
    }

    function isBalanced(root = this.root) {
        if (root === null) return true;

        let leftHeight = height(root.left);
        let rightHeight = height(root.right);

        if (
            Math.abs(leftHeight - rightHeight) <= 1 &&
            isBalanced(root.left) === true &&
            isBalanced(root.right) === true
        )
            return true;
        else return false;
    }

    // REBALANCING THE BST
    function rebalance() {
        if (this.isBalanced() === false) {
            const newArr = this.postorder();
            this.root = _buildTree(newArr, 0, newArr.length - 1);
        }
    }

    const root = _buildTree(arr, 0, arr.length - 1);

    return {
        root,
        insertData,
        deleteData,
        find,
        levelOrder,
        preorder,
        inorder,
        postorder,
        height,
        depth,
        isBalanced,
        rebalance,
    };
};

export default Tree;
