function QuickSort(arr, left, right) {
  // 기저 조건
  if (left <= right) {
    // divide()는 피벗의 위치를 반환
    let pivot = divide(arr, left, right);

    // 피벗 기준 왼쪽 영역 정렬
    QuickSort(arr, left, pivot - 1);

    // 피벗 기준 오른쪽 영역
    QuickSort(arr, pivot + 1, right);
  }
}

function divide(arr, left, right) {
  // pivot: 비교 기준을 위한 기준값 (비교용)
  // arr[left]: 피벗 교체시 실제 rightStartIndex와 교환할 값(교환 대상)
  // 피벗을 첫번째 요소로 설정
  let pivot = arr[left];

  // 왼쪽과 오른쪽의 시작 인덱스 설정
  let leftStartIndex = left + 1;
  let rightStartIndex = right;

  while (leftStartIndex <= rightStartIndex) {
    // leftStartIndex: 배열의 범위 안에서 피벗보다 큰 값을 찾을 때까지 이동
    while (leftStartIndex <= right && arr[leftStartIndex] <= pivot) {
      leftStartIndex++;
    }
    // rightStartIndex: 배열의 범위 안에서 피벗보다 작은 값을 찾을 때까지 이동
    while (rightStartIndex >= left + 1 && arr[rightStartIndex] >= pivot) {
      rightStartIndex--;
    }

    // leftStartIndex와 rightStartIndex가 서로 지나치지 않은 경우
    if (leftStartIndex <= rightStartIndex) {
      // leftStartIndex, rightStartIndex 모두 이동을 멈췄으므로 값을 교환
      [arr[leftStartIndex], arr[rightStartIndex]] = [
        arr[rightStartIndex],
        arr[leftStartIndex],
      ];
    }
  }

  // 피벗(arr[left])과 rightStartIndex를 교환
  [arr[left], arr[rightStartIndex]] = [arr[rightStartIndex], arr[left]];

  // 새로운 피벗의 위치를 반환
  return rightStartIndex;
}

let arr = [3, 5, 10, 2, 4, 1, 7, 8, 9, 6, 11];
console.log(`정렬 전: [${arr}]`);

QuickSort(arr, 0, arr.length - 1);
console.log(`정렬 후: [${arr}]`);
