import { BinaryTree, RED, BLACK } from './binaryTree.mjs';

// Nil 노드 클래스
class NilNode extends BinaryTree{
  constructor(){
    super(-1);
    this.color = BLACK;
  }
}

class RedBlackTree {
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


  // LL 회전
  rotateLeft(node){ // node: 회전할 노드
    let parent = node.getParent(); // 노드의 부모
    let rightChild = node.getRightSubTree(); // 노드의 오른쪽 자식

    node.setRightSubTree(rightChild.getLeftSubTree()); // rightChild의 왼쪽 자식을 node의 오른쪽 자식으로 설정
    
    if (rightChild.getLeftSubTree() !== null) { // rightChild의 왼쪽 자식이 있다면
      rightChild.getLeftSubTree().setParent(node); // rightChild의 왼쪽 자식의 부모를 node로 설정
    }

    rightChild.setLeftSubTree(node); // node를 rightChild의 왼쪽 자식으로 설정
    node.setParent(rightChild); // node의 부모를 rightChild로 설정

    this.replaceParentsChild(parent, node, rightChild); // 부모와 자식 관계 재설정
  }


  // RR 회전
  rotateRight(node){ // node: 회전할 노드
    let parent = node.getParent(); // 노드의 부모
    let leftChild = node.getLeftSubTree(); // 노드의 왼쪽 자식

    node.setLeftSubTree(leftChild.getRightSubTree()); // leftChild의 오른쪽 자식을 node의 왼쪽 자식으로 설정

    if (leftChild.getRightSubTree() !== null) { // leftChild의 오른쪽 자식이 있다면
      leftChild.getRightSubTree().setParent(node); // leftChild의 오른쪽 자식의 부모를 node로 설정
    }

    leftChild.setRightSubTree(node); // node를 leftChild의 오른쪽 자식으로 설정
    node.setParent(leftChild); // node의 부모를 leftChild로 설정

    this.replaceParentsChild(parent, node, leftChild); // 부모와 자식 관계 재설정
  }


  // 부모와 자식 노드의 관계를 재설정하는 함수
  replaceParentsChild(parent, oldChild, newChild){
    if (parent === null) { // oldChild가 루트 노드인 경우
      this.root = newChild; // 루트 노드를 newChild로 설정
    }
    else if (parent.getLeftSubTree() === oldChild) { // parent의 왼쪽 자식이 oldChild인 경우
      parent.setLeftSubTree(newChild); // parent의 왼쪽 자식을 newChild로 설정
    }

    else if (parent.getRightSubTree() === oldChild) { // parent의 오른쪽 자식이 oldChild인 경우
      parent.setRightSubTree(newChild); // parent의 오른쪽 자식을 newChild로 설정
    }

    if (newChild !== null) { // newChild가 존재하면
      newChild.setParent(parent); // newChild의 부모를 parent로 설정
    }
  }

  
  // 노드가 검은색인지 확인
  isBlack(node){ // 노드가 검은색 : NIL 노드 or 노드의 색이 검은색
    return node === null || node.color === BLACK; // NIL 노드이거나 노드의 색이 검은색인 경우 true 반환
  }


  // 데이터 삽입 (삽입 -> 색깔에 따라 균형 맞추기)
  insert(data){
    let currentNode = this.root;
    let parentNode = null;

    while(currentNode !== null){
      parentNode = currentNode;
      
      if(data < currentNode.getData()){
        currentNode = currentNode.getLeftSubTree();
      }
      else if(data > currentNode.getData()){
        currentNode = currentNode.getRightSubTree();
      }
      else{
        return; // 중복된 데이터는 허용하지 않음
      }
    }
    
    // while문을 빠져나온 후, parentNode는 삽입할 위치의 부모노드에 위치
    let newNode = new BinaryTree(data);

    if(parentNode === null){ // 부모노드가 없는 경우 (트리가 비어있는 경우)
      this.root = newNode;
    }
    else if(data < parentNode.getData()){ // 부모노드의 데이터보다 작은 경우
      parentNode.setLeftSubTree(newNode); // 부모노드의 왼쪽 자식으로 설정
    }
    else{ // 부모노드의 데이터보다 큰 경우
      parentNode.setRightSubTree(newNode); // 부모노드의 오른쪽 자식으로 설정
    }

    newNode.setParent(parentNode); // 삽입한 노드의 부모노드를 설정 (양방향 연결이기 때문)
    
    this.rebalanceAfterInsertion(newNode); // 삽입 후 균형 맞추기
  }


