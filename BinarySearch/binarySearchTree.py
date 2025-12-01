import sys
import os
import time

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from Tree.binaryTree import BinaryTree


class BinarySearchTree:
    def __init__(self, rootNode=None):
        self.root = rootNode

    def insert(self, data):
        # 처음 삽입할 때
        if self.root is None:
            self.root = BinaryTree(data)
            return

        # 그 외의 경우
        currentNode = self.root
        parentNode = None  # 삽입할 위치의 부모 노드

        while currentNode != None:
            parentNode = currentNode

            if data < currentNode.getData():
                currentNode = currentNode.getLeftSubTree()
            elif data > currentNode.getData():
                currentNode = currentNode.getRightSubTree()
            else:
                # 중복된 데이터는 삽입하지 않음
                return

        # 삽입할 위치에 도달
        newNode = BinaryTree(data)
        if data < parentNode.data:
            parentNode.setLeftSubTree(newNode)
        else:
            parentNode.setRightSubTree(newNode)

    def delete(self, targetData):
        fakeRootParent = BinaryTree(
            -1
        )  # 루트 노드도 다른 노드와 동일하게 처리하기 위해 루트 노드의 가짜 부모 노드 생성
        parentNode = fakeRootParent  # 삭제할 노드의 부모 노드
        currentNode = self.root  # 현재 노드
        deletedNode = None  # 삭제할 노드

        fakeRootParent.setLeftSubTree(self.root)  # 왼쪽이든 오른쪽이든 상관없음

        # 삭제할 노드를 탐색
        while currentNode != None and currentNode.getData() != targetData:
            parentNode = currentNode

            if (
                targetData < currentNode.getData()
            ):  # 현재 노드의 값이 타겟 값보다 크면 왼쪽 서브트리로 이동
                currentNode = currentNode.getLeftSubTree()
            elif (
                targetData > currentNode.getData()
            ):  # 현재 노드의 값이 타겟 값보다 작으면 오른쪽 서브트리로 이동
                currentNode = currentNode.getRightSubTree()

        # currentNode == null인 경우(삭제할 노드를 찾지 못한 경우)
        if currentNode is None:
            return

        # currentNode.getData() === targetData인 경우(삭제할 노드를 찾은 경우)
        deletedNode = currentNode  # 삭제할 노드를 현재 노드로 설정

        # 1. 터미널 노드 제거
        if (
            deletedNode.getLeftSubTree() == None
            and deletedNode.getRightSubTree() == None
        ):
            if (
                parentNode.getLeftSubTree() == deletedNode
            ):  # 삭제할 노드가 부모 노드의 왼쪽 자식인 경우
                parentNode.removeLeftSubTree()  # 부모 노드의 왼쪽 자식 노드를 제거
            else:  # 삭제할 노드가 부모 노드의 오른쪽 자식인 경우
                parentNode.removeRightSubTree()  # 부모 노드의 오른쪽 자식 노드를 제거

        # 2. 자식이 하나인 노드 제거
        if (
            deletedNode.getLeftSubTree() == None
            or deletedNode.getRightSubTree() == None
        ):
            childNode = None  # 삭제할 노드의 자식 노드

            # (삭제할 노드의)자식 노드 설정
            if (
                deletedNode.getLeftSubTree() != None
            ):  # 삭제할 노드의 왼쪽 자식 노드가 존재하는 경우
                childNode = (
                    deletedNode.getLeftSubTree()
                )  # 왼쪽 자식 노드를 자식 노드로 설정
            else:  # 삭제할 노드의 오른쪽 자식 노드가 존재하는 경우
                childNode = (
                    deletedNode.getRightSubTree()
                )  # 오른쪽 자식 노드를 자식 노드로 설정

            # (삭제할 노드의)부모 노드와 (삭제할 노드의)자식 노드 연결
            if (
                parentNode.getLeftSubTree() == deletedNode
            ):  # 삭제할 노드가 부모 노드의 왼쪽 자식인 경우
                parentNode.setLeftSubTree(
                    childNode
                )  # 삭제할 노드의 자식 노드를 부모 노드의 왼쪽 자식으로 설정(연결)
            else:  # 삭제할 노드가 부모 노드의 오른쪽 자식인 경우
                parentNode.setRightSubTree(
                    childNode
                )  # 삭제할 노드의 자식 노드를 부모 노드의 오른쪽 자식으로 설정

        # 3. 자식이 두 개인 노드 제거
        # 삭제할 노드의 오른쪽 서브트리에서 가장 작은 값을 가진 노드를 새로운 중심 노드로 선택 or
        # 삭제할 노드의 왼쪽 서브트리에서 가장 큰 값을 가진 노드를 새로운 중심 노드로 선택
        else:
            # 대신할 노드로 삭제할 노드의 오른쪽 서브트리에서 가장 작은 값을 가진 노드를 선택하는 방법
            replaceNode = deletedNode.getRightSubTree()
            replaceNodeParent = deletedNode  # 대체 노드의 부모 노드

            # 오른쪽 서브트리에서 가장 작은 값을 가진 노드 탐색
            while replaceNode.getLeftSubTree() != None:
                replaceNodeParent = replaceNode
                replaceNode = replaceNode.getLeftSubTree()

            # 대체 노드를 찾음 + 삭제할 노드의 데이터 값을 대체 노드의 데이터 값으로 변경
            deletedNodeData = deletedNode.getData()  # 삭제할 노드의 데이터 값
            deletedNode.setData(
                replaceNode.getData()
            )  # 삭제할 노드의 데이터 값을 대체 노드의 데이터 값으로 변경

            # 대체 노드의 자식 노드와 대체 노드의 부모 노드 연결
            if (
                replaceNodeParent.getLeftSubTree() == replaceNode
            ):  # 대체 노드가 대체 노드의 부모 노드의 왼쪽 자식인 경우
                replaceNodeParent.setLeftSubTree(
                    replaceNode.getRightSubTree()
                )  # 대체 노드(repalce)의 오른쪽 자식 노드를 부모 노드(replaceParent)의 왼쪽 자식으로 설정(연결)
            else:  # 대체 노드가 대체 노드의 부모 노드의 오른쪽 자식인 경우
                replaceNodeParent.setRightSubTree(
                    replaceNode.getRightSubTree()
                )  # 대체 노드(replace)의 오른쪽 자식 노드를 부모 노드의(replaceParent) 오른쪽 자식으로 설정(연결)

            deletedNode = replaceNode  # 삭제할 노드 설정(원래 대체 노드의 위치로)
            deletedNode.setData(
                deletedNodeData
            )  # 삭제할 노드의 데이터 값을 설정(원래 삭제할 노드의 데이터 값으로)

        # 루트 노드가 변경된 경우 처리
        if fakeRootParent.getLeftSubTree() != self.root:
            self.root = fakeRootParent.getLeftSubTree()

        return deletedNode  # 삭제된 노드 반환

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


bst = BinarySearchTree()
bst.insert(18)
bst.insert(15)
bst.insert(10)
bst.insert(6)
bst.insert(3)
bst.insert(8)
bst.insert(12)
bst.insert(11)
bst.insert(31)
bst.insert(27)
bst.insert(24)
bst.insert(20)
bst.insert(33)
bst.insert(35)
bst.insert(37)
bst.root.inOrderTraversal(bst.root)

start = time.time()
print("Search 15 :", bst.search2(15).getData())
end = time.time()
print("Search 15 took", end - start, "seconds")

print("-----------------------")

start = time.time()
print("Search 15 (recursive):", bst.search2(15).getData())
end = time.time()
print("Search 15 (recursive) took", end - start, "seconds")

print("-----------------------")

bst.delete(20)
bst.root.inOrderTraversal(bst.root)
