function MergeSort(arr, leftIndex, rightIndex) {
  if (leftIndex < rightIndex) {
    // 중앙 인덱스 계산
    let midIndex = Math.floor((leftIndex + rightIndex) / 2);
    // 왼쪽 절반 정렬(왼쪽 시작 ~ 중앙)
    MergeSort(arr, leftIndex, midIndex);

    // 오른쪽 절반 정렬(중앙+1 ~ 오른쪽 끝)
    MergeSort(arr, midIndex + 1, rightIndex);

    // 정렬된 두 영역 병합
    Merge(arr, leftIndex, midIndex, rightIndex);
  }
}

function Merge(arr, leftIndex, midIndex, rightIndex) {
  // 왼쪽 영역의 시작 인덱스
  let leftAreaIndex = leftIndex;
  // 오른쪽 영역의 시작 인덱스
  let rightAreaIndex = midIndex + 1;

  // 값을 저장할 임시 배열
  let tempArr = [];
  // 임시 배열의 시작 인덱스
  let tempArrIndex = leftIndex;

  // 왼쪽 영역과 오른쪽 영역을 비교하여 작은 값을 임시 배열에 저장
  while (leftAreaIndex <= midIndex && rightAreaIndex <= rightIndex) {
    // 왼쪽 영역의 값이 더 작은 경우
    if (arr[leftAreaIndex] <= arr[rightAreaIndex]) {
      // 임시 배열에 왼쪽 영역의 값을 저장하고 tempArrIndex, leftAreaIndex를 증가
      tempArr[tempArrIndex] = arr[leftAreaIndex];
      leftAreaIndex++;
      tempArrIndex++;
    }
    
    // 오른쪽 영역의 값이 더 작은 경우
    else {
      // 임시 배열에 오른쪽 영역의 값을 저장하고 tempArrIndex, rightAreaIndex를 증가
      tempArr[tempArrIndex] = arr[rightAreaIndex];
      rightAreaIndex++;
      tempArrIndex++;
    }
  }

  // 왼쪽 병합이 먼저 끝났을 경우
  if (leftAreaIndex > midIndex) {
    // 오른쪽 영역의 값을 임시 배열에 저장
    for (let i = rightAreaIndex; i <= rightIndex; i++) {
      tempArr[tempArrIndex] = arr[i];
      tempArrIndex++;
    }
  }
  // 오른쪽 병합이 먼저 끝났을 경우
  else if (rightAreaIndex > rightIndex) {
    // 왼쪽 영역의 값을 임시 배열에 저장
    for (let i = leftAreaIndex; i <= midIndex; i++) {
      tempArr[tempArrIndex] = arr[i];
      tempArrIndex++;
    }
  }

  // 정렬된 임시 배열의 값을 원래 배열에 복사
  for (let i = leftIndex; i <= rightIndex; i++) {
    arr[i] = tempArr[i];
  }
}

let arr = [3, 5, 2, 4, 1, 7, 8, 6];
console.log(`정렬 전: ${arr}`);

MergeSort(arr, 0, arr.length - 1);
console.log(`정렬 후: ${arr}`);
