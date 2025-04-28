def factorial(number):
    # 기저 조건
    if number == 0 or number == 1:
        return 1
    # 재귀 부분
    return number * factorial(number - 1)


print(factorial(5))
