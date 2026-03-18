// ============================================================
// ЦИКЛЫ: while и for
// ============================================================

// #001
for (let i = 1; i <= 10; i++) console.log(i);

// #002
let i = 1;
while (i <= 10) { console.log(i); i++; }

// #003
// do...while выполняется хотя бы 1 раз, даже если условие ложно сразу.
let x = 0;
do { console.log(x); x++; } while (x < 3);

// #004
let num;
do { num = Number(prompt("Введи число > 10")); } while (num <= 10);

// #005
for (let i = 1; i <= 10; i++) {
  if (i === 5) break;
  console.log(i);
}

// #006
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) continue;
  console.log(i);
}

// #007
for (let i = 10; i >= 1; i--) console.log(i);

// #008
let sum = 0;
for (let i = 1; i <= 100; i++) sum += i;
console.log(sum); // 5050

// #009
for (let i = 1; i <= 20; i += 2) console.log(i);

// #010
// Бесконечный цикл — условие всегда true. Прерывается через break.
while (true) {
  const val = Math.random();
  if (val > 0.9) break;
}

// #011
const arr11 = [10, 20, 30, 40];
for (const val of arr11) console.log(val);

// #012
const obj12 = { a: 1, b: 2, c: 3 };
for (const key in obj12) console.log(key, obj12[key]);

// #013
// for...of — значения итерируемого (массив, строка, Set, Map).
// for...in — ключи (индексы) объекта.

// #014
let count14 = 0;
for (const ch of "hello world") {
  if ("aeiou".includes(ch)) count14++;
}
console.log(count14); // 3

// #015
let prod = 1;
for (const n of [1, 2, 3, 4, 5]) prod *= n;
console.log(prod); // 120

// #016
const squares = [];
for (let i = 1; i <= 10; i++) squares.push(i * i);
console.log(squares);

// #017
for (let i = 1; i <= 10; i++) {
  for (let j = 1; j <= 10; j++) {
    console.log(`${i} × ${j} = ${i * j}`);
  }
}

// #018
function firstGreater(arr, n) {
  for (const el of arr) {
    if (el > n) return el;
  }
  return null;
}
console.log(firstGreater([1, 3, 5, 7], 4)); // 5

// #019
for (let i = 1; i <= 100; i++) {
  if (i % 15 === 0) console.log("FizzBuzz");
  else if (i % 3 === 0) console.log("Fizz");
  else if (i % 5 === 0) console.log("Buzz");
  else console.log(i);
}

// #020
function repeat(str, n) {
  let result = "";
  for (let i = 0; i < n; i++) result += str;
  return result;
}
console.log(repeat("ab", 3)); // ababab

// #021
function reverseStr(str) {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) result += str[i];
  return result;
}
console.log(reverseStr("hello")); // olleh

// #022
function maxEl(arr) {
  let max = arr[0];
  for (const n of arr) if (n > max) max = n;
  return max;
}
console.log(maxEl([3, 1, 9, 2, 7])); // 9

// #023
function removeDuplicates(arr) {
  const seen = [];
  for (const el of arr) {
    if (!seen.includes(el)) seen.push(el);
  }
  return seen;
}
console.log(removeDuplicates([1, 2, 2, 3, 1])); // [1, 2, 3]

// #024
function range(start, end, step = 1) {
  const result = [];
  for (let i = start; i < end; i += step) result.push(i);
  return result;
}
console.log(range(0, 10, 2)); // [0,2,4,6,8]

// #025
function isPalindrome(n) {
  const s = String(n);
  for (let i = 0; i < Math.floor(s.length / 2); i++) {
    if (s[i] !== s[s.length - 1 - i]) return false;
  }
  return true;
}
console.log(isPalindrome(121)); // true

// #026
function flattenOne(arr) {
  const result = [];
  for (const el of arr) {
    if (Array.isArray(el)) for (const sub of el) result.push(sub);
    else result.push(el);
  }
  return result;
}
console.log(flattenOne([1, [2, 3], [4, 5]])); // [1,2,3,4,5]

// #027
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) break outer;
    console.log(i, j);
  }
}

// #028
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
console.log(binarySearch([1, 3, 5, 7, 9], 7)); // 3

