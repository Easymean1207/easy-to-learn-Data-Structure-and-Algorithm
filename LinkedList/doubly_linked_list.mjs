/* Node 클래스 생성 */
class Node {
  constructor(data, next = null, prev = null) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null; // 시작 노드를 가리키는 head
    this.tail = null; // 마지막 노드를 가리키는 tail
    this.count = 0; // 총 노드 개수를 저장하는 count
  }

  /**
   * 인덱스 삽입
   * @param {number} index
   * @param {any} data
   */
  insertAt(index, data) {
    // 인덱스가 최대 인덱스보다 크거나 혹은 음수인 경우 예외 처리
    if (index > this.count || index < 0) {
      throw new Error('삽입 가능한 인덱스 범위를 벗어났습니다.');
    }

    // 새로 삽입할 노드 생성
    let newNode = new Node(data);

    // 1. 새로 삽입되는 노드가 첫번째 노드(head)가 되는 경우
    if (index == 0) {
      newNode.next = this.head; // 새로운 노드의 next가 기존의 head(첫번째 노드)를 가리키도록 설정

      if (this.head != null) {
        // 기존 head가 존재하는 경우
        this.head.prev = newNode; // 기존 head의 prev가 새로운 노드를 가리키도록 설정
      }
      this.head = newNode; // 새로 삽입된 노드를 head로 설정
    }

    // 2. 새로 삽입되는 노드가 마지막 노드(tail)이 되는 경우
    else if (index == this.count) {
      newNode.next = null; // 새로운 노드의 next를 null로 설정
      newNode.prev = this.tail; // 새로운 노드의 prev가 기존 tail을 가리키도록 설정
      this.tail.next = newNode; // 기존 tail의 next가 새로운 노드를 가리키도록 설정
    }

    // 3. 중간에 삽입(head와 tail 사이)되는 경우
    else {
      let currentNode = this.head; // head에서부터 탐색 시작

      // 삽입 위치의 이전 노드까지 이동
      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }
      newNode.next = currentNode.next; // 새로운 노드의 next를 이전 노드의 next로 설정
      newNode.prev = currentNode; // 새로운 노드의 이전 노드를 currentNode로 설정
      currentNode.next = newNode; // 새로운 노드를 이전 노드의 next로 설정
      newNode.next.prev = newNode; // 새로운 노드의 다음 노드의 prev를 새로운 노드로 설정
    }

    // 새로운 노드를 tail로 설정
    if (newNode.next == null) {
      this.tail = newNode;
    }

    this.count++; // 노드 삽입으로 인해 노드 개수 증가
  }

  /**
   * 마지막 삽입
   * @param {any} data
   */
  insertLast(data) {
    this.insertAt(this.count, data);
  }

  /**
   * 인덱스 삭제
   * @param {number} index
   * @return {Node}
   */
  deleteAt(index) {
    // 인덱스가 최대 인덱스보다 크거나 혹은 음수인 경우 예외 처리
    if (index > this.count || index < 0) {
      throw new Error('제거 가능한 인덱스 범위를 벗어났습니다.');
    }

    let currentNode = this.head;

    // 1. 첫번째 노드(head)가 제거되는 경우
    if (index == 0) {
      let deleteNode = this.head; // 삭제할 노드
      // 데이터가 1개일 때
      if (this.head.next == null) {
        this.head = null;
        this.tail = null;
      }
      // 데이터가 2개 이상일 때
      else {
        this.head = this.head.next; // 기존 head의 다음 노드를 새로운 head로 설정
        this.head.prev = null; // 새로운 head의 이전 노드를 null로 설정
      }
      this.count--; // 노드 개수 감소
      return deleteNode; // 삭제된 노드 반환
    }

    // 2. 마지막 노드(tail)가 제거되는 경우
    else if (index == this.count - 1) {
      let deleteNode = this.tail; // 삭제할 노드
      // this.tail = this.tail.prev; // 기존 tail의 이전 노드를 새로운 tail로 설정
      // this.tail.next = null; // 새로운 tail의 다음 노드를 null로 설정

      this.tail.prev.next = null; // 기존 tail의 이전 노드의 다음 노드를 null로 설정
      this.tail = this.tail.prev; // 기존 tail의 이전 노드를 새로운 tail로 설정

      this.count--; // 노드 개수 감소
      return deleteNode; // 삭제된 노드 반환
    }

    // 3. 중간 노드(head와 tail 사이)가 제거되는 경우
    else {
      // 삭제할 노드의 이전 노드까지 이동
      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }
      let deleteNode = currentNode.next; // 삭제할 노드
      currentNode.next = currentNode.next.next; // 이전 노드의 다음 노드를 삭제할 노드의 다음 노드로 설정
      currentNode.next.prev = currentNode; // 삭제할 노드의 다음 노드의 이전 노드를 이전 노드로 설정
      this.count--; // 노드 개수 감소
      return deleteNode; // 삭제된 노드 반환
    }
  }

  /**
   * 마지막 삭제
   * @return {Node}
   */
  deleteLast() {
    return this.deleteAt(this.count - 1);
  }

  /**
   * 모든 데이터 제거
   *
   */
  clear() {
    this.head = null; // head를 null로 설정
    this.count = 0; // 노드 개수를 0으로 설정
  }

  /**
   * 인덱스 읽기
   * @param {number} index
   * @return {Node}
   */
  getNodeAt(index) {
    // 인덱스가 최대 인덱스보다 크거나 혹은 음수인 경우 예외 처리
    if (index > this.count || index < 0) {
      throw new Error('인덱스 범위를 벗어났습니다.');
    }
    let currentNode = this.head;

    // 인덱스 위치까지 이동
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }
    return currentNode; // 해당 노드 반환
  }

  /**
   * 모든 데이터 출력
   *
   */
  printAll() {
    let currentNode = this.head;
    let text = `[`;

    // head부터 노드 끝까지 탐색
    while (currentNode != null) {
      text += currentNode.data;
      currentNode = currentNode.next;

      if (currentNode != null) {
        text += `->`;
      }
    }

    text += `]`;
    console.log(text);
  }
}

export { Node, DoublyLinkedList };
