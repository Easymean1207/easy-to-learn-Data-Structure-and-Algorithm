function SelectionSort(arr) {
  // i: 현재 정렬 회차
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    // j: 현재 비교 중인 위치의 인덱스
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
}

let arr = [6, 3, 4, 1, 2, 5];
SelectionSort(arr);
console.log(arr);
