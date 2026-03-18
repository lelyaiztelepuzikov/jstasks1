// ============================================================
// ФУНКЦИИ: ОСНОВЫ
// ============================================================

// #001
function greet(name) { return `Привет, ${name}!`; }
console.log(greet("Alice")); // "Привет, Alice!"

// #002
function sum(a, b) { return a + b; }
console.log(sum(3, 4)); // 7

// #003
// return — возвращает значение вызывающему коду.
// console.log — выводит в консоль, не возвращает значение (возвращает undefined).

// #004
// Параметры — переменные в объявлении функции: function fn(a, b) — a, b параметры.
// Аргументы — конкретные значения при вызове: fn(1, 2) — 1, 2 аргументы.

// #005
function isEven(n) { return n % 2 === 0; }
console.log(isEven(4)); // true

// #006
// Недостающие параметры получают значение undefined.
function show(a, b) { console.log(a, b); }
show(1); // 1 undefined

// #007
function hello(name = "мир") { return `Привет, ${name}!`; }
console.log(hello());       // "Привет, мир!"
console.log(hello("Bob")); // "Привет, Bob!"

// #008
function power(base, exp = 2) { return base ** exp; }
console.log(power(3));    // 9
console.log(power(2, 10)); // 1024

// #009
// arguments — псевдомассив всех аргументов функции (не работает в стрелочных).
function showArgs() {
  for (let i = 0; i < arguments.length; i++) console.log(arguments[i]);
}
showArgs(1, "hi", true);

// #010
function max(a, b, c) { return Math.max(a, b, c); }
console.log(max(3, 7, 2)); // 7

// #011
function sumAll(...nums) { return nums.reduce((s, n) => s + n, 0); }
console.log(sumAll(1, 2, 3, 4, 5)); // 15

// #012
function repeat(str, n) {
  let result = "";
  for (let i = 0; i < n; i++) result += str;
  return result;
}
console.log(repeat("ab", 3)); // "ababab"

// #013
// Function Declaration поднимается (hoisting) — вся функция доступна до строки объявления.

// #014
console.log(hoisted()); // "работает!" — Function Declaration доступна до объявления
function hoisted() { return "работает!"; }

// #015
function celsiusToFahrenheit(c) { return c * 9 / 5 + 32; }
console.log(celsiusToFahrenheit(100)); // 212

// #016
function getFullName(firstName, lastName) { return `${firstName} ${lastName}`; }
console.log(getFullName("John", "Doe")); // "John Doe"

// #017
// Если нет return — функция возвращает undefined.
function noReturn() { 42; }
console.log(noReturn()); // undefined

// #018
function absolute(n) { return n < 0 ? -n : n; }
console.log(absolute(-5)); // 5

// #019
function countdown(n) {
  if (n < 0) return;
  console.log(n);
  countdown(n - 1);
}
countdown(5);

// #020
function clamp(val, min, max) { return Math.min(Math.max(val, min), max); }
console.log(clamp(15, 0, 10)); // 10

// #021
// Function scope: var — виден во всей функции.
// Block scope: let/const — виден только в блоке {}.
function example21() {
  if (true) { var a = 1; let b = 2; }
  console.log(a); // 1 — var виден
  // console.log(b); // ReferenceError — let не виден
}
example21();

// #022
function makeCounter() {
  let count = 0;
  return { inc: () => ++count, get: () => count };
}
const counter = makeCounter();
counter.inc(); counter.inc();
console.log(counter.get()); // 2

// #023
function makeMultiplier(factor) { return n => n * factor; }
const triple = makeMultiplier(3);
console.log(triple(7)); // 21

// #024
// Чистая функция: нет побочных эффектов, одинаковый вход → одинаковый выход.
const pureAdd = (a, b) => a + b;                    // чистая
let total = 0;
const impureAdd = n => { total += n; return total; }; // нечистая

// #025
function factorial(n) { return n <= 1 ? 1 : n * factorial(n - 1); }
console.log(factorial(6)); // 720

// #026
// Функция высшего порядка — принимает или возвращает функцию.
function applyTwice(fn, x) { return fn(fn(x)); }
console.log(applyTwice(x => x * 2, 3)); // 12

// #027
function compose(f, g) { return x => f(g(x)); }
const inc = x => x + 1, double = x => x * 2;
console.log(compose(inc, double)(5)); // 11

// #028
// Каррирование — преобразование f(a,b) в f(a)(b).
const curriedSum = a => b => a + b;
console.log(curriedSum(3)(4)); // 7

// #029
function introduce(greeting) { return `${greeting}, ${this.name}`; }
const person = { name: "Alice" };
console.log(introduce.call(person, "Привет"));       // call — аргументы через запятую
console.log(introduce.apply(person, ["Привет"]));    // apply — аргументы массивом
const boundIntro = introduce.bind(person, "Привет"); // bind — возвращает функцию
console.log(boundIntro());

// #030
// this в обычной функции зависит от способа вызова:
// obj.fn() → this = obj; fn() → this = globalThis (или undefined в strict mode)