// #029
function countOccurrences(arr, val) {
  let count = 0;
  for (const el of arr) if (el === val) count++;
  return count;
}
console.log(countOccurrences([1, 2, 2, 3, 2], 2)); // 3

// #030
function uniqueWords(str) {
  const words = str.split(" ");
  const unique = [];
  for (const w of words) {
    if (!unique.includes(w)) unique.push(w);
  }
  return unique;
}
console.log(uniqueWords("hello world hello js")); // ["hello","world","js"]

// #031
function zip(a, b) {
  const result = [];
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) result.push([a[i], b[i]]);
  return result;
}
console.log(zip([1, 2, 3], ["a", "b", "c"])); // [[1,'a'],[2,'b'],[3,'c']]

// #032
for (let i = 1; i <= 5; i++) console.log("*".repeat(i));

// #033
function bubbleSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]];
    }
  }
  return a;
}
console.log(bubbleSort([5, 3, 8, 1, 2])); // [1,2,3,5,8]

// #034
function insertionSort(arr) {
  const a = [...arr];
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) { a[j + 1] = a[j]; j--; }
    a[j + 1] = key;
  }
  return a;
}
console.log(insertionSort([5, 3, 8, 1, 2])); // [1,2,3,5,8]

// #035
function fibonacci(n) {
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a;
}
console.log(fibonacci(10)); // 55

// #036
function flattenDeep(arr, depth = Infinity) {
  const stack = arr.map(el => [el, depth]);
  const result = [];
  while (stack.length) {
    const [el, d] = stack.pop();
    if (Array.isArray(el) && d > 0) {
      for (let i = el.length - 1; i >= 0; i--) stack.push([el[i], d - 1]);
    } else {
      result.push(el);
    }
  }
  return result;
}
console.log(flattenDeep([1, [2, [3, [4]]]])); // [1,2,3,4]

// #037
function sieve(n) {
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;
  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) isPrime[j] = false;
    }
  }
  return isPrime.reduce((acc, v, i) => (v ? [...acc, i] : acc), []);
}
console.log(sieve(30)); // [2,3,5,7,11,13,17,19,23,29]

// #038
function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
console.log(chunk([1, 2, 3, 4, 5], 2)); // [[1,2],[3,4],[5]]

// #039
function bfs(root) {
  const queue = [root];
  const result = [];
  while (queue.length) {
    const node = queue.shift();
    result.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}

// #040
function groupBy(arr, fn) {
  const result = {};
  for (const el of arr) {
    const key = fn(el);
    if (!result[key]) result[key] = [];
    result[key].push(el);
  }
  return result;
}
console.log(groupBy([1, 2, 3, 4], n => n % 2 === 0 ? "even" : "odd"));

// #041
function permutations(arr) {
  if (arr.length <= 1) return [arr];
  const result = [];
  const stack = [[[], arr]];
  while (stack.length) {
    const [current, remaining] = stack.pop();
    if (!remaining.length) { result.push(current); continue; }
    for (let i = 0; i < remaining.length; i++) {
      stack.push([
        [...current, remaining[i]],
        [...remaining.slice(0, i), ...remaining.slice(i + 1)]
      ]);
    }
  }
  return result;
}
console.log(permutations([1, 2, 3]));

// #042
function* fibGen() {
  let a = 0, b = 1;
  while (true) { yield a; [a, b] = [b, a + b]; }
}
const gen = fibGen();
for (let i = 0; i < 8; i++) console.log(gen.next().value); // 0,1,1,2,3,5,8,13

// #043
function longestUniqueSubstr(s) {
  let start = 0, maxLen = 0, maxStr = "";
  const seen = new Map();
  for (let end = 0; end < s.length; end++) {
    if (seen.has(s[end]) && seen.get(s[end]) >= start) {
      start = seen.get(s[end]) + 1;
    }
    seen.set(s[end], end);
    if (end - start + 1 > maxLen) {
      maxLen = end - start + 1;
      maxStr = s.slice(start, end + 1);
    }
  }
  return maxStr;
}
console.log(longestUniqueSubstr("abcabcbb")); // "abc"

// #044
function matMul(A, B) {
  const rows = A.length, cols = B[0].length, inner = B.length;
  const C = Array.from({ length: rows }, () => new Array(cols).fill(0));
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      for (let k = 0; k < inner; k++)
        C[i][j] += A[i][k] * B[k][j];
  return C;
}
console.log(matMul([[1, 2], [3, 4]], [[5, 6], [7, 8]]));

// #045
function throttle(fn, delay) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= delay) { last = now; return fn(...args); }
  };
}

