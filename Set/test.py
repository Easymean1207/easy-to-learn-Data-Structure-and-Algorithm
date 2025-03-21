from hashset import HashSet

hashSet = HashSet()

print(f"isEmtpy: {hashSet.isEmpty()}")

print("===== 데이터 삽입 테스트 =====")

hashSet.add(1)
hashSet.add(2)
hashSet.add(1)
hashSet.add(3)
hashSet.add(2)
hashSet.add(4)
hashSet.add(11)

hashSet.printAll()
print(f"isEmpty: {hashSet.isEmpty()}")

print("===== 데이터 체크1 =====")
print(f"isContain(1): {hashSet.isContain(1)}")
print(f"isContain(2): {hashSet.isContain(2)}")
print(f"isContain(11): {hashSet.isContain(11)}")

print("===== 데이터 제거 =====")
hashSet.remove(1)
hashSet.remove(11)
hashSet.printAll()
print(f"isEmpty: {hashSet.isEmpty()}")

print("===== 데이터 체크2 =====")
print(f"isContain(1): {hashSet.isContain(1)}")

print("===== clear =====")
hashSet.clear()
hashSet.printAll()
print(f"isEmpty: {hashSet.isEmpty()}")
