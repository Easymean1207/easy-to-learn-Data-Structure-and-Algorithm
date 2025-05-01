def SelectionSort(arr):
    # i: 현재 정렬 회차
    for i in range(len(arr) - 1):
        minIndex = i
        # j: 현재 비교 중인 위치의 인덱스
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[minIndex]:
                minIndex = j
        arr[i], arr[minIndex] = arr[minIndex], arr[i]


arr = [6, 3, 4, 1, 2, 5]
SelectionSort(arr)
print(arr)
