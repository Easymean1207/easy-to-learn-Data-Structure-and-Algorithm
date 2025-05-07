def QuickSort(arr, left, right):
    # 기저 조건
    if left <= right:
        # divide()는 피벗의 위치를 반환
        pivot = divide(arr, left, right)

        # 피벗 기준 왼쪽 영역
        QuickSort(arr, left, pivot - 1)

        # 피벗 기준 오른쪽 영역 정렬
        QuickSort(arr, pivot + 1, right)


def divide(arr, left, right):
    # pivot: 비교 기준을 위한 기준값 (비교용)
    # arr[left]: 피벗 교체시 실제 rightStartIndex와 교환할 값(교환 대상)
    # 피벗을 첫번재 요소로 설정
    pivot = arr[left]

    leftStartIndex = left + 1
    rightStartIndex = right

    while leftStartIndex <= rightStartIndex:
        # leftStartIndex: 배열의 범위 안에서 피벗보다 큰 값을 찾을 때까지 이동
        while leftStartIndex <= right and arr[leftStartIndex] <= pivot:
            leftStartIndex += 1

        # rightStartIndex: 배열의 범위 안에서 피벗보다 작은 값을 찾을 때까지 이동
        while rightStartIndex >= left + 1 and arr[rightStartIndex] >= pivot:
            rightStartIndex -= 1

        # leftStartIndex와 rightStartIndex가 서로 지나치지 않은 경우
        if leftStartIndex <= rightStartIndex:
            # 값을 교환
            arr[leftStartIndex], arr[rightStartIndex] = (
                arr[rightStartIndex],
                arr[leftStartIndex],
            )

    # 피벗(arr[left])과 rightStartIndex의 값을 교환
    arr[left], arr[rightStartIndex] = arr[rightStartIndex], arr[left]

    # 새로운 피벗의 위치를 반환
    return rightStartIndex


arr = [3, 5, 10, 2, 4, 1, 7, 8, 9, 6, 11]
print(f"정렬 전: {arr}")

QuickSort(arr, 0, len(arr) - 1)
print(f"정렬 후: {arr}")
