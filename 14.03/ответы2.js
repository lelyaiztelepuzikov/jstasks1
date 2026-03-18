// ============================================================
// ТИПЫ ДАННЫХ И ПРЕОБРАЗОВАНИЯ
// ============================================================

// #001
console.log(typeof "hello"); // "string"

// #002
const str = "42";
console.log(Number(str));   // 42
console.log(parseInt(str)); // 42
console.log(+str);          // 42

// #003
console.log(Number(""));  // 0
console.log(Number(" ")); // 0

// #004
console.log(Boolean(0));    // false
console.log(Boolean(""));   // false
console.log(Boolean(null)); // false

// #005
console.log(String(123));      // "123"
console.log((123).toString()); // "123"

// #006
// Falsy значения: false, 0, -0, 0n, "", '', ``, null, undefined, NaN

// #007
console.log(Number(true));  // 1
console.log(Number(false)); // 0

// #008
console.log(Boolean([])); // true
console.log(Boolean({})); // true

// #009
// Явное: разработчик сам вызывает Number(), String(), Boolean().
// Неявное: JS делает преобразование автоматически в операциях (1 + "2").

// #010
console.log(1 + "2"); // "12" — число приводится к строке, происходит конкатенация

// #011
console.log("5" - 3); // 2 — - не работает со строками, "5" → 5

// #012
console.log(parseInt("10px")); // 10 — парсит до первого нечислового символа
console.log(Number("10px"));   // NaN — строка не является числом целиком

// #013
console.log(parseInt("0x1F", 16)); // 31 — второй аргумент radix задаёт основание системы

// #014
// NaN — Not a Number, результат невалидной математики. Проверка:
console.log(Number.isNaN(NaN));  // true
console.log(isNaN("hello"));     // true (с приведением типа)
console.log(Number.isNaN("hello")); // false (без приведения)

// #015
console.log(typeof NaN); // "number"

// #016
console.log(null + 1);      // 1 — null → 0
console.log(undefined + 1); // NaN — undefined → NaN

// #017
console.log((10).toString(2)); // "1010" — двоичное представление

// #018
console.log(parseFloat("3.14abc")); // 3.14

// #019
console.log("3" * "4"); // 12 — * приводит оба операнда к числу

// #020
console.log(Number(null));      // 0
console.log(Number(undefined)); // NaN

// #021
// [] + [] = "" — оба массива через toString() → "", конкатенация
console.log([] + []); // ""
// {} + [] = 0 когда {} интерпретируется как блок кода, [] → 0
// Но в выражении: ({} + []) === "[object Object]"
console.log({} + []); // "[object Object]"

// #022
console.log(+"");    // 0
console.log(+[]);    // 0
console.log(+{});    // NaN
console.log(+null);  // 0

// #023
// 0.1 + 0.2 = 0.30000000000000004 из-за представления в IEEE 754 (двоичная дробь).
console.log(0.1 + 0.2 === 0.3); // false
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true — правильный способ

// #024
try { Number(Symbol("test")); } catch (e) { console.log(e.message); }
// TypeError — Symbol нельзя неявно привести к числу

// #025
function safeNumber(val) {
  const n = Number(val);
  return Number.isNaN(n) ? 0 : n;
}
console.log(safeNumber("42"));  // 42
console.log(safeNumber("abc")); // 0
console.log(safeNumber(null));  // 0

// #026
// При +obj JS вызывает [Symbol.toPrimitive](hint) или valueOf(), затем toString().
// valueOf() вызывается первым для числового контекста.
const obj26 = {
  valueOf() { return 42; },
  toString() { return "str"; }
};
console.log(+obj26); // 42

// #027
// parseInt("3.9") → 3 (убирает дробь через парсинг строки)
// Math.trunc(3.9) → 3 (убирает дробь числа, работает с отрицательными правильно)
// parseInt(-3.9) → -3, Math.trunc(-3.9) → -3 — одинаково
// Но parseInt нужна строка, Math.trunc работает с числами.

// #028
console.log(Number([1]));   // 1 — [1] → "1" → 1
console.log(Number([1, 2])); // NaN — "1,2" → NaN
console.log(Number([]));    // 0 — "" → 0

// #029
// BigInt — целые числа произвольной длины.
const big = 9007199254740991n;
console.log(big + 1n); // 9007199254740992n
console.log(Number(big)); // 9007199254740991
console.log(BigInt(42));  // 42n

