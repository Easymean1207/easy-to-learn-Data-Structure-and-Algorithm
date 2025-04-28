def sumArray(arr):
    # 기저 조건
    if len(arr) == 1:
        return arr[0]
    # 재귀 부분
    return arr[len(arr) - 1] + sumArray(arr[: len(arr) - 1])


arr = [1, 2, 3, 4, 5]

print(sumArray(arr))
