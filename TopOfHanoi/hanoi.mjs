/**
 * @param {*} ringCount  원반 개수
 * @param {*} from 출발지 기둥
 * @param {*} to 목적지 기둥
 * @param {*} temp 임시 기둥
 * @returns
 */
function hanoi(ringCount, from, to, temp) {
  /* 종료(기저) 조건 */
  if (ringCount == 0) return;

  /* 재귀 조건 */
  /*
    첫 번째 하위 문제의 목표 : 원반 1,2를 A에서 B로 이동
    - 기둥 A에 있는 원반 1을 C로 옮김
    - 기둥 A에 있는 원반 2를 B로 옮김
    - 기둥 C에 있는 원반 1을 B로 옮김
    - 기둥 A에 있는 원반 3을 C로 옮김
  */
  hanoi(ringCount - 1, from, temp, to);
  console.log(`원반 ${ringCount}을(를) ${from}에서 ${to}로 이동`);

  /*
    두 번째 하위 문제의 목표: 원반 1,2를 B에서 C로 이동
    - 기둥 B에 있는 원반 1를 A로 이동
    - 기둥 B에 있는 원반 2를 C로 이동
    - 기둥 A에 있는 원반 1을 C로 이동
  */
  hanoi(ringCount - 1, temp, to, from);
}

// hanoi(3, 'A', 'C', 'B');
hanoi(4, 'A', 'C', 'B');
