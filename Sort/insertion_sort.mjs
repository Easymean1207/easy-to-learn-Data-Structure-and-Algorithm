function InsertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let insertingValue = arr[i];
    // SortedLastIndex: 정렬된 부분의 마지막 인덱스
    let sortedLastIndex = i - 1;

    // for 문을 사용한 경우
    for (sortedLastIndex; sortedLastIndex >= 0; sortedLastIndex--) {
      // 배열
      if (arr[sortedLastIndex] > insertingValue) {
        arr[sortedLastIndex + 1] = arr[sortedLastIndex];
      } else {
        break;
      }
    }
    arr[sortedLastIndex + 1] = insertingValue;

    // // while 문을 사용한 경우
    // while (sortedLastIndex >= 0 && arr[sortedLastIndex] > insertingValue) {
    //   arr[sortedLastIndex + 1] = arr[sortedLastIndex];
    //   sortedLastIndex--;
    // }
    // arr[sortedLastIndex + 1] = insertingValue;
  }
}

let arr = [4, 1, 5, 3, 6, 2];
InsertionSort(arr);
console.log(arr);