// #046
function takeWhile(arr, predicate) {
  const result = [];
  for (const el of arr) { if (!predicate(el)) break; result.push(el); }
  return result;
}
function dropWhile(arr, predicate) {
  let i = 0;
  while (i < arr.length && predicate(arr[i])) i++;
  return arr.slice(i);
}
console.log(takeWhile([1, 2, 3, 4, 5], x => x < 4)); // [1,2,3]
console.log(dropWhile([1, 2, 3, 4, 5], x => x < 4)); // [4,5]

// #047
function dfs(graph, start) {
  const stack = [start], visited = new Set(), result = [];
  while (stack.length) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    result.push(node);
    for (const neighbor of (graph[node] || [])) stack.push(neighbor);
  }
  return result;
}

// #048
function slidingWindowMax(arr, k) {
  const result = [];
  for (let i = 0; i <= arr.length - k; i++) {
    let max = arr[i];
    for (let j = i + 1; j < i + k; j++) if (arr[j] > max) max = arr[j];
    result.push(max);
  }
  return result;
}
console.log(slidingWindowMax([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3,3,5,5,6,7]

// #049
function twoSum(arr, target) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(arr[i], i);
  }
  return null;
}
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]

// #050
// TCO — оптимизация хвостовых вызовов: последний вызов функции — сама себя.
// Рекурсию переписывают в цикл чтобы не переполнять стек.
function factIter(n) {
  let acc = 1;
  while (n > 1) { acc *= n; n--; }
  return acc;
}
console.log(factIter(10)); // 3628800

// #051
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
const memoFib = memoize(n => n <= 1 ? n : memoFib(n - 1) + memoFib(n - 2));
console.log(memoFib(30)); // 832040

// #052
function* rangeGen(start, end, step = 1) {
  for (let i = start; i < end; i += step) yield i;
}
for (const n of rangeGen(0, 10, 3)) console.log(n); // 0,3,6,9

// ============================================================
// КОНСТРУКЦИЯ switch
// ============================================================

// #053
function dayName(n) {
  switch (n) {
    case 1: return "Понедельник";
    case 2: return "Вторник";
    case 3: return "Среда";
    case 4: return "Четверг";
    case 5: return "Пятница";
    case 6: return "Суббота";
    case 7: return "Воскресенье";
    default: return "Неверный день";
  }
}
console.log(dayName(3)); // Среда

// #054
// Без break выполнение "проваливается" в следующий case (fallthrough).
switch (2) {
  case 1: console.log("один");
  case 2: console.log("два");
  case 3: console.log("три"); // выведет и это!
    break;
}

// #055
// default выполняется если ни один case не совпал. Необязателен, но рекомендуется.
switch ("x") {
  case "a": console.log("a"); break;
  default: console.log("ничего не совпало");
}

// #056
function grade(g) {
  switch (g) {
    case "A": return "Отлично";
    case "B": return "Хорошо";
    case "C": return "Удовл.";
    default: return "Неверно";
  }
}
console.log(grade("B")); // Хорошо

// #057
function isWeekend(day) {
  switch (day) {
    case "Saturday":
    case "Sunday":
      return true;
    default:
      return false;
  }
}
console.log(isWeekend("Sunday")); // true

// #058
function handleCommand(cmd) {
  switch (cmd) {
    case "start": return "Запуск";
    case "stop": return "Остановка";
    case "pause": return "Пауза";
    default: return "Неизвестная команда";
  }
}
console.log(handleCommand("stop")); // Остановка

// #059
// switch лучше if-else при сравнении одной переменной с множеством конкретных значений:
// чище, быстрее читается. if-else лучше для диапазонов и сложных условий.

// #060
function timeOfDay(h) {
  switch (true) {
    case h >= 0 && h <= 5: return "Ночь";
    case h >= 6 && h <= 11: return "Утро";
    case h >= 12 && h <= 17: return "День";
    case h >= 18 && h <= 23: return "Вечер";
    default: return "Неверный час";
  }
}
console.log(timeOfDay(14)); // День