// #031
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (!cache.has(key)) cache.set(key, fn(...args));
    return cache.get(key);
  };
}
const memoFact = memoize(factorial);
console.log(memoFact(10)); // 3628800

// #032
// IIFE — функция, вызванная сразу после объявления. Создаёт изолированную область видимости.
const result32 = (function () {
  const x = 10;
  return x * x;
})();
console.log(result32); // 100

// #033
function pipe(...fns) { return x => fns.reduce((v, f) => f(v), x); }
const process33 = pipe(x => x + 1, x => x * 2, x => x - 3);
console.log(process33(5)); // (5+1)*2-3 = 9

// #034
// Побочный эффект — изменение чего-либо вне функции: мутация, I/O, глобальные переменные.
// Избегают для предсказуемости, тестируемости и переиспользуемости.

// #035
function once(fn) {
  let called = false, result;
  return function (...args) {
    if (!called) { called = true; result = fn(...args); }
    return result;
  };
}
const initOnce = once(() => "инициализировано");
console.log(initOnce()); // "инициализировано"
console.log(initOnce()); // "инициализировано" — fn не вызывается повторно

// #036
// Без базового случая — бесконечная рекурсия → переполнение стека вызовов (RangeError: Maximum call stack size exceeded).

// #037
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// #038
function partial(fn, ...preset) { return (...args) => fn(...preset, ...args); }
const add10 = partial(sum, 10);
console.log(add10(5)); // 15

// #039
function deepClone39(val) {
  if (val === null || typeof val !== "object") return val;
  if (Array.isArray(val)) return val.map(deepClone39);
  return Object.fromEntries(Object.entries(val).map(([k, v]) => [k, deepClone39(v)]));
}
console.log(deepClone39({ a: { b: [1, 2] } }));

// #040
// Хвостовая рекурсия — рекурсивный вызов последний в функции (нет операций после него).
function factTail(n, acc = 1) { return n <= 1 ? acc : factTail(n - 1, n * acc); }
console.log(factTail(6)); // 720

// #041
function curry(fn) {
  return function curried(...args) {
    return args.length >= fn.length ? fn(...args) : (...more) => curried(...args, ...more);
  };
}
const cAdd = curry((a, b, c) => a + b + c);
console.log(cAdd(1)(2)(3)); // 6
console.log(cAdd(1, 2)(3)); // 6

// #042
function trampoline(fn) {
  return function (...args) {
    let result = fn(...args);
    while (typeof result === "function") result = result();
    return result;
  };
}
const factTramp = trampoline(function f(n, acc = 1) {
  return n <= 1 ? acc : () => f(n - 1, n * acc);
});
console.log(factTramp(6)); // 720

// #043
function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) { lastCall = now; return fn(...args); }
  };
}

// #044
// Maybe — монада для безопасной обработки null/undefined.
const Maybe = {
  of: val => ({
    value: val,
    isNothing: () => val == null,
    map: fn => val == null ? Maybe.of(null) : Maybe.of(fn(val)),
    getOrElse: def => val ?? def,
  })
};
console.log(Maybe.of(null).map(x => x * 2).getOrElse(0)); // 0
console.log(Maybe.of(5).map(x => x * 2).getOrElse(0));    // 10

// #045
function memoizeDeep(fn) {
  const cache = [];
  return function (...args) {
    const cached = cache.find(e => JSON.stringify(e.args) === JSON.stringify(args));
    if (cached) return cached.result;
    const result = fn(...args);
    cache.push({ args, result });
    return result;
  };
}

// #046
async function asyncCompose(...fns) {
  return x => fns.reduceRight(async (acc, fn) => fn(await acc), Promise.resolve(x));
}
const pipeline46 = await asyncCompose(
  async x => x * 2,
  async x => x + 1
);
console.log(await pipeline46(5)); // 12

// #047
// Ловушка var в цикле: все callback ссылаются на одну и ту же переменную i.
const funcs47 = [];
for (var i = 0; i < 3; i++) funcs47.push(() => i); // все вернут 3
console.log(funcs47.map(f => f())); // [3,3,3]
// Исправление: let создаёт новую переменную на каждой итерации
const funcs47fix = [];
for (let j = 0; j < 3; j++) funcs47fix.push(() => j);
console.log(funcs47fix.map(f => f())); // [0,1,2]

// #048
function overload(...implementations) {
  return function (...args) {
    const impl = implementations.find(fn => fn.length === args.length);
    if (!impl) throw new Error(`Нет реализации для ${args.length} аргументов`);
    return impl(...args);
  };
}
const describe = overload(
  (n) => `число: ${n}`,
  (a, b) => `сумма: ${a + b}`,
  (a, b, c) => `все три: ${a}, ${b}, ${c}`
);
console.log(describe(5));      // "число: 5"
console.log(describe(1, 2));   // "сумма: 3"

// #049
async function retry(fn, times) {
  for (let i = 0; i < times; i++) {
    try { return await fn(); }
    catch (e) { if (i === times - 1) throw e; }
  }
}

