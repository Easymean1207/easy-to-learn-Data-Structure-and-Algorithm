from binaryTree import BinaryTree

tree1 = BinaryTree(1)
tree2 = BinaryTree(2)
tree3 = BinaryTree(3)
tree4 = BinaryTree(4)
tree5 = BinaryTree(5)
tree6 = BinaryTree(6)
tree7 = BinaryTree(7)

tree1.setLeftSubTree(tree2) # 1번 노드의 왼쪽 서브트리에 2번 노드 연결
tree1.setRightSubTree(tree3) # 1번 노드의 왼쪽 서브트리에 2번 노드 연결
tree2.setLeftSubTree(tree4) # 2번 노드의 왼쪽 서브트리에 4번 노드 연결
tree2.setRightSubTree(tree5) # 2번 노드의 오른쪽 서브트리에 5번 노드 연결
tree3.setLeftSubTree(tree6) # 3번 노드의 왼쪽 서브트리에 6번 노드 연결
tree3.setRightSubTree(tree7) # 3번 노드의 오른쪽 서브트리에 7번 노드 연결

print(f"루트노드의 오른쪽 자식노드: {tree1.getRightSubTree().getData()}") # 3
print(f"루트노드의 오른쪽 자식의 왼쪽 자식노드: {tree1.getRightSubTree().getLeftSubTree().getData()}") # 6
print(f"루트노드의 왼쪽 자식의 왼쪽 자식노드: {tree1.getLeftSubTree().getLeftSubTree().getData()}") # 4

print('전위 순회 (Pre-order Traversal)')
tree1.preOrderTraversal(tree1)

print('중위 순회 (In-order Traversal)')
tree1.inOrderTraversal(tree1)

print('후위 순회 (Post-order Traversal)')
tree1.postOrderTraversal(tree1)