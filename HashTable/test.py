from hash_table import HashTable

hashTable = HashTable()

hashTable.set(1, "이운재")
hashTable.set(4, "최진철")
hashTable.set(20, "홍명보")
hashTable.set(6, "유성철")
hashTable.set(22, "송종국")
hashTable.set(21, "박지성")
hashTable.set(5, "김남일")
hashTable.set(10, "이영표")
hashTable.set(8, "최태욱")
hashTable.set(9, "설기현")
hashTable.set(14, "이천수")

print(hashTable.get(4))  # 최진철
hashTable.remove(4)
print(hashTable.get(14))  # 이천수
print(hashTable.get(4))  # None

for i in range(len(hashTable.arr)):
    currentNode = hashTable.arr[i].head

    while currentNode:
        print(currentNode.data.key, currentNode.data.value)
        currentNode = currentNode.next