// #030
const obj30 = {
  [Symbol.toPrimitive](hint) {
    if (hint === "number") return 100;
    if (hint === "string") return "obj";
    return true;
  }
};
console.log(+obj30);       // 100
console.log(`${obj30}`);   // "obj"
console.log(obj30 + "");   // "true"

// #031
console.log(null + undefined); // NaN — null → 0, undefined → NaN, 0 + NaN = NaN

// #032
function getType(val) {
  if (val === null) return "null";
  return typeof val;
}
console.log(getType(null));      // "null"
console.log(getType(undefined)); // "undefined"
console.log(getType(42));        // "number"
console.log(getType([]));        // "object"

// #033
console.log(~~3.7); // 3 — двойное побитовое НЕ обрезает дробную часть (через ToInt32)

// ============================================================
// БАЗОВЫЕ ОПЕРАТОРЫ, МАТЕМАТИКА
// ============================================================

// #034
console.log(17 % 5); // 2 — остаток от деления

// #035
console.log(2 ** 10); // 1024

// #036
// ++i — инкремент до возврата значения (префиксный)
// i++ — инкремент после возврата значения (постфиксный)

// #037
let x37 = 5;
console.log(x37++); // 5 — возвращает старое значение
console.log(x37);   // 6 — уже изменено

// #038
let x38 = 5;
console.log(++x38); // 6 — возвращает новое значение

// #039
console.log(10 / 3);              // 3.3333...
console.log(Math.floor(10 / 3));  // 3 — целочисленное деление
console.log(Math.trunc(10 / 3));  // 3

// #040
console.log(Math.abs(-42)); // 42

// #041
const rand = Math.floor(Math.random() * 10) + 1;
console.log(rand); // 1–10

// #042
console.log(Math.max(1, 2, 3)); // 3
console.log(Math.min(1, 2, 3)); // 1

// #043
console.log(Math.round(4.5)); // 5
console.log(Math.round(4.4)); // 4

// #044
const n44 = 3.14159;
console.log(Math.round(n44 * 100) / 100);     // 3.14
console.log(n44.toFixed(2));                   // "3.14"
console.log(parseFloat(n44.toFixed(2)));       // 3.14

// #045
console.log(Math.floor(-3.1)); // -4 — вниз к меньшему целому
console.log(Math.trunc(-3.1)); // -3 — к нулю

// #046
// Infinity — результат деления на 0 или превышения Number.MAX_VALUE.
console.log(1 / 0);      // Infinity
console.log(Infinity + 1); // Infinity
console.log(isFinite(Infinity)); // false

// #047
function hypotenuse(a, b) {
  return Math.sqrt(a ** 2 + b ** 2);
}
console.log(hypotenuse(3, 4)); // 5

// #048
const isEven = n => n % 2 === 0;
console.log(isEven(4)); // true

// #049
console.log(0.1 + 0.2 === 0.3); // false
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true — исправление

// #050
console.log(1 / 0);  // Infinity
console.log(-1 / 0); // -Infinity

// #051
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
console.log(clamp(15, 0, 10)); // 10

// #052
function intRange(a, b) {
  const result = [];
  for (let i = a; i <= b; i++) result.push(i);
  return result;
}
console.log(intRange(1, 5)); // [1,2,3,4,5]

// #053
console.log(5 & 3);  // 1  — AND
console.log(5 | 3);  // 7  — OR
console.log(5 ^ 3);  // 6  — XOR

// #054
function factRecursive(n) {
  return n <= 1 ? 1 : n * factRecursive(n - 1);
}
function factLoop(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}
console.log(factRecursive(6)); // 720
console.log(factLoop(6));      // 720

// #055
function fibonacci55(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}
console.log(fibonacci55(10)); // 55

// #056
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
// Выше этого числа целочисленная арифметика теряет точность. Используй BigInt для больших чисел.

// #057
const cryptoRand = () => crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
console.log(cryptoRand()); // случайное число [0, 1)

// #058
function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}
console.log(isPrime(17)); // true
console.log(isPrime(18)); // false

// #059
function gcd(a, b) {
  while (b) [a, b] = [b, a % b];
  return a;
}
console.log(gcd(48, 18)); // 6

// #060
function round(num, precision) {
  const factor = 10 ** precision;
  return Math.round(num * factor) / factor;
}
console.log(round(3.14159, 2)); // 3.14

