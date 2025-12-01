import { BinaryTree } from '../Tree/binaryTree.mjs';

class BinarySearchTree {
  constructor(rootNode = null) {
    this.root = rootNode;
  }

  insert(data) {
    // 처음 삽입할 때
    if (this.root === null) {
      this.root = new BinaryTree(data);
      return;
    }

    // 그 외의 경우
    let currentNode = this.root;
    let parentNode = null; // 삽입할 위치의 부모 노드

    while (currentNode !== null) {
      parentNode = currentNode;

      if (data < currentNode.getData()) {
        currentNode = currentNode.getLeftSubTree();
      } else if (data > currentNode.getData()) {
        currentNode = currentNode.getRightSubTree();
      } else {
        // 중복된 데이터는 삽입하지 않음
        return;
      }
    }

    // 삽입할 위치에 도달
    let newNode = new BinaryTree(data);
    if (data < parentNode.getData()) {
      parentNode.setLeftSubTree(newNode);
    } else {
      parentNode.setRightSubTree(newNode);
    }
  }

  delete(targetData){
    let fakeRootParent = new BinaryTree(-1); // 루트 노드도 다른 노드와 동일하게 처리하기 위해 루트 노드의 가짜 부모 노드 생성
    let parentNode = fakeRootParent; // 삭제할 노드의 부모 노드
    let currentNode = this.root; // 현재 노드
    let deletedNode = null; // 삭제할 노드

    fakeRootParent.setRightSubTree(this.root); // 왼쪽이든 오른쪽이든 상관없음

    // 삭제할 노드를 탐색
    while (currentNode !== null && currentNode.getData() !== targetData) {
        parentNode = currentNode;

        // 현재 노드의 값이 타겟 값보다 크면 왼쪽 서브트리로 이동
        if (currentNode.getData() > targetData) {
            currentNode = currentNode.getLeftSubTree();
        }
        // 현재 노드의 값이 타겟 값보다 작으면 오른쪽 서브트리로 이동
        else if (currentNode.getData() < targetData) {
            currentNode = currentNode.getRightSubTree();
        }
    }

    // currentNode == null인 경우(삭제할 노드를 찾지 못한 경우)
    if (currentNode === null) {
        return;
    }

    // currentNode.getData() === targetData인 경우(삭제할 노드를 찾은 경우)
    deletedNode = currentNode; // 삭제할 노드를 현재 노드로 설정
    
    // 1. 터미널 노드 제거
    if (deletedNode.getLeftSubTree() === null && deletedNode.getRightSubTree() === null) {
        if(parentNode.getLeftSubTree() === deletedNode){ // 삭제할 노드가 부모 노드의 왼쪽 자식인 경우
            parentNode.removeLeftSubTree(); // 부모 노드의 왼쪽 자식 노드를 제거
        }
        else{ // 삭제할 노드가 부모 노드의 오른쪽 자식인 경우
            parentNode.removeRightSubTree(); // 부모 노드의 오른쪽 자식 노드를 제거
        }
    }

    // 2. 자식 노드가 하나인 노드 제거
    else if (deletedNode.getLeftSubTree() === null || deletedNode.getRightSubTree() === null) {
        let childNode; // 삭제할 노드의 자식 노드

        // (삭제할 노드의)자식 노드 설정
        if (deletedNode.getLeftSubTree() !== null) { // 삭제할 노드의 왼쪽 자식 노드가 존재하는 경우
            childNode = deletedNode.getLeftSubTree(); // 왼쪽 자식 노드를 자식 노드로 설정
        }
        else { // 삭제할 노드의 오른쪽 자식 노드가 존재하는 경우
            childNode = deletedNode.getRightSubTree(); // 오른쪽 자식 노드를 자식 노드로 설정
        }

        // (삭제할 노드의)부모 노드와 (삭제할 노드의)자식 노드 연결
        if(parentNode.getLeftSubTree() === deletedNode){ // 삭제할 노드가 부모 노드의 왼쪽 자식인 경우
            parentNode.setLeftSubTree(childNode); // 삭제할 노드의 자식 노드를 부모 노드의 왼쪽 자식으로 설정(연결)
        }
        else{ // 삭제할 노드가 부모 노드의 오른쪽 자식인 경우
            parentNode.setRightSubTree(childNode); // 삭제할 노드의 자식 노드를 부모 노드의 오른쪽 자식으로 설정(연결)
        }
    }

    // 3. 자식 노드가 두 개인 노드 제거
    // 삭제할 노드의 오른쪽 서브트리에서 가장 작은 값을 가진 노드를 새로운 중심 노드로 선택 or 
    // 삭제할 노드의 왼쪽 서브트리에서 가장 큰 값을 가진 노드를 새로운 중심 노드로 선택
    else {
        // 대체 노드로 삭제할 노드의 왼쪽 서브트리에서 가장 큰 값을 가진 노드를 선택하는 방법
        let replaceNode = deletedNode.getLeftSubTree();
        let replaceNodeParent = deletedNode; // 대체 노드의 부모 노드

        // 왼쪽 서브트리에서 가장 큰 값을 가진 노드를 탐색
        while (replaceNode.getRightSubTree() !== null){
            replaceNodeParent = replaceNode;
            replaceNode = replaceNode.getRightSubTree();
        }

        // 대체 노드를 찾음 + 삭제할 노드의 데이터 값을 대체 노드의 데이터 값으로 변경
        let deletedNodeData = deletedNode.getData(); // 삭제할 노드의 데이터 값
        deletedNode.setData(replaceNode.getData()); // 삭제할 노드의 데이터 값을 대체 노드의 데이터 값으로 변경

        // 대체 노드의 자식 노드와 대체 노드의 부모 노드 연결
        if(replaceNodeParent.getLeftSubTree() === replaceNode){ // 대체 노드가 부모 노드의 왼쪽 자식인 경우
            replaceNodeParent.setLeftSubTree(replaceNode.getLeftSubTree()); // 대체 노드(replace)의 왼쪽 자식 노드를 부모 노드(replaceParent)의 왼쪽 자식으로 설정
        }
        else{ // replaceNodeParent.getRightSubTree() === replaceNode -> 대체 노드가 부모 노드의 오른쪽 자식인 경우
            replaceNodeParent.setRightSubTree(replaceNode.getLeftSubTree()); // 대체 노드(replace)의 왼쪽 자식 노드를  부모 노드(replaceParent)의 오른쪽 자식으로 설정
        }

        /*
            보통 delete함수는 삭제된 노드를 리턴하지 않는다. void로 처리하거나 boolean을 통해 성공 여부를 확인한다.
            값 복사 + 링크 제거 방식이 포인터를 변경하는 방식보다 편하다.
            아래 2줄과 return문은 delete함수의 일반적인 구현과는 다소 어긋나지만 강의 코드에 있어 포함했다.
        */
        deletedNode = replaceNode; // 삭제할 노드 설정(원래 대체 노드의 위치로)
        deletedNode.setData(deletedNodeData); // 삭제할 노드의 데이터 값을 설정(원래 삭제할 노드의 데이터 값으로)
    }

    // 루트 노드가 변경된 경우 처리
    if (fakeRootParent.getRightSubTree() !== this.root) {
        this.root = fakeRootParent.getRightSubTree(); // 새로운 루트 노드로 설정(가짜 루트의 오른쪽 자식)
    }

    // 아래의 return은 선택사항 
    return deletedNode; // 삭제된 노드 반환
  }