  // 삽입 후 균형 맞추기
  rebalanceAfterInsertion(node){
    let parentNode = node.getParent(); // 삽입한 노드의 부모노드

    // 1. 새로운 노드가 루트노드인 경우
    if(parentNode === null){
      node.color = BLACK;
      return;
    }

    // 부모노드가 검은색인 경우에는 함수 종료(아래의 경우들은 모두 부모노드가 빨간색인 경우)
    if(parentNode.color === BLACK){
      return;
    }

    // 2. 부모노드와 삼촌노드가 빨간색인 경우
    let uncleNode = this.getUncle(parentNode);
    let grandParentNode = parentNode.getParent();

    if(uncleNode !== null && uncleNode.color === RED){ // 삼촌노드가 (존재하고) 빨간색인 경우
      parentNode.color = BLACK; // 부모노드를 검은색으로 변경
      uncleNode.color = BLACK; // 삼촌노드를 검은색으로 변경
      grandParentNode.color = RED; // 할아버지노드를 빨간색으로 변경

      this.rebalanceAfterInsertion(grandParentNode); // 규칙 위반이 할아버지노드에서 발생할 수 있으므로 할아버지노드를 대상으로 재귀 호출
    }

    // 3. 부모노드는 빨간색, 삼촌노드는 검은색, 새로운 노드는 안쪽 손자인 경우
    else if(this.isBlack(uncleNode)){ // isBlack: 노드가 검은색이거나 null(NIL 노드)인지 확인
      if(parentNode === grandParentNode.getRightSubTree() && node === parentNode.getLeftSubTree()){ // R(오른쪽) - L(왼쪽)인 경우
        this.rotateRight(parentNode); // 부모노드를 오른쪽 회전
        this.rotateLeft(grandParentNode); // 할아버지 노드를 왼쪽 회전
        node.color = BLACK; // 새로운 노드를 검은색으로 변경
        grandParentNode.color = RED; // 할아버지 노드를 빨간색으로 변경
      }
      else if(parentNode === grandParentNode.getLeftSubTree() && node === parentNode.getRightSubTree()){ // L(왼쪽) - R(오른쪽)인 경우
        this.rotateLeft(parentNode); // 부모노드를 왼쪽 회전
        this.rotateRight(grandParentNode); // 할아버지 노드를 오른쪽 회전
        node.color = BLACK; // 새로운 노드를 검은색으로 변경
        grandParentNode.color = RED; // 할아버지 노드를 빨간색으로 변경
      }
    
    // 4. 부모노드는 빨간색, 삼촌노드는 검은색, 새로운 노드는 바깥쪽 손자인 경우
      else if(grandParentNode.getRightSubTree() === parentNode && parentNode.getRightSubTree() === node){ // R(오른쪽) - R(오른쪽)인 경우
        this.rotateLeft(grandParentNode); // 할아버지 노드를 왼쪽 회전
        parentNode.color = BLACK; // 부모노드를 검은색으로 변경
        grandParentNode.color = RED; // 할아버지 노드를 빨간색으로 변경
      }
      else if(grandParentNode.getLeftSubTree() === parentNode && parentNode.getLeftSubTree() === node){ // L(왼쪽) - L(왼쪽)인 경우
        this.rotateRight(grandParentNode); // 할아버지 노드를 오른쪽 회전
        parentNode.color = BLACK; // 부모노드를 검은색으로 변경
        grandParentNode.color = RED; // 할아버지 노드를 빨간색으로 변경
      }
    }
  }


