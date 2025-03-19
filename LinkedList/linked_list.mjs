/* Node 클래스 생성 */
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null; // 시작 노드를 가리키는 head
    this.count = 0; // 총 노드 개수를 저장하는 count
  }

  /**
   * 인덱스 삽입
   * @param {number} index - 삽입할 위치
   * @param {any} data - 삽입할 데이터
   */
  insertAt(index, data) {
    // 인덱스가 최대 인덱스보다 크거나 혹은 음수인 경우 예외 처리
    if (index < 0 || index > this.count) {
      throw new Error('삽입 가능한 인덱스 범위를 벗어났습니다.');
    }

    // 새로 삽입할 노드 생성
    let newNode = new Node(data);

    // 1. 새로 삽입되는 노드가 첫번째 노드(head)가 되는 경우
    if (index == 0) {
      newNode.next = this.head; // 새로 삽입된 노드의 next가 기존의 head(첫번째 노드)를 가리키도록 설정
      this.head = newNode; // 새로 삽입된 노드를 head로 설정
    }

    // 2. head가 아닌 다른 노드에 삽입되는 경우
    else {
      // 순회용 변수 currentNode를 만들어 head에서부터 탐색 시작
      let currentNode = this.head;

      // 삽입 위치의 이전 노드까지 이동
      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }
      newNode.next = currentNode.next; // 새로운 노드의 next를 기존 위치의 노드로 설정
      currentNode.next = newNode; // 이전 노드의 next를 새로운 노드로 설정
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
   * @param {number} index - 삭제할 위치
   * @return {Node} - 삭제된 노드
   */
  deleteAt(index) {
    // 인덱스가 최대 인덱스보다 크거나 혹은 음수인 경우 예외 처리
    if (index < 0 || index >= this.count) {
      throw new Error('제거 가능한 인덱스 범위를 벗어났습니다.');
    }

    // 삭제할 노드의 위치를 찾기 위한 순회용 변수
    let currentNode = this.head;

    // 1. 첫번째 노드(head)가 제거되는 경우
    if (index == 0) {
      let deleteNode = this.head; // 삭제할 노드
      this.head = this.head.next; // head를 삭제할 노드의 다음 노드로 설정
      this.count--; // 노드 개수 감소
      return deleteNode; // 삭제된 노드 반환
    }

    // 2. head가 아닌 다른 노드가 제거되는 경우
    else {
      // 삭제할 노드의 이전 노드까지 이동
      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }
      let deleteNode = currentNode.next; // 삭제할 노드
      currentNode.next = deleteNode.next; // 이전 노드와 삭제할 노드의 다음 노드를 연결
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
   * 모든 데이터 출력
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

  /**
   * 모든 데이터 제거
   */
  clear() {
    this.head = null; // head를 null로 설정
    this.count = 0; // 노드 개수를 0으로 설정
  }

  /**
   * 인덱스 읽기
   * @param {number} index - 찾으려는 인덱스
   * @return {Node} - 해당 인덱스의 노드
   */
  getNodeAt(index) {
    // 인덱스가 최대 인덱스보다 크거나 혹은 음수인 경우 예외 처리
    if (index > this.count || index < 0) {
      throw new Error('인덱스 범위를 벗어났습니다.');
    }

    // 순회용 변수 currentNode 생성
    let currentNode = this.head;

    // 인덱스 위치까지 이동
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }

    // 해당 인덱스의 노드 리턴
    return currentNode;
  }
}

export { Node, LinkedList };
