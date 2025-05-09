function Fibonacci(n) {
  // 기저 조건
  if (n == 0 || n == 1) return n;
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

function FibonacciMemoization(n, memo) {
  // 기저 조건
  if (n == 0 || n == 1) return n;

  // 계산된 값이 없다면 계산 후, 값을 저장(memo)
  if (memo[n] == null) {
    memo[n] =
      FibonacciMemoization(n - 1, memo) + FibonacciMemoization(n - 2, memo);
  }

  // 계산된 값이 있다면 저장된 값을 반환(use stored memo)
  return memo[n];
}

console.time('기존 피보나치 실행 시간');
console.log(Fibonacci(40));
console.timeEnd('기존 피보나치 실행 시간');

console.time('피보나치 메모이제이션 실행 시간');
console.log(FibonacciMemoization(40, {}));
console.timeEnd('피보나치 메모이제이션 실행 시간');

export { Fibonacci, FibonacciMemoization };
