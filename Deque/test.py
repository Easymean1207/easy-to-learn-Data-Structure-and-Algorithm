from deque import Deque

deque = Deque()

print("===== addFirst 테스트 =====")
deque.addFirst(1)
deque.printAll()
deque.addFirst(2)
deque.printAll()
deque.addFirst(3)
deque.printAll()
deque.addFirst(4)
deque.printAll()
deque.addFirst(5)
deque.printAll()
print("isEmpty:", deque.isEmpty())

print("===== removeFirst 테스트 =====")
deque.removeFirst()
deque.printAll()
deque.removeFirst()
deque.printAll()
deque.removeFirst()
deque.printAll()
deque.removeFirst()
deque.printAll()
deque.removeFirst()
deque.printAll()
print("isEmpty:", deque.isEmpty())

print("===== addLast 테스트 =====")
deque.addLast(1)
deque.printAll()
deque.addLast(5)
deque.printAll()
deque.addLast(7)
deque.printAll()
deque.addLast(3)
deque.printAll()
deque.addLast(9)
deque.printAll()
print("isEmpty:", deque.isEmpty())

print("===== removeLast 테스트 =====")
deque.removeLast()
deque.printAll()
deque.removeLast()
deque.printAll()
deque.removeLast()
deque.printAll()
deque.removeLast()
deque.printAll()
deque.removeLast()
deque.printAll()
print("isEmpty:", deque.isEmpty())