  // 삼촌노드 반환
  getUncle(parentNode){
    let grandParentNode = parentNode.getParent();

    // 부모노드가 할아버지노드의 왼쪽 자식인 경우
    if(grandParentNode.getLeftSubTree() === parentNode){
      return grandParentNode.getRightSubTree(); // 삼촌 노드는 할아버지 노드의 오른쪽 자식
    }
    else if(grandParentNode.getRightSubTree() === parentNode){ // 부모노드가 할아버지노드의 오른쪽 자식인 경우
      return grandParentNode.getLeftSubTree(); // 삼촌노드는 할아버지노드의 왼쪽 자식
    }

    return null; // 할아버지노드가 없으면 삼촌노드도 없음
  }

  // 데이터 삭제 (제거 -> 색깔에 따라 균형 맞추기)
  remove(data){
    let currentNode = this.root;

    while(currentNode !== null && currentNode.getData() !== data){
      if(data < currentNode.getData()){
        currentNode = currentNode.getLeftSubTree();
      }
      else if (data > currentNode.getData()){
        currentNode = currentNode.getRightSubTree();
      }
    }

    // 삭제할 노드가 없는 경우 함수 종료
    if(currentNode === null) {
      return;
    }

    // 삭제할 노드가 있는 경우
    let fixupNode = null; // 대체 노드(or 후계자 노드의 자식 노드)
    let deletedNodeColor = RED; // 삭제된 노드의 색상(일단 빨간색으로 설정)

    // 자식 노드가 0개 또는 1개인 경우
    if(currentNode.getLeftSubTree() === null || currentNode.getRightSubTree() === null) {
      fixupNode = this.removeWithZeroOrOneChild(currentNode); // 노드 삭제 후, 새로운 자식 노드를 fixupNode에 저장
      deletedNodeColor = currentNode.color; // 삭제된 노드의 색상을 저장
    }

    // 자식 노드가 2개인 경우
    else{
      let successorNode = this.getBiggestNode(currentNode.getLeftSubTree()); // 후계자 노드 찾기 (왼쪽 서브트리에서 가장 큰 노드)
      currentNode.setData(successorNode.getData()); // 삭제할 노드의 데이터를 후계자 노드의 데이터로 대체
      fixupNode = this.removeWithZeroOrOneChild(successorNode); // 후계자 노드 삭제 후, 후계자 노드의 자식 노드를 fixupNode에 저장
      deletedNodeColor = successorNode.color; // 삭제된 노드의 색상을 저장
    }
      
    if(deletedNodeColor === BLACK){ // 삭제된 노드가 검은색인 경우 균형 맞추기 필요
      this.rebalanceAfterDeletion(fixupNode); // 균형 맞추기

      if(fixupNode instanceof NilNode){ // fixupNode가 NIL 노드인 경우
        this.replaceParentsChild(fixupNode.getParent(), fixupNode, null); // NIL 노드를 null로 다시 변경
      }
    }
  }


  // 자식 노드가 0개 또는 1개인 노드 삭제
  removeWithZeroOrOneChild(node){ // node: 삭제할 노드
    if(node.getLeftSubTree() !== null){ // 왼쪽 자식이 있는 경우 
      this.replaceParentsChild(node.getParent(), node, node.getLeftSubTree()); // 삭제할 노드의 부모 노드와 삭제할 노드의 왼쪽 자식을 연결
      return node.getLeftSubTree(); // 새로운 자식노드 반환
    }
    else if(node.getRightSubTree() !== null){ // 오른쪽 자식이 있는 경우
      this.replaceParentsChild(node.getParent(), node, node.getRightSubTree()); // 삭제할 노드의 부모 노드와 삭제할 노드의 오른쪽 자식을 연결
      return node.getRightSubTree(); // 새로운 자식노드 반환
    }
    else{ // 자식 노드가 없는 경우
      // 삭제할 노드가 검은색이라면 처리해야 할 로직이 복잡하므로 NilNode 클래스를 통해 다른 경우와 동일하게 처리
      let newChild = (node.color === BLACK) ? new NilNode() : null; // 삭제할 노드가 검은색이면 NIL 노드를 삽입, 빨간색이면 null 삽입
      this.replaceParentsChild(node.getParent(), node, newChild); // 삭제할 노드의 부모 노드와 새로운 자식노드(newChild)를 연결
      return newChild; // 새로운 자식노드(newChild) 반환
    }
  }


