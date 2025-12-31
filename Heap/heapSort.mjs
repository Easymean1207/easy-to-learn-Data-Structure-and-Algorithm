import { Heap } from './heapForOthers.mjs';

class testData {
  constructor(data) {
    this.data = data;
    this.priority = data;
  }
}

let heap = new Heap(); // Heap 클래스는 최소 힙으로 구성되어있음
// 만약 최대 힙으로 변경하고 싶다면 heapForOthers.mjs 파일의
// isSmall의 정의를 제외한 나머지 부분을 isBig() 함수로 변경하면 됨

heap.insert(new testData(1));
heap.insert(new testData(5));
heap.insert(new testData(2));
heap.insert(new testData(7));
heap.insert(new testData(3));
heap.insert(new testData(4));
heap.insert(new testData(10));
heap.insert(new testData(8));
heap.insert(new testData(9));
heap.insert(new testData(6));

let arr = [];

while (heap.root !== null) {
  arr.push(heap.remove().getData().data);
}

console.log(arr); // 오름차순