from queue import Queue

queue = Queue()

print("===== enqueue 테스트 =====")
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.enqueue(4)
queue.enqueue(5)

queue.DoublyLinkedList.printAll()
print("isEmpty:", queue.isEmpty())

print("===== dequeue 테스트 =====")
print(queue.dequeue())
print(queue.dequeue())
print(queue.dequeue())
print(queue.dequeue())
print(queue.dequeue())
queue.DoublyLinkedList.printAll()
print("isEmpty:", queue.isEmpty())

print("===== front 테스트 =====")
queue.enqueue(4)
queue.enqueue(3)
queue.enqueue(2)
queue.enqueue(1)
print(queue.front().data)

queue.dequeue()
print(queue.front().data)

queue.dequeue()
print(queue.front().data)
