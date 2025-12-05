import sys
import os
import time

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from binaryTree import BinaryTree


class AVLTree:
    def __init__(self, rootNode=None):
        self.root = rootNode

    def search(self, targetData):
        currentNode = self.root

        while currentNode != None:
            if targetData == currentNode.data:  # 데이터 발견
                return currentNode
            elif (
                targetData < currentNode.getData()
            ):  # 데이터가 작으면 왼쪽 서브트리로 이동
                currentNode = currentNode.getLeftSubTree()
            else:  # 데이터가 크면 오른쪽 서브트리로 이동
                currentNode = currentNode.getRightSubTree()

        return None  # 데이터가 트리에 없는 경우

    def search2(self, targetData, currentNode=None):
        # python 방식의 currentNode = this.root 표현 (python은 정의 시점에 기본 인자를 평가하기 때문)
        if currentNode is None:
            currentNode = self.root

        # 기저 조건: 노드가 None이면 데이터가 없는 것
        if currentNode is None:
            return None

        if targetData == currentNode.getData():
            return currentNode
        elif targetData < currentNode.getData():
            return self.search2(targetData, currentNode.getLeftSubTree())
        else:
            return self.search2(targetData, currentNode.getRightSubTree())

    # 노드의 높이를 반환하는 함수
    def getHeight(self, node):
        if node is None:
            return 0
        else:
            return node.height
    
    # 노드의 높이를 갱신하는 함수
    def updateHeight(self, node):
        leftChildHeight = self.getHeight(node.getLeftSubTree()) # 왼쪽 자식 노드의 높이
        rightChildHeight = self.getHeight(node.getRightSubTree()) # 오른쪽 자식 노드의 높이
        node.height = max(leftChildHeight, rightChildHeight) + 1 # 둘 중 큰 값에 node 자신을 더한 값으로 높이 갱신

    # 균형 인수를 계산하는 함수
    def getBalanceFator(self, node):
        leftChildHeight = self.getHeight(node.getLeftSubTree()) # 왼쪽 자식 노드의 높이
        rightChildHeight = self.getHeight(node.getRightSubTree()) # 오른쪽 자식 노드의 높이
        return leftChildHeight - rightChildHeight # 균형 인수 계산
    
    # LL 회전 함수
    def rotatLeft(self, node):
        childNode = node.getRightSubTree()
        node.setRightSubTree(childNode.getLeftSubTree()) # childNode의 왼쪽 자식 노드가 있을 경우, node의 오른쪽 자식으로 변경하여 childNode의 자식 노드 유지
        childNode.setLeftSubTree(node) # node를 childNode의 왼쪽 자식으로 변경

        # 회전과 관련된 노드들의 높이 갱신
        self.updateHeight(node) # node의 높이 갱신
        self.updateHeight(childNode) # childNode의 높이 갱신

        return childNode # 회전 후 새로운 루트 노드 반환

    # RR 회전 함수
    def rotatRight(self, node):
        childNode = node.getLeftSubTree()
        node.setLeftSubTree(childNode.getRightSubTree())  # childNode의 오른쪽 자식 노드가 있을 경우, node의 왼쪽 자식으로 변경하여 childNode의 자식 노드 유지
        childNode.setRightSubTree(node) # node를 childNode의 오른쪽 자식으로 변경

        # 회전과 관련된 노드들의 높이 갱신
        self.updateHeight(node) # node의 높이 갱신
        self.updateHeight(childNode) # childNode의 높이 갱신

        return childNode # 회전 후 새로운 루트 노드 반환
    
    # 상황에 따라 회전을 수행하는 함수(LL/RR/LR/RL)
    def rotation(self, targetNode, data):
        # 균형 인수 계산
        balanceFactor = self.getBalanceFator(targetNode)

        # 회전하려는 노드가 루트 노드인지 확인
        isRootNode = False
        if targetNode == self.root:
            isRootNode = True

        # LL 회전 (균형 인수가 -1보다 작고, 오른쪽으로만 치우친 경우)
        if balanceFactor < -1 and data > targetNode.getRightSubTree().getData():
            targetNode = self.rotatLeft(targetNode) # LL 회전 수행 후, 바뀐 루트 노드를 targetNode에 저장

        # RR 회전 (균형 인수가 1보다 크고, 왼쪽으로만 치우친 경우)
        elif balanceFactor > 1 and data < targetNode.getLeftSubTree().getData():
            targetNode = self.rotatRight(targetNode) # RR 회전 수행 후, 바뀐 루트 노드를 targetNode에 저장
        
        # LR 회전 (LL회전을 제외한 균형 인수가 1보다 큰 경우)
        elif balanceFactor > 1 and data > targetNode.getLeftSubTree().getData():
            targetNode.setLeftSubTree(self.rotatLeft(targetNode.getLeftSubTree())) # 왼쪽 자식 노드에 대해 LL 회전 수행 -> targetNode의 왼쪽 자식 노드 재설정
            targetNode = self.rotatRight(targetNode) # RR 회전 수행 후, 바뀐 루트 노드를 targetNode에 저장

        # RL 회전 (RR회전을 제외한 균형 인수가 -1보다 작은 경우)
        elif balanceFactor < -1 and data < targetNode.getRightSubTree().getData():
            targetNode.setRightSubTree(self.rotatRight(targetNode.getRightSubTree())) # 오른쪽 자식 노드에 대해 RR 회전 수행 -> targetNode의 오른쪽 자식 노드 재설정
            targetNode = self.rotatLeft(targetNode) # LL 회전 수행 후, 바뀐 루트 노드를 targetNode에 저장
        
        # 회전한 노드가 루트 노드인 경우, 트리의 루트 노드를 갱신
        if isRootNode:
            self.root = targetNode
        
        return targetNode # 회전 후의 노드 반환(바뀐 노드)
        

    # 균형을 무너뜨리는 노드를 찾는 함수
    def getUnBalancedNode(self, targetRootNode, unBlancedNode = None):
        # 기저 조건: 해당 노드의 자식 노드가 없으면 종료
        if(targetRootNode.getLeftSubTree() is None and targetRootNode.getRightSubTree() is None):
            unBlancedNode = targetRootNode # 헤당 노드를 균형을 무너뜨리는 노드로 설정
            return unBlancedNode
    
        # 재귀 패턴: 찾는 노드가 균형을 무너뜨리는지 확인
        balanceFactor = self.getBalanceFator(targetRootNode)

        # 왼쪽 서브트리로 기운 경우
        if balanceFactor > 0:
            unBlancedNode = self.getUnBalancedNode(targetRootNode.getLeftSubTree(), unBlancedNode)

        # 오른쪽 서브트리로 기운 경우
        elif balanceFactor < 0:
            unBlancedNode = self.getUnBalancedNode(targetRootNode.getRightSubTree(), unBlancedNode)
        
        else:
            unBlancedNode = targetRootNode.getLeftSubTree()
        
        return unBlancedNode # 균형을 무너뜨리는 노드 반환
    

    # 데이터 삽입 함수
    def insert(self, targetRootNode, data):
        # 기저 조건: 삽입할 위치에 도달한 경우 or 최초로 삽입하는 경우
        if targetRootNode is None:
            targetRootNode = BinaryTree(data) # 새로운 노드 생성

        if(self.root is None):
            self.root = targetRootNode # 최초 삽입 시, 트리의 루트 노드로 설정
        
        # 재귀 패턴: 데이터를 삽입할 위치를 탐색
        if targetRootNode.getData() == data:
            return targetRootNode  # 중복된 데이터는 삽입하지 않음
        elif targetRootNode.getData() > data: # 삽입할 데이터가 작으면 왼쪽 서브트리로 이동
            targetRootNode.setLeftSubTree(self.insert(targetRootNode.getLeftSubTree(), data)) # 삽입 후, 왼쪽 자식으로 연결
        elif targetRootNode.getData() < data: # 삽입할 데이터가 크면 오른쪽 서브트리로 이동
            targetRootNode.setRightSubTree(self.insert(targetRootNode.getRightSubTree(), data)) # 삽입 후, 오른쪽 자식으로 연결

        # 높이 업데이트(가장 아래 노드가 먼저 업데이트, 루트 노드가 마지막에 업데이트)
        self.updateHeight(targetRootNode)
        targetRootNode = self.rotation(targetRootNode, data) # 삽입 후, 균형이 무너졌다면 회전 수행하여 균형 맞추기

        return targetRootNode  # 삽입 후의 노드 반환
    

    # 데이터 삭제 함수
    def delete(self, targetRootNode, data, parentNode = None):
        if(targetRootNode.getData() > data and targetRootNode.getLeftSubTree() is not None): # 삭제할 노드가 왼쪽 서브트리에 있는 경우
            targetRootNode.setLeftSubTree(self.delete(targetRootNode.getLeftSubTree(), data, targetRootNode)) # 왼쪽 서브트리를 대상으로 재귀 호출 -> 삭제 후, 삭제된 노드의 자식노드를 연결
        elif(targetRootNode.getData() < data and targetRootNode.getRightSubTree() is not None): # 삭제할 노드가 오른쪽 서브트리에 있는 경우
            targetRootNode.setRightSubTree(self.delete(targetRootNode.getRightSubTree(), data, targetRootNode)) # 오른쪽 서브트리를 대상으로 재귀 호출 -> 삭제 후, 삭제된 노드의 자식노드를 연결
        elif(targetRootNode.getData() == data): # 삭제할 노드를 찾은 경우 (기저 조건)
            targetRootNode = self.removeHelper(targetRootNode,parentNode) # 노드 삭제

            # 루트 노드를 삭제하는 경우 (기저 조건2)
            if (parentNode == None and targetRootNode is not None):
                self.updateHeight(targetRootNode)
                unBalancedNode = self.getUnBalancedNode(targetRootNode) # insert 함수는 삽입되는 노드가 균형을 무너뜨리지만, delete 함수에서는 그것을 찾아야 함
                targetRootNode = self.rotation(targetRootNode, unBalancedNode.getData()) # 삭제 후, 균형이 무너졌다면 회전 수행하여 균형 맞추기
            
            return targetRootNode # 삭제 후의 노드 반환
    
        # 높이 업데이트(가장 아래 노드가 먼저 업데이트, 루트 노드가 제일 마지막에 업데이트)
        self.updateHeight(targetRootNode)
        
        # 회전 관련 처리
        unBalancedNode = self.getUnBalancedNode(targetRootNode) # insert 함수는 삽입되는 노드가 균형을 무너뜨리지만, delete 함수에서는 그것을 찾아야 함
        targetRootNode = self.rotation(targetRootNode, unBalancedNode.getData()) # 삭제 후, 균형이 무너졌다면 회전 수행하여 균형 맞추기

        return targetRootNode # 삭제 후의 노드 반환

    def removeHelper(self, deletedNode, parentNode):
        fakeRootParent = BinaryTree(-1) # 루트 노드도 다른 노드와 동일하게 처리하기 위해 루트 노드의 가짜 부모 노드 생성
        fakeRootParent.setRightSubTree(self.root) # 왼쪽이든 오른쪽이든 상관없음

        if parentNode is None:
            parentNode = fakeRootParent

        deletedNodeChild = None  # 삭제할 노드의 자식 노드

        # 1. 터미널 노드 제거
        if (deletedNode.getLeftSubTree() is None and deletedNode.getRightSubTree() is None):
            if(parentNode.getLeftSubTree() == deletedNode): # 삭제할 노드가 부모 노드의 왼쪽 자식인 경우
                parentNode.removeLeftSubTree() # 부모 노드의 왼쪽 자식 노드를 제거
            else: # 삭제할 노드가 부모 노드의 오른쪽 자식인 경우
                parentNode.removeRightSubTree() # 부모 노드의 오른쪽 자식 노드를 제거
           

        # 2. 자식 노드가 하나인 노드 제거
        elif (deletedNode.getLeftSubTree() is None or deletedNode.getRightSubTree() is None):

            # (삭제할 노드의)자식 노드 설정
            if (deletedNode.getLeftSubTree() is not None): # 삭제할 노드의 왼쪽 자식 노드가 존재하는 경우
                childNode = deletedNode.getLeftSubTree() # 왼쪽 자식 노드를 자식 노드로 설정
            else: # 삭제할 노드의 오른쪽 자식 노드가 존재하는 경우
                childNode = deletedNode.getRightSubTree() # 오른쪽 자식 노드를 자식 노드로 설정
            

            # (삭제할 노드의)부모 노드와 (삭제할 노드의)자식 노드 연결
            if(parentNode.getLeftSubTree() == deletedNode): # 삭제할 노드가 부모 노드의 왼쪽 자식인 경우
                parentNode.setLeftSubTree(childNode) # 삭제할 노드의 자식 노드를 부모 노드의 왼쪽 자식으로 설정(연결)
            else: # 삭제할 노드가 부모 노드의 오른쪽 자식인 경우
                parentNode.setRightSubTree(childNode) # 삭제할 노드의 자식 노드를 부모 노드의 오른쪽 자식으로 설정(연결)
    
        # 3. 자식 노드가 두 개인 노드 제거
        # 삭제할 노드의 오른쪽 서브트리에서 가장 작은 값을 가진 노드를 새로운 중심 노드로 선택 or 
        # 삭제할 노드의 왼쪽 서브트리에서 가장 큰 값을 가진 노드를 새로운 중심 노드로 선택
        else:
            # 대체 노드로 삭제할 노드의 왼쪽 서브트리에서 가장 큰 값을 가진 노드를 선택하는 방법
            replaceNode = deletedNode.getLeftSubTree()
            replaceNodeParent = deletedNode

            # 왼쪽 서브트리에서 가장 큰 값을 가진 노드를 탐색
            while (replaceNode.getRightSubTree() is not None):
                replaceNodeParent = replaceNode;
                replaceNode = replaceNode.getRightSubTree();
            

            # 대체 노드를 찾음 + 삭제할 노드의 데이터 값을 대체 노드의 데이터 값으로 변경
            deletedNodeData = deletedNode.getData() # 삭제할 노드의 데이터 값
            deletedNode.setData(replaceNode.getData()) # 삭제할 노드의 데이터 값을 대체 노드의 데이터 값으로 변경
            # 대체 노드의 자식 노드와 대체 노드의 부모 노드 연결
            if(replaceNodeParent.getLeftSubTree() == replaceNode): # 대체 노드가 부모 노드의 왼쪽 자식인 경우
                replaceNodeParent.setLeftSubTree(replaceNode.getLeftSubTree()) # 대체 노드(replace)의 왼쪽 자식 노드를 부모 노드(replaceParent)의 왼쪽 자식으로 설정
            else: # replaceNodeParent.getRightSubTree() == replaceNode -> 대체 노드가 부모 노드의 오른쪽 자식인 경우
                replaceNodeParent.setRightSubTree(replaceNode.getLeftSubTree()) # 대체 노드(replace)의 왼쪽 자식 노드를  부모 노드(replaceParent)의 오른쪽 자식으로 설정
            
            deletedNodeChild = deletedNode;
        
        # 루트 노드가 변경된 경우 처리
        if (fakeRootParent.getRightSubTree() != self.root):
            self.root = fakeRootParent.getRightSubTree() # 새로운 루트 노드로 설정(가짜 루트의 오른쪽 자식)

        # 아래의 return은 선택사항
        return deletedNodeChild # 삭제된 노드 반환


avl = AVLTree()
print("====== Insert ======")
avl.insert(avl.root, 1);
avl.insert(avl.root, 2);
avl.insert(avl.root, 3);
avl.insert(avl.root, 4);
avl.insert(avl.root, 5);
avl.insert(avl.root, 6);
avl.insert(avl.root, 7);
print('root node:', avl.root)
print('중위 순회')
avl.root.inOrderTraversal(avl.root)

print('====== delete =======')
avl.delete(avl.root, 2)
avl.delete(avl.root, 3)
avl.delete(avl.root, 1)
print('root node:', avl.root)
print('중위 순회')
avl.root.inOrderTraversal(avl.root)

print('====== search =======')
print(avl.search(5))
print(avl.search(7))