import { BinaryTree } from './binaryTree.mjs';

class Heap {
  constructor() {
    this.root = null;
    this.lastInsertedNode = null;
  }

  // 데이터 삽입
  insert(data) {
    // 1. 데이터를 최초로 삽입하는 경우
    if (this.lastInsertedNode === null) {
      this.lastInsertedNode = new BinaryTree(data);
      this.root = this.lastInsertedNode;
      return;
    }

    // 2. 데이터가 이미 존재하는 경우
    let insertingParentNode = this.getInsertingParent(); // 새로 삽입될 노드의 부모노드를 찾음
    let newNode = new BinaryTree(data);

    // 새로운 노드 삽입
    if (insertingParentNode.getLeftSubTree() === null) { // 왼쪽 자식노드가 비어있는 경우
      insertingParentNode.setLeftSubTree(newNode); // 새 노드를 왼쪽 자식으로 연결
    } else if (insertingParentNode.getRightSubTree() === null) { // 오른쪽 자식노드가 비어있는 경우
      insertingParentNode.setRightSubTree(newNode); // 새 노드를 오른쪽 자식으로 연결
    }
    newNode.setParent(insertingParentNode); // 새 노드의 부모노드 설정
    this.lastInsertedNode = newNode; // 마지막으로 삽입된 노드 업데이트

    // 새로운 노드의 자리 찾기
    while (newNode.getParent() !== null) { // 루트 노드에 도달할 때까지 반복
      if (this.isSmall(newNode.getData(), newNode.getParent().getData()) == true) { // 삽입된 노드가 부모 노드보다 작은 경우
        // 데이터 교환
        let newNodeData = newNode.getData();
        let parentData = newNode.getParent().getData();
        newNode.getParent().setData(newNodeData);
        newNode.setData(parentData);
        
        newNode = newNode.getParent(); // 한 단계 위로 이동
      } else { // 삽입된 노드가 부모 노드보다 크거나 같은 경우
        break; // 자리를 찾았으므로 종료
      }
    }
  }

  // 최소 힙 우선순위 비교 함수
  isSmall(newData, parentData) { // 최소 힙
    return newData.priority < parentData.priority;
  }

  // 최대 힙 우선순위 비교 함수
  isBig(newData, parentData) { // 최대 힙
    return newData.priority > parentData.priority;
  }

  // 마지막으로 삽입된 노드의 부모 노드를 찾는 함수
  getInsertingParent() {
    // 1. lastInsertedNode가 루트 노드인 경우(루트노드가 부모인 경우)
    if (this.lastInsertedNode.getParent() === null) {
        return this.root; // 루트노드가 부모노드이므로 루트노드 반환
    }
    
    // 2. lastInsertedNode가 부모노드의 왼쪽 자식인 경우
    else if(this.lastInsertedNode.getParent().getLeftSubTree() === this.lastInsertedNode){
        return this.lastInsertedNode.getParent(); // lastInsertedNode의 부모노드 반환
    }

    // 3. lastInsertedNode가 부모노드의 오른쪽 자식인 경우
    else if(this.lastInsertedNode.getParent().getRightSubTree() === this.lastInsertedNode){
        let currentNode = this.lastInsertedNode;
        let firstRightSiblingNode = null; // 상위노드 중에서 처음으로 존재하는 오른쪽 형제 노드
        
        while(currentNode.getParent() !== this.root){ // 최대, 루트노드의 자식 노드까지 반복
            currentNode = currentNode.getParent();
            firstRightSiblingNode = this.getRightSibling(currentNode);
            
            if(firstRightSiblingNode !== null){ // 처음으로 존재하는 오른쪽 형제 노드를 찾은 경우
                break;
            }
        } // while문 탈출 시, firstRightSiblingNode가 존재하지 않거나 찾은 경우만 존재
        
        // 3-1. lastInsertedNode의 상위노드 중에서 오른쪽 형제노드가 존재하는 경우
        if(firstRightSiblingNode !== null){
            while(firstRightSiblingNode.getLeftSubTree() !== null){ // firstRightSiblingNode의 왼쪽 자식 노드가 존재하는 동안 반복
                firstRightSiblingNode = firstRightSiblingNode.getLeftSubTree();
            }
            return firstRightSiblingNode; // 가장 왼쪽에 있는 노드 반환
        }

        // 3-2. lastInsertedNode의 상위노드 중에서 오른쪽 형제노드가 존재하지 않는 경우
        else{
            currentNode = this.root;
            while(currentNode.getLeftSubTree() !== null){ // currentNode의 왼쪽 자식 노드가 존재하는 동안 반복
                currentNode = currentNode.getLeftSubTree();
            }
            return currentNode; // 가장 왼쪽에 있는 노드 반환
        }
    }
  }