// #050
// CPS — результат передаётся в функцию-продолжение, а не возвращается.
function factCPS(n, cont) {
  if (n <= 1) return cont(1);
  return factCPS(n - 1, result => cont(n * result));
}
factCPS(6, console.log); // 720

// #051
function flatten51(arr, acc = []) {
  for (const el of arr) Array.isArray(el) ? flatten51(el, acc) : acc.push(el);
  return acc;
}
console.log(flatten51([1, [2, [3, [4]]]])); // [1,2,3,4]

// #052
function juxt(...fns) { return x => fns.map(fn => fn(x)); }
const stats = juxt(Math.min, Math.max, x => x.length);
console.log(stats([3, 1, 4, 1, 5])); // [1, 5, 5]

// #053
function* infiniteSeq(start = 0) { while (true) yield start++; }
const gen53 = infiniteSeq(10);
console.log(gen53.next().value); // 10
console.log(gen53.next().value); // 11

// #054
function createObserver() {
  const listeners = {};
  return {
    on: (event, fn) => { (listeners[event] = listeners[event] || []).push(fn); },
    off: (event, fn) => { listeners[event] = (listeners[event] || []).filter(f => f !== fn); },
    emit: (event, ...args) => (listeners[event] || []).forEach(fn => fn(...args)),
  };
}
const obs54 = createObserver();
obs54.on("data", x => console.log("получено:", x));
obs54.emit("data", 42); // "получено: 42"

// #055
function createEnum(...keys) {
  return Object.freeze(Object.fromEntries(keys.map(k => [k, k])));
}
const Status = createEnum("PENDING", "DONE", "ERROR");
console.log(Status.DONE); // "DONE"

// #056
const f56 = x => x + 1, g56 = x => x * 2;
const composed = compose(f56, g56);
console.log(composed(5) === f56(g56(5))); // true — 11 === 11

// #057
function zip57(...arrs) {
  const len = Math.min(...arrs.map(a => a.length));
  return Array.from({ length: len }, (_, i) => arrs.map(a => a[i]));
}
console.log(zip57([1, 2, 3], ["a", "b", "c"], [true, false, true]));

// #058
function createPrivate(init) {
  let state = { ...init };
  return {
    get: key => state[key],
    set: (key, val) => { state = { ...state, [key]: val }; },
    getAll: () => ({ ...state }),
  };
}
const priv = createPrivate({ x: 1, y: 2 });
priv.set("x", 99);
console.log(priv.getAll()); // { x: 99, y: 2 }

// #059
async function asyncPool(limit, tasks) {
  const results = [];
  const executing = new Set();
  for (const task of tasks) {
    const p = Promise.resolve().then(task).then(r => { executing.delete(p); return r; });
    executing.add(p);
    results.push(p);
    if (executing.size >= limit) await Promise.race(executing);
  }
  return Promise.all(results);
}

// #060
// Функтор — структура с методом map, сохраняющим структуру при трансформации.
function Box(val) {
  return {
    map: fn => Box(fn(val)),
    fold: fn => fn(val),
  };
}
console.log(Box(5).map(x => x * 2).fold(x => x)); // 10

// ============================================================
// FUNCTION EXPRESSION
// ============================================================

// #061
// Function Declaration: function foo() {} — поднимается, доступна везде в области видимости.
// Function Expression: const foo = function() {} — не поднимается, доступна только после строки.
const square61 = function (x) { return x * x; };
console.log(square61(5)); // 25

// #062
const square62 = x => x * x;
console.log(square62(4)); // 16

// #063
// Нет — Function Expression не поднимается. До строки объявления — ReferenceError (let/const) или undefined (var).

// #064
const anon = function (x) { return x + 1; };
console.log(anon(9)); // 10

// #065
// Именованное Function Expression — имя доступно только внутри самой функции (для рекурсии, отладки).
const fib65 = function fibonacci(n) {
  return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};
console.log(fib65(8)); // 21

// #066
setTimeout(function () { console.log("через 0 мс"); }, 0);

// #067
function doLater(callback, ms) { setTimeout(callback, ms); }
doLater(function () { console.log("callback!"); }, 100);

// #068
const multiply68 = function (a, b) { return a * b; };
console.log(multiply68(3, 4)); // 12

// #069
const obj69 = {
  name: "Alice",
  greet: function () { return `Привет от ${this.name}`; }
};
console.log(obj69.greet()); // "Привет от Alice"

// #070
const caller70 = function (fn) { return fn(); };
console.log(caller70(function () { return "вызвана!"; })); // "вызвана!"

// #071
const fn71 = function () {};
console.log(typeof fn71); // "function"

// #072
[1, 2, 3].forEach(function (v) { console.log(v * 2); });

// #073
// const f = function foo() {} — foo доступно только внутри, снаружи используется f.
// function foo() {} — объявление, foo доступно в текущей области видимости.

// #074
const greet74 = function (name = "World") { return `Hello, ${name}!`; };
console.log(greet74()); // "Hello, World!"

// #075
// let/var можно переприсвоить. const — нет, будет TypeError.
let fn75 = function () { return 1; };
fn75 = function () { return 2; }; // OK для let
console.log(fn75()); // 2

