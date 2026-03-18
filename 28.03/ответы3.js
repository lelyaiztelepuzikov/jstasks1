// ============================================================
// ТИПЫ ДАННЫХ
// ============================================================

// #001
// Примитивные типы: string, number, bigint, boolean, undefined, null, symbol

// #002
// Примитивы — неизменяемые значения, хранятся по значению.
// Объекты — изменяемые, хранятся по ссылке.

// #003
console.log(typeof 42);      // "number"
console.log(typeof "hi");    // "string"
console.log(typeof true);    // "boolean"

// #004
console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object" — историческая ошибка JS

// #005
console.log(typeof []);          // "object"
console.log(typeof {});          // "object"
console.log(typeof Symbol("id")); // "symbol"
console.log(typeof 10n);         // "bigint"

// #006
function getType(value) {
  if (value === null) return "null";
  return typeof value;
}
console.log(getType(null));  // "null"
console.log(getType({}));    // "object"

// #007
const big = 9007199254740991n;
const huge = BigInt("99999999999999999999");
console.log(big, huge);

// #008
function detectType(val) {
  if (Array.isArray(val)) return "array";
  if (typeof val === "function") return "function";
  if (val !== null && typeof val === "object") return "object";
  return "primitive";
}
console.log(detectType([]));         // "array"
console.log(detectType({}));         // "object"
console.log(detectType(() => {}));   // "function"
console.log(detectType(42));         // "primitive"

// #009
// typeof [] === "object" — не различает массивы и объекты
// [] instanceof Array === true — проверяет цепочку прототипов
console.log(typeof []);          // "object"
console.log([] instanceof Array); // true

// #010
function humanType(val) {
  if (val === null) return "null";
  if (Array.isArray(val)) return "array";
  if (val instanceof Date) return "date";
  if (val instanceof RegExp) return "regexp";
  return typeof val;
}
console.log(humanType(null));       // "null"
console.log(humanType([]));         // "array"
console.log(humanType(new Date())); // "date"
console.log(humanType(42));         // "number"

// #011
// truthy/falsy таблица:
// false     → falsy
// 0         → falsy
// ""        → falsy
// null      → falsy
// undefined → falsy
// NaN       → falsy
// "0"       → truthy
// []        → truthy
// {}        → truthy
// -1        → truthy

// #012
function hello() { return "hi"; }
hello.description = "приветствие";
hello.callCount = 0;
console.log(typeof hello);         // "function"
console.log(hello instanceof Function); // true
console.log(hello.description);    // "приветствие"
console.log(hello.length);         // 0 — число параметров
console.log(hello.name);           // "hello"

// #013
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}
console.log(isPlainObject({}));          // true
console.log(isPlainObject(new Date())); // false
console.log(isPlainObject([]));         // false

// #014
const values14 = [42, "hi", true, null, undefined, [], {}, () => {}, new Date(), /re/];
for (const v of values14) {
  console.log({
    typeof: typeof v,
    toString: Object.prototype.toString.call(v),
    isArray: Array.isArray(v),
  });
}

