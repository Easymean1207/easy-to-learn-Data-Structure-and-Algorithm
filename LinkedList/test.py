from linked_list import Node, LinkedList

node1 = Node(1)
node2 = Node(2)
node3 = Node(3)

node1.next = node2
node2.next = node3

# print(node1.data)
# print(node1.next.data)
# print(node1.next.next.data)
"""  """
ls = LinkedList()

print("===== insertAt() 다섯 번 호출 =====")
ls.insertAt(0, 0)
ls.insertAt(1, 1)
ls.insertAt(2, 2)
ls.insertAt(3, 3)
ls.insertAt(4, 4)
ls.insertAt(5, 5)
ls.printAll()

print("===== clear() 호출 =====")
ls.clear()
ls.printAll()

print("===== insertLast 호출 =====")
ls.insertLast(0)
ls.insertLast(10)
ls.insertLast(20)
ls.printAll()

print("===== deleteAt() 호출 =====")
ls.deleteAt(0)
ls.printAll()
ls.deleteAt(1)
ls.printAll()

print("===== deleteLast() 호출 =====")
ls.insertLast(5)
ls.deleteLast()
ls.deleteLast()
ls.printAll()

print("===== getNodeAt() 호출 =====")
ls.insertLast(0)
ls.insertLast(1)
ls.insertLast(2)
ls.insertLast(3)
ls.insertLast(4)
ls.insertLast(5)

SecondNode = ls.getNodeAt(2)
print(SecondNode.data)
