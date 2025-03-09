import { DoublyLinkedList } from '../LinkedList/doubly_linked_list.mjs';

class Deque {
  constructor() {
    this.DoublyLinkedList = new DoublyLinkedList();
  }

  /**
   * head에 데이터 삽입
   * @param {any} data
   */
  addFirst(data) {
    this.DoublyLinkedList.insertAt(0, data);
  }

  /**
   * head에서 데이터 제거
   * @returns {Node}
   */
  removeFirst() {
    return this.DoublyLinkedList.deleteAt(0);
  }

  /**
   * tail에 데이터 삽입
   * @param {any} data
   */
  addLast(data) {
    this.DoublyLinkedList.insertLast(data);
  }

  /**
   * tail에서 데이터 제거
   * @returns {Node}
   */
  removeLast() {
    return this.DoublyLinkedList.deleteLast();
  }

  /**
   * 모든 데이터 출력
   *
   */
  printAll() {
    this.DoublyLinkedList.printAll();
  }

  /**
   * 덱이 비어있는지 확인
   * @returns {boolean}
   */
  isEmpty() {
    return this.DoublyLinkedList.count == 0 ? true : false;
  }
}

export { Deque };