// #061
// << сдвигает биты влево (умножение на 2^n)
// >> сдвигает биты вправо с сохранением знака
console.log(4 << 2); // 16 — 4 * 4

// #062
function digitSum(n) {
  return Math.abs(n).toString().split("").reduce((s, d) => s + Number(d), 0);
}
console.log(digitSum(12345)); // 15

// #063
function lerp(a, b, t) {
  return a + (b - a) * t;
}
console.log(lerp(0, 100, 0.25)); // 25

// #064
// >>> — беззнаковый сдвиг вправо, старший бит всегда 0.
// >> сохраняет знак (арифметический), >>> не сохраняет (логический).
console.log(-1 >>> 0);  // 4294967295
console.log(-1 >> 0);   // -1

// #065
function digitCount(n) {
  if (n === 0) return 1;
  return Math.floor(Math.log10(Math.abs(n))) + 1;
}
console.log(digitCount(12345)); // 5

// ============================================================
// ОПЕРАТОРЫ СРАВНЕНИЯ
// ============================================================

// #066
// == — нестрогое: приводит типы. === — строгое: тип и значение.

// #067
console.log("5" == 5);  // true
console.log("5" === 5); // false

// #068
console.log(null == undefined);  // true
console.log(null === undefined); // false

// #069
console.log(null == 0); // false — null равен только undefined при ==

// #070
console.log("apple" > "banana"); // false — сравнение по коду символов (a < b)

// #071
console.log(NaN === NaN);       // false — NaN не равен ничему
console.log(Number.isNaN(NaN)); // true — правильная проверка

// #072
// < меньше, > больше, <= меньше или равно, >= больше или равно

// #073
console.log(1 < 2 < 3); // true — (1<2)=true, true<3 → 1<3 → true
console.log(3 > 2 > 1); // false — (3>2)=true, true>1 → 1>1 → false

// #074
console.log("2" > "12"); // true — строки сравниваются посимвольно: "2" > "1"

// #075
function isEqual(a, b) {
  return a === b;
}
console.log(isEqual(1, 1));   // true
console.log(isEqual(1, "1")); // false

// #076
console.log(0 == false);  // true — false → 0
console.log("" == false); // true — оба → 0

// #077
console.log([] == false);
// [] → "" → 0, false → 0 → 0 == 0 → true

// #078
// Объекты сравниваются по ссылке, а не по значению.
// {a:1} === {a:1} — false, разные объекты в памяти.
function shallowEqual(a, b) {
  const keysA = Object.keys(a);
  if (keysA.length !== Object.keys(b).length) return false;
  return keysA.every(k => a[k] === b[k]);
}
console.log(shallowEqual({ a: 1 }, { a: 1 })); // true

// #079
console.log(null > 0);  // false
console.log(null == 0); // false
console.log(null >= 0); // true — специальный случай спецификации

// #080
console.log(undefined > 0);  // false
console.log(undefined < 0);  // false
console.log(undefined == 0); // false — undefined равен только null

// #081
const nums = [3, 1, 4, 1, 5];
console.log([...nums].sort((a, b) => a - b)); // [1,1,3,4,5]

// #082
// Object.is(a, b) отличается от === в двух случаях:
// Object.is(NaN, NaN) → true (=== даёт false)
// Object.is(+0, -0) → false (=== даёт true)
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(+0, -0));   // false

// #083
console.log("abc" >= "abc"); // true

// #084
function between(val, min, max) {
  return val >= min && val <= max;
}
console.log(between(5, 1, 10)); // true

// #085
console.log(Symbol() == Symbol()); // false — каждый Symbol уникален

// #086
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return false;
  if (typeof a !== "object") return false;
  const keysA = Object.keys(a), keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(k => deepEqual(a[k], b[k]));
}
console.log(deepEqual({ a: { b: 1 } }, { a: { b: 1 } })); // true

// #087
// SameValueZero — как === но NaN === NaN. Используется в Set, Map, includes.
const set = new Set([NaN]);
console.log(set.has(NaN)); // true

// #088
// При == с объектом JS вызывает ToPrimitive(obj, "number") → valueOf() → toString()
// Затем сравнивает с примитивом.
console.log([] == 0);     // true — [] → "" → 0
console.log(["1"] == 1);  // true — ["1"] → "1" → 1