// #061
// return сразу выходит из функции — break не нужен.
// break только выходит из switch, выполнение функции продолжается.
function withReturn(val) {
  switch (val) {
    case 1: return "один";
    case 2: return "два";
    default: return "другое";
  }
}

// #062
function angleCount(shape) {
  switch (shape) {
    case "circle": return 0;
    case "square": return 4;
    case "triangle": return 3;
    default: return -1;
  }
}
console.log(angleCount("triangle")); // 3

// #063
// Если нет совпадений и нет default — switch ничего не делает, возвращает undefined.
const res63 = (() => {
  switch (undefined) {
    case 1: return "one";
  }
})();
console.log(res63); // undefined

// #064
function httpStatus(code) {
  switch (code) {
    case 200: return "OK";
    case 404: return "Not Found";
    case 500: return "Server Error";
    default: return "Unknown";
  }
}
console.log(httpStatus(404)); // Not Found

// #065
// switch использует строгое сравнение === (без приведения типов).
switch ("1") {
  case 1: console.log("число 1"); break;
  case "1": console.log("строка '1'"); break; // сработает это
}

// #066
function calc(op, a, b) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b !== 0 ? a / b : "Деление на ноль";
    default: return "Неизвестный оператор";
  }
}
console.log(calc("*", 4, 5)); // 20

// #067
function nestedSwitch(type, subtype) {
  switch (type) {
    case "animal":
      switch (subtype) {
        case "dog": return "собака";
        case "cat": return "кот";
      }
      break;
    case "plant":
      switch (subtype) {
        case "tree": return "дерево";
      }
      break;
  }
  return "неизвестно";
}
console.log(nestedSwitch("animal", "cat")); // кот

// #068
function handleKey(key) {
  switch (key) {
    case "ArrowUp": return "вверх";
    case "ArrowDown": return "вниз";
    case "ArrowLeft": return "влево";
    case "ArrowRight": return "вправо";
    default: return "другая клавиша";
  }
}

// #069
function getDiscount(memberType) {
  switch (memberType) {
    case "vip": return 30;
    case "premium": return 20;
    case "standard": return 10;
    default: return 0;
  }
}
console.log(getDiscount("vip")); // 30

// #070
function repl(input) {
  const [cmd, ...args] = input.trim().split(" ");
  switch (cmd) {
    case "echo": return args.join(" ");
    case "add": return args.reduce((s, n) => s + Number(n), 0);
    case "upper": return args.join(" ").toUpperCase();
    default: return `Неизвестная команда: ${cmd}`;
  }
}
console.log(repl("echo hello world")); // hello world

// #071
// Object lookup — замена switch объектом для читаемости и расширяемости.
const actions = {
  start: () => "Запуск",
  stop: () => "Остановка",
  pause: () => "Пауза",
};
function dispatch(cmd) {
  return (actions[cmd] ?? (() => "Неизвестно"))();
}
console.log(dispatch("start")); // Запуск

// #072
function nextLight(state) {
  switch (state) {
    case "red": return "green";
    case "green": return "yellow";
    case "yellow": return "red";
    default: return "red";
  }
}
let light = "red";
for (let i = 0; i < 6; i++) { console.log(light); light = nextLight(light); }

