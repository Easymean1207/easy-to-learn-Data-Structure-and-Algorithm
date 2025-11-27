import { BinaryTree } from "./binaryTree.mjs";

let tree1 = new BinaryTree(1);
let tree2 = new BinaryTree(2);
let tree3 = new BinaryTree(3);
let tree4 = new BinaryTree(4);
let tree5 = new BinaryTree(5);
let tree6 = new BinaryTree(6);
let tree7 = new BinaryTree(7);

tree1.setLeftSubTree(tree2); // 1번 노드의 왼쪽 서브트리에 2번 노드 연결
tree1.setRightSubTree(tree3); // 1번 노드의 오른쪽 서브트리에 3번 노드 연결
tree2.setLeftSubTree(tree4); // 2번 노드의 왼쪽 서브트리에 4번 노드 연결
tree2.setRightSubTree(tree5); // 2번 노드의 오른쪽 서브트리에 5번 노드 연결
tree3.setLeftSubTree(tree6); // 3번 노드의 왼쪽 서브트리에 6번 노드 연결
tree3.setRightSubTree(tree7); // 3번 노드의 오른쪽 서브트리에 7번 노드 연결

console.log(`루트노드의 오른쪽 자식노드: ${tree1.getRightSubTree().getData()}`); // 3
console.log(`루트노드의 오른쪽 자식의 왼쪽 자식노드: ${tree1.getRightSubTree().getLeftSubTree().getData()}`); // 6
console.log(`루트노드의 왼쪽 자식의 오른쪽 자식노드: ${tree1.getLeftSubTree().getRightSubTree().getData()}`); // 5

console.log("전위 순회 (Pre-order Traversal)");
tree1.preOrderTraversal(tree1);

console.log("중위 순회 (In-order Traversal)");
tree1.inOrderTraversal(tree1);

console.log("후위 순회 (Post-order Traversal)");
tree1.postOrderTraversal(tree1);