import time


def Fibonacci(n):
    # 기저 조건
    if n == 0 or n == 1:
        return n
    return Fibonacci(n - 1) + Fibonacci(n - 2)


def FibonacciMemoization(n, memo):
    # 기저 조건
    if n == 0 or n == 1:
        return n

    # 계산된 값이 없다면 계산 후, 값을 저장(memo)
    if n not in memo:
        memo[n] = FibonacciMemoization(n - 1, memo) + FibonacciMemoization(n - 2, memo)

    # 계산된 값이 있다면 저장된 값을 반환(use stored memo)
    return memo[n]


start = time.time()
print(Fibonacci(40))
end = time.time()
print(f"기존 피보나치 실행시간: {end - start}sec")

start = time.time()
print(FibonacciMemoization(40, {}))
end = time.time()
print(f"메모이제이션 피보나치 실행시간: {end - start}sec")