// #073
function tokenType(token) {
  switch (true) {
    case /^\d+$/.test(token): return "NUMBER";
    case /^["'].*["']$/.test(token): return "STRING";
    case ["+", "-", "*", "/"].includes(token): return "OPERATOR";
    case ["if", "else", "while", "for"].includes(token): return "KEYWORD";
    default: return "UNKNOWN";
  }
}
console.log(tokenType("42")); // NUMBER
console.log(tokenType("if")); // KEYWORD

// #074
function router(path) {
  switch (path) {
    case "/": return "Главная";
    case "/about": return "О нас";
    case "/contact": return "Контакты";
    default: return "404 — Не найдено";
  }
}
console.log(router("/about")); // О нас

// #075
function classify(score) {
  switch (true) {
    case score >= 90: return "A";
    case score >= 75: return "B";
    case score >= 60: return "C";
    default: return "F";
  }
}
console.log(classify(82)); // B

// #076
function seasonOf(month) {
  switch (month) {
    case 12:
    case 1:
    case 2:
      return "Зима";
    case 3:
    case 4:
    case 5:
      return "Весна";
    case 6:
    case 7:
    case 8:
      return "Лето";
    case 9:
    case 10:
    case 11:
      return "Осень";
    default:
      return "Неверный месяц";
  }
}
console.log(seasonOf(7)); // Лето

// #077
function ordinal(n) {
  switch (n) {
    case 1: return "1st";
    case 2: return "2nd";
    case 3: return "3rd";
    default: return `${n}th`;
  }
}
console.log(ordinal(5)); // 5th

// #078
function noteToSolfege(note) {
  switch (note) {
    case "C": return "До";
    case "D": return "Ре";
    case "E": return "Ми";
    case "F": return "Фа";
    case "G": return "Соль";
    case "A": return "Ля";
    case "B": return "Си";
    default: return "Неизвестная нота";
  }
}
console.log(noteToSolfege("E")); // Ми

// #079
// Переменные в case без фигурных скобок разделяют область видимости всего switch.
// Нужны {} чтобы создать блочную область и избежать конфликтов.
switch (1) {
  case 1: {
    const msg = "Привет";
    console.log(msg);
    break;
  }
  case 2: {
    const msg = "Пока";
    console.log(msg);
    break;
  }
}

// #080
function handleEvent(type) {
  switch (type) {
    case "click": console.log("Клик!"); break;
    case "mouseover": console.log("Наведение"); break;
    case "keydown": console.log("Клавиша нажата"); break;
    default: console.log("Неизвестное событие");
  }
}

// #081
function animalSound(animal) {
  switch (animal) {
    case "cat": return "meow";
    case "dog": return "woof";
    case "cow": return "moo";
    case "duck": return "quack";
    default: return "...";
  }
}
console.log(animalSound("dog")); // woof

// #082
function zodiac(month, day) {
  switch (true) {
    case (month === 3 && day >= 21) || (month === 4 && day <= 19): return "Овен";
    case (month === 4 && day >= 20) || (month === 5 && day <= 20): return "Телец";
    case (month === 5 && day >= 21) || (month === 6 && day <= 20): return "Близнецы";
    case (month === 6 && day >= 21) || (month === 7 && day <= 22): return "Рак";
    case (month === 7 && day >= 23) || (month === 8 && day <= 22): return "Лев";
    case (month === 8 && day >= 23) || (month === 9 && day <= 22): return "Дева";
    case (month === 9 && day >= 23) || (month === 10 && day <= 22): return "Весы";
    case (month === 10 && day >= 23) || (month === 11 && day <= 21): return "Скорпион";
    case (month === 11 && day >= 22) || (month === 12 && day <= 21): return "Стрелец";
    case (month === 12 && day >= 22) || (month === 1 && day <= 19): return "Козерог";
    case (month === 1 && day >= 20) || (month === 2 && day <= 18): return "Водолей";
    default: return "Рыбы";
  }
}
console.log(zodiac(5, 15)); // Телец

// #083
// Подход 1 — через переменную:
function describe1(val) {
  let result;
  switch (val) {
    case 1: result = "один"; break;
    default: result = "другое";
  }
  return result;
}
// Подход 2 — return напрямую (предпочтительнее):
function describe2(val) {
  switch (val) {
    case 1: return "один";
    default: return "другое";
  }
}

// #084
// Exhaustive switch — все возможные значения обработаны.
// В JS защищается через default с throw:
function handleDirection(dir) {
  switch (dir) {
    case "north": return "Север";
    case "south": return "Юг";
    case "east": return "Восток";
    case "west": return "Запад";
    default: throw new TypeError(`Необработанное направление: ${dir}`);
  }
}

// #085
function stateMachine(state, event) {
  switch (state) {
    case "idle":
      if (event === "fetch") return "loading";
      break;
    case "loading":
      if (event === "success") return "success";
      if (event === "error") return "error";
      break;
    case "success":
    case "error":
      if (event === "reset") return "idle";
      break;
  }
  return state;
}
console.log(stateMachine("idle", "fetch")); // loading
console.log(stateMachine("loading", "success")); // success

// #086
// switch — хорош при большом числе точных значений (движок может строить jump table).
// if-else — лучше для диапазонов и нескольких условий.
// object lookup — самый быстрый для строк/идентификаторов, O(1) через хеш.

// #087
function rpnCalc(tokens) {
  const stack = [];
  for (const tok of tokens) {
    switch (tok) {
      case "+": { const b = stack.pop(), a = stack.pop(); stack.push(a + b); break; }
      case "-": { const b = stack.pop(), a = stack.pop(); stack.push(a - b); break; }
      case "*": { const b = stack.pop(), a = stack.pop(); stack.push(a * b); break; }
      case "/": { const b = stack.pop(), a = stack.pop(); stack.push(a / b); break; }
      default: stack.push(Number(tok));
    }
  }
  return stack[0];
}
console.log(rpnCalc(["3", "4", "+", "2", "*"])); // 14

// #088
class EventBus {
  handle(event) {
    switch (event.type) {
      case "user:login": console.log("Вход:", event.user); break;
      case "user:logout": console.log("Выход:", event.user); break;
      case "data:fetch": console.log("Загрузка данных:", event.url); break;
      case "data:error": console.log("Ошибка данных:", event.error); break;
      default: console.log("Неизвестное событие:", event.type);
    }
  }
}
const bus = new EventBus();
bus.handle({ type: "user:login", user: "Alice" });

// #089
function evalAST(node) {
  switch (node.type) {
    case "Literal": return node.value;
    case "BinaryExpression": {
      const left = evalAST(node.left);
      const right = evalAST(node.right);
      switch (node.operator) {
        case "+": return left + right;
        case "-": return left - right;
        case "*": return left * right;
        case "/": return left / right;
      }
    }
    default: throw new Error(`Неизвестный тип узла: ${node.type}`);
  }
}
const ast = { type: "BinaryExpression", operator: "+", left: { type: "Literal", value: 3 }, right: { type: "Literal", value: 4 } };
console.log(evalAST(ast)); // 7

// #090
const TYPE_A = Symbol("A");
const TYPE_B = Symbol("B");
function handleSymbol(val) {
  switch (val) {
    case TYPE_A: return "Тип A";
    case TYPE_B: return "Тип B";
    default: return "Неизвестный тип";
  }
}
console.log(handleSymbol(TYPE_A)); // Тип A

// #091
const commandRegistry = {
  add: { execute: (payload) => `Добавлено: ${payload}` },
  remove: { execute: (payload) => `Удалено: ${payload}` },
  update: { execute: (payload) => `Обновлено: ${payload}` },
};
function runCommand(type, payload) {
  switch (type) {
    case "add":
    case "remove":
    case "update":
      return commandRegistry[type].execute(payload);
    default:
      throw new Error(`Неизвестная команда: ${type}`);
  }
}
console.log(runCommand("add", "item1")); // Добавлено: item1

// #092
function createMiddleware(type) {
  switch (type) {
    case "GET": return (req, res, next) => { console.log("GET handler"); next(); };
    case "POST": return (req, res, next) => { console.log("POST handler"); next(); };
    default: return (req, res, next) => { console.log("Unknown method"); next(); };
  }
}

// #093
// Discriminated Union — объединение типов с общим полем-дискриминатором.
function areaOf(shape) {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.r ** 2;
    case "rect": return shape.w * shape.h;
    case "triangle": return 0.5 * shape.base * shape.height;
    default: throw new TypeError(`Неизвестная фигура: ${shape.kind}`);
  }
}
console.log(areaOf({ kind: "circle", r: 5 }).toFixed(2)); // 78.54

