import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from HashTable.hash_table import HashTable


class HashSet:
    def __init__(self):
        self.hashTable = HashTable()

    # 해시셋에 데이터를 추가
    def add(self, data):
        if self.hashTable.get(data) == None:
            self.hashTable.set(data, -1)  # 해시 셋의 value에는 더미 데이터 -1 삽입

    # 해시셋에서 데이터 제거
    def remove(self, data):
        return self.hashTable.remove(data)

    # 해시셋에 데이터가 있는지 확인
    def isContain(self, data):
        return True if self.hashTable.get(data) else False

    # 해시셋의 모든 데이터를 제거
    def clear(self):
        for i in range(10):
            self.hashTable.arr[i].clear()

    # 해시셋이 비어있는지 확인
    def isEmpty(self):
        empty = True

        for i in range(10):
            if self.hashTable.arr[i].count > 0:
                empty = False
                break

        return empty

    # 해시셋의 모든 데이터를 출력
    def printAll(self):
        for i in range(len(self.hashTable.arr)):
            currentNode = self.hashTable.arr[i].head

            while currentNode:
                print(f"{currentNode.data.key}")
                currentNode = currentNode.next