// #076
function runTwice(fn) { fn(); fn(); }
runTwice(function () { console.log("запуск"); });

// #077
// let до инициализации — ReferenceError (Temporal Dead Zone).
// var до инициализации — undefined (поднимается, но без значения).

// #078
const fns78 = [
  function () { return "первая"; },
  function () { return "вторая"; },
  function () { return "третья"; },
];
fns78.forEach(fn => console.log(fn()));

// #079
// First-class citizen — функции можно: присваивать переменным, передавать как аргументы,
// возвращать из функций, хранить в объектах/массивах.

// #080
const outer80 = function () {
  return function () { return "внутренняя"; };
};
console.log(outer80()()); // "внутренняя"

// #081
// Function Declaration: поднимается полностью — можно вызвать до объявления.
// Function Expression: не поднимается — только переменная (undefined/TDZ) до строки присваивания.

// #082
const apply82 = function (fn, value) { return fn(value); };
console.log(apply82(x => x ** 2, 5)); // 25

// #083
// Синтаксис 1:
(function () { console.log("IIFE 1"); })();
// Синтаксис 2:
(function () { console.log("IIFE 2"); }());

// #084
const counter84 = (function () {
  let _count = 0;
  return {
    inc() { return ++_count; },
    get() { return _count; },
  };
})();
counter84.inc(); counter84.inc();
console.log(counter84.get()); // 2

// #085
const factorial85 = function f(n) { return n <= 1 ? 1 : n * f(n - 1); };
console.log(factorial85(5)); // 120

// #086
console.log([1, 2, 3].map(function (x) { return x * 10; }));
console.log([1, 2, 3].filter(function (x) { return x > 1; }));
console.log([1, 2, 3].reduce(function (s, x) { return s + x; }, 0));

// #087
const makeCounter87 = function () {
  let n = 0;
  return function () { return ++n; };
};
const cnt = makeCounter87();
console.log(cnt(), cnt(), cnt()); // 1 2 3

// #088
const createAdder = function (n) {
  return function (x) { return x + n; };
};
const add5 = createAdder(5);
console.log(add5(10)); // 15

// #089
// Именованный FE: имя жёстко вшито в функцию, не зависит от переменной-ссылки.
// Переменная может быть переназначена, а имя функции — нет.

// #090
const compose90 = function (f, g) { return function (x) { return f(g(x)); }; };
console.log(compose90(x => x + 1, x => x * 2)(4)); // 9

// #091
// В браузере:
// document.getElementById("btn").addEventListener("click", function(e) { console.log(e.target); });

// #092
const strategies92 = {
  add: function (a, b) { return a + b; },
  sub: function (a, b) { return a - b; },
  mul: function (a, b) { return a * b; },
};
function calc92(op, a, b) { return strategies92[op]?.(a, b) ?? "нет стратегии"; }
console.log(calc92("add", 3, 4)); // 7

// #093
function myForEach(arr, callback) { for (let i = 0; i < arr.length; i++) callback(arr[i], i, arr); }
myForEach([10, 20, 30], function (v, i) { console.log(i, v); });

// #094
const memoize94 = function (fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (!(key in cache)) cache[key] = fn(...args);
    return cache[key];
  };
};

// #095
function named95() {}
const anonExpr = function () {};
const namedExpr = function myName() {};
console.log(named95.name);   // "named95"
console.log(anonExpr.name);  // "anonExpr" — берётся из переменной
console.log(namedExpr.name); // "myName"

// #096
function createValidator(rules) {
  return function (obj) {
    const errors = {};
    for (const [key, validate] of Object.entries(rules)) {
      const error = validate(obj[key]);
      if (error) errors[key] = error;
    }
    return Object.keys(errors).length ? errors : null;
  };
}
const validate = createValidator({
  name: v => (!v ? "обязательно" : null),
  age: v => (v < 18 ? "минимум 18" : null),
});
console.log(validate({ name: "", age: 15 })); // {name:"обязательно", age:"минимум 18"}

// #097
// Имя именованного FE — read-only внутри самой функции. В строгом режиме присваивание ничего не делает.
const fn97 = function me() { me = 42; return me; }; // me остаётся функцией внутри
console.log(typeof fn97()); // "function"

// #098
const chain98 = (function () {
  let val = 0;
  const api = {
    add: function (n) { val += n; return api; },
    mul: function (n) { val *= n; return api; },
    result: function () { return val; },
  };
  return api;
})();
console.log(chain98.add(5).mul(2).add(3).result()); // 13

// #099
const once99 = function (fn) {
  let done = false, res;
  return function (...args) {
    if (!done) { done = true; res = fn(...args); }
    return res;
  };
};

// #100
// Функциональный интерфейс — объект или соглашение с одним методом/функцией.
// Function Expression реализует его непосредственно — это и есть "один метод".

// #101
// Y-комбинатор — позволяет писать рекурсию без имени функции.
const Y = f => (x => f(v => x(x)(v)))(x => f(v => x(x)(v)));
const factY = Y(f => n => n <= 1 ? 1 : n * f(n - 1));
console.log(factY(6)); // 720

