import { HashSet } from './hashset.mjs';

let hashSet = new HashSet();

console.log(`${hashSet.isEmpty()}`); // true

console.log('===== 데이터 삽입 =====');
hashSet.add(1);
hashSet.add(1);
hashSet.add(2);
hashSet.add(3);
hashSet.add(4);

hashSet.printAll();
console.log(`isEmpty: ${hashSet.isEmpty()}`);

console.log('===== 데이터 체크1 =====');
console.log(`isContain(1): ${hashSet.isContain(1)}`);
console.log(`isContain(2): ${hashSet.isContain(2)}`);

console.log('===== 데이터 제거 =====');
hashSet.remove(1);
hashSet.printAll();
console.log(`isEmpty: ${hashSet.isEmpty()}`);

console.log('===== 데이터 체크2 =====');
console.log(`isContain(1): ${hashSet.isContain(1)}`);

console.log('===== clear =====');
hashSet.clear();
hashSet.printAll();
console.log(`isEmpty: ${hashSet.isEmpty()}`);
