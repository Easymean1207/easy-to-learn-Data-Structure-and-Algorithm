from stack import Stack

stack = Stack()

print("===== 첫번째 출력 =====")
stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)

print(stack.pop().data)
print(stack.pop().data)
print(stack.pop().data)
print(stack.pop().data)

print("===== 두번째 출력 =====")
stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)
print(stack.peek().data)
stack.pop()
print(stack.peek().data)
stack.pop()
print(f"isEmpty:{stack.isEmpty()}")
stack.pop()
stack.pop()
print(f"isEmpty:{stack.isEmpty()}")
print(stack.pop())
