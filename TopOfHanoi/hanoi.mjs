/**
 * @param {*} ringCount  원반 개수
 * @param {*} from 출발지 기둥
 * @param {*} to 임시 기둥
 * @param {*} temp 목적지 기둥
 * @returns
 */
function hanoi(ringCount, from, to, temp) {
  /* 종료(기저) 조건 */
  if (ringCount == 0) return;

  /* 재귀 조건 */
  // 기둥 A에 있는 원반 1,2를 B로 옮김
  hanoi(ringCount - 1, from, temp, to);
  // 기둥 A에 있는 원반 3을 C로 옮김
  console.log(`원반 ${ringCount}을(를) ${from}에서 ${to}로 이동`);

  // 기둥 B에 있는 원반 1,2을 C로 옮김
  // hanoi(ringCount - 1, temp, to, from);
}

hanoi(3, 'A', 'C', 'B');