// #015
function typeStats(arr) {
  return arr.reduce((acc, val) => {
    const type = val === null ? "null" : Array.isArray(val) ? "array" : typeof val;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
}
console.log(typeStats([1, "a", null, [], {}, true, 2n]));

// ============================================================
// МЕТОДЫ ПРИМИТИВОВ
// ============================================================

// #016
// JS автоматически оборачивает примитив в объект-обёртку (String, Number, Boolean)
// при обращении к методу, вызывает метод, затем уничтожает обёртку.

// #017
console.log("hello".toUpperCase()); // "HELLO"
// "под капотом": new String("hello").toUpperCase() → уничтожить обёртку

// #018
console.log((123.456).toFixed(2)); // "123.46"

// #019
console.log(true.toString()); // "true" — через Boolean-обёртку

// #020
// null и undefined не имеют объектов-обёрток.
// null.method() → TypeError: Cannot read properties of null

// #021
const str21 = "abc";
const upper21 = str21.toUpperCase(); // JS создаёт new String("abc"), вызывает метод
console.log(upper21); // "ABC"

// #022
const prim22 = "abc";
const obj22 = new String("abc");
console.log(typeof prim22); // "string"
console.log(typeof obj22);  // "object"
console.log(prim22 === obj22); // false
console.log(prim22 == obj22);  // true — obj22.valueOf() === "abc"

// #023
const numObj = new Number(5);
const numPrim = 5;
console.log(numObj == numPrim);  // true
console.log(numObj === numPrim); // false
if (numObj) console.log("truthy"); // объект всегда truthy!
if (!numPrim) console.log("falsy"); // не выведет — 5 truthy

// #024
function callMethod(val) {
  if (typeof val === "string") return val.toUpperCase();
  if (typeof val === "number") return val.toFixed(2);
  if (typeof val === "boolean") return val.toString();
  return String(val);
}
console.log(callMethod("hi"));   // "HI"
console.log(callMethod(3.14));   // "3.14"
console.log(callMethod(false));  // "false"

// #025
// При "abc".x = 10 создаётся временный объект-обёртка, свойство ставится на него,
// обёртка уничтожается — значение теряется.
let s25 = "abc";
s25.x = 10;
console.log(s25.x); // undefined

// #026
const s26 = new String("hello");
const n26 = new Number(42);
console.log(typeof s26);         // "object"
console.log(s26 === "hello");    // false — разные типы
console.log(Boolean(new Boolean(false))); // true — объект всегда truthy!

// #027
// Как работает временный объект-обёртка:
// 1. Примитив: let x = "hello"
// 2. Вызов метода: x.toUpperCase()
// 3. JS создаёт временный: temp = new String("hello")
// 4. Вызывает: temp.toUpperCase() → "HELLO"
// 5. temp уничтожается сборщиком мусора
// 6. Оригинальный примитив x не изменился
// Это называется "autoboxing" (автоупаковка).
// null/undefined не имеют обёрток → TypeError при обращении к методам.

// ============================================================
// ЧИСЛА
// ============================================================

// #028
// number — 64-битные числа с плавающей точкой (IEEE 754).
// Хранит целые и дробные числа, Infinity, -Infinity, NaN.

// #029
console.log(0.1 + 0.2); // 0.30000000000000004
// IEEE 754 не может точно представить 0.1 и 0.2 в двоичной системе.

// #030
// parseInt — парсит строку до первого нечислового символа, возвращает целое.
// parseFloat — аналогично, но с дробью.
console.log(parseInt("3.9abc"));   // 3
console.log(parseFloat("3.9abc")); // 3.9

// #031
console.log(Number("123"));    // 123
console.log(Number("123px")); // NaN

// #032
const n32 = 4.6;
console.log(Math.round(n32)); // 5
console.log(Math.floor(n32)); // 4
console.log(Math.ceil(n32));  // 5

// #033
const rand33 = Math.floor(Math.random() * 10) + 1;
console.log(rand33); // 1–10

// #034
// NaN — Not a Number, результат невалидной операции.
console.log(Number.isNaN(NaN));      // true
console.log(Number.isNaN("hello")); // false

// #035
function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}
console.log(isFiniteNumber(42));       // true
console.log(isFiniteNumber(Infinity)); // false
console.log(isFiniteNumber("5"));      // false

// #036
console.log(isNaN("hello"));        // true — приводит к числу сначала
console.log(Number.isNaN("hello")); // false — без приведения

// #037
function round2(num) {
  return Math.round(num * 100) / 100;
}
console.log(round2(3.14159)); // 3.14

// #038
console.log((10).toString(2));  // "1010"
console.log((255).toString(16)); // "ff"

// #039
console.log(1 / 0);          // Infinity
console.log(-1 / 0);         // -Infinity
console.log(Infinity - Infinity); // NaN

// #040
function sumDigits(n) {
  return String(Math.abs(n)).split("").reduce((s, d) => s + Number(d), 0);
}
console.log(sumDigits(12345)); // 15

// #041
// Number.MAX_SAFE_INTEGER = 2^53 - 1 = 9007199254740991
// Выше него целочисленная арифметика теряет точность (два числа дают одинаковый результат).
console.log(9007199254740991 + 1 === 9007199254740991 + 2); // true!

// #042
const a42 = 9007199254740991n;
const b42 = 1n;
console.log(a42 + b42); // 9007199254740992n
// BigInt нельзя смешивать с number:
try { console.log(a42 + 1); } catch (e) { console.log(e.message); } // TypeError

// #043
function calculator(expr) {
  const match = expr.match(/^(-?[\d.]+)\s*([+\-*/])\s*(-?[\d.]+)$/);
  if (!match) return "Ошибка: неверный формат";
  const [, a, op, b] = match;
  const x = parseFloat(a), y = parseFloat(b);
  if (isNaN(x) || isNaN(y)) return "Ошибка: не числа";
  switch (op) {
    case "+": return x + y;
    case "-": return x - y;
    case "*": return x * y;
    case "/": return y === 0 ? "Ошибка: деление на ноль" : x / y;
  }
}
console.log(calculator("10 + 2.5")); // 12.5
console.log(calculator("10 / 0"));   // "Ошибка: деление на ноль"

// ============================================================
// СТРОКИ
// ============================================================

// #044
const s1 = "двойные кавычки";
const s2 = 'одинарные кавычки';
const s3 = `шаблонная строка`;
console.log(s1, s2, s3);

// #045
const name45 = "Alice";
const age45 = 30;
console.log(`Меня зовут ${name45}, мне ${age45} лет`);

// #046
console.log("hello".toUpperCase()); // "HELLO"
console.log("HELLO".toLowerCase()); // "hello"

// #047
const str47 = "JavaScript";
console.log(str47.length); // 10

// #048
const str48 = "Hello";
console.log(str48[0]);                      // "H"
console.log(str48[str48.length - 1]);       // "o"
console.log(str48.at(-1));                  // "o"

// #049
const str49 = "Hello, world!";
console.log(str49.slice(7, 12));       // "world"
console.log(str49.substring(7, 12));   // "world"
// slice принимает отрицательные индексы, substring — нет (заменяет отрицательные на 0)
// substr устарел: substr(start, length)
console.log(str49.slice(-6, -1));      // "world"

// #050
const str50 = "Hello, world!";
console.log(str50.includes("world"));      // true
console.log(str50.startsWith("Hello"));    // true
console.log(str50.endsWith("!"));          // true

// #051
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
console.log(capitalize("hello")); // "Hello"

// #052
const str52 = "one two three";
const words52 = str52.split(" ");
console.log(words52);           // ["one","two","three"]
console.log(words52.join("-")); // "one-two-three"

// #053
function countChar(str, char) {
  let count = 0;
  for (const c of str) if (c === char) count++;
  return count;
}
console.log(countChar("hello world", "l")); // 3

// #054
const str54 = "   hello   world   ";
const cleaned = str54.trim().replace(/\s+/g, " ");
console.log(cleaned); // "hello   world" → "hello world"

// #055
const str55 = "foo bar foo baz foo";
console.log(str55.replace("foo", "qux"));    // "qux bar foo baz foo" — первое
console.log(str55.replaceAll("foo", "qux")); // "qux bar qux baz qux" — все

// #056
function isPalindromeStr(str) {
  const cleaned = str.toLowerCase().replace(/[^a-zа-яё]/gi, "");
  return cleaned === cleaned.split("").reverse().join("");
}
console.log(isPalindromeStr("A man a plan a canal Panama")); // true

// #057
function camelToKebab(str) {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
}
console.log(camelToKebab("myVariableName")); // "my-variable-name"

// #058
function escapeHTML(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
console.log(escapeHTML('<script>alert("xss")</script>'));

// #059
function parseQuery(query) {
  return Object.fromEntries(query.split("&").map(p => p.split("=")));
}
console.log(parseQuery("name=Ivan&age=20")); // { name: "Ivan", age: "20" }

// ============================================================
// МАССИВЫ
// ============================================================

// #060
const nums60 = [1, 2, 3];
const strs60 = ["a", "b", "c"];
const mixed60 = [1, "hello", true, null];

// #061
const arr61 = [10, 20, 30, 40];
console.log(arr61[0]);                  // 10 — первый
console.log(arr61[arr61.length - 1]);   // 40 — последний
console.log(arr61[arr61.length - 2]);   // 30 — предпоследний
console.log(arr61.at(-1));              // 40

// #062
const arr62 = [1, 2, 3];
console.log(arr62[10]); // undefined

// #063
const arr63 = [1, 2, 3];
arr63.push(4, 5);
arr63.unshift(0);
console.log(arr63); // [0,1,2,3,4,5]

// #064
const arr64 = [1, 2, 3, 4];
arr64.pop();
arr64.shift();
console.log(arr64); // [2,3]

// #065
const arr65 = [1, 2, 3];
console.log(arr65.length); // 3
arr65.length = 2;
console.log(arr65); // [1,2] — усечён

// #066
const sparse = new Array(5);         // [empty × 5] — разреженный
const dense = Array(5).fill(undefined); // [undefined × 5] — плотный
console.log(0 in sparse); // false
console.log(0 in dense);  // true

// #067
const arr67 = [10, 20, 30];
for (let i = 0; i < arr67.length; i++) console.log(arr67[i]);
for (const v of arr67) console.log(v);
arr67.forEach(v => console.log(v));

// #068
function reverseArr(arr) {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) result.push(arr[i]);
  return result;
}
console.log(reverseArr([1, 2, 3])); // [3,2,1]

// #069
const a69 = [1, 2], b69 = [3, 4];
console.log(a69.concat(b69));   // [1,2,3,4]
console.log([...a69, ...b69]);  // [1,2,3,4]

// #070
const orig70 = [1, 2, 3];
const copy1 = orig70.slice();
const copy2 = [...orig70];
const copy3 = Array.from(orig70);
console.log(copy1 === orig70); // false

// #071
const arr71 = [10, 20, 30, 20];
console.log(arr71.indexOf(20));    // 1
console.log(arr71.includes(30));   // true
console.log(arr71.includes(99));   // false

// #072
const arr72 = [1, 2, 3, 4, 5];
console.log(arr72.slice(1, 3));  // [2,3] — не изменяет оригинал
arr72.splice(1, 2, 99);          // изменяет оригинал: удаляет 2 эл., вставляет 99
console.log(arr72);              // [1,99,4,5]

// #073
function unique73(arr) {
  const seen = [];
  return arr.filter(el => {
    if (seen.includes(el)) return false;
    seen.push(el);
    return true;
  });
}
console.log(unique73([1, 2, 2, 3, 1])); // [1,2,3]

// #074
function chunk74(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
}
console.log(chunk74([1, 2, 3, 4, 5], 2)); // [[1,2],[3,4],[5]]

// #075
function flattenOneLevel(arr) {
  return arr.reduce((acc, el) => acc.concat(el), []);
}
console.log(flattenOneLevel([1, [2, 3], [4, [5]]])); // [1,2,3,4,[5]]

// ============================================================
// МЕТОДЫ МАССИВОВ
// ============================================================

// #076
[10, 20, 30].forEach((v, i) => console.log(i, v));

// #077
const squares77 = [1, 2, 3, 4].map(x => x ** 2);
console.log(squares77); // [1,4,9,16]

// #078
const evens78 = [1, 2, 3, 4, 5, 6].filter(x => x % 2 === 0);
console.log(evens78); // [2,4,6]

// #079
const sum79 = [1, 2, 3, 4, 5].reduce((acc, x) => acc + x, 0);
console.log(sum79); // 15

// #080
// find() — возвращает первый подходящий элемент или undefined
// filter() — возвращает массив всех подходящих элементов
const arr80 = [1, 2, 3, 4];
console.log(arr80.find(x => x > 2));   // 3
console.log(arr80.filter(x => x > 2)); // [3,4]

// #081
const arr81 = [1, 2, 3, 4, 5];
console.log(arr81.some(x => x > 4));  // true
console.log(arr81.every(x => x > 0)); // true
console.log(arr81.every(x => x > 2)); // false

// #082
const fruits82 = ["banana", "apple", "cherry"];
console.log([...fruits82].sort()); // ["apple","banana","cherry"]

// #083
// sort() без колбэка сортирует как строки: [10, 2, 1] → [1, 10, 2]
console.log([10, 2, 1].sort());                    // [1, 10, 2] — неверно!
console.log([10, 2, 1].sort((a, b) => a - b));     // [1, 2, 10] — верно

// #084
const nums84 = [3, 1, 4, 1, 5, 9, 2, 6];
console.log([...nums84].sort((a, b) => a - b)); // по возрастанию
console.log([...nums84].sort((a, b) => b - a)); // по убыванию

// #085
const freq85 = ["a", "b", "a", "c", "b", "a"].reduce((acc, el) => {
  acc[el] = (acc[el] || 0) + 1;
  return acc;
}, {});
console.log(freq85); // {a:3, b:2, c:1}

// #086
const names86 = ["Alice", "Bob", "Charlie"];
const objs86 = names86.map(name => ({ name, length: name.length }));
console.log(objs86);

// #087
console.log([[1, 2], [3, 4]].flat());            // [1,2,3,4]
console.log([1, 2, 3].flatMap(x => [x, x * 2])); // [1,2,2,4,3,6]

// #088
const result88 = [1, 2, 3, 4, 5, 6]
  .filter(x => x % 2 === 0)
  .map(x => x ** 2)
  .sort((a, b) => b - a);
console.log(result88); // [36,16,4]

// #089
const filled89 = new Array(5).fill(0);
console.log(filled89); // [0,0,0,0,0]

// #090
console.log(Array.from("abc"));           // ["a","b","c"]
console.log(Array.from({ length: 3 }, (_, i) => i + 1)); // [1,2,3]

// #091
const pairs91 = [["a", 1], ["b", 2]];
const obj91 = Object.fromEntries(pairs91);
console.log(obj91); // {a:1, b:2}
const back91 = Object.entries(obj91);
console.log(back91); // [["a",1],["b",2]]

// #092
Array.prototype.myMap = function (fn) {
  const result = [];
  for (let i = 0; i < this.length; i++) result.push(fn(this[i], i, this));
  return result;
};
console.log([1, 2, 3].myMap(x => x * 2)); // [2,4,6]

// #093
Array.prototype.myFilter = function (fn) {
  const result = [];
  for (let i = 0; i < this.length; i++) if (fn(this[i], i, this)) result.push(this[i]);
  return result;
};
console.log([1, 2, 3, 4].myFilter(x => x % 2 === 0)); // [2,4]

// #094
Array.prototype.myReduce = function (fn, initial) {
  let acc = initial !== undefined ? initial : this[0];
  const start = initial !== undefined ? 0 : 1;
  for (let i = start; i < this.length; i++) acc = fn(acc, this[i], i, this);
  return acc;
};
console.log([1, 2, 3, 4].myReduce((s, x) => s + x, 0)); // 10

// #095
function groupBy95(arr, fn) {
  return arr.reduce((acc, el) => {
    const key = fn(el);
    acc[key] = acc[key] || [];
    acc[key].push(el);
    return acc;
  }, {});
}
console.log(groupBy95([1, 2, 3, 4, 5], x => x % 2 === 0 ? "even" : "odd"));

// ============================================================
// ПЕРЕБИРАЕМЫЕ ОБЪЕКТЫ
// ============================================================

// #096
// Итерируемый объект — имеет метод Symbol.iterator, возвращающий итератор
// с методом next() → { value, done }.

// #097
// Итерируемые: Array, String, Set, Map, arguments, NodeList, TypedArray, generator

// #098
for (const c of "abc") console.log(c); // a b c
for (const v of [1, 2, 3]) console.log(v);
for (const v of new Set([1, 2, 2, 3])) console.log(v); // 1 2 3

// #099
// Symbol.iterator — метод, возвращающий объект-итератор с методом next().
// for...of неявно вызывает Symbol.iterator.

// #100
const range100 = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { done: true };
      }
    };
  }
};
for (const n of range100) console.log(n); // 1 2 3 4 5

