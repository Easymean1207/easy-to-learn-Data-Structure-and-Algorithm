import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from LinkedList.doubly_linked_list import DoublyLinkedList

class Deque:
    def __init__(self):
        self.DoublyLinkedList = DoublyLinkedList()
    
    # head에 데이터 삽입
    def addFirst(self, data):
        self.DoublyLinkedList.insertAt(0, data)
    
    # head에서 데이터 제거
    def removeFirst(self):
        return self.DoublyLinkedList.deleteAt(0)
    
    # tail에 데이터 삽입
    def addLast(self, data):
        self.DoublyLinkedList.insertLast(data)
    
    # tail에서 데이터 제거
    def removeLast(self):
        return self.DoublyLinkedList.deleteLast()
    
    # 모든 데이터 출력
    def printAll(self):
        self.DoublyLinkedList.printAll()

    # 덱이 비어있는지 확인
    def isEmpty(self):
        return True if self.DoublyLinkedList.count == 0 else False


