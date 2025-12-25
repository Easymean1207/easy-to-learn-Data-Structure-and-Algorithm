from heapForOthers import Heap


class PriorityQueue:
    def __init__(self):
        self.heap = Heap()

    def enqueue(self, data):
        self.heap.insert(data)

    def dequeue(self):
        # return self.heap.remove()
        return self.heap.remove().getData()


class Enemy:
    def __init__(self, name, health):
        self.name = name
        self.health = health
        self.priority = health

    def __str__(self):
        return f"Enemy: {self.name}, Health: {self.health}"


priorityQueue = PriorityQueue()

priorityQueue.enqueue(Enemy("슬라임", 10))
priorityQueue.enqueue(Enemy("고블린", 30))
priorityQueue.enqueue(Enemy("오크", 20))
priorityQueue.enqueue(Enemy("레드 드래곤", 210))
priorityQueue.enqueue(Enemy("블루 드래곤", 210))
priorityQueue.enqueue(Enemy("와이번", 100))
priorityQueue.enqueue(Enemy("골드 드래곤", 250))

print(priorityQueue.dequeue())
print(priorityQueue.dequeue())
print(priorityQueue.dequeue())
print(priorityQueue.dequeue())
print(priorityQueue.dequeue())
print(priorityQueue.dequeue())
print(priorityQueue.dequeue())
