import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from LinkedList.doubly_linked_list import DoublyLinkedList


class HashData:
    def __init__(self, key, value):
        self.key = key
        self.value = value


class HashTable:
    def __init__(self):
        self.arr = [None] * 10
        for i in range(10):
            self.arr[i] = DoublyLinkedList()

    # 해시 함수
    def hashFunction(self, key):
        return key % 10

    # 해시 테이블에 데이터 삽입
    def set(self, key, value):
        # 해시함수의 결과값을 인덱스로 하는 연결리스트의 head에 데이터 삽입
        self.arr[self.hashFunction(key)].insertAt(0, HashData(key, value))

    def remove(self, key):
        # 해당 key의 인덱스 연결리스트를 가져옴
        dataList = self.arr[self.hashFunction(key)]
        
        # 순회용 currentNode 설정
        currentNode = dataList.head
        
        # 연결리스트에서 삭제할 데이터의 인덱스 저장
        deletedIndex = 0

        # 연결리스트를 순회하며 key에 해당하는 연결리스트의 인덱스를 찾아 삭제
        while currentNode:
            if currentNode.data.key == key:
                return dataList.deleteAt(deletedIndex)
            currentNode = currentNode.next
            deletedIndex += 1

        return None

    # 해시 테이블에서 key에 해당하는 데이터 조회
    def get(self, key):
        # 해시함수의 결과값을 인덱스로 하는 연결리스트의 head를 현재 노드로 설정
        currentNode = self.arr[self.hashFunction(key)].head

        # currentNode로 연결리스트를 순회하며 key에 해당하는 value를 찾음
        while currentNode:
            if currentNode.data.key == key:
                return currentNode.data.value
            currentNode = currentNode.next

        return None
