def strlength(arr):
    # 기저 조건
    if len(arr) == 0:
        return 1
    # 재귀 부분
    return 1 + strlength(arr[0:-1])


str = "Hello!"
print(strlength(str))
