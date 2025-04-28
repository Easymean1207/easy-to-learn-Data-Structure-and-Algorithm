import { DoublyLinkedList } from '../LinkedList/doubly_linked_list.mjs';

class Queue {
  constructor() {
    this.DoublyLinkedList = new DoublyLinkedList();
  }

  /**
   * 큐에 데이터 삽입
   * @param {number} data
   */
  enqueue(data) {
    this.DoublyLinkedList.insertAt(0, data);
  }

  /**
   * 큐에서 데이터를 삭제하고 반환
   * @returns {Node}
   */
  dequeue() {
    try {
      return this.DoublyLinkedList.deleteLast();
    } catch (error) {
      return null;
    }
  }

  /**
   * 큐의 tail Node를 반환
   * @returns {Node}
   */
  front() {
    return this.DoublyLinkedList.tail;
  }

  /**
   * 큐가 비어있는지 확인
   * @returns {boolean}
   */
  isEmpty() {
    return this.DoublyLinkedList.count == 0 ? true : false;
  }
}

export { Queue };