// #102
// Ловушка: все функции в массиве используют одну и ту же переменную (var или let в внешней области).
let x102 = 0;
const fns102 = [
  function () { return x102; },
  function () { return x102; },
];
x102 = 99;
console.log(fns102[0]()); // 99 — мутируемое замыкание
// Исправление: замкнуть значение в момент создания
const fns102fix = [0, 1, 2].map(function (i) { return function () { return i; }; });
console.log(fns102fix.map(f => f())); // [0,1,2]

// #103
const pipeline103 = function (...fns) {
  return function (input) { return fns.reduce((v, fn) => fn(v), input); };
};
console.log(pipeline103(x => x + 1, x => x * 2, x => `result: ${x}`)(5)); // "result: 12"

// #104
const curry104 = function (fn) {
  return function curried(...args) {
    return args.length >= fn.length ? fn(...args) : (...more) => curried(...args, ...more);
  };
};
const add104 = curry104((a, b, c) => a + b + c);
console.log(add104(1)(2)(3)); // 6

// #105
const partial105 = function (fn, ...preset) {
  return function (...rest) { return fn(...preset, ...rest); };
};
const double105 = partial105((a, b) => a * b, 2);
console.log(double105(7)); // 14

// #106
function withLogging(fn) {
  return function (...args) {
    console.log(`вызов: ${fn.name}(${args})`);
    const result = fn(...args);
    console.log(`результат: ${result}`);
    return result;
  };
}
const loggedSum = withLogging(sum);
loggedSum(3, 4);

// #107
const lazy107 = function (fn) {
  let computed = false, value;
  return function () {
    if (!computed) { computed = true; value = fn(); }
    return value;
  };
};
const lazyRand = lazy107(() => { console.log("вычисление..."); return Math.random(); });
console.log(lazyRand()); // "вычисление..." + число
console.log(lazyRand()); // только число — fn не вызывается

// #108
const obj108 = {
  name: "Alice",
  method: function () { return this.name; }, // this = obj при obj.method()
};
const cb108 = obj108.method;
// cb108() — this потерян (undefined/globalThis)

// #109
const createEmitter = function () {
  const events = new Map();
  return {
    on: function (ev, fn) { (events.get(ev) || events.set(ev, []).get(ev)).push(fn); },
    off: function (ev, fn) { events.set(ev, (events.get(ev) || []).filter(f => f !== fn)); },
    emit: function (ev, ...args) { (events.get(ev) || []).forEach(fn => fn(...args)); },
  };
};
const ee = createEmitter();
ee.on("ping", x => console.log("pong", x));
ee.emit("ping", 42); // "pong 42"

// #110
const memoizeAsync = function (fn) {
  const cache = new Map();
  return async function (...args) {
    const key = JSON.stringify(args);
    if (!cache.has(key)) cache.set(key, fn(...args));
    return cache.get(key);
  };
};

// #111
const sequence111 = function (...fns) {
  return function (input) { return fns.reduce((acc, fn) => fn(acc), input); };
};
console.log(sequence111(x => x * 2, x => x + 10, x => x / 2)(4)); // 9

// #112
// 1) Присваивание: const fn = function() {};
// 2) Аргумент: setTimeout(function() {}, 0);
// 3) Возврат: function maker() { return function() {}; }

// #113
const createStateMachine = function (transitions) {
  let state = Object.keys(transitions)[0];
  return {
    getState: function () { return state; },
    transition: function (event) {
      const next = transitions[state]?.[event];
      if (!next) throw new Error(`Нет перехода: ${state} → ${event}`);
      state = next;
      return state;
    },
  };
};
const sm = createStateMachine({
  idle: { start: "running" },
  running: { pause: "paused", stop: "idle" },
  paused: { resume: "running" },
});
console.log(sm.transition("start"));  // "running"
console.log(sm.transition("pause"));  // "paused"

// #114
function createMiddlewareChain() {
  const stack = [];
  return {
    use: function (fn) { stack.push(fn); },
    run: function (ctx) {
      let idx = 0;
      const next = () => { if (idx < stack.length) stack[idx++](ctx, next); };
      next();
    },
  };
}
const mw = createMiddlewareChain();
mw.use(function (ctx, next) { ctx.steps = []; ctx.steps.push(1); next(); });
mw.use(function (ctx, next) { ctx.steps.push(2); next(); });
const ctx = {};
mw.run(ctx);
console.log(ctx.steps); // [1, 2]

// #115
// Referential transparency — выражение можно заменить его результатом без изменения поведения.
const double115 = function (x) { return x * 2; };
// double115(5) везде можно заменить на 10 — результат одинаков.

// #116
const memoizeWithTTL = function (fn, ttl) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    const entry = cache.get(key);
    if (entry && Date.now() - entry.time < ttl) return entry.value;
    const value = fn(...args);
    cache.set(key, { value, time: Date.now() });
    return value;
  };
};

