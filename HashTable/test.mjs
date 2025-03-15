import { HashTable } from './hash_table.mjs';

let hashTable = new HashTable();

hashTable.set(1, '이운재');
hashTable.set(4, '최진철');
hashTable.set(20, '홍명보');
hashTable.set(6, '유성철');
hashTable.set(22, '송종국');
hashTable.set(21, '박지성');
hashTable.set(5, '김남일');
hashTable.set(10, '이영표');
hashTable.set(8, '최태욱');
hashTable.set(9, '설기현');
hashTable.set(14, '이천수');

console.log(hashTable.get(4)); // 최진철
hashTable.remove(4);
console.log(hashTable.get(4)); // 이천수

for (let i = 0; i < hashTable.arr.length; i++) {
  let currentNode = hashTable.arr[i].head;
  while (currentNode) {
    console.log(currentNode.data.key, currentNode.data.value);
    currentNode = currentNode.next;
  }
}