// #101
const set101 = new Set([1, 2, 3]);
console.log([...set101]);       // [1,2,3]
console.log([..."hello"]);      // ["h","e","l","l","o"]

// #102
const chars102 = Array.from("hello");
console.log(chars102); // ["h","e","l","l","o"]

// #103
// Итерируемый — имеет Symbol.iterator (можно for...of)
// Array-like — имеет length и числовые индексы, но не обязательно Symbol.iterator
const arrayLike = { 0: "a", 1: "b", length: 2 };
console.log(Array.from(arrayLike)); // ["a","b"]
// for (const v of arrayLike) {} — TypeError, нет Symbol.iterator

// #104
const obj104 = {
  data: [10, 20, 30],
  [Symbol.iterator]() {
    let i = 0;
    return { next: () => i < this.data.length ? { value: this.data[i++] } : { done: true } };
  }
};
const [first104, second104] = obj104;
console.log(first104, second104); // 10 20

// #105
const infinite105 = {
  [Symbol.iterator]() {
    let n = 0;
    return { next: () => ({ value: n++, done: false }) };
  }
};
const iter105 = infinite105[Symbol.iterator]();
console.log(iter105.next()); // {value:0}
console.log(iter105.next()); // {value:1}

// #106
const obj106 = { a: 1, b: "str", c: 3, d: true };
obj106[Symbol.iterator] = function () {
  const numVals = Object.values(this).filter(v => typeof v === "number");
  let i = 0;
  return { next: () => i < numVals.length ? { value: numVals[i++] } : { done: true } };
};
console.log([...obj106]); // [1, 3]