// #117
const createStore = function (reducer, initialState) {
  let state = initialState;
  const listeners = [];
  return {
    getState: function () { return state; },
    dispatch: function (action) { state = reducer(state, action); listeners.forEach(fn => fn()); },
    subscribe: function (fn) { listeners.push(fn); return () => { listeners.splice(listeners.indexOf(fn), 1); }; },
  };
};
const store = createStore(
  (state, action) => action.type === "INC" ? state + 1 : state,
  0
);
store.subscribe(() => console.log("state:", store.getState()));
store.dispatch({ type: "INC" }); // state: 1

// #118
const promisify = function (fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, function (err, result) {
        if (err) reject(err); else resolve(result);
      });
    });
  };
};

// #119
// Flyweight — разделяет общее состояние между объектами для экономии памяти.
const flyweightFactory = function () {
  const pool = new Map();
  return function (key, createFn) {
    if (!pool.has(key)) pool.set(key, createFn());
    return pool.get(key);
  };
};
const getFlyweight = flyweightFactory();
const a119 = getFlyweight("config", () => ({ data: "общие данные" }));
const b119 = getFlyweight("config", () => ({ data: "другие данные" }));
console.log(a119 === b119); // true — один объект

// #120
const createDI = function () {
  const registry = new Map();
  return {
    register: function (name, factory) { registry.set(name, factory); },
    resolve: function (name) {
      const factory = registry.get(name);
      if (!factory) throw new Error(`Зависимость не зарегистрирована: ${name}`);
      return factory(this.resolve.bind(this));
    },
  };
};
const di = createDI();
di.register("db", () => ({ query: () => "данные" }));
di.register("service", resolve => ({ get: () => resolve("db").query() }));
console.log(di.resolve("service").get()); // "данные"

// ============================================================
// СТРЕЛОЧНЫЕ ФУНКЦИИ
// ============================================================

// #121
const sumArrow = (a, b) => a + b;
console.log(sumArrow(3, 4)); // 7

// #122
const double122 = x => x * 2;
console.log(double122(5)); // 10

// #123
const square123 = x => x * x;
console.log(square123(4)); // 16

// #124
// Объект нужно обернуть в скобки — иначе {} воспринимается как тело функции.
const makeObj = (x, y) => ({ x, y });
console.log(makeObj(1, 2)); // { x: 1, y: 2 }

// #125
const double125 = n => n * 2;
console.log(double125(7)); // 14

// #126
const greet126 = name => "Hi " + name;
console.log(greet126("Bob")); // "Hi Bob"

// #127
console.log([1, 2, 3].map(x => x ** 2)); // [1, 4, 9]

// #128
console.log([1, 2, 3, 4, 5].filter(x => x % 2 === 0)); // [2, 4]

// #129
console.log([1, 2, 3, 4, 5].reduce((s, x) => s + x, 0)); // 15

// #130
const getTime = () => new Date().toLocaleTimeString();
console.log(getTime());

// #131
// 1) Параметры без скобок если один: x => x
// 2) Без фигурных скобок и return: x => x * 2
// 3) Неявный возврат объекта: x => ({ val: x })

// #132
const isPositive = n => n > 0;
console.log(isPositive(5));  // true
console.log(isPositive(-1)); // false

// #133
setTimeout(() => console.log("стрелка в setTimeout"), 0);

// #134
const processNum = n => {
  const doubled = n * 2;
  const message = `двойное: ${doubled}`;
  return message;
};
console.log(processNum(5)); // "двойное: 10"

// #135
const greet135 = (name = "World") => `Hello, ${name}!`;
console.log(greet135()); // "Hello, World!"

// #136
const sumAll136 = (...nums) => nums.reduce((s, n) => s + n, 0);
console.log(sumAll136(1, 2, 3, 4)); // 10

// #137
setTimeout(() => console.log("done"), 0);

// #138
const getLength = str => str.length;
console.log(getLength("hello")); // 5

// #139
const desc = [3, 1, 4, 1, 5].sort((a, b) => b - a);
console.log(desc); // [5, 4, 3, 1, 1]

// #140
const getName = ({ name }) => name;
console.log(getName({ name: "Alice", age: 30 })); // "Alice"

// #141
// Стрелочная функция не имеет своего this — берёт this из лексического окружения (где создана).
// Обычная функция — this зависит от способа вызова.

// #142
const obj142 = {
  name: "Alice",
  greet: () => `Привет от ${this?.name}`, // this здесь НЕ obj142, а внешний контекст
};
console.log(obj142.greet()); // "Привет от undefined"

// #143
class Timer143 {
  constructor() { this.name = "таймер"; }
  start() {
    // Проблема: function() теряет this
    // setTimeout(function() { console.log(this.name); }, 100); // undefined
    // Решение: стрелочная функция берёт this из start()
    setTimeout(() => console.log(this.name), 100); // "таймер"
  }
}
new Timer143().start();

// #144
// arguments недоступен в стрелочной функции. Используется arguments внешней функции.
function outer144() {
  const arrow = () => arguments[0]; // берёт arguments из outer144
  return arrow();
}
console.log(outer144(42)); // 42

// #145
const Arrow145 = () => {};
// new Arrow145(); // TypeError: Arrow145 is not a constructor