// #094
function turingMachine(tape, initState) {
  let state = initState;
  let head = 0;
  const t = [...tape];
  while (state !== "HALT") {
    switch (`${state}_${t[head]}`) {
      case "q0_0": t[head] = "1"; state = "q1"; head++; break;
      case "q0_1": t[head] = "0"; head++; break;
      case "q1_0": state = "HALT"; break;
      default: state = "HALT";
    }
  }
  return t;
}
console.log(turingMachine(["0", "1", "0"], "q0")); // ["1","1","0"]

// #095
function tokenize(expr) {
  const tokens = [];
  for (const char of expr) {
    switch (true) {
      case /\d/.test(char): tokens.push({ type: "NUMBER", val: char }); break;
      case ["+", "-", "*", "/"].includes(char): tokens.push({ type: "OPERATOR", val: char }); break;
      case char === "(": tokens.push({ type: "LPAREN", val: char }); break;
      case char === ")": tokens.push({ type: "RPAREN", val: char }); break;
      case char === " ": break;
      default: tokens.push({ type: "UNKNOWN", val: char });
    }
  }
  return tokens;
}
console.log(tokenize("3 + (4 * 2)"));

// #096
function visit(node) {
  switch (node.type) {
    case "Literal": return `Literal(${node.value})`;
    case "Identifier": return `Identifier(${node.name})`;
    case "BinaryExpression": return `Binary(${visit(node.left)} ${node.operator} ${visit(node.right)})`;
    default: throw new Error(`Неизвестный тип: ${node.type}`);
  }
}
console.log(visit(ast)); // Binary(Literal(3) + Literal(4))

