import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from LinkedList.linked_list import LinkedList


class Stack:
    def __init__(self):
        self.LinkedList = LinkedList()

    # 스택에 데이터 삽입
    def push(self, data):
        self.LinkedList.insertAt(0, data)

    # 스택에서 데이터를 삭제하고 반환
    def pop(self):
        try:
            return self.LinkedList.deleteAt(0)
        except Exception as e:
            return None

    # 스택의 맨 위 데이터를 반환
    def peek(self):
        return self.LinkedList.getNodeAt(0)

    # 스택이 비어있는지 확인
    def isEmpty(self):
        if self.LinkedList.count == 0:
            return True
        else:
            return False