// #107
function filteredIter(arr, predicate) {
  return {
    [Symbol.iterator]() {
      let i = 0;
      return {
        next: () => {
          while (i < arr.length && !predicate(arr[i])) i++;
          return i < arr.length ? { value: arr[i++] } : { done: true };
        }
      };
    }
  };
}
for (const n of filteredIter([1, 2, 3, 4, 5], x => x % 2 === 0)) console.log(n); // 2 4

// ============================================================
// MAP И SET
// ============================================================

// #108
const map108 = new Map([["name", "Alice"], ["age", 30], ["city", "Moscow"]]);
console.log(map108);

// #109
// Map: ключами могут быть любые типы, хранит порядок вставки, не наследует Object.prototype.
// Object: ключи — строки/символы, может иметь унаследованные свойства.

// #110
const map110 = new Map();
map110.set("key", "value");
console.log(map110.get("key"));  // "value"
console.log(map110.has("key"));  // true
map110.delete("key");
console.log(map110.has("key"));  // false

// #111
const set111 = new Set([1, 2, 3, 2, 1]);
set111.add(4);
console.log(set111); // Set(4) {1,2,3,4}

// #112
const set112 = new Set([1, 1, 2, 2, 3]);
console.log(set112.size); // 3 — дубликаты удалены

// #113
const map113 = new Map([["a", 1]]);
const set113 = new Set([1, 2, 3]);
console.log(map113.size); // 1
console.log(set113.size); // 3