  // (왼쪽 서브트리에서) 가장 큰 노드 찾기
  getBiggestNode(node){
    while(node.getRightSubTree() !== null){
      node = node.getRightSubTree();
    }

    return node;
  }


  // (오른쪽 서브트리에서) 가장 작은 노드 찾기
  getSmallestNode(node){
    while(node.getLeftSubTree() !== null){
      node = node.getLeftSubTree();
    }
    
    return node;
  }


  // 삭제 후 균형 맞추기
  rebalanceAfterDeletion(node){ // node: 대체 노드 (fixupNode)
    if(node === this.root){ // 대체 노드가 루트 노드인 경우
      node.color = BLACK; // 루트 노드는 검은색이어야 함
      return;
    }

    else{ // 대체 노드가 루트 노드가 아닌 경우 (5가지 경우 처리)
      let siblingNode = this.getSibling(node); // 형제 노드 찾기

      // 1. 형제노드가 빨간색인 경우
      if(siblingNode.color === RED){
        this.handleRedSibling(node, siblingNode);
        siblingNode = this.getSibling(node); // 회전 후 새로운 형제 노드 찾기
      }

      // 형제노드가 검은색인경우
      if(this.isBlack(siblingNode)){
        // 형제노드의 자식 노드들이 모두 검은색인 경우
        if(this.isBlack(siblingNode.getLeftSubTree()) && this.isBlack(siblingNode.getRightSubTree())){
          // 2. 부모 노드가 빨간색인 경우
          if(node.getParent().color === RED){
            siblingNode.color = RED; // 형제 노드를 빨간색으로 변경
            node.getParent().color = BLACK; // 부모 노드를 검은색으로 변경
          }
          // 3. 부모 노드가 검은색인 경우 
          else if(this.isBlack(node.getParent())){
            siblingNode.color = RED; // 형제 노드를 빨간색으로 변경
            node.getParent().color = BLACK; // 부모 노드를 검은색으로 변경
            this.rebalanceAfterDeletion(node.getParent()); // 레드-블랙 트리의 규칙을 위반할 가능성이 있으므로, 부모노드를 대상으로 재귀 호출
          }
        }
        //4,5. 형제노드의 자식 노드 중 적어도 하나가 빨간색인 경우
        else{
          this.handleBlackSiblingWithAtLeastOneRedChild(node, siblingNode);
        }
      }
    }
  }


  // 형제 노드 구하기
  getSibling(node){
    let parentNode = node.getParent();
    
    if(parentNode.getLeftSubTree() === node){ // 노드가 부모노드의 왼쪽 자식인 경우
      return parentNode.getRightSubTree(); // 형제노드는 부모노드의 오른쪽 자식
    }
    else if(parentNode.getRightSubTree() === node){ // 노드가 부모 노드의 오른쪽 자식인 경우
      return parentNode.getLeftSubTree(); // 형제노드는 부모노드의 왼쪽 자식
    }
  }


