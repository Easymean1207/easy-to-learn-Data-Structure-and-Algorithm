from binaryTree import BinaryTree

class Heap:
    def __init__(self):
        self.root = None
        self.lastInsertedNode = None

    
    # 데이터 삽입
    def insert(self, data):
        # 1. 데이터를 최초로 삽입하는 경우
        if self.lastInsertedNode == None:
            self.lastInsertedNode = BinaryTree(data)
            self.root = self.lastInsertedNode
            return
        
        # 2. 데이터가 이미 존재하는 경우
        insertingParentNode = self.getInsertingParent() # 새로 삽입될 노드의 부모노드를 찾음
        newNode = BinaryTree(data) # 새 노드 생성

        # 새로운 노드 삽입
        if insertingParentNode.getLeftSubTree() == None: # 왼쪽 자식 노드가 비어있는 경우
            insertingParentNode.setLeftSubTree(newNode) # 새 노드를 왼쪽 자식으로 연결
        elif insertingParentNode.getRightSubTree() == None: # 오른쪽 자식 노드가 비어있는 경우
            insertingParentNode.setRightSubTree(newNode) # 새 노드를 오른쪽 자식으로 연결

        newNode.setParent(insertingParentNode) # 새 노드의 부모노드 설정
        self.lastInsertedNode = newNode # 마지막으로 삽입된 노드 업데이트

        # 새로운 노드의 자리 찾기
        while newNode.getParent() != None: # 루트 노드에 도달할 때까지 반복
            if(self.isBig(newNode.getData(), newNode.getParent().getData()) == True): # 삽입된 노드가 부모노드보다 큰 경우 (최대 힙으로 구현)
                # 데이터 교환
                newNodeData = newNode.getData()
                parentNodeData = newNode.getParent().getData()
                newNode.getParent().setData(newNodeData)
                newNode.setData(parentNodeData)

                newNode = newNode.getParent() # 한 단계 위로 이동
            
            else: # 삽입된 노드가 부모노드보다 작거나 같은 경우
                break # 자리를 찾았으므로 종료


    # 최소 힙 우선순위 비교 함수
    def isSmall(self, newData, parentData):
        return newData.priority < parentData.priority
    

    # 최대 힙 우선순위 비교 함수
    def isBig(self, newData, parentData):
        return newData.priority > parentData.priority

    # 새로 삽입될 노드의 부모노드를 찾는 함수
    def getInsertingParent(self):
        # 1. lastInsertedNode가 루트 노드인 경우(루트노드가 부모인 경우)
        if self.lastInsertedNode.getParent() == None:
            return self.lastInsertedNode # 루트노드가 부모노드이므로 루트노드 반환
        
        # 2. lastInsertedNode가 부모노드의 왼쪽 자식인경우
        elif self.lastInsertedNode.getParent().getLeftSubTree() == self.lastInsertedNode:
            return self.lastInsertedNode.getParent() # lastInsertedNode의 부모노드 반환
        
        # 3. lastInsertedNode가 부모노드의 오른쪽 자식인 경우
        elif self.lastInsertedNode.getParent().getRightSubTree() == self.lastInsertedNode:
            currentNode = self.lastInsertedNode
            firstRightSiblingNode = None # 상위노드 중에서 처음으로 존재하는 오른쪽 형제 노드

            while (currentNode.getParent() != self.root): # 최대, 루트노드의 자식노드까지 반복
                currentNode = currentNode.getParent()
                firstRightSiblingNode = self.getRightSiblingNode(currentNode)

                if firstRightSiblingNode != None: # 처음으로 존재하는 오른쪽 형제 노드를 찾은 경우
                    break
            # while문 탈출 시, firstRightSiblingNode가 존재하지 않거나 찾은 경우만 존재

            # 3-1. lastInsertedNode의 상위노드 중에서 오른쪽 형제노드가 존재하는 경우
            if (firstRightSiblingNode != None):
                while(firstRightSiblingNode.getLeftSubTree() != None): # firstRightSiblingNode의 왼쪽 자식노드가 존재하는 동안 반복
                    firstRightSiblingNode = firstRightSiblingNode.getLeftSubTree()
                return firstRightSiblingNode # 가장 왼쪽에 있는 노드 반환

            # 3-2. lastInsertedNode의 상위노드 중에서 오른쪽 형제노드가 존재하지 않는 경우
            else:
                currentNode = self.root
                while(currentNode.getLeftSubTree() != None): # 가장 왼쪽에 있는 노드로 이동
                    currentNode = currentNode.getLeftSubTree()
                return currentNode # 가장 왼쪽에 있는 노드 반환


    # 왼쪽 형제 노드를 반환하는 함수
    def getLeftSibling(self, node):
        if(node.getParent().getRightSubTree() == node): # 현재 노드가 부모의 오른쪽 자식노드인 경우
            return node.getParent().getLeftSubTree() # 왼쪽 형제 노드 반환
        
        return None # 현재 노드가 부모노드의 왼쪽 자식이라면 왼쪽 형제노드가 없으므로 null 리턴


    # 오른쪽 형제 노드를 반환하는 함수
    def getRightSiblingNode(self, node):
        if(node.getParent().getLeftSubTree() == node): # 현재 노드가 부모의 왼쪽 자식노드인 경우
            return node.getParent().getRightSubTree() # 오른쪽 형제 노드 반환
        
        return None # 현재 노드가 부모노드의 오른쪽 자식이라면 오른쪽 형제노드가 없으므로 null 리턴


    # 데이터 제거
    def remove(self):
        deletedNode = None

        # 1. 마지막으로 삽입된 노드가 루트노드인 경우(노드가 하나만 있는 경우)
        if self.lastInsertedNode == self.root:
            deletedNode = self.root
            self.root = None
            self.lastInsertedNode = None
            return deletedNode
        
        # 2. 노드가 여러 개 있는 경우
        prevLastInsertedNode = self.getNewLastInsertedNode() # 마지막으로 삽입된 노드의 이전 노드를 찾기
        # 루트 노드와 마지막으로 삽입된 노드의 데이터 교환
        lastInsertedData = self.lastInsertedNode.getData()
        rootData = self.root.getData()
        self.root.setData(lastInsertedData)
        self.lastInsertedNode.setData(rootData)

        # 마지막으로 삽입된 노드와 부모노드의 연결 끊기
        if self.lastInsertedNode.getParent().getLeftSubTree() == self.lastInsertedNode: # 마지막으로 삽입된 노드가 부모노드의 왼쪽 자식인 경우
            self.lastInsertedNode.getParent().setLeftSubTree(None) # 부모노드의 왼쪽 자식노드를 None으로 설정
        elif self.lastInsertedNode.getParent().getRightSubTree() == self.lastInsertedNode: # 마지막으로 삽입된 노드가 부모노드의 오른쪽 자식인 경우
            self.lastInsertedNode.getParent().setRightSubTree(None) # 부모노드의 오른쪽 자식노드를 None으로 설정
        
        self.lastInsertedNode.setParent(None) # 마지막으로 삽입된 노드의 부모노드를 None으로 설정
        deletedNode = self.lastInsertedNode # 삭제된 노드 설정
        self.lastInsertedNode = prevLastInsertedNode # 마지막으로 삽입된 노드 업데이트(이전 노드로)

        # 루트노드에 있는 노드의 제자리를 찾기
        currentNode = self.root
        while True:
            higherChildNode = self.getHigherPriorityChild(currentNode.getLeftSubTree(), currentNode.getRightSubTree())

            if higherChildNode == None: # 자식노드가 없는 경우 종료
                break
            elif self.isBig(higherChildNode.getData(), currentNode.getData()) == True: # 자식노드가 현재 노드보다 우선순위가 높은 경우
                # 데이터 교환
                currentNodeData = currentNode.getData()
                higherChildNodeData = higherChildNode.getData()
                currentNode.setData(higherChildNodeData)
                higherChildNode.setData(currentNodeData)

                currentNode = higherChildNode # 한 단계 아래로 이동
            else: # 자식노드가 현재 노드보다 우선순위가 낮은 경우
                break # 자리를 찾았으므로 종료
        
            if currentNode.getLeftSubTree() is None and currentNode.getRightSubTree() is None: # 왼쪽, 오른쪽 자식노드가 모두 없는 경우 while문 종료
                break

        return deletedNode


    # 마지막으로 삽입된 노드를 업데이트하는 함수
    def getNewLastInsertedNode(self):
        prevLastInsertedNode = None

        # 1. lastInsertedNode가 부모노드의 왼쪽 자식인경우
        if (self.lastInsertedNode.getParent().getLeftSubTree() == self.lastInsertedNode):
            currentNode = self.lastInsertedNode
            firstLeftSiblingNode = None # 상위노드 중에서 처음으로 존재하는 왼쪽 형제 노드

            while(currentNode.getParent() != self.root): # 최대, 루트노드의 자식노드까지 반복
                currentNode = currentNode.getParent()
                firstLeftSiblingNode = self.getLeftSibling(currentNode)

                if firstLeftSiblingNode != None: # 처음으로 존재하는 왼쪽 형제 노드를 찾은 경우
                    break
            # while문 탈출 시, firstLeftSiblingNode가 존재하지 않거나 찾은 경우만 존재

            # 1-1. lastInsertedNode의 상위노드 중에서 왼쪽 형제노드가 존재하는 경우
            if (firstLeftSiblingNode != None):
                while(firstLeftSiblingNode.getRightSubTree() != None): # firstLeftSiblingNode의 오른쪽 자식 노드가 존재하는 동안 반복
                    firstLeftSiblingNode = firstLeftSiblingNode.getRightSubTree()
                prevLastInsertedNode = firstLeftSiblingNode # prevLastInsertedNode 업데이트
            
            # 1-2. lastInsertedNode의 상위노드 중에서 왼쪽 형제노드가 존재하지 않는 경우
            elif (firstLeftSiblingNode == None):
                currentNode = self.root
                while(currentNode.getRightSubTree() != None): # currentNode의 오른쪽 자식 노드가 존재하는 동안 반복
                    currentNode = currentNode.getRightSubTree()
                prevLastInsertedNode = currentNode # prevLastInsertedNode 업데이트

        # 2. lastInsertedNode가 부모노드의 오른쪽 자식인경우
        elif (self.lastInsertedNode.getParent().getRightSubTree() == self.lastInsertedNode):
            prevLastInsertedNode = self.lastInsertedNode.getParent().getLeftSubTree() # 부모노드의 왼쪽 자식노드로 prevLastInsertedNode 설정

        return prevLastInsertedNode


    # 두 자식 노드 중에서 우선순위가 더 높은 노드를 반환하는 함수
    def getHigherPriorityChild(self, leftChildNode, rightChildNode):
        if leftChildNode == None: return rightChildNode # 예외 처리
        elif rightChildNode == None: return leftChildNode # 예외 처리

        return leftChildNode if self.isBig(leftChildNode.getData(), rightChildNode.getData()) else rightChildNode

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.priority = age  # 우선순위는 나이로 설정

    def __str__(self):
        return f"Name: {self.name}, Age: {self.age}"


# heap = Heap()
# heap.insert(Person('이타도리 유지', 15))
# heap.insert(Person('고죠 사토루', 27))
# heap.insert(Person('료멘 스쿠나', 1000))
# heap.insert(Person('옷코츠 유타', 17))
# print(heap.root)
# heap.root.preOrderTraversal(heap.root);