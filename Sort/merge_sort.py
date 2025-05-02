def MergeSort(arr, leftIndex, rightIndex):
    if leftIndex < rightIndex:
        # 중앙 인덱스 계산
        mid = (leftIndex + rightIndex) // 2
        # 왼쪽 절반 정렬(왼쪽 시작 ~ 중앙)
        MergeSort(arr, leftIndex, mid)

        # 오른쪽 절반 정렬(중앙 + 1 ~ 오른쪽 끝)
        MergeSort(arr, mid + 1, rightIndex)

        # 정렬된 두 영역 병합
        Merge(arr, leftIndex, mid, rightIndex)


def Merge(arr, leftIndex, midIndex, rightIndex):
    # 왼쪽 영역의 시작 인덱스
    leftAreaIndex = leftIndex

    # 오른쪽 영역의 시작 인덱스
    rightAreaIndex = midIndex + 1

    # 값을 저장할 임시 배열
    tempArr = []
    # 임시 배열의 시작 인덱스
    tempArrIndex = leftIndex

    # 왼쪽 영역과 오른쪽 영역을 비교하여 작은 값을 임시 배열에 저장
    while (leftAreaIndex <= midIndex) and (rightAreaIndex <= rightIndex):
        # 왼쪽 영역의 값이 더 작은 경우
        if arr[leftAreaIndex] <= arr[rightAreaIndex]:
            # 임시 배열에 왼쪽 영역의 값을 저장
            tempArr.append(arr[leftAreaIndex])
            leftAreaIndex += 1
            # tempArr[tempArrIndex] = arr[leftAreaIndex]
            # leftAreaIndex += 1
            # tempArrIndex += 1

        # 오른쪽 영역의 값이 더 작은 경우
        else:
            # 임시 배열에 오른쪽 영역의 값을 저장
            tempArr.append(arr[rightAreaIndex])
            rightAreaIndex += 1
            # tempArr[tempArrIndex] = arr[rightAreaIndex]
            # rightAreaIndex += 1
            # tempArrIndex += 1

    # 왼쪽 병합이 먼저 끝난 경우
    if leftAreaIndex > midIndex:
        # 오른쪽 영역의 값을 임시 배열에 저장
        for i in range(rightAreaIndex, rightIndex + 1):
            tempArr.append(arr[i])
            # tempArr[tempArrIndex] = arr[i]
            # tempArrIndex += 1

    # 오른쪽 병합이 먼저 끝난 경우
    elif rightAreaIndex > rightIndex:
        # 왼쪽 영역의 값을 임시 배열에 저장
        for i in range(leftAreaIndex, midIndex + 1):
            tempArr.append(arr[i])
            # tempArr[tempArrIndex] = arr[i]
            # tempArrIndex += 1

    # 정렬된 임시 배열을 원래 배열에 복사
    for i in range(leftIndex, rightIndex + 1):
        arr[i] = tempArr[i - leftIndex]
        # arr[i] = tempArr[i]


arr = [3, 5, 2, 4, 1, 7, 8, 6]
print(f"정렬 전: {arr}")

MergeSort(arr, 0, len(arr) - 1)
print(f"정렬 후: {arr}")