// #146
const fn146 = () => {};
console.log(fn146.prototype); // undefined — нет prototype у стрелочных функций

// #147
class Clicker {
  constructor() {
    this.count = 0;
    this.click = this.click.bind(this); // или class field стрелка
  }
  click() { this.count++; }
  setHandler(el) {
    // el.addEventListener("click", () => this.click()); — стрелка сохраняет this
  }
}

// #148
const addCurried = a => b => a + b;
console.log(addCurried(3)(4)); // 7

// #149
const compose149 = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
console.log(compose149(x => x + 1, x => x * 2)(5)); // 11

// #150
const multiplierFactory = factor => n => n * factor;
const times3 = multiplierFactory(3);
console.log(times3(7)); // 21

// #151
class Counter151 {
  count = 0;
  increment = () => { this.count++; }; // class field — стрелка в экземпляре
  // increment() {} — метод на прототипе (один на всех)
}
const c151 = new Counter151();
const { increment } = c151;
increment(); // this = c151 (благодаря стрелке)
console.log(c151.count); // 1

// #152
const result152 = [1, 2, 3, 4, 5, 6]
  .filter(x => x % 2 === 0)
  .map(x => x ** 2)
  .reduce((s, x) => s + x, 0);
console.log(result152); // 56

// #153
const getUserCity = ({ address: { city } = {} }) => city ?? "неизвестно";
console.log(getUserCity({ address: { city: "Moscow" } })); // "Moscow"
console.log(getUserCity({})); // "неизвестно"

// #154
const firstTwo = ([a, b]) => ({ first: a, second: b });
console.log(firstTwo([10, 20, 30])); // { first: 10, second: 20 }

// #155
const toObjects = arr => arr.map(name => ({ name, length: name.length }));
console.log(toObjects(["Alice", "Bob"])); // [{name:"Alice",length:5},{name:"Bob",length:3}]

// #156
// call/apply/bind не могут изменить this стрелочной функции — this лексически фиксирован.
const arrow156 = () => typeof this;
console.log(arrow156.call({ x: 1 })); // this не изменился

// #157
const allPositive = arr => arr.every(x => x > 0);
console.log(allPositive([1, 2, 3]));  // true
console.log(allPositive([1, -1, 3])); // false

// #158
const pipe158 = (...fns) => x => fns.reduce((v, f) => f(v), x);
console.log(pipe158(x => x + 1, x => x * 2)(5)); // 12

// #159
// call/apply на стрелочной функции — this игнорируется, аргументы передаются.
const fn159 = (x) => x * 2;
console.log(fn159.call({ ignored: true }, 5)); // 10 — this не применяется

// #160
class Button160 {
  constructor(label) {
    this.label = label;
    this.handleClick = () => console.log(`Нажата: ${this.label}`);
  }
}
const btn = new Button160("OK");
// btn.handleClick можно передать как callback — this сохранён

// #161
// Стрелки не могут быть генераторами — у них нет собственного контекста выполнения и prototype.
// function* нельзя заменить стрелкой: () => * не существует в синтаксисе JS.

// #162
const Y162 = f => (x => f(v => x(x)(v)))(x => f(v => x(x)(v)));
const fib162 = Y162(f => n => n <= 1 ? n : f(n - 1) + f(n - 2));
console.log(fib162(10)); // 55

// #163
const memoize163 = fn => {
  const primitiveCache = new Map();
  const objectCache = new WeakMap();
  return (...args) => {
    const firstArg = args[0];
    const cache = firstArg && typeof firstArg === "object" ? objectCache : primitiveCache;
    const key = typeof firstArg === "object" ? firstArg : JSON.stringify(args);
    if (!cache.has(key)) cache.set(key, fn(...args));
    return cache.get(key);
  };
};

// #164
// Внутри метода объекта: стрелка берёт this = undefined/globalThis (не obj).
// Внутри конструктора класса: стрелка берёт this = экземпляр класса (class field).

// #165
const curry165 = fn => {
  const arity = fn.length;
  return function curried(...args) {
    return args.length >= arity ? fn(...args) : (...more) => curried(...args, ...more);
  };
};
const add165 = curry165((a, b, c) => a + b + c);
console.log(add165(1)(2)(3)); // 6

// #166
const buildConfig = () => {
  let config = {};
  const builder = {
    setHost: host => { config.host = host; return builder; },
    setPort: port => { config.port = port; return builder; },
    setDebug: debug => { config.debug = debug; return builder; },
    build: () => ({ ...config }),
  };
  return builder;
};
console.log(buildConfig().setHost("localhost").setPort(3000).setDebug(true).build());

// #167
// Стрелка в прототипе: Arrow.prototype.method = () => {} — НЕ анти-паттерн.
// Анти-паттерн: class field стрелка в каждом экземпляре вместо метода прототипа.
// Каждый экземпляр хранит свою копию стрелочной функции — потребление памяти растёт с N экземпляров.

