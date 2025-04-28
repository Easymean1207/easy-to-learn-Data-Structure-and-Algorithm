def power(base, exp):
    # 기저 조건
    if exp == 0:
        return 1
    # 재귀 부분
    return base * power(base, exp - 1)
