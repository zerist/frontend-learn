const root = {
    val: "A",
    left: {
        val: "B",
        left: {
            val: "D"
        },
        right: {
            val: "E"
        }
    },
    right: {
        val: "C",
        right: {
            val: "F"
        }
    }
};

function preorder(root) {
    if (!root) {
        return
    }

    console.log('current node: ', root.val)
    preorder(root.left)
    preorder(root.right)
}

function midorder(root) {
    if (!root) {
        return
    }

    midorder(root.left)
    console.log('current node: ', root.val)
    midorder(root.right)
}

function posorder(root) {
    if (!root) {
        return
    }

    posorder(root.left)
    posorder(root.right)
    console.log(root.val)
}