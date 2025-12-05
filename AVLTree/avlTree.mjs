import { BinaryTree } from './binaryTree.mjs';

class AVLTree {
  constructor(rootNode = null) {
    this.root = rootNode;
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

  // 노드의 높이를 반환하는 함수
  getHeight(node) {
    if (node === null) {
      return 0;
    } else {
      return node.height;
    }
  }

  // 노드의 높이를 갱신하는 함수
  updateHeight(node) {
    let leftChildHeight = this.getHeight(node.getLeftSubTree()); // 왼쪽 자식 노드의 높이
    let rightChildHeight = this.getHeight(node.getRightSubTree()); // 오른쪽 자식 노드의 높이
    node.height = Math.max(leftChildHeight, rightChildHeight) + 1; // 둘 중 큰 값에 node 자신을 더한 값으로 높이 갱신
  }

  // 균형 인수를 계산하는 함수
  getBalanceFactor(node) {
    let leftChildHeight = this.getHeight(node.getLeftSubTree());
    let rightChildHeight = this.getHeight(node.getRightSubTree());
    return leftChildHeight - rightChildHeight; // 균형 인수 계산
  }

  // LL 회전 함수
  rotateLeft(node) {
    let childNode = node.getRightSubTree();
    node.setRightSubTree(childNode.getLeftSubTree()); // childNode의 왼쪽 자식 노드가 있을 경우, node의 오른쪽 자식으로 변경하여 childNode의 자식 노드 유지
    childNode.setLeftSubTree(node); // node를 childNode의 왼쪽 자식으로 변경

    // 회전과 관련된 노드들의 높이 갱신
    this.updateHeight(node); // node의 높이 갱신
    this.updateHeight(childNode); // childNode의 높이 갱신

    return childNode; // 회전 후 새로운 루트 노드 반환
  }

  // RR 회전 함수
  rotateRight(node) {
    let childNode = node.getLeftSubTree();
    node.setLeftSubTree(childNode.getRightSubTree()); // childNode의 오른쪽 자식 노드가 있을 경우, node의 왼쪽 자식으로 변경하여 childNode의 자식 노드 유지
    childNode.setRightSubTree(node); // node를 childNode의 오른쪽 자식으로 변경
    
    // 회전과 관련된 노드들의 높이 갱신
    this.updateHeight(node); // node의 높이 갱신
    this.updateHeight(childNode); // childNode의 높이 갱신

    return childNode; // 회전 후 새로운 루트 노드 반환
  }

  // 상황에 따라 회전을 수행하는 함수(LL/RR/LR/RL)
  rotation(targetNode, data){
    // 균형 인수 계산
    let balanceFactor = this.getBalanceFactor(targetNode);
    
    // 회전하려는 노드가 루트 노드인지 확인
    let isRootNode = false;
    if(targetNode === this.root){
      isRootNode = true;
    }

    // LL 회전 (균형 인수가 -1보다 작고, 오른쪽으로만 치우친 경우)
    if (balanceFactor < -1 && data > targetNode.getRightSubTree().getData()){
      targetNode = this.rotateLeft(targetNode); // LL 회전 수행 후, 바뀐 루트 노드를 targetNode에 저장
    }

    // RR 회전 (균형 인수가 1보다 크고, 왼쪽으로만 치우친 경우)
    else if (balanceFactor > 1 && data < targetNode.getLeftSubTree().getData()){
      targetNode = this.rotateRight(targetNode); // RR 회전 수행 후, 바뀐 루트 노드를 targetNode에 저장
    }

    // LR 회전 (LL회전을 제외한 균형 인수가 1보다 큰 경우)
    else if(balanceFactor > 1 && data > targetNode.getLeftSubTree().getData()){
      targetNode.setLeftSubTree(this.rotateLeft(targetNode.getLeftSubTree())); // 왼쪽 자식 노드에 대해 LL 회전 수행 -> targetNode의 왼쪽 자식 노드 재설정
      targetNode = this.rotateRight(targetNode); // RR 회전 수행 후, 바뀐 루트 노드를 targetNode에 저장
    }

    // RL 회전 (RR회전을 제외한 균형 인수가 -1보다 작은 경우)
    else if(balanceFactor < -1 && data < targetNode.getRightSubTree().getData()){
      targetNode.setRightSubTree(this.rotateRight(targetNode.getRightSubTree())); // 오른쪽 자식 노드에 대해 RR 회전 수행 -> targetNode의 오른쪽 자식 노드 재설정
      targetNode = this.rotateLeft(targetNode); // LL 회전 수행 후, 바뀐 루트 노드를 targetNode에 저장
    }

    // 회전한 노드가 루트 노드인 경우, 트리의 루트 노드 갱신
    if(isRootNode){
      this.root = targetNode;
    }
    
    return targetNode; // 회전 후의 노드 반환(바뀐 노드)
  }

  // 균형을 무너뜨리는 노드를 찾는 함수
  getUnBalanceNode(targetRootNode, unBalancedNode = null) {
    // 기저 조건: 해당 노드의 자식 노드가 없으면 종료
    if (targetRootNode.getLeftSubTree() === null && targetRootNode.getRightSubTree() === null) {
      unBalancedNode = targetRootNode; // 헤당 노드를 균형을 무너뜨리는 노드로 설정
      return unBalancedNode;
    }

    // 재귀 패턴: 찾는 노드가 균형을 무너뜨리는지 확인
    let balanceFactor = this.getBalanceFactor(targetRootNode);
    
    // 왼쪽 서브트리로 기운 경우
    if (balanceFactor > 0){
      unBalancedNode = this.getUnBalanceNode(targetRootNode.getLeftSubTree(), unBalancedNode);
    }
    // 오른쪽 서브트리로 기운 경우
    else if (balanceFactor < 0){
      unBalancedNode = this.getUnBalanceNode(targetRootNode.getRightSubTree(), unBalancedNode);
    }
    else{
      unBalancedNode = targetRootNode.getRightSubTree();
    }

    return unBalancedNode; // 균형을 무너뜨리는 노드 반환
  }

  // 데이터 삽입 함수
  /* 
    AVL 트리의 삽입에서 재귀 방식을 사용하는 이유:
      기존의 이진 탐색 트리의 방식대로 삽입하면, 상향식 접근으로 균형이 맞는 지 검사해야 하는데
      서브트리마다 높이를 다시 검사해야 하는 코드(반복문을 통해 루트 노드부터 삽입된 노드까지 높이를 모두 갱신)하는 코드는 매우 비효율적
      재귀 방식은 삽입 후, 재귀 호출이 끝나면서 자연스럽게 상향식 접근이 가능하여 각 노드의 높이를 갱신하고 균형을 맞출 수 있음
  */
  insert(targetRootNode, data){
    // 기저 조건: 삽입할 위치에 도달한 경우 or 최초로 삽입하는 경우
    if(targetRootNode === null){
      targetRootNode = new BinaryTree(data); // 새로운 노드 생성
    }

    if(this.root === null){
      this.root = targetRootNode; // 최초 삽입 시, 트리의 루트 노드로 설정
    }

    // 재귀 패턴: 데이터를 삽입할 위치를 탐색
    if (targetRootNode.getData() == data){
      return targetRootNode; // 중복된 데이터는 삽입하지 않음
    }else if (targetRootNode.getData() > data){ // 삽입할 데이터가 작으면 왼쪽 서브트리로 이동
      targetRootNode.setLeftSubTree(this.insert(targetRootNode.getLeftSubTree(), data)); // 왼쪽 서브트리를 대상으로 재귀 호출 -> 맞는 위치에 삽입 후, 왼쪽 자식노드로 연결 
    }
    else if (targetRootNode.getData() < data){ // 삽입할 데이터가 크면 오른쪽 서브트리로 이동
      targetRootNode.setRightSubTree(this.insert(targetRootNode.getRightSubTree(), data)); // 오른쪽 서브트리를 대상으로 재귀 호출 -> 맞는 위치에 삽입 후, 오른쪽 자식노드로 연결
    }

    // 높이 업데이트(가장 아래 노드가 먼저 업데이트, 루트 노드가 제일 마지막에 업데이트)
    this.updateHeight(targetRootNode);
    targetRootNode = this.rotation(targetRootNode, data); // 삽입 후, 균형이 무너졌다면 회전 수행하여 균형 맞추기

    return targetRootNode; // 삽입 후의 노드 반환
  }

  // 데이터 삭제 함수
  delete(targetRootNode, data, parentNode = null){
    if(targetRootNode.getData() > data && targetRootNode.getLeftSubTree() !== null){ // 삭제할 노드가 왼쪽 서브트리에 있는 경우
      targetRootNode.setLeftSubTree(this.delete(targetRootNode.getLeftSubTree(), data, targetRootNode)); // 왼쪽 서브트리를 대상으로 재귀 호출 -> 삭제 후, 삭제된 노드의 자식노드를 연결
    }
    else if(targetRootNode.getData() < data && targetRootNode.getRightSubTree() !== null){ // 삭제할 노드가 오른쪽 서브트리에 있는 경우
      targetRootNode.setRightSubTree(this.delete(targetRootNode.getRightSubTree(), data, targetRootNode)); // 오른쪽 서브트리를 대상으로 재귀 호출 -> 삭제 후, 삭제된 노드의 오른쪽 자식노드를 연결
    }
    else if(targetRootNode.getData() === data){ // 삭제할 노드를 찾은 경우 (기저 조건)
      targetRootNode = this.removeHelper(targetRootNode,parentNode); // 노드 삭제

      // 루트 노드를 삭제하는 경우 (기저 조건2)
      if(parentNode == null && targetRootNode != null){
        this.updateHeight(targetRootNode);
        let unBalancedNode = this.getUnBalanceNode(targetRootNode); // insert 함수는 삽입되는 노드가 균형을 무너뜨리지만, delete 함수에서는 그것을 찾아야 함
        targetRootNode = this.rotation(targetRootNode, unBalancedNode.getData()); // 삭제 후, 균형이 무너졌다면 회전 수행하여 균형 맞추기
      }
      return targetRootNode; // 삭제 후의 노드 반환
    }

    // 높이 업데이트(가장 아래 노드가 먼저 업데이트, 루트 노드가 제일 마지막에 업데이트)
    this.updateHeight(targetRootNode);
    
    // 회전 관련 처리
    let unBalancedNode = this.getUnBalanceNode(targetRootNode); // insert 함수는 삽입되는 노드가 균형을 무너뜨리지만, delete 함수에서는 그것을 찾아야 함
    targetRootNode = this.rotation(targetRootNode, unBalancedNode.getData()); // 삭제 후, 균형이 무너졌다면 회전 수행하여 균형 맞추기

    return targetRootNode; // 삭제 후의 노드 반환
  }

  removeHelper(deletedNode, parentNode){
    let fakeRootParent = new BinaryTree(-1); // 루트 노드도 다른 노드와 동일하게 처리하기 위해 루트 노드의 가짜 부모 노드 생성
    fakeRootParent.setRightSubTree(this.root); // 왼쪽이든 오른쪽이든 상관없음

    if(parentNode == null){
      parentNode = fakeRootParent;
    }

    let deletedNodeChild = null; // 삭제할 노드의 자식 노드

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

        deletedNodeChild = deletedNode;
    }

    // 루트 노드가 변경된 경우 처리
    if (fakeRootParent.getRightSubTree() !== this.root) {
        this.root = fakeRootParent.getRightSubTree(); // 새로운 루트 노드로 설정(가짜 루트의 오른쪽 자식)
    }

    // 아래의 return은 선택사항
    return deletedNodeChild; // 삭제된 노드 반환
  }
}


let avl = new AVLTree();
console.log('====== insert =======');
avl.insert(avl.root, 1);
avl.insert(avl.root, 2);
avl.insert(avl.root, 3);
avl.insert(avl.root, 4);
avl.insert(avl.root, 5);
avl.insert(avl.root, 6);
avl.insert(avl.root, 7);
console.log('root node:', avl.root);
console.log('중위 순회');
avl.root.inOrderTraversal(avl.root);

console.log('====== delete =======');
avl.delete(avl.root, 2);
avl.delete(avl.root, 3);
avl.delete(avl.root, 1);
console.log('root node:', avl.root);
console.log('중위 순회');
avl.root.inOrderTraversal(avl.root);

console.log('====== search =======');
console.log(avl.search(5));
console.log(avl.search(7));



