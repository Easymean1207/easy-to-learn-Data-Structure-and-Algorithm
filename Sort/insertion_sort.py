def InsertionSort(arr):
    for i in range(1, len(arr)):
        insertingValue = arr[i]
        # SortedLastIndex: 정렬된 부분의 마지막 인덱스
        sortedLastIndex = i - 1

        # # for문을 사용한 경우
        # for j in range(sortedLastIndex, -1, -1):
        #     if arr[j] > insertingValue:
        #         arr[j + 1] = arr[j]
        #     else:
        #         break

        # arr[j + 1] = insertingValue
        # while문을 사용한 경우
        while sortedLastIndex >= 0 and arr[sortedLastIndex] > insertingValue:
            arr[sortedLastIndex + 1] = arr[sortedLastIndex]
            sortedLastIndex -= 1
        arr[sortedLastIndex + 1] = insertingValue


arr = [4, 1, 5, 3, 6, 2]
InsertionSort(arr)
print(arr)