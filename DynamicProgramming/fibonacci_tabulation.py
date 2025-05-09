from fibonacci_memoization import Fibonacci, FibonacciMemoization
import time


def FibonacciTabulation(n):
    # 기저 조건
    if n == 0 or n == 1:
        return n

    # 테이블 초기화
    table = [0, 1]

    for i in range(2, n + 1):
        # 테이블에 이전의 두 값의 합을 저장
        table.append(table[i - 1] + table[i - 2])

    # n번째 피보나치 수를 반환
    return table[n]


start = time.time()
print(FibonacciTabulation(40))
end = time.time()
print(f"타뷸레이션 피보나치 실행시간: {end - start}sec")
