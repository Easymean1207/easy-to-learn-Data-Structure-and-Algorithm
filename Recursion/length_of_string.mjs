function strLength(arr) {
  // 기저 조건
  if (arr.length == 0) return 0;
  // 재귀 부분
  return 1 + strLength(arr.slice(0, -1));
}

const str = 'Hello!';
console.log(strLength(str));