  // 왼쪽 형제 노드를 반환하는 함수
  getLeftSibling(node){ // node: 현재 노드
    if(node.getParent().getLeftSubTree() !== node){ // 현재 노드가 부모의 왼쪽 자식노드가 아니라면(오른쪽 자식노드라면)
        return node.getParent().getLeftSubTree();
    }
    return null; // 현재 노드가 부모 노드의 왼쪽 자식인 경우 null 리턴
  }

  // 오른쪽 형제 노드를 반환하는 함수
  getRightSibling(node){ // node: 현재 노드
    if(node.getParent().getRightSubTree() !== node){ // 현재 노드가 부모의 오른쪽 자식노드가 아니라면(왼쪽 자식노드라면)
        return node.getParent().getRightSubTree();
    }
    return null; // 현재 노드가 부모 노드의 오른쪽 자식인 경우 null 리턴
  }

  // 데이터 제거
  remove(){
    let deletedNode = null;
    
    // 1. 삭제할 노드가 루트 노드인 경우(노드가 하나만 있는 경우)
    if(this.lastInsertedNode === this.root){
        deletedNode = this.root;
        this.root = null;
        this.lastInsertedNode = null;
        return deletedNode;
    }

    // 2. 노드가 여러 개 있는 경우
    let prevLastInsertedNode = this.getNewLastInsertedNode(); // 마지막으로 삽입된 노드의 이전 노드 찾기
    // 루트 노드와 마지막으로 삽입된 노드의 데이터 교환
    let lastInsertedData = this.lastInsertedNode.getData();
    let rootData = this.root.getData();
    this.root.setData(lastInsertedData);
    this.lastInsertedNode.setData(rootData);

    // 마지막으로 삽입된 노드와 부모노드의 연결 끊기
    if(this.lastInsertedNode.getParent().getLeftSubTree() === this.lastInsertedNode){ // 마지막으로 삽입된 노드가 부모노드의 왼쪽 자식인 경우
        this.lastInsertedNode.getParent().setLeftSubTree(null); // 부모노드의 왼쪽 자식노드를 null로 설정
    }
    else if(this.lastInsertedNode.getParent().getRightSubTree() === this.lastInsertedNode){ // 마지막으로 삽입된 노드가 부모노드의 오른쪽 자식인 경우
        this.lastInsertedNode.getParent().setRightSubTree(null); // 부모노드의 오른쪽 자식노드를 null로 설정
    }
    this.lastInsertedNode.setParent(null); // 마지막으로 삽입된 노드의 부모노드를 null로 설정
    deletedNode = this.lastInsertedNode; // 삭제된 노드 설정
    this.lastInsertedNode = prevLastInsertedNode; // 마지막으로 삽입된 노드 업데이트

    // 루트노드에 있는 노드의 제자리를 찾기
    let currentNode = this.root;
    do{
        let higherChildNode = this.getHigherPriorityChild(currentNode.getLeftSubTree(), currentNode.getRightSubTree());
        
        if(higherChildNode === null) break; // 자식 노드가 없는 경우 종료
        else if(this.isSmall(higherChildNode.getData(), currentNode.getData())){ // 자식 노드가 현재 노드보다 우선순위가 높은 경우
            // 데이터 교환
            let currentData = currentNode.getData();
            let higherChildData = higherChildNode.getData();
            currentNode.setData(higherChildData);
            higherChildNode.setData(currentData);

            currentNode = higherChildNode; // 한 단계 아래로 이동
        }
        else{ // 자식 노드가 현재 노드보다 우선순위가 낮은 경우
            break; // 자리를 찾았으므로 종료
        }
    }
    while(currentNode.getLeftSubTree() !== null || currentNode.getRightSubTree() !== null) // 자식 노드가 하나라도 존재하는 동안 반복

    return deletedNode;
  }