// #089
// [] == ![] шаг за шагом:
// ![] → false (массив truthy)
// [] == false
// [] → "" → 0, false → 0
// 0 == 0 → true
console.log([] == ![]); // true

// #090
function sortStrings(arr) {
  return [...arr].sort((a, b) => a.localeCompare(b));
}
console.log(sortStrings(["яблоко", "банан", "абрикос"]));

// #091
// Array.prototype.includes использует SameValueZero (аналог ===, но NaN === NaN)
console.log([NaN].includes(NaN)); // true
console.log([NaN].indexOf(NaN)); // -1 — indexOf использует ===

// #092
console.log(new String("a") == "a");  // true — valueOf() → "a"
console.log(new String("a") === "a"); // false — объект vs примитив

// #093
function multiSort(...fields) {
  return (a, b) => {
    for (const { key, dir = 1 } of fields) {
      if (a[key] < b[key]) return -1 * dir;
      if (a[key] > b[key]) return 1 * dir;
    }
    return 0;
  };
}
const people = [{ name: "Bob", age: 30 }, { name: "Alice", age: 25 }, { name: "Alice", age: 30 }];
console.log(people.sort(multiSort({ key: "name" }, { key: "age" })));

// #094
// Abstract Equality Comparison (==): алгоритм из спецификации ECMAScript.
// Если типы одинаковы — строгое сравнение. Иначе приведение типов по таблице.

// #095
// typeof null === "object" — историческая ошибка JS (с версии 1.0).
// В памяти null был представлен нулевым тегом типа, совпавшим с object.
// Оставлено для обратной совместимости.

// #096
function makeLoggingProxy(target) {
  return new Proxy(target, {
    get(obj, key) {
      if (key === Symbol.toPrimitive || key === "valueOf" || key === "toString") {
        return (...args) => {
          console.log(`Приведение типа вызвано: ${String(key)}`);
          return typeof obj[key] === "function" ? obj[key](...args) : obj[key];
        };
      }
      return obj[key];
    }
  });
}

// #097
// NaN boxing — в IEEE 754 существует много битовых паттернов NaN.
// JS движки используют эти "дыры" для хранения указателей (NaN-tagging).
// typeof NaN === "number" потому что NaN — часть числового типа IEEE 754.

// ============================================================
// УСЛОВНОЕ ВЕТВЛЕНИЕ: if, ?
// ============================================================

// #098
function sign(n) {
  if (n > 0) return "positive";
  else if (n < 0) return "negative";
  else return "zero";
}
console.log(sign(-5)); // "negative"

// #099
// Тернарный: condition ? valueIfTrue : valueIfFalse
const age99 = 20;
const access = age99 >= 18 ? "allowed" : "denied";
console.log(access); // "allowed"

// #100
let x100 = 0;
if (x100) console.log("true"); else console.log("false"); // "false" — 0 falsy

// #101
function evenOdd(n) {
  if (n % 2 === 0) return "чётное";
  else return "нечётное";
}
console.log(evenOdd(7)); // "нечётное"

// #102
function dayNameSwitch(n) {
  switch (n) {
    case 1: return "Пн"; case 2: return "Вт"; case 3: return "Ср";
    case 4: return "Чт"; case 5: return "Пт"; case 6: return "Сб";
    case 7: return "Вс"; default: return "?";
  }
}

// #103
// Без break выполнение проваливается в следующий case (fallthrough).

// #104
const age104 = 16;
console.log(age104 >= 18 ? "adult" : "minor"); // "minor"

// #105
// default в switch — выполняется если ни один case не совпал. Необязателен.

// #106
function greetLang(lang) {
  switch (lang) {
    case "ru": return "Привет";
    case "en": return "Hello";
    default: return "Hi";
  }
}

// #107
const score107 = 75;
const grade107 = score107 >= 90 ? "A" : score107 >= 75 ? "B" : "C";
console.log(grade107); // "B"

// #108
if ("0") console.log("true"); else console.log("false"); // "true" — непустая строка truthy

// #109
function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}
console.log(getGrade(85)); // "B"

// #110
function checkRole(role) {
  const allowed = ["admin", "moderator", "editor"];
  return allowed.includes(role);
}

// #111
let x111 = 5;
let r111 = x111 > 3 ? x111 > 7 ? "big" : "medium" : "small";
console.log(r111); // "medium"

