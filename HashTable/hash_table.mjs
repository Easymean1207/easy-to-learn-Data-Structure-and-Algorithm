import { DoublyLinkedList } from '../LinkedList/doubly_linked_list.mjs';

class HashData {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class HashTable {
  constructor() {
    // 해시 테이블 배열 생성
    this.arr = [];
    // 해시 테이블의 길이(인덱스) 제한 (0~9)
    for (let i = 0; i < 10; i++) {
      this.arr[i] = new DoublyLinkedList();
    }
  }

  /**
   * 해시 함수
   * @param {number} key
   * @returns {number} hashIndex
   */
  hashFunction(key) {
    return key % 10;
  }

  /**
   * 해시 테이블에 데이터 삽입
   * @param {number} key
   * @param {any} value
   */
  set(key, value) {
    // 해시함수의 결과값을 인덱스로 하는 연결리스트의 head에 데이터 삽입
    this.arr[this.hashFunction(key)].insertAt(0, new HashData(key, value));
  }

  /**
   * 해시 테이블에서 key에 해당하는 데이터 조회
   * @param {number} key
   * @returns {any} key에 해당하는 데이터
   */
  get(key) {
    // 해시함수의 결과값을 인덱스로 하는 연결리스트의 head를 현재 노드로 설정
    let currentNode = this.arr[this.hashFunction(key)].head;

    // currentNode로 연결리스트를 순회하며 key에 해당하는 value를 찾음
    while (currentNode) {
      if (currentNode.data.key == key) {
        return currentNode.data.value;
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  /**
   * 해시 테이블에서 key에 해당하는 데이터 삭제
   * @param {number} key
   * @returns {Node} 삭제된 데이터
   */
  remove(key) {
    // 해당 key의 인덱스 연결리스트를 가져옴
    let list = this.arr[this.hashFunction(key)];
    // 순회용 currentNode 설정
    let currentNode = list.head;
    // 연결리스트에서 삭제할 데이터의 인덱스 저장
    let deletedIndex = 0;

    // 연결리스트를 순회하며 key에 해당하는 연결리스트의 인덱스를 찾아 삭제
    while (currentNode) {
      if (currentNode.data.key == key) {
        return list.deleteAt(deletedIndex);
      }
      currentNode = currentNode.next;
      deletedIndex++;
    }
    return null;
  }
}

export { HashTable };
