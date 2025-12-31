from heapForOthers import Heap;

class TestData:
    def __init__(self, data):
        self.data = data
        self.priority = data
    def __str__(self):
            return self.data


heap = Heap() # Heap 클래스는 최대 힙으로 구현되어 있음
# 만약 최대 힙으로 변경하고 싶다면 heapForOthers.py 파일의
# isBig의 정의를 제외한 나머지 부분을 isSmall() 함수로 변경하면 됨

heap.insert(TestData(1))
heap.insert(TestData(5))
heap.insert(TestData(2))
heap.insert(TestData(7))
heap.insert(TestData(3))
heap.insert(TestData(4))
heap.insert(TestData(10))
heap.insert(TestData(8))
heap.insert(TestData(9))
heap.insert(TestData(6))

arr = []

while (heap.root != None):
    arr.append(heap.remove().getData().data)

print(arr) # 내림차순