// #112
function fizzbuzz112(n) {
  return n % 15 === 0 ? "FizzBuzz"
    : n % 3 === 0 ? "Fizz"
    : n % 5 === 0 ? "Buzz"
    : String(n);
}
console.log(fizzbuzz112(15)); // "FizzBuzz"

// #113
function bmi(value) {
  switch (true) {
    case value < 18.5: return "Недовес";
    case value < 25: return "Норма";
    case value < 30: return "Избыток";
    default: return "Ожирение";
  }
}

// #114
// Short-circuit: && возвращает первый falsy или последний операнд.
// || возвращает первый truthy или последний операнд.
const user114 = null;
const name114 = user114 && user114.name; // null — безопасное обращение
const val114 = user114 || "guest";       // "guest" — значение по умолчанию

// #115
const statusMap = {
  200: "OK",
  404: "Not Found",
  500: "Server Error",
};
function getStatus(code) {
  return statusMap[code] ?? "Unknown";
}
console.log(getStatus(404)); // "Not Found"

// #116
function classify116(n) {
  if (n < 2) return "neither";
  return isPrime(n) ? "prime" : "composite";
}
console.log(classify116(7));  // "prime"
console.log(classify116(8));  // "composite"
console.log(classify116(1));  // "neither"

// #117
switch (2) {
  case 1:
  case 2:
  case 3:
    console.log("1-3"); // выведет — fallthrough от case 2
    break;
}

// #118
function processUser(user) {
  if (!user) return "Нет пользователя";
  if (!user.name) return "Нет имени";
  if (!user.email) return "Нет email";
  return `Привет, ${user.name}`;
}

// #119
const strategies = {
  pdf: (data) => `PDF: ${data}`,
  csv: (data) => `CSV: ${data}`,
  json: (data) => `JSON: ${JSON.stringify(data)}`,
};
function export119(format, data) {
  const strategy = strategies[format];
  if (!strategy) throw new Error(`Неизвестный формат: ${format}`);
  return strategy(data);
}

// #120
function match(value, patterns) {
  for (const [predicate, transform] of patterns) {
    if (predicate(value)) return transform(value);
  }
  return undefined;
}
const result120 = match(42, [
  [x => x < 0, () => "отрицательное"],
  [x => x === 0, () => "ноль"],
  [x => x > 0, x => `положительное: ${x}`],
]);
console.log(result120); // "положительное: 42"

// #121
const expensiveA = () => { console.log("вычислен A"); return 1; };
const expensiveB = () => { console.log("вычислен B"); return 2; };
const flag121 = true;
const lazy = flag121 ? expensiveA() : expensiveB(); // expensiveB не вызывается

// #122
function trafficLight(state, event) {
  switch (state) {
    case "red": return event === "go" ? "green" : state;
    case "green": return event === "slow" ? "yellow" : state;
    case "yellow": return event === "stop" ? "red" : state;
    default: throw new Error(`Неизвестное состояние: ${state}`);
  }
}
console.log(trafficLight("red", "go")); // "green"

// #123
// Optional chaining ?. — безопасный доступ к свойствам.
// Возвращает undefined если любое звено null/undefined.
const user123 = null;
console.log(user123?.profile?.avatar ?? "no-avatar"); // "no-avatar"

// #124
function pipe(...fns) {
  return (value) => fns.reduce((acc, fn) => {
    if (acc === null || acc === undefined) return acc;
    return fn(acc);
  }, value);
}
const process124 = pipe(
  x => x * 2,
  x => x > 10 ? null : x,
  x => x + 1
);
console.log(process124(4)); // null — 4*2=8, 8>10 false → 9... wait 8 not > 10 → 9
console.log(process124(6)); // null — 6*2=12 > 10 → null

// #125
const isString = v => typeof v === "string";
const isNumber = v => typeof v === "number";
const isArray = v => Array.isArray(v);
const isNull = v => v === null;
console.log(isString("hi"), isNumber(1), isArray([]), isNull(null)); // true true true true

// #126
function cond(pairs) {
  return (value) => {
    for (const [predicate, transform] of pairs) {
      if (predicate(value)) return transform(value);
    }
    return value;
  };
}
const classify126 = cond([
  [x => x < 0, () => "negative"],
  [x => x === 0, () => "zero"],
  [x => x > 0, () => "positive"],
]);
console.log(classify126(-5)); // "negative"

// #127
// Глубокая вложенность (pyramid of doom) — плохо читается, сложно тестировать.
// Решения: guard clauses, early return, strategy pattern, chain of responsibility.

