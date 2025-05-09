import { Fibonacci, FibonacciMemoization } from './fibonacci_memoization.mjs';

function FibonacciTabulation(n) {
  // 기저 조건
  if (n == 0 || n == 1) return n;

  // 계산 결과를 저장할 테이블 초기화
  let table = [0, 1];

  for (let i = 2; i <= n; i++) {
    // 테이블에 이전 두 값의 합을 저장
    table[i] = table[i - 1] + table[i - 2];
  }

  // n번째 피보나치 수 반환
  return table[n];
}

console.time('피보나치 타뷸레이션 실행 시간');
console.log(FibonacciTabulation(40));
console.timeEnd('피보나치 타뷸레이션 실행 시간');