  getNewLastInsertedNode(){
    let prevLastInsertedNode = null;

    // 1. lastInsertedNode가 부모노드의 왼쪽 자식인경우
    if(this.lastInsertedNode.getParent().getLeftSubTree() === this.lastInsertedNode){
        let currentNode = this.lastInsertedNode;
        let firstLeftSiblingNode = null; // 상위노드 중에서 처음으로 존재하는 왼쪽 형제 노드
        
        while(currentNode.getParent() !== this.root){ // 최대, 루트노드의 자식 노드까지 반복
            currentNode = currentNode.getParent();
            firstLeftSiblingNode = this.getLeftSibling(currentNode);
            
            if(firstLeftSiblingNode !== null){ // 처음으로 존재하는 왼쪽 형제 노드를 찾은 경우
                break;
            }
        } // while문 탈출 시, firstLeftSiblingNode가 존재하지 않거나 찾은 경우만 존재
        
        // 1-1. lastInsertedNode의 상위노드 중에서 왼쪽 형제노드가 존재하는 경우
        if(firstLeftSiblingNode !== null){
            while(firstLeftSiblingNode.getRightSubTree() !== null){ // firstLeftSiblingNode의 오른쪽 자식 노드가 존재하는 동안 반복
                firstLeftSiblingNode = firstLeftSiblingNode.getRightSubTree();
            }
            prevLastInsertedNode = firstLeftSiblingNode; // prevLastInsertedNode 업데이트
        }
        // 1-2. lastInsertedNode의 상위노드 중에서 왼쪽 형제노드가 존재하지 않는 경우
        else if(firstLeftSiblingNode === null){
            currentNode = this.root;
            while(currentNode.getRightSubTree() !== null){ // currentNode의 오른쪽 자식 노드가 존재하는 동안 반복
                currentNode = currentNode.getRightSubTree();
            }
            prevLastInsertedNode = currentNode; // prevLastInsertedNode 업데이트
        }
    }

    // 2. lastInsertedNode가 부모노드의 오른쪽 자식인경우
    else if(this.lastInsertedNode.getParent().getRightSubTree() === this.lastInsertedNode){
        prevLastInsertedNode = this.lastInsertedNode.getParent().getLeftSubTree(); // 부모노드의 왼쪽 자식노드로 prevLastInsertedNode 설정
    }
    
    return prevLastInsertedNode;
  }

  getHigherPriorityChild(leftChildNode, rightChildNode){
    if(leftChildNode === null) return rightChildNode; // 예외 처리
    else if(rightChildNode === null) return leftChildNode;

    return this.isSmall(leftChildNode.getData(), rightChildNode.getData()) ? leftChildNode : rightChildNode;
  }

}

class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
        this.priority = age;
    }
}

// let heap = new Heap();
// heap.insert(new Person('이타도리 유지', 15));
// heap.insert(new Person('고죠 사토루', 27));
// heap.insert(new Person('료멘 스쿠나', 1000));
// heap.insert(new Person('옷코츠 유타', 17));

// console.log(heap.root);
// heap.root.preOrderTraversal(heap.root);

export { Heap };