// #128
function when(predicate, transform) {
  return (value) => predicate(value) ? transform(value) : value;
}
const doublePositive = when(x => x > 0, x => x * 2);
console.log(doublePositive(5));  // 10
console.log(doublePositive(-3)); // -3

// #129
const routes = {
  "/": () => "Главная",
  "/about": () => "О нас",
  "/contact": () => "Контакты",
};
function route(path) {
  return (routes[path] ?? (() => "404"))();
}
console.log(route("/about")); // "О нас"

// ============================================================
// ЛОГИЧЕСКИЕ ОПЕРАТОРЫ
// ============================================================

// #130
// && возвращает первый falsy или последний операнд если все truthy.
console.log(1 && "hello"); // "hello"
console.log(0 && "hello"); // 0

// #131
// || возвращает первый truthy или последний операнд если все falsy.
console.log(0 || "hello"); // "hello"
console.log(1 || "hello"); // 1

// #132
console.log(1 && 2 && 3); // 3 — все truthy, возвращает последний

// #133
console.log(1 || 2 || 3); // 1 — первый truthy

// #134
console.log(0 && "hello"); // 0 — первый falsy

// #135
console.log(false || "default"); // "default"

// #136
console.log(!true); // false
console.log(!0);    // true

// #137
// !! приводит значение к булевому: !!x эквивалентно Boolean(x)
console.log(!!0);      // false
console.log(!!"hello"); // true

// #138
console.log(true && false || true); // true — && выше приоритетом, чем ||
// = (true && false) || true = false || true = true

// #139
console.log(null || undefined || 0 || "" || "hello"); // "hello"

// #140
let x140 = 0;
let y140 = x140 || 10;
console.log(y140); // 10 — паттерн "значение по умолчанию"

// #141
function greet141(name) {
  name = name || "Гость";
  return `Привет, ${name}`;
}
console.log(greet141());       // "Привет, Гость"
console.log(greet141("Alice")); // "Привет, Alice"

// #142
console.log("cat" && "dog"); // "dog" — оба truthy, возвращает последний
console.log("cat" || "dog"); // "cat" — первый truthy

// #143
const user143 = { isAdmin: true, ban: () => console.log("Забанен") };
user143.isAdmin && user143.ban(); // вызывается только если isAdmin truthy

// #144
let a144 = 0;
let b144 = a144 || (a144 = 5);
console.log(a144, b144); // 5 5 — a144 стал 5, b144 = 5

// #145
// Проблема: val || default заменит 0, "", false на default, т.к. они falsy.
// Решение: val ?? default — заменяет только null/undefined.
function withDefault(val, def) {
  return val ?? def; // правильно
}
console.log(withDefault(0, 42)); // 0 — ноль сохраняется

// #146
console.log(!!"");    // false
console.log(!!0);     // false
console.log(!!null);  // false
console.log(!!NaN);   // false

// #147
function safeCall(callback) {
  typeof callback === "function" && callback();
}

// #148
// Приоритет: ! > && > ||
// a || b && c = a || (b && c)
const result148 = false || true && false; // false || false = false
console.log(result148); // false

// #149
console.log(true || console.log("hi")); // true — console.log не выполнится (short-circuit)

// #150
function and(...fns) {
  return (...args) => fns.every(fn => fn(...args));
}
const isPositiveEven = and(x => x > 0, x => x % 2 === 0);
console.log(isPositiveEven(4)); // true
console.log(isPositiveEven(3)); // false

// #151
function or(...fns) {
  return (...args) => fns.some(fn => fn(...args));
}
const isZeroOrNeg = or(x => x === 0, x => x < 0);
console.log(isZeroOrNeg(0));  // true
console.log(isZeroOrNeg(5));  // false

// #152
function not(fn) {
  return (...args) => !fn(...args);
}
const isOdd = not(x => x % 2 === 0);
console.log(isOdd(3)); // true

// #153
// XOR — true только если операнды различны.
function xor(a, b) {
  return (a || b) && !(a && b);
}
console.log(xor(true, false)); // true
console.log(xor(true, true));  // false

// #154
// Lazy evaluation: правый операнд && / || вычисляется только при необходимости.
// Важно для производительности и предотвращения ошибок (side effects).
const data154 = null;
const len = data154 && data154.length; // data154.length не вычисляется

