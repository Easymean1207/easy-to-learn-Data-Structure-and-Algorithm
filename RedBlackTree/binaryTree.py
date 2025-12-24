RED = False
BLACK = True

class BinaryTree:
    def __init__(self, data, ):
        self.data = data
        self.left = None
        self.right = None
        self.parent = None

        self.color = RED

    def getData(self):
        return self.data

    def setData(self, data):
        self.data = data

    def getLeftSubTree(self):
        return self.left

    def getRightSubTree(self):
        return self.right

    def setLeftSubTree(self, tree):
        self.left = tree

    def setRightSubTree(self, tree):
        self.right = tree

    # 전위 순회 (Pre-order Traversal)
    def preOrderTraversal(self, tree):
        # 기저 조건: 자식 노드가 없으면 종료
        if tree is None:
            return

        # 재귀 패턴: 루트 -> 왼쪽 -> 오른쪽
        print(tree.data)
        self.preOrderTraversal(tree.getLeftSubTree())
        self.preOrderTraversal(tree.getRightSubTree())

    # 중위 순회 (In-order Traversal)
    def inOrderTraversal(self, tree):
        # 기저 조건: 자식 노드가 없으면 종료
        if tree is None:
            return

        # 재귀 패턴: 왼쪽 -> 루트 -> 오른쪽
        self.inOrderTraversal(tree.getLeftSubTree())
        print(tree.data)
        self.inOrderTraversal(tree.getRightSubTree())

    # 후위 순회 (Post-order Traversal)
    def postOrderTraversal(self, tree):
        # 기저 조건: 자식 노드가 없으면 종료
        if tree is None:
            return

        # 재귀 패턴: 왼쪽 -> 오른쪽 -> 루트
        self.postOrderTraversal(tree.getLeftSubTree())
        self.postOrderTraversal(tree.getRightSubTree())
        print(tree.data)

    # 왼쪽 서브트리 제거
    def removeLeftSubTree(self):
        deletedNode = self.getLeftSubTree()
        self.setLeftSubTree(None)
        return deletedNode
    
    # 오른쪽 서브트리 제거
    def removeRightSubTree(self):
        deletedNode = self.getRightSubTree()
        self.setRightSubTree(None)
        return deletedNode
    
    def getParent(self):
        return self.parent

    def setParent(self, tree):
        self.parent = tree

    def getParent(self):
        return self.parent
    
    def setParent(self, tree):
        self.parent = tree