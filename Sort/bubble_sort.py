def BubbleSort(arr):
    # i: 현재 정렬 회차
    for i in range(len(arr) - 1):
        # j: 현재 비교 중인 위치의 인덱스
        for j in range(len(arr) - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]


arr = [5, 3, 8, 4, 2]
BubbleSort(arr)

print(arr)