// #155
function compose(...fns) {
  return (value) => {
    let result = value;
    for (const fn of fns) {
      result = fn(result);
      if (result === null) return null;
    }
    return result;
  };
}
const pipeline = compose(x => x * 2, x => x > 10 ? null : x, x => x + 1);
console.log(pipeline(4)); // 9
console.log(pipeline(6)); // null

// #156
// Ручная реализация optional chaining через &&:
const a156 = { b: { c: { d: 42 } } };
const val156 = a156 && a156.b && a156.b.c && a156.b.c.d;
console.log(val156); // 42

// #157
// Логические операторы && / || не перехватываются Proxy напрямую.
// Перехватывается только приведение к булевому через get-ловушку на Symbol.toPrimitive / valueOf.

// #158
// &&= присваивает только если левый операнд truthy
// ||= присваивает только если левый операнд falsy
let x158 = 1;
x158 &&= 99;
console.log(x158); // 99

let y158 = 0;
y158 ||= 42;
console.log(y158); // 42

// #159
function allTrue(arr) {
  for (const val of arr) if (!val) return false;
  return true;
}
console.log(allTrue([1, "a", true])); // true
console.log(allTrue([1, 0, true]));   // false

// #160
function either(value, transform, fallback) {
  try {
    const result = transform(value);
    return { right: result };
  } catch (e) {
    return { left: fallback(e) };
  }
}
console.log(either(4, x => x * 2, e => e.message)); // { right: 8 }
console.log(either(null, x => x.foo, e => "ошибка")); // { left: "ошибка" }

// #161
// Законы Де Моргана:
// !(A && B) === !A || !B
// !(A || B) === !A && !B
console.log(!(true && false) === (!true || !false)); // true
console.log(!(true || false) === (!true && !false)); // true

// ============================================================
// ОПЕРАТОРЫ ??, ??=
// ============================================================

// #162
// ?? (nullish coalescing) — возвращает правый операнд только если левый null/undefined.
// || — возвращает правый если левый falsy (включая 0, "").

// #163
console.log(null ?? "default");      // "default"
console.log(undefined ?? "default"); // "default"

// #164
console.log(0 ?? "default"); // 0 — 0 не null/undefined
console.log(0 || "default"); // "default" — 0 falsy

// #165
console.log("" ?? "default"); // "" — пустая строка не null/undefined
console.log("" || "default"); // "default"

// #166
console.log(false ?? "default"); // false

// #167
console.log(NaN ?? "default"); // NaN

// #168
// ??= присваивает значение только если переменная null или undefined.
let x168;
x168 ??= 42;
console.log(x168); // 42

// #169
let x169 = null;
x169 ??= 42;
console.log(x169); // 42

// #170
let x170 = 0;
x170 ??= 42;
console.log(x170); // 0 — не null/undefined

// #171
const { name171 = "default" } = { name171: null };
console.log(name171); // null — деструктуризация использует undefined, не null
const { name172 } = { name172: null };
console.log(name172 ?? "default"); // "default" — ?? после деструктуризации

// #172
// Используй ?? когда 0, "", false — допустимые значения.
// Используй || когда нужно отсечь все falsy значения.
function setVolume(volume) {
  const vol = volume ?? 50; // 0 — допустимое значение
  return vol;
}
console.log(setVolume(0));  // 0
console.log(setVolume(null)); // 50

// #173
console.log(null ?? undefined ?? 0 ?? "hello"); // 0 — первое не-null/undefined

// #174
// Смешивание ?? с && и || без скобок вызывает SyntaxError.
// Нужно: (null ?? false) || true
console.log((null ?? false) || true); // true

// #175
const user175 = null;
const name175 = user175?.name ?? "Anonymous";
console.log(name175); // "Anonymous"

// #176
function configure(options = {}) {
  return {
    host: options.host ?? "localhost",
    port: options.port ?? 3000,
    debug: options.debug ?? false,
    timeout: options.timeout ?? 5000,
  };
}
console.log(configure({ port: 8080 }));

// #177
// ||= присваивает если falsy (0, "", false, null, undefined)
// ??= присваивает только если null/undefined
let a177 = 0;
a177 ||= 10; // 0 falsy → присвоит 10
console.log(a177); // 10

let b177 = 0;
b177 ??= 10; // 0 не null/undefined → не изменится
console.log(b177); // 0

// #178
let count178 = 0;
count178 ||= 10;
console.log(count178); // 10 — 0 falsy