// #114
const map114 = new Map([["x", 10], ["y", 20], ["z", 30]]);
for (const [key, val] of map114) console.log(key, val);

// #115
const obj115 = { a: 1, b: 2, c: 3 };
const map115 = new Map(Object.entries(obj115));
console.log(map115); // Map { a→1, b→2, c→3 }

// #116
const map116 = new Map([["a", 1], ["b", 2]]);
const obj116 = Object.fromEntries(map116);
console.log(obj116); // {a:1, b:2}

// #117
const arr117 = [1, 2, 2, 3, 3, 3];
const unique117 = [...new Set(arr117)];
console.log(unique117); // [1,2,3]

// #118
function intersection(a, b) {
  const setB = new Set(b);
  return a.filter(x => setB.has(x));
}
console.log(intersection([1, 2, 3, 4], [2, 4, 6])); // [2,4]

// #119
function difference(a, b) {
  const setB = new Set(b);
  return a.filter(x => !setB.has(x));
}
console.log(difference([1, 2, 3, 4], [2, 4])); // [1,3]

// #120
function wordFreq(str) {
  const map = new Map();
  for (const word of str.split(" ")) map.set(word, (map.get(word) || 0) + 1);
  return map;
}
console.log(wordFreq("the cat sat on the cat")); // Map {the→2, cat→2, sat→1, on→1}

// #121
function groupByMap(arr, keyFn) {
  const map = new Map();
  for (const el of arr) {
    const key = keyFn(el);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(el);
  }
  return map;
}
console.log(groupByMap([1, 2, 3, 4], x => x % 2 === 0 ? "even" : "odd"));

// #122
function memoize122(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (!cache.has(key)) cache.set(key, fn(...args));
    return cache.get(key);
  };
}
const fib122 = memoize122(n => n <= 1 ? n : fib122(n - 1) + fib122(n - 2));
console.log(fib122(30)); // 832040

// #123
// Используй объект когда: ключи — строки/символы, нужна JSON-сериализация, простая структура.
// Используй Map когда: ключи любого типа (объекты, функции), важен порядок, частые вставки/удаления.

// ============================================================
// WEAKMAP И WEAKSET
// ============================================================

// #124
// WeakMap — как Map, но ключи только объекты, слабые ссылки (GC может удалить).
// Нет итерации, нет size.

// #125
// Слабая ссылка имеет смысл только для объектов — примитивы не очищаются GC.

// #126
// WeakSet — как Set, но хранит только объекты, слабые ссылки.

// #127
// Слабые ссылки осмысленны только для объектов (примитивы — значения, не ссылки).

// #128
// Для итерации нужен фиксированный список элементов.
// WeakMap/WeakSet могут быть очищены GC в любой момент → неопределённое состояние.

// #129
const _privateData = new WeakMap();
class Person129 {
  constructor(name, age) {
    _privateData.set(this, { name, age });
  }
  getInfo() {
    const { name, age } = _privateData.get(this);
    return `${name}, ${age}`;
  }
}
const p129 = new Person129("Alice", 30);
console.log(p129.getInfo()); // "Alice, 30"

