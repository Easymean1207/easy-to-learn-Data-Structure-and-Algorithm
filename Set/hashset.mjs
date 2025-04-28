import { HashTable } from '../HashTable/hash_table.mjs';

class HashSet {
  constructor() {
    this.hashTable = new HashTable();
  }

  /**
   * 해시셋에 데이터를 추가
   * @param {*} data
   */
  add(data) {
    if (this.hashTable.get(data) == null) {
      this.hashTable.set(data, -1); // 해시 셋의 value에는 더미 데이터 -1 삽입
    }
  }

  /**
   * 해시셋에서 데이터 제거
   * @param {*} data
   * @returns {Node} 삭제된 데이터
   */
  remove(data) {
    return this.hashTable.remove(data);
  }

  /**
   * 해시셋에 데이터가 있는지 확인
   * @param {*} data
   * @returns {boolean}
   */
  isContain(data) {
    return this.hashTable.get(data) ? true : false;
  }

  /**
   * 해시셋의 모든 데이터를 제거
   */
  clear() {
    for (let i = 0; i < 10; i++) {
      this.hashTable.arr[i].clear();
    }
  }

  /**
   * 해시셋이 비어있는지 확인
   * @returns {boolean}
   */
  isEmpty() {
    let empty = true;
    for (let i = 0; i < 10; i++) {
      if (this.hashTable.arr[i].count > 0) {
        empty = false;
        break;
      }
    }

    return empty;
  }

  /**
   * 해시셋의 모든 데이터를 출력
   *
   */
  printAll() {
    for (let i = 0; i < this.hashTable.arr.length; i++) {
      let currentNode = this.hashTable.arr[i].head;

      while (currentNode) {
        console.log(currentNode.data.key);
        currentNode = currentNode.next;
      }
    }
  }
}

export { HashSet };