// #097
function safeSwitch(val) {
  switch (val) {
    case "a": return 1;
    case "b": return 2;
    default:
      throw new TypeError(`Unexpected value: ${String(val)} (type: ${typeof val})`);
  }
}

// #098
function parseJSON(input) {
  let state = "START";
  const result = [];
  for (const char of input) {
    switch (state) {
      case "START":
        if (char === "{") { state = "OBJECT"; result.push("OBJECT_START"); }
        else if (char === "[") { state = "ARRAY"; result.push("ARRAY_START"); }
        break;
      case "OBJECT":
        if (char === "}") { state = "END"; result.push("OBJECT_END"); }
        else if (char === '"') { state = "KEY"; }
        break;
      case "KEY":
        if (char === '"') state = "OBJECT";
        break;
      case "ARRAY":
        if (char === "]") { state = "END"; result.push("ARRAY_END"); }
        break;
    }
  }
  return result;
}
console.log(parseJSON('{"a":1}'));

// #099
function reducer(state = [], action) {
  switch (action.type) {
    case "ADD": return [...state, action.payload];
    case "REMOVE": return state.filter((_, i) => i !== action.payload);
    case "UPDATE": return state.map((el, i) => i === action.payload.index ? action.payload.value : el);
    case "RESET": return [];
    default: return state;
  }
}
let s = reducer([], { type: "ADD", payload: "a" });
s = reducer(s, { type: "ADD", payload: "b" });
s = reducer(s, { type: "REMOVE", payload: 0 });
console.log(s); // ["b"]

// #100
// Fall-through уязвимость: пропущенный break позволяет case "admin"
// провалиться в case "user" и выполнить лишние действия.
// Например: switch(role){ case "admin": grantAdmin(); case "user": grantUser(); }
// Итог: admin получит и adminAccess, и userAccess — намеренно, но
// если break пропущен случайно — это баг безопасности.

// #101
class PluginDispatcher {
  constructor() { this.registry = new Map(); }
  register(type, handler) { this.registry.set(type, handler); }
  dispatch(type, payload) {
    const handler = this.registry.get(type);
    if (!handler) throw new Error(`Нет плагина для: ${type}`);
    return handler(payload);
  }
}
const pd = new PluginDispatcher();
pd.register("greet", name => `Привет, ${name}!`);
console.log(pd.dispatch("greet", "Alice")); // Привет, Alice!

// #102
function vm(bytecode) {
  const stack = [];
  let ip = 0;
  while (ip < bytecode.length) {
    const op = bytecode[ip++];
    switch (op) {
      case 0x01: stack.push(bytecode[ip++]); break; // PUSH
      case 0x02: stack.pop(); break; // POP
      case 0x03: { const b = stack.pop(), a = stack.pop(); stack.push(a + b); break; } // ADD
      case 0x04: { const b = stack.pop(), a = stack.pop(); stack.push(a - b); break; } // SUB
      case 0x05: console.log(stack[stack.length - 1]); break; // PRINT
      case 0xFF: return; // HALT
      default: throw new Error(`Неизвестный опкод: ${op}`);
    }
  }
}
vm([0x01, 10, 0x01, 20, 0x03, 0x05, 0xFF]); // 30