// #130
const processed = new WeakSet();
function process130(obj) {
  if (processed.has(obj)) { console.log("уже обработан"); return; }
  processed.add(obj);
  console.log("обрабатываем:", obj);
}
const item130 = { id: 1 };
process130(item130); // обрабатываем
process130(item130); // уже обработан

// #131
// WeakMap хранит слабые ссылки: если объект-ключ удалён из других мест,
// GC удаляет его и запись в WeakMap — утечки памяти не происходит.

// #132
const domMeta = new WeakMap();
function setMeta(el, data) { domMeta.set(el, data); }
function getMeta(el) { return domMeta.get(el); }
// const div = document.createElement("div");
// setMeta(div, { clicks: 0 });
// При удалении div из DOM запись автоматически очищается GC.

// #133
// Map: когда нужна итерация, нужен size, ключи — примитивы, данные долгоживущие.
// WeakMap: когда ключ — объект, данные привязаны к жизни объекта, нужно избежать утечек.

// ============================================================
// Object.keys, values, entries
// ============================================================

// #134
const obj134 = { a: 1, b: 2, c: 3 };
console.log(Object.keys(obj134)); // ["a","b","c"]

// #135
console.log(Object.values(obj134)); // [1,2,3]

// #136
console.log(Object.entries(obj134)); // [["a",1],["b",2],["c",3]]

// #137
for (const [key, val] of Object.entries(obj134)) console.log(`${key}: ${val}`);

// #138
// for...in перебирает ВСЕ перечисляемые свойства включая унаследованные.
// Object.keys() — только собственные перечисляемые.
const child = Object.create({ inherited: true });
child.own = 1;
console.log(Object.keys(child));   // ["own"]
for (const k in child) console.log(k); // "own", "inherited"

// #139
const prices = { apple: 100, banana: 50, cherry: 200 };
const lines = Object.entries(prices).map(([k, v]) => `${k}: ${v}`);
console.log(lines); // ["apple: 100","banana: 50","cherry: 200"]

// #140
function sumValues(obj) {
  return Object.values(obj).filter(v => typeof v === "number").reduce((s, n) => s + n, 0);
}
console.log(sumValues({ a: 1, b: 2, c: "x", d: 3 })); // 6

// #141
const obj141 = { a: 1, b: 0, c: 3, d: -1 };
const positive = Object.fromEntries(Object.entries(obj141).filter(([, v]) => v > 0));
console.log(positive); // {a:1, c:3}

// #142
const obj142 = { b: 2, a: 1, c: 3 };
const sorted142 = Object.fromEntries(Object.entries(obj142).sort(([a], [b]) => a.localeCompare(b)));
console.log(sorted142); // {a:1, b:2, c:3}

// #143
function invert(obj) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));
}
console.log(invert({ a: 1, b: 2, c: 3 })); // {1:"a", 2:"b", 3:"c"}

// #144
function mapObject(obj, fn) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v, k)]));
}
console.log(mapObject({ a: 1, b: 2 }, v => v * 10)); // {a:10, b:20}

// #145
function deepFilter(obj, predicate) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([, v]) => {
        if (v !== null && typeof v === "object" && !Array.isArray(v)) return true;
        return predicate(v);
      })
      .map(([k, v]) => {
        if (v !== null && typeof v === "object" && !Array.isArray(v)) {
          return [k, deepFilter(v, predicate)];
        }
        return [k, v];
      })
  );
}
console.log(deepFilter({ a: 1, b: { c: 2, d: -1 }, e: -3 }, v => v > 0)); // {a:1, b:{c:2}}

// ============================================================
// ДЕСТРУКТУРИРУЮЩЕЕ ПРИСВАИВАНИЕ
// ============================================================

// #146
const [a146, b146, c146] = [1, 2, 3];
console.log(a146, b146, c146); // 1 2 3

// #147
const { name: name147, age: age147 } = { name: "Ann", age: 20 };
console.log(name147, age147); // Ann 20

// #148
const { name: userName148 } = { name: "Bob" };
console.log(userName148); // "Bob"

// #149
const [x149 = 10, y149 = 20] = [5];
console.log(x149, y149); // 5 20
const { a149 = 1, b149 = 2 } = { a149: 99 };
console.log(a149, b149); // 99 2

// #150
const [, second150, , fourth150] = [1, 2, 3, 4];
console.log(second150, fourth150); // 2 4

// #151
let p151 = 1, q151 = 2;
[p151, q151] = [q151, p151];
console.log(p151, q151); // 2 1

// #152
const [head152, ...tail152] = [1, 2, 3, 4];
console.log(head152, tail152); // 1 [2,3,4]

// #153
const { a153, ...rest153 } = { a153: 1, b: 2, c: 3 };
console.log(a153, rest153); // 1 {b:2, c:3}

// #154
const user154 = { name: "Alice", address: { city: "Moscow", zip: "101000" } };
const { name: n154, address: { city: city154, zip: zip154 } } = user154;
console.log(n154, city154, zip154); // Alice Moscow 101000

// #155
function greet155({ name, age = 18 }) {
  return `${name}, ${age}`;
}
console.log(greet155({ name: "Bob", age: 25 })); // Bob, 25
console.log(greet155({ name: "Ann" }));           // Ann, 18

// #156
function distance([x1, y1], [x2, y2]) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
console.log(distance([0, 0], [3, 4])); // 5

// #157
const obj157 = { a: 1, b: 2, c: 3 };
for (const [key, val] of Object.entries(obj157)) {
  console.log(`${key} = ${val}`);
}

// #158
const { a: { b: { c: deep158 } = {} } = {}, arr: [first158 = 0] = [] } =
  { a: { b: { c: 42 } }, arr: [7] };
console.log(deep158, first158); // 42 7

// #159
function normalizeUser({ name = "Anonymous", age = 0, email = null, roles = [] } = {}) {
  return { name, age, email, roles };
}
console.log(normalizeUser({ name: "Alice", roles: ["admin"] }));

// #160
const range160 = {
  [Symbol.iterator]() {
    let n = 1;
    return { next: () => n <= 3 ? { value: n++ } : { done: true } };
  }
};
const [r1, r2, r3] = range160;
console.log(r1, r2, r3); // 1 2 3

// #161
const config161 = { db: { host: "localhost", port: 5432, creds: { user: "admin", pass: "secret" } } };
const { db: { host: dbHost, port: dbPort, creds: { user: dbUser } } } = config161;
console.log(dbHost, dbPort, dbUser); // localhost 5432 admin

// ============================================================
// ДАТА И ВРЕМЯ
// ============================================================

// #162
const now162 = new Date();
console.log(now162);

// #163
const fromStr = new Date("2026-03-15");
const fromArgs = new Date(2026, 2, 15, 12, 30, 0); // месяц 0-based!
console.log(fromStr, fromArgs);

// #164
const d164 = new Date();
console.log(d164.getFullYear(), d164.getMonth() + 1, d164.getDate());
console.log(d164.getHours(), d164.getMinutes(), d164.getSeconds());

// #165
// getDay() — день недели (0=вс, 1=пн, ... 6=сб)
// getDate() — день месяца (1–31)
const d165 = new Date("2026-03-18");
console.log(d165.getDay());  // 3 (среда)
console.log(d165.getDate()); // 18

// #166
const d166 = new Date();
d166.setFullYear(2030);
d166.setMonth(11);
d166.setDate(31);
console.log(d166.toDateString());

// #167
// Timestamp — миллисекунды с 01.01.1970 UTC (Unix time * 1000)
console.log(Date.now()); // число типа 1710000000000

// #168
const d168 = new Date();
console.log(d168.toString());
console.log(d168.toDateString());
console.log(d168.toTimeString());

// #169
function daysBetween(a, b) {
  return Math.abs(Math.round((b - a) / (1000 * 60 * 60 * 24)));
}
const d1 = new Date("2026-01-01"), d2 = new Date("2026-12-31");
console.log(daysBetween(d1, d2)); // 364

// #170
function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}
console.log(formatDate(new Date("2026-03-15"))); // "15.03.2026"

// #171
function minutesPassed(date) {
  return Math.floor((Date.now() - date.getTime()) / 60000);
}
console.log(minutesPassed(new Date(Date.now() - 5 * 60 * 1000))); // 5

// #172
const in7days = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
console.log(formatDate(in7days));

// #173
// Локальные методы (getHours) зависят от часового пояса системы.
// UTC-методы (getUTCHours) возвращают время по UTC.
const d173 = new Date();
console.log(d173.getHours(), d173.getUTCHours());

// #174
console.log(new Date().toISOString()); // "2026-03-18T12:00:00.000Z" — ISO 8601

// #175
function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}
console.log(isWeekend(new Date("2026-03-21"))); // true (суббота)

// #176
function weekOfMonth(date) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return Math.ceil((date.getDate() + firstDay) / 7);
}
console.log(weekOfMonth(new Date("2026-03-18"))); // 3

