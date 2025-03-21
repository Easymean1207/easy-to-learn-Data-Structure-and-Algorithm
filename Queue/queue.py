import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from LinkedList.doubly_linked_list import DoublyLinkedList


class Queue:
    def __init__(self):
        self.DoublyLinkedList = DoublyLinkedList()

    # 큐에 데이터 삽입
    def enqueue(self, data):
        self.DoublyLinkedList.insertAt(0, data)

    # 큐에서 데이터를 삭제하고 반환
    def dequeue(self):
        try:
            return self.DoublyLinkedList.deleteLast()
        except Exception as e:
            return None

    # 큐의 tail 노드 반환
    def front(self):
        return self.DoublyLinkedList.tail

    # 큐가  비어있는 지 확인
    def isEmpty(self):
        return True if self.DoublyLinkedList.count == 0 else False