  search(targetData) {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (targetData === currentNode.getData()) {
        return currentNode; // 데이터 발견
      } else if (targetData < currentNode.getData()) {
        // 데이터가 작으면 왼쪽 서브트리로 이동
        currentNode = currentNode.getLeftSubTree();
      } else {
        // 데이터가 크면 오른쪽 서브트리로 이동
        currentNode = currentNode.getRightSubTree();
      }
    }

    return null; // 데이터가 트리에 없는 경우
  }

  search2(targetData, currentNode = this.root) {
    // 기저 조건: 노드가 null이면 데이터가 없는 것
    if (currentNode === null) {
      return null;
    }

    if (targetData === currentNode.getData()) {
      return currentNode; // 데이터 발견
    } else if (targetData < currentNode.getData()) {
      // 데이터가 작으면 왼쪽 서브트리로 재귀 호출
      return this.search2(targetData, currentNode.getLeftSubTree());
    } else {
      // 데이터가 크면 오른쪽 서브트리로 재귀 호출
      return this.search2(targetData, currentNode.getRightSubTree());
    }
  }
}

let bst = new BinarySearchTree();
bst.insert(18);
bst.insert(15);
bst.insert(10);
bst.insert(6);
bst.insert(3);
bst.insert(8);
bst.insert(12);
bst.insert(11);
bst.insert(31);
bst.insert(27);
bst.insert(24);
bst.insert(20);
bst.insert(33);
bst.insert(35);
bst.insert(37);
bst.root.inOrderTraversal(bst.root);

console.time('Search 11');
console.log('Search 11:', bst.search(18));
console.timeEnd('Search 11');

console.log('-----------------------');

console.time('Search 11 (recursive)');
console.log('Search 11 (recursive):', bst.search2(18));
console.timeEnd('Search 11 (recursive)');

console.log('-----------------------');

bst.delete(10);
bst.root.inOrderTraversal(bst.root);