// #177
function countdown(targetDate) {
  const diff = targetDate - Date.now();
  if (diff <= 0) return "Время вышло";
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${d}д ${h}ч ${m}м ${s}с`;
}
console.log(countdown(new Date("2027-01-01")));

// #178
function addMonths(date, months) {
  const result = new Date(date);
  const targetMonth = result.getMonth() + months;
  result.setMonth(targetMonth);
  // Если переполнился день (напр. 31 марта + 1 мес → апрель не имеет 31-го)
  if (result.getMonth() !== ((targetMonth % 12) + 12) % 12) {
    result.setDate(0); // последний день предыдущего месяца
  }
  return result;
}
console.log(formatDate(addMonths(new Date("2026-01-31"), 1))); // 28.02.2026

// #179
const d179 = new Date("2026-03-15");
// Вручную:
console.log(formatDate(d179));
// Intl.DateTimeFormat:
console.log(new Intl.DateTimeFormat("ru-RU").format(d179)); // 15.03.2026
// ISO:
console.log(d179.toISOString().slice(0, 10)); // "2026-03-15"

// #180
function parseCustomDate(str) {
  const [datePart, timePart] = str.split(" ");
  const [dd, mm, yyyy] = datePart.split(".").map(Number);
  const [hh, min] = timePart.split(":").map(Number);
  return new Date(yyyy, mm - 1, dd, hh, min);
}
console.log(parseCustomDate("15.03.2026 20:30")); // Date object

// #181
class EventScheduler {
  constructor() { this.events = []; }
  add(name, date) { this.events.push({ name, date: new Date(date) }); }
  nearest() {
    const now = new Date();
    return this.events
      .filter(e => e.date > now)
      .sort((a, b) => a.date - b.date)[0] || null;
  }
}
const sched = new EventScheduler();
sched.add("Meeting", "2026-04-01");
sched.add("Deadline", "2026-03-20");
console.log(sched.nearest());

// ============================================================
// ФОРМАТ JSON, МЕТОД toJSON
// ============================================================

// #182
// JSON — текстовый формат обмена данными. Отличия от JS:
// ключи только в двойных кавычках, нет комментариев, нет undefined/function/Symbol.

// #183
const obj183 = { name: "Alice", age: 30 };
console.log(JSON.stringify(obj183)); // '{"name":"Alice","age":30}'

// #184
const str184 = '{"name":"Alice","age":30}';
console.log(JSON.parse(str184)); // { name: "Alice", age: 30 }

// #185
// Сериализуются: string, number, boolean, null, array, object.
// НЕ сериализуются: undefined, function, Symbol, BigInt (выбрасывает ошибку).

// #186
const obj186 = { a: 1, fn: () => {}, u: undefined, s: Symbol() };
console.log(JSON.stringify(obj186)); // '{"a":1}' — fn, u, s пропущены

// #187
const obj187 = { date: new Date("2026-03-15") };
console.log(JSON.stringify(obj187)); // '{"date":"2026-03-15T00:00:00.000Z"}' — вызывается toISOString()

// #188
const obj188 = { name: "Alice", age: 30, password: "secret" };
console.log(JSON.stringify(obj188, ["name", "age"])); // '{"name":"Alice","age":30}'

// #189
const obj189 = { a: 1, b: "skip", c: 3 };
const json189 = JSON.stringify(obj189, (key, val) => typeof val === "string" ? undefined : val);
console.log(json189); // '{"a":1,"c":3}'

// #190
const obj190 = { a: { b: { c: 1 } } };
console.log(JSON.stringify(obj190, null, 2));

// #191
const json191 = '{"a":1,"date":"2026-03-15T00:00:00.000Z"}';
const parsed191 = JSON.parse(json191, (key, val) => {
  if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}T/.test(val)) return new Date(val);
  return val;
});
console.log(parsed191.date instanceof Date); // true

// #192
const json192 = '{"createdAt":"2026-03-15T00:00:00.000Z"}';
const parsed192 = JSON.parse(json192, (key, val) =>
  typeof val === "string" && /^\d{4}-\d{2}-\d{2}T/.test(val) ? new Date(val) : val
);
console.log(parsed192.createdAt instanceof Date); // true

// #193
const obj193 = {
  name: "test",
  toJSON() { return { name: this.name, serialized: true }; }
};
console.log(JSON.stringify(obj193)); // '{"name":"test","serialized":true}'

// #194
class Money {
  constructor(amount, currency) { this.amount = amount; this.currency = currency; }
  toJSON() { return `${this.amount} ${this.currency}`; }
}
console.log(JSON.stringify(new Money(100, "USD"))); // '"100 USD"'

// #195
const map195 = new Map([["a", 1], ["b", 2]]);
const json195 = JSON.stringify([...map195]);
console.log(json195); // '[["a",1],["b",2]]'
const restoredMap = new Map(JSON.parse(json195));
console.log(restoredMap.get("a")); // 1

// #196
const set196 = new Set([1, 2, 3]);
const json196 = JSON.stringify([...set196]);
console.log(json196); // '[1,2,3]'
const restoredSet = new Set(JSON.parse(json196));
console.log(restoredSet.has(2)); // true

// #197
// Циклическая ссылка: объект ссылается сам на себя → JSON.stringify уходит в бесконечную рекурсию.
const a197 = {};
a197.self = a197;
try { JSON.stringify(a197); } catch (e) { console.log(e.message); } // TypeError

// #198
function safeStringify(obj) {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, val) => {
    if (typeof val === "object" && val !== null) {
      if (seen.has(val)) return "[Circular]";
      seen.add(val);
    }
    return val;
  });
}
const a198 = { x: 1 };
a198.self = a198;
console.log(safeStringify(a198)); // '{"x":1,"self":"[Circular]"}'

// #199
function saveState(obj) {
  return JSON.stringify(obj, (key, val) => {
    if (val instanceof Date) return { __type: "Date", value: val.toISOString() };
    if (val instanceof Map) return { __type: "Map", value: [...val] };
    if (val instanceof Set) return { __type: "Set", value: [...val] };
    return val;
  });
}
function loadState(json) {
  return JSON.parse(json, (key, val) => {
    if (val?.__type === "Date") return new Date(val.value);
    if (val?.__type === "Map") return new Map(val.value);
    if (val?.__type === "Set") return new Set(val.value);
    return val;
  });
}
const state = { createdAt: new Date(), tags: new Set(["a", "b"]), meta: new Map([["k", 1]]) };
const saved = saveState(state);
const loaded = loadState(saved);
console.log(loaded.createdAt instanceof Date); // true
console.log(loaded.tags instanceof Set);       // true

// #200
const inner200a = {
  value: 42,
  toJSON() { return { v: this.value, source: "A" }; }
};
const inner200b = {
  items: [1, 2, 3],
  toJSON() { return this.items; }
};
const outer200 = {
  name: "root",
  child1: inner200a,
  child2: inner200b,
};
console.log(JSON.stringify(outer200, null, 2));
// {"name":"root","child1":{"v":42,"source":"A"},"child2":[1,2,3]}
