class Node:
    def __init__(self, data, next=None):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None
        self.count = 0

    # 인덱스 삽입
    def insertAt(self, index, data):
        # 인덱스가 최대 인덱스보다 크거나 혹은 음수인 경우 예외 처리
        if index > self.count or index < 0:
            raise Exception("삽입 가능한 인덱스 범위를 벗어났습니다.")

        # 새로 삽입할 노드 생성
        newNode = Node(data)

        # 1. 새로 삽입되는 노드가 첫번째 노드(head)가 되는 경우
        if index == 0:
            newNode.next = (
                self.head
            )  # 새로운 노드의 next가 기존의 head(첫번째 노드)를 가리키도록 설정
            self.head = newNode  # 새로 삽입된 노드를 head로 설정

        # 2. head가 아닌 다른 노드에 삽입되는 경우
        else:
            currentNode = self.head  # head에서부터 탐색 시작

            # 삽입 위치의 이전 노드까지 이동
            for i in range(index - 1):
                currentNode = currentNode.next
            newNode.next = (
                currentNode.next
            )  # 새로운 노드의 next가 삽입 위치의 노드(currentNode.next)를 가리키도록 설정
            currentNode.next = newNode  # 새로운 노드를 이전 노드의 next로 설정

        self.count += 1

    # 마지막 삽입
    def insertLast(self, data):
        self.insertAt(self.count, data)

    # 인덱스 삭제
    def deleteAt(self, index):
        # 인덱스가 최대 인덱스보다 크거나 혹은 음수인 경우 예외 처리
        if index > self.count or index < 0:
            raise Exception("제거 가능한 인덱스 범위를 벗어났습니다.")

        currentNode = self.head

        # 1. 첫번째 노드(head)가 제거되는 경우
        if index == 0:
            deleteNode = self.head  # 삭제할 노드
            self.head = self.head.next
            self.count -= 1
            return deleteNode
        # 2. 첫번째 노드 이외의 노드가 제거되는 경우
        else:
            # 삭제할 노드의 이전 노드까지 이동
            for i in range(index - 1):
                currentNode = currentNode.next
            deleteNode = currentNode.next  # 삭제할 노드
            currentNode.next = (
                currentNode.next.next
            )  # 이전 노드와 삭제할 노드의 다음 노드를 연결
            self.count -= 1  # 노드 개수 감소
            return deleteNode  # 삭제된 노드 반환

    # 마지막 삭제
    def deleteLast(self):
        return self.deleteAt(self.count - 1)

    # 모든 데이터 제거
    def clear(self):
        self.head = None  # head를 null로 설정
        self.count = 0  # 노드 개수를 0으로 설정

    # 인덱스 읽기
    def getNodeAt(self, index):
        # 인덱스가 최대 인덱스보다 크거나 음수인 경우 예외 처리
        if index >= self.count or index < 0:
            raise Exception("조회 가능한 인덱스 범위를 벗어났습니다.")

        currentNode = self.head

        # 인덱스 위치까지 이동
        for i in range(index):
            currentNode = currentNode.next

        return currentNode

    # 모든 데이터 출력
    def printAll(self):
        currentNode = self.head
        result = "["

        # head부터 노드 끝까지 탐색
        while currentNode != None:
            result += str(currentNode.data)
            currentNode = currentNode.next

            if currentNode != None:
                result += "->"

        result += "]"
        print(result)
