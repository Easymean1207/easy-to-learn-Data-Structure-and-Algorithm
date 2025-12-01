def BinarySearch(arr, target, start, end):
    # 기저 조건: 더 이상 배열을 쪼갤 수 없을 때
    if start > end:
        return None
    
    # 재귀 패턴: 중간 인덱스를 계산하고 타겟과 비교
    midIdx = (start + end) // 2

    if arr[midIdx] == target: # 타겟을 찾으면 타겟 리턴
        return midIdx
    elif arr[midIdx] > target: # 타겟이 중간 값보다 작으면 왼쪽 절반 탐색
        return BinarySearch(arr, target, start, midIdx - 1)
    else: # 타겟이 중간 값보다 크면 오른쪽 절반 탐색
        return BinarySearch(arr, target, midIdx + 1, end)
    

testArr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19,
    21, 23, 25, 27, 29, 31, 33, 35, 37, 39,
    41, 43, 45, 47, 49, 51, 53, 55, 57, 59,
    61, 63, 65, 67, 69, 71, 73, 75, 77, 79,
    81, 83, 85, 87, 89, 91, 93, 95, 97, 99]

target = BinarySearch(testArr, 79, 0, len(testArr) - 1)
print(f"target index:{target}, target value:{testArr[target]}")