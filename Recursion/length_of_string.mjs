function strLength(arr) {
  if (arr.length == 1) return 1;
  return 1 + strLength(arr.slice(0, -1));
}

const str = 'Hello!';
console.log(strLength(str));
