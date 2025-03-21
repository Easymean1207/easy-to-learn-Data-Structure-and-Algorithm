# Node 클래스 생성
class Node:
    def __init__(self, data, next=None, prev=None):
        self.data = data
        self.next = next
        self.prev = prev


class DoublyLinkedList:
    def __init__(self):
        self.head = None  # 시작 노드를 가리키는 head
        self.tail = None  # 마지막 노드를 가리키는 tail
        self.count = 0  # 총 노드 개수를 저장하는 count

    # 인덱스 삽입
    def insertAt(self, index, data):
        # 인덱스가 최대 인덱스보다 크거나 혹은 음수인 경우 예외 처리
        if index < 0 or index > self.count:
            raise IndexError("삽입 가능한 인덱스 범위를 벗어났습니다.")

        # 새로 삽입할 노드 생성
        newNode = Node(data)

        # 1. 새로 삽입되는 노드가 첫번째 노드(head)가 되는 경우
        if index == 0:
            newNode.next = self.head

            if self.head is not None:
                # 기존 head가 존재하는 경우
                self.head.prev = (
                    newNode  # 기존 head의 prev가 새로운 노드를 가리키도록 설정
                )

            self.head = newNode  # 새로 삽입된 노드를 head로 설정

        # 2. 새로 삽입되는 노드가 마지막 노드(tail)가 되는 경우
        elif index == self.count:
            newNode.next = None  # 새로운 노드의 next를 null로 설정
            newNode.prev = self.tail  # 새로운 노드의 prev가 기존 tail을 가리키도록 설정
            self.tail.next = newNode  # 기존 tail의 next가 새로운 노드를 가리키도록 설정

        # 3. 중간에 삽입(head와 tail 사이)되는 경우
        else:
            currentNode = self.head

            for i in range(index - 1):
                currentNode = currentNode.next

            newNode.next = (
                currentNode.next
            )  # 새로운 노드의 next를 이전 노드의 next(currentNode.next)로 설정
            newNode.prev = (
                currentNode  # 새로운 노드의 prev를 이전 노드(currentNode)로 설정
            )
            currentNode.next = (
                newNode  # 새로운 노드를 이전 노드(currentNode)의 next로 설정
            )
            newNode.next.prev = (
                newNode  # 새로운 노드의 다음 노드의 prev를 새로운 노드로 설정
            )

        # 새로운 노드가 마지막 노드인 경우 tail로 설정
        if newNode.next is None:
            self.tail = newNode
        # 노드 개수 증가
        self.count += 1

    # 마지막 삽입
    def insertLast(self, data):
        self.insertAt(self.count, data)

    # 인덱스 삭제
    def deleteAt(self, index):
        # 인덱스가 최대 인덱스보다 크거나 혹은 음수인 경우 예외 처리
        if index < 0 or index >= self.count:
            raise IndexError("제거 가능한 인덱스 범위를 벗어났습니다.")

        currentNode = self.head

        # 1. 첫번째 노드(head)가 제거되는 경우
        if index == 0:
            deleteNode = self.head  # 삭제할 노드
            # 남은 노드가 1개일 때
            if self.head.next is None:
                self.head = None
                self.tail = None
            # 남은 노드가 2개 이상일 때
            else:
                self.head = self.head.next  # 기존 head의 다음 노드를 새로운 head로 설정
                self.head.prev = None  # 새로운 head의 이전 노드를 null로 설정
            self.count -= 1  # 노드 개수 감소
            return deleteNode  # 삭제된 노드 반환

        # 2. 마지막 노드(tail)가 제거되는 경우
        elif index == self.count - 1:
            deleteNode = self.tail  # 삭제할 노드
            self.tail.prev.next = None  # 기존 tail의 이전 노드의 next를 null로 설정
            self.tail = self.tail.prev  # 기존 tail의 이전 노드를 새로운 tail로 설정
            self.count -= 1  # 노드 개수 감소
            return deleteNode  # 삭제된 노드 반환

        # 3. 중간 노드(head와 tail 사이)가 제거되는 경우
        else:
            # 삭제할 노드의 이전 노드까지 이동
            for i in range(index - 1):
                currentNode = currentNode.next
            deleteNode = currentNode.next  # 삭제할 노드
            currentNode.next = (
                currentNode.next.next
            )  # 이전 노드의 다음 노드를 삭제할 노드의 다음 노드로 설정
            currentNode.next.prev = (
                currentNode  # 삭제할 노드의 다음 노드의 이전 노드를 이전 노드로 설정
            )
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