  // 형제 노드가 빨간색인 경우 처리
  handleRedSibling(node, siblingNode){ // node: 대체노드(fixupNode), sibling: 대체노드의 형제노드
    siblingNode.color = BLACK; // 형제 노드를 검은색으로 변경
    node.getParent().color = RED; // 부모 노드를 빨간색으로 변경

    if(node.getParent().getLeftSubTree() === node){ // 노드가 부모 노드의 왼쪽 자식인 경우
      this.rotateLeft(node.getParent()); // 부모 노드를 왼쪽으로 회전
    }
    else if(node.getParent().getRightSubTree() === node){ // 노드가 부모 노드의 오른쪽 자식인 경우
      this.rotateRight(node.getParent()); // 부모 노드를 오른쪽으로 회전
    }
  }

  
  // 형제 노드가 검은색이고 적어도 하나의 자식 노드가 빨간색인 경우 처리
  handleBlackSiblingWithAtLeastOneRedChild(node, siblingNode){ // node: 후계자 노드의 자식 노드 (fixupNode), sibling: 형제 노드
    // 4. 형제 노드가 검은색이고 형제의 두 자식 중 하나라도 빨간색 노드가 있고 바깥쪽 조카 노드가 검은색인 경우
    let nodeIsLeftChild = (node.getParent().getLeftSubTree() === node); // 노드가 부모 노드의 왼쪽 자식인지 여부 체크

    // 4-1. 노드가 왼쪽 자식이고 바깥쪽 조카노드(형제노드의 오른쪽 자식)가 검은색인 경우
    if(nodeIsLeftChild && this.isBlack(siblingNode.getRightSubTree())){
      siblingNode.getLeftSubTree().color = BLACK; // 안쪽 조카노드(형제노드의 왼쪽 자식)를 검은색으로 변경
      siblingNode.color = RED; // 형제노드를 빨간색으로 변경
      this.rotateRight(siblingNode); // 형제노드를 오른쪽으로 회전
      siblingNode = node.getParent().getRightSubTree(); // 새로운 형제 노드 설정
    }
    // 4-2. 노드가 오른쪽 자식이고 바깥쪽 조카노드(형제노드의 왼쪽 자식)가 검은색인 경우
    else if(!nodeIsLeftChild && this.isBlack(siblingNode.getLeftSubTree())){
      siblingNode.getRightSubTree().color = BLACK; // 안쪽 조카노드(형제노드의 오른쪽 자식)을 검은색으로 변경
      siblingNode.color = RED; // 형제 노드를 빨간색으로 변경
      this.rotateLeft(siblingNode); // 형제 노드를 왼쪽으로 회전
      siblingNode = node.getParent().getLeftSubTree(); // 새로운 형제 노드 설정
    }

    // 4번을 처리한 후의 결과로 5번의 케이스가 됨
    // 5. 형제 노드가 검은색이고 형제의 두 자식 중 하나라도 빨간색 노드가 있고 바깥쪽 조카 노드가 빨간색인 경우
    siblingNode.color = node.getParent().color; // 형제 노드의 색상을 부모 노드의 색상으로 변경
    node.getParent().color = BLACK; // 부모노드의 색을 검은색으로 변경
    
    // 5-1. 노드가 왼쪽 자식이고 바깥쪽 조카노드(형제노드의 오른쪽 자식)가 빨간색인 경우
    if(nodeIsLeftChild){ // 노드가 부모 노드의 왼쪽 자식인 경우
      siblingNode.getRightSubTree().color = BLACK; // 바깥쪽 조카노드(형제노드의 오른쪽 자식)을 검은색으로 변경
      this.rotateLeft(node.getParent()); // 부모 노드를 왼쪽으로 회전
    }
    
    // 5-2. 노드가 오른쪽 자식이고 바깥쪽 조카노드(형제노드의 왼쪽 자식)가 빨간색인 경우
    else{ // 노드가 부모 노드의 오른쪽 자식인 경우
      siblingNode.getLeftSubTree().color = BLACK; // 바깥쪽 조카노드(형제노드의 왼쪽 자식)을 검은색으로 변경
      this.rotateRight(node.getParent()); // 부모 노드를 오른쪽으로 회전
    }
  }

}

let rbTree = new RedBlackTree();
rbTree.insert(13);
rbTree.insert(9);
rbTree.insert(1);
rbTree.insert(15);
rbTree.insert(4);
rbTree.insert(17);
rbTree.insert(21);
rbTree.insert(2);

// console.log(rbTree.root);
console.log(rbTree.root.inOrderTraversal(rbTree.root));

rbTree.remove(15);
rbTree.remove(4);
rbTree.remove(9);

console.log('-----------');
// console.log(rbTree.root);
console.log(rbTree.root.inOrderTraversal(rbTree.root));