// #179
let count179 = 0;
count179 ??= 10;
console.log(count179); // 0 — 0 не null/undefined

// #180
const cache180 = {};
function getOrInit(key, init) {
  cache180[key] ??= init();
  return cache180[key];
}
console.log(getOrInit("data", () => [1, 2, 3])); // [1,2,3]
console.log(getOrInit("data", () => [4, 5, 6])); // [1,2,3] — уже инициализировано

// #181
let obj181 = {};
obj181.a ??= "set";
obj181.a ??= "again";
console.log(obj181.a); // "set" — второй раз не перезаписывается

// #182
function nullishCoalesce(a, b) {
  return a !== null && a !== undefined ? a : b;
}
console.log(nullishCoalesce(null, "default")); // "default"
console.log(nullishCoalesce(0, "default"));    // 0

// #183
// ?? задействует ловушку get в Proxy (проверяет само значение свойства).
const p183 = new Proxy({ val: null }, {
  get(target, key) {
    console.log(`get: ${String(key)}`);
    return target[key];
  }
});
console.log(p183.val ?? "default"); // логирует "get: val", выводит "default"

// #184
function getDeep(obj, path, defaultVal) {
  const keys = path.split(".");
  let current = obj;
  for (const key of keys) {
    current = current?.[key];
    if (current === undefined || current === null) return defaultVal ?? null;
  }
  return current ?? defaultVal;
}
const data184 = { user: { profile: { name: "Alice" } } };
console.log(getDeep(data184, "user.profile.name", "Unknown")); // "Alice"
console.log(getDeep(data184, "user.age", 0));                  // 0

// #185
const obj185 = {
  get val() { return undefined; }
};
console.log(obj185.val ?? "triggered"); // "triggered" — геттер вернул undefined

// #186
function deepMerge(defaults, options) {
  const result = { ...defaults };
  for (const key of Object.keys(options)) {
    result[key] = options[key] ?? defaults[key];
  }
  return result;
}
console.log(deepMerge({ a: 1, b: 2 }, { b: null, c: 3 })); // {a:1, b:2, c:3}

// #187
function coalesce(...vals) {
  for (const v of vals) {
    if (v !== null && v !== undefined) return v;
  }
  return undefined;
}
console.log(coalesce(null, undefined, 0, "hello")); // 0

// #188
// a?.b ?? c и (a?.b) ?? c — одинаковы, т.к. ?. имеет высокий приоритет.
// Оба возвращают c если a равно null/undefined.
const a188 = null;
console.log(a188?.b ?? "c");   // "c"
console.log((a188?.b) ?? "c"); // "c"

// #189
const memoCache = {};
function memoGetUser(id) {
  memoCache[id] ??= fetchUser(id);
  return memoCache[id];
}
function fetchUser(id) { return { id, name: `User${id}` }; }
console.log(memoGetUser(1)); // { id: 1, name: 'User1' }
console.log(memoGetUser(1)); // из кэша

// #190
// "Nullish" = только null и undefined — настоящее "ничего".
// 0, "" и false — реальные значения. ?? игнорирует только истинное отсутствие.

// #191
// 0 || null ?? "x" — SyntaxError: нельзя смешивать ?? с || без скобок.
// Причина: неоднозначность приоритета в спецификации.
// Правильно: (0 || null) ?? "x"
console.log((0 || null) ?? "x"); // "x"

// #192
const ENV = { API_URL: null };
const CONFIG = { API_URL: "http://config.example.com", TIMEOUT: null };
const DEFAULTS = { API_URL: "http://localhost", TIMEOUT: 5000, RETRIES: 3 };

function getConfig(key) {
  return ENV[key] ?? CONFIG[key] ?? DEFAULTS[key];
}
console.log(getConfig("API_URL")); // "http://config.example.com"
console.log(getConfig("TIMEOUT")); // 5000
console.log(getConfig("RETRIES")); // 3

// #193
function withDefault(obj, defaults) {
  return new Proxy(obj, {
    get(target, key) {
      const val = target[key];
      return val !== null && val !== undefined ? val : defaults[key];
    }
  });
}
const raw = { a: null, b: 42 };
const safe = withDefault(raw, { a: "default-a", b: 99, c: "c-default" });
console.log(safe.a); // "default-a"
console.log(safe.b); // 42
console.log(safe.c); // "c-default"
