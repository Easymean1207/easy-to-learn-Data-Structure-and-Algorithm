class BinaryTree {
  constructor(data, leftTree = null, rightTree = null) {
    this.data = data;
    this.leftTree = leftTree;
    this.rightTree = rightTree;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }

  getLeftSubTree() {
    return this.leftTree;
  }

  getRightSubTree() {
    return this.rightTree;
  }

  setLeftSubTree(tree) {
    this.leftTree = tree;
  }

  setRightSubTree(tree) {
    this.rightTree = tree;
  }

  // 전위 순회 (Pre-order Traversal)
  preOrderTraversal(tree) {
    // 기저 조건: 자식 노드가 없으면 종료
    if (tree === null) return;

    // 재귀 패턴: 루트 -> 왼쪽 -> 오른쪽
    console.log(tree.data);
    this.preOrderTraversal(tree.getLeftSubTree());
    this.preOrderTraversal(tree.getRightSubTree());
  }

  // 중위 순회 (In-order Traversal)
  inOrderTraversal(tree) {
    // 기저 조건: 자식 노드가 없으면 종료
    if (tree === null) return;

    // 재귀 패턴: 왼쪽 -> 루트 -> 오른쪽
    this.inOrderTraversal(tree.getLeftSubTree());
    console.log(tree.data);
    this.inOrderTraversal(tree.getRightSubTree());
  }

  // 후위 순회 (Post-order Traversal)
  postOrderTraversal(tree) {
    // 기저 조건: 자식 노드가 없으면 종료
    if (tree === null) return;

    // 재귀 패턴: 왼쪽 -> 오른쪽 -> 루트
    this.postOrderTraversal(tree.getLeftSubTree());
    this.postOrderTraversal(tree.getRightSubTree());
    console.log(tree.data);
  }
}

export { BinaryTree };
