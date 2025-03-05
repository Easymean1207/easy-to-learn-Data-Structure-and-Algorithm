import { LinkedList } from '../LinkedList/linked_list.mjs';

class Stack {
  constructor() {
    this.LinkedList = new LinkedList();
  }

  /**
   * 스택에 데이터 삽입
   * @param {number} data
   */
  push(data) {
    this.LinkedList.insertAt(0, data);
  }
  /**
   * 스택에서 데이터를 삭제하고 반환환
   * @returns {Node}
   */
  pop() {
    try {
      return this.LinkedList.deleteAt(0);
    } catch (error) {
      return null;
    }
  }

  /**
   * 스택의 맨 위 데이터를 반환
   * @returns {Node}
   */
  peek() {
    return this.LinkedList.getNodeAt(0);
  }

  /**
   * 스택이 비어있는지 확인
   * @returns {boolean}
   */
  isEmpty() {
    return this.LinkedList.count == 0 ? true : false;
  }
}

export { Stack };