// #168
const trampoline168 = fn => (...args) => {
  let result = fn(...args);
  while (typeof result === "function") result = result();
  return result;
};
const sumTr = trampoline168(function f(n, acc = 0) {
  return n === 0 ? acc : () => f(n - 1, acc + n);
});
console.log(sumTr(1000)); // 500500

// #169
// Point-free: функция не упоминает аргументы явно.
const isEvenPF = n => n % 2 === 0;
const getEvens = arr => arr.filter(isEvenPF);
console.log(getEvens([1, 2, 3, 4, 5, 6])); // [2, 4, 6]

// #170
const asyncPipe170 = (...fns) => x => fns.reduce(async (acc, fn) => fn(await acc), Promise.resolve(x));
const process170 = asyncPipe170(
  async x => x + 1,
  async x => x * 2,
);
process170(4).then(console.log); // 10

// #171
const processUser171 = ({
  name: { first = "Аноним", last = "" } = {},
  age = 0,
  address: { city: hometown = "неизвестно" } = {},
} = {}) => `${first} ${last}, ${age}, ${hometown}`;
console.log(processUser171({ name: { first: "Alice" }, address: { city: "Moscow" }, age: 25 }));

// #172
// Стрелочные функции не медленнее обычных в современных движках (V8, SpiderMonkey).
// В горячих путях: избегай создания стрелок внутри циклов/map — новая функция на каждой итерации.
// Выноси стрелки за пределы циклов.

// #173
const None = () => ({ map: () => None(), getOrElse: def => def, isSome: false });
const Some = val => ({ map: fn => Some(fn(val)), getOrElse: () => val, isSome: true });
const safeDivide = (a, b) => b === 0 ? None() : Some(a / b);
console.log(safeDivide(10, 2).map(x => x * 3).getOrElse(0)); // 15
console.log(safeDivide(10, 0).map(x => x * 3).getOrElse(-1)); // -1

// #174
// Паттерн Task/IO — ленивые вычисления с возможностью трансформации.
// fn не вызывается до .run(). Цепочка .map() строит новые Tasks без выполнения.
const createTask = (fn) => ({
  run: () => fn(),
  map: (f) => createTask(() => f(fn())),
});
const task = createTask(() => 5).map(x => x * 2).map(x => x + 1);
console.log(task.run()); // 11

// #175
// eval выполняется в том же лексическом контексте. Стрелка внутри eval() берёт this из
// внешней функции или модуля, в котором eval вызван — стандартное лексическое поведение.

// #176
const createSignal = (initial) => {
  let value = initial;
  const subscribers = new Set();
  const read = () => value;
  const write = (next) => {
    value = typeof next === "function" ? next(value) : next;
    subscribers.forEach(fn => fn(value));
  };
  const subscribe = fn => { subscribers.add(fn); return () => subscribers.delete(fn); };
  return [read, write, subscribe];
};
const [count176, setCount, subscribe176] = createSignal(0);
subscribe176(v => console.log("изменилось:", v));
setCount(1);           // "изменилось: 1"
setCount(v => v + 1);  // "изменилось: 2"
console.log(count176()); // 2

// #177
const flow177 = (...fns) => async (...args) => {
  let result = await fns[0](...args);
  for (let i = 1; i < fns.length; i++) {
    try { result = await fns[i](result); }
    catch (e) { throw new Error(`Ошибка на шаге ${i}: ${e.message}`); }
  }
  return result;
};
const process177 = flow177(
  async x => x * 2,
  async x => { if (x > 10) throw new Error("слишком большое"); return x + 1; }
);
process177(4).then(console.log).catch(console.error); // 9
process177(6).then(console.log).catch(console.error); // Ошибка на шаге 1

// #178
// Стрелочные функции как Proxy-цели: можно перехватить apply (вызов), get (свойства).
// НО: нельзя перехватить construct (new) — стрелка не конструктор.
const arrow178 = x => x * 2;
const proxy178 = new Proxy(arrow178, {
  apply(target, thisArg, args) {
    console.log("вызов с", args);
    return target(...args);
  }
});
console.log(proxy178(5)); // "вызов с [5]", 10

// #179
const createState = (initial) => {
  const update = (state, updater) => ({ ...state, ...(typeof updater === "function" ? updater(state) : updater) });
  const pipe = (...updaters) => state => updaters.reduce((s, u) => update(s, u), state);
  return { update, pipe, initial };
};
const { update: upd, pipe: p } = createState({});
const transform = p(
  s => ({ ...s, x: 1 }),
  s => ({ ...s, y: s.x * 2 }),
);
console.log(transform({})); // { x: 1, y: 2 }

// #180
const useReducer180 = (reducer, init) => {
  let state = init;
  const listeners = new Set();
  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(fn => fn(state));
  };
  const getState = () => state;
  const subscribe = fn => { listeners.add(fn); return () => listeners.delete(fn); };
  return [getState, dispatch, subscribe];
};
const [getState, dispatch] = useReducer180(
  (state, action) => action.type === "ADD" ? { ...state, count: state.count + 1 } : state,
  { count: 0 }
);
dispatch({ type: "ADD" });
dispatch({ type: "ADD" });
console.log(getState()); // { count: 2 }
