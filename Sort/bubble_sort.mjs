function BubbleSort(arr) {
  // i: 현재 정렬 회차
  for (let i = 0; i < arr.length - 1; i++) {
    // j: 현재 비교 중인 위치의 인덱스
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // destructuring(구조 분해 문법)을 이용한 swap (이 방법을 추천함)
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        /*
        기존의 swap 방법
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp; 
         */
      }
    }
  }
}

let arr = [5, 3, 8, 4, 2];
BubbleSort(arr);

console.log(arr);
