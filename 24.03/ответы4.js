// ============================================================
// ОБЪЕКТЫ: ОСНОВЫ
// ============================================================

// #001
const user = { name: "Alice", age: 30, isAdmin: true };
console.log(user.name, user.age, user.isAdmin);

// #002
// Точка: user.name — статический ключ, известный заранее.
// Скобки: user["name"] — динамический ключ, может быть переменной.
const key = "age";
console.log(user.name);   // "Alice"
console.log(user[key]);   // 30

// #003
user.email = "alice@example.com";
console.log(user.email);

// #004
delete user.isAdmin;
console.log(user.isAdmin); // undefined

// #005
console.log("name" in user);         // true
console.log(user.email !== undefined); // true (но ненадёжно если значение undefined)

// #006
console.log("age" in user);    // true
console.log("phone" in user);  // false

// #007
for (const key in user) console.log(key, user[key]);

// #008
const field = "score";
const obj8 = { [field]: 100, [`${field}Max`]: 200 };
console.log(obj8); // { score: 100, scoreMax: 200 }

// #009
const name9 = "Bob", age9 = 25;
const obj9 = { name: name9, age: age9 };
const short9 = { name9, age9 }; // shorthand
console.log(short9);

// #010
console.log(Object.keys(user));   // ["name","age","email"]
console.log(Object.values(user)); // ["Alice",30,"alice@example.com"]

// #011
console.log(Object.entries(user)); // [["name","Alice"],["age",30],...]

// #012
const company = { name: "ACME", address: { city: "Moscow", zip: "101000" } };
console.log(company.address.city); // "Moscow"

// #013
const { name: uName, age: uAge } = user;
console.log(uName, uAge);

// #014
const { name: n14, role = "guest" } = { name: "Bob" };
console.log(n14, role); // "Bob" "guest"

// #015
const a15 = { x: 1, y: 2 };
const b15 = { z: 3 };
const merged15 = { ...a15, ...b15 };
console.log(merged15); // { x:1, y:2, z:3 }

// #016
const obj16 = { a: 1, b: 2, c: 3 };
console.log(Object.keys(obj16));    // ["a","b","c"]
console.log(Object.values(obj16));  // [1,2,3]
console.log(Object.entries(obj16)); // [["a",1],["b",2],["c",3]]

// #017
const entries17 = [["x", 10], ["y", 20]];
console.log(Object.fromEntries(entries17)); // { x:10, y:20 }

// #018
const obj18 = Object.freeze({ a: 1, b: { c: 2 } });
obj18.a = 99;      // игнорируется
obj18.d = "new";   // игнорируется
console.log(obj18.a); // 1
// Внимание: заморозка неглубокая — obj18.b.c всё ещё можно изменить

// #019
// Object.seal() — нельзя добавлять/удалять свойства, но можно менять значения существующих.
// Object.freeze() — нельзя ничего: ни добавлять, ни удалять, ни менять.
const obj19 = Object.seal({ a: 1 });
obj19.a = 99;  // OK
obj19.b = 2;   // игнорируется
console.log(obj19); // { a: 99 }

// #020
function pick(obj, keys) {
  return Object.fromEntries(keys.filter(k => k in obj).map(k => [k, obj[k]]));
}
console.log(pick({ a: 1, b: 2, c: 3 }, ["a", "c"])); // { a:1, c:3 }

// #021
function omit(obj, keys) {
  const set = new Set(keys);
  return Object.fromEntries(Object.entries(obj).filter(([k]) => !set.has(k)));
}
console.log(omit({ a: 1, b: 2, c: 3 }, ["b"])); // { a:1, c:3 }

// #022
const obj22 = {};
Object.defineProperty(obj22, "id", {
  value: 42,
  writable: false,
  enumerable: true,
  configurable: false,
});
obj22.id = 99; // игнорируется в строгом режиме — TypeError
console.log(obj22.id); // 42

// #023
Object.defineProperty(obj22, "secret", { value: "hidden", enumerable: false });
const desc = Object.getOwnPropertyDescriptor(obj22, "id");
console.log(desc);
// { value: 42, writable: false, enumerable: true, configurable: false }
// writable — можно ли менять значение
// enumerable — видно ли в for...in / Object.keys
// configurable — можно ли переопределить или удалить дескриптор

// #024
function deepFreeze(obj) {
  Object.freeze(obj);
  for (const key of Object.getOwnPropertyNames(obj)) {
    const val = obj[key];
    if (val && typeof val === "object" && !Object.isFrozen(val)) deepFreeze(val);
  }
  return obj;
}
const frozen = deepFreeze({ a: { b: { c: 1 } } });
frozen.a.b.c = 99; // игнорируется
console.log(frozen.a.b.c); // 1

// #025
const circle = {
  radius: 5,
  get area() { return Math.PI * this.radius ** 2; },
  set diameter(d) { this.radius = d / 2; },
};
console.log(circle.area.toFixed(2)); // 78.54
circle.diameter = 20;
console.log(circle.radius); // 10

// ============================================================
// КОПИРОВАНИЕ ОБЪЕКТОВ И ССЫЛКИ
// ============================================================

// #026
// Объекты хранятся в куче, переменная хранит ссылку (адрес).
// При присваивании копируется только ссылка — оба указывают на один объект.

// #027
const o27a = { x: 1 };
const o27b = o27a;
o27b.x = 99;
console.log(o27a.x); // 99 — тот же объект

// #028
const src28 = { a: 1, b: { c: 2 } };
const copy28 = Object.assign({}, src28);
copy28.a = 99;
console.log(src28.a); // 1 — примитив скопирован
copy28.b.c = 99;
console.log(src28.b.c); // 99 — объект всё ещё тот же (поверхностная копия)

// #029
const copy29 = { ...src28 };
console.log(copy29); // { a:1, b:{ c:99 } }

// #030
// Поверхностная: копирует только первый уровень, вложенные объекты — по ссылке.
// Глубокая: рекурсивно копирует все уровни.
const deep30 = JSON.parse(JSON.stringify(src28));
deep30.b.c = 0;
console.log(src28.b.c); // 99 — не изменился

// #031
// obj1 === obj2 сравнивает ссылки. Для сравнения по значению нужна кастомная функция.
console.log({ a: 1 } === { a: 1 }); // false — разные объекты

// #032
function shallowEqual(a, b) {
  const keysA = Object.keys(a), keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(k => a[k] === b[k]);
}
console.log(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2 })); // true

// #033
// JSON.parse(JSON.stringify(obj)) — глубокая копия, но теряет: Date, функции, undefined, Symbol, Map, Set.
const d33 = { a: 1, date: new Date(), fn: () => {} };
const c33 = JSON.parse(JSON.stringify(d33));
console.log(c33.date);     // строка, не Date
console.log(c33.fn);       // undefined

// #034
// structuredClone(): поддерживает Date, Map, Set, ArrayBuffer, RegExp. Не копирует функции и Symbol-ключи.
const src34 = { a: 1, date: new Date(), arr: [1, [2, 3]] };
const clone34 = structuredClone(src34);
clone34.arr[1].push(99);
console.log(src34.arr[1]); // [2,3] — независимая копия
console.log(clone34.date instanceof Date); // true

// #035
function deepClone(val) {
  if (val === null || typeof val !== "object") return val;
  if (Array.isArray(val)) return val.map(deepClone);
  if (val instanceof Date) return new Date(val);
  if (val instanceof RegExp) return new RegExp(val);
  return Object.fromEntries(Object.entries(val).map(([k, v]) => [k, deepClone(v)]));
}
const src35 = { a: { b: [1, 2, { c: 3 }] } };
const clone35 = deepClone(src35);
clone35.a.b[2].c = 99;
console.log(src35.a.b[2].c); // 3

// #036
// Циклическая ссылка: объект ссылается сам на себя или на предка в цепочке.
const a36 = {};
a36.self = a36;
const c36 = structuredClone(a36); // OK — structuredClone обрабатывает циклы
console.log(c36.self === c36);    // true

// #037
function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object") return false;
  if (a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a), keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(k => deepEqual(a[k], b[k]));
}
console.log(deepEqual({ a: [1, 2, { b: 3 }] }, { a: [1, 2, { b: 3 }] })); // true

// #038
function deepMerge(target, source) {
  const result = { ...target };
  for (const [k, v] of Object.entries(source)) {
    result[k] = v && typeof v === "object" && !Array.isArray(v) && target[k] && typeof target[k] === "object"
      ? deepMerge(target[k], v)
      : v;
  }
  return result;
}
console.log(deepMerge({ a: { x: 1, y: 2 }, b: 3 }, { a: { y: 99, z: 0 }, c: 4 }));
// { a: { x:1, y:99, z:0 }, b:3, c:4 }

// #039
// Функции: Object.assign и spread копируют по ссылке, structuredClone пропускает их.
// Symbol-ключи: Object.assign копирует, spread копирует, JSON — нет, structuredClone — нет.
// Прототипные свойства: ни один метод поверхностного копирования их не копирует.
const sym39 = Symbol("s");
const obj39 = { [sym39]: "sym", fn: () => "hi" };
const c39 = { ...obj39 };
console.log(c39[sym39]); // "sym" — spread копирует Symbol-ключи
console.log(Object.assign({}, obj39)[sym39]); // "sym"

// #040
function immutableSet(obj, path, value) {
  const keys = path.split(".");
  if (keys.length === 1) return { ...obj, [keys[0]]: value };
  return {
    ...obj,
    [keys[0]]: immutableSet(obj[keys[0]] ?? {}, keys.slice(1).join("."), value)
  };
}
const state40 = { user: { profile: { name: "Alice" } } };
const next40 = immutableSet(state40, "user.profile.name", "Bob");
console.log(next40.user.profile.name); // "Bob"
console.log(state40.user.profile.name); // "Alice" — не изменился

// ============================================================
// СБОРКА МУСОРА
// ============================================================

// #041
// Garbage Collection — автоматическое освобождение памяти занятой недостижимыми объектами.
// Разработчик не управляет памятью вручную: GC сам находит и удаляет "мусор".

// #042
// Достижимый объект — тот, до которого можно добраться по цепочке ссылок из "корней".
// Недостижимый — ни одна ссылка не ведёт к нему → GC его удаляет.

// #043
// Mark-and-sweep: 1) Пометить все корни. 2) Пройти по всем ссылкам из корней, пометить достижимые.
// 3) Удалить непомеченные объекты. Современные движки используют его с оптимизациями (поколения, инкрементальный GC).

// #044
// Корни: глобальные переменные (window), текущий стек вызовов (локальные переменные функций),
// DOM-дерево (в браузере), активные замыкания.

// #045
// Утечка памяти — объект недоступен программисту, но ещё "достижим" с точки зрения GC.
const leaks = [];
function leak() {
  const largeData = new Array(100000).fill("leak");
  leaks.push(largeData); // largeData никогда не удаляется, т.к. leaks глобальный
}

// #046
function makeLeak() {
  const bigData = new Array(100000).fill("x");
  return function () { return bigData[0]; }; // bigData остаётся в замыкании
}
// Если хранить много таких функций — bigData накапливается в памяти.

// #047
// WeakRef — слабая ссылка на объект, которая не препятствует его удалению GC.
let obj47 = { data: "важное" };
const ref47 = new WeakRef(obj47);
obj47 = null; // теперь объект может быть удалён GC
const val47 = ref47.deref(); // возвращает объект или undefined если уже удалён
console.log(val47?.data);

// #048
const registry = new FinalizationRegistry((label) => {
  console.log(`Объект "${label}" был удалён GC`);
});
let tracked = { name: "temp" };
registry.register(tracked, "temp-object");
tracked = null; // при следующем GC сработает callback

// #049
// Глобальные переменные — корни GC, никогда не удаляются пока жива страница.
// Злоупотребление: накопление данных в global-массивах/кешах без очистки → постоянный рост памяти.

// #050
// DOM-утечка: храним JS-ссылку на удалённый DOM-элемент → он не удаляется GC.
// Устранение: обнулять ссылки при удалении элементов, использовать WeakRef/WeakMap для DOM.
// Обнаружение: Chrome DevTools → Memory → Heap Snapshot, сравнить снимки.

// ============================================================
// МЕТОДЫ ОБЪЕКТА, "this"
// ============================================================

// #051
const user51 = {
  name: "Alice",
  sayHi() { console.log("Привет, я " + this.name); }
};
user51.sayHi(); // "Привет, я Alice"

// #052
// this в методе — ссылка на объект перед точкой при вызове метода.

// #053
const obj53 = {
  greet() { return "Привет!"; } // shorthand, эквивалентно greet: function(){}
};

// #054
function whoAmI() { return this; }
// Без "use strict": this === globalThis (window в браузере)
// В строгом режиме ("use strict"): this === undefined

// #055
const timer55 = {
  name: "таймер",
  start() { setTimeout(this.tick, 1000); }, // this.tick потеряет контекст
  tick() { console.log(this?.name); }        // this будет undefined/window
};

// #056
const obj56 = {
  name: "Bob",
  greet() { console.log(this.name); }
};
const bound56 = obj56.greet.bind(obj56);
setTimeout(bound56, 100); // "Bob" — контекст сохранён

// #057
const obj57 = {
  name: "Alice",
  start() {
    setTimeout(() => console.log(this.name), 100); // стрелка берёт this из start
  }
};
obj57.start(); // "Alice"

// #058
function greet58(greeting) { return `${greeting}, ${this.name}`; }
const result58 = greet58.call({ name: "Bob" }, "Привет");
console.log(result58); // "Привет, Bob"

// #059
function sum59(a, b, c) { return a + b + c; }
console.log(sum59.apply(null, [1, 2, 3])); // 6

// #060
function logger(msg) { console.log(`[${this.prefix}] ${msg}`); }
const warnLog = logger.bind({ prefix: "WARN" });
warnLog("что-то пошло не так"); // "[WARN] что-то пошло не так"

// #061
function fn61() { return this.x; }
const bound1 = fn61.bind({ x: 1 });
const bound2 = bound1.bind({ x: 2 }); // второй bind не меняет контекст
console.log(bound2()); // 1 — первый bind выигрывает

// #062
class Builder62 {
  constructor() { this.parts = []; }
  add(part) { this.parts.push(part); return this; }
  build() { return this.parts.join(" + "); }
}
console.log(new Builder62().add("A").add("B").add("C").build()); // "A + B + C"

// #063
const user63 = {
  name: "Alice", age: 30,
  toString() { return `User(${this.name}, ${this.age})`; }
};
console.log(String(user63)); // "User(Alice, 30)"

// #064
function softBind(fn, ctx) {
  return function (...args) {
    const context = (!this || this === globalThis) ? ctx : this;
    return fn.apply(context, args);
  };
}
function show64() { return this.name; }
const soft = softBind(show64, { name: "default" });
console.log(soft());                          // "default"
console.log(soft.call({ name: "explicit" })); // "explicit"

// #065
// 1. Автоматическое (new): new Fn() → this = новый объект
// 2. Явное (call/apply/bind): приоритет высокий, но ниже new
// 3. Неявное (метод): obj.fn() → this = obj
// 4. По умолчанию: fn() → this = globalThis или undefined (строгий режим)

// #066
Function.prototype.myBind = function (ctx, ...preset) {
  const fn = this;
  return function (...args) {
    return fn.apply(ctx, [...preset, ...args]);
  };
};
function greet66(greeting) { return `${greeting}, ${this.name}`; }
const boundGreet = greet66.myBind({ name: "Alice" }, "Привет");
console.log(boundGreet()); // "Привет, Alice"

// #067
const obj67 = { name: "Bob", greet() { return this.name; } };
const { greet: g67 } = obj67;
// g67() — this потерян (undefined / globalThis)
const boundG67 = obj67.greet.bind(obj67);
console.log(boundG67()); // "Bob"

// #068
const obj68 = { name: "Alice", greet() { console.log(this.name); } };
// setTimeout(obj68.greet, 100) — потеря контекста
// Способ 1: bind
setTimeout(obj68.greet.bind(obj68), 100);
// Способ 2: стрелочная обёртка
setTimeout(() => obj68.greet(), 100);
// Способ 3: явная переменная
const greet68 = obj68.greet.bind(obj68);
setTimeout(greet68, 100);

// ============================================================
// КОНСТРУКТОР, ОПЕРАТОР "new"
// ============================================================

// #069
function User69(name, age) {
  this.name = name;
  this.age = age;
}
const u69 = new User69("Иван", 25);
console.log(u69);

// #070
// Шаги new: 1) Создать пустой объект {}
// 2) Установить его __proto__ = Constructor.prototype
// 3) Выполнить конструктор с this = новый объект
// 4) Вернуть объект (если конструктор не вернул другой объект)

// #071
// Заглавная буква — соглашение, сигнализирует: "это конструктор, вызывай через new".

// #072
const u72 = new User69("Иван", 25);
console.log(u72.name, u72.age); // "Иван" 25
console.log(u72 instanceof User69); // true

// #073
function SafeUser(name) {
  if (!new.target) throw new Error("Вызови через new");
  this.name = name;
}
// SafeUser("Bob"); // Error

// #074
function WithObj() { return { x: 99 }; } // вернёт этот объект
function WithPrim() { return 42; }        // примитив игнорируется, вернётся this
console.log(new WithObj());   // { x: 99 }
console.log(new WithPrim());  // WithPrim {}

// #075
function Counter75() {
  let _val = 0;
  this.increment = () => ++_val;
  this.decrement = () => --_val;
  Object.defineProperty(this, "value", { get: () => _val });
}
const c75 = new Counter75();
c75.increment(); c75.increment();
console.log(c75.value); // 2

// #076
function Animal76(name) { this.name = name; }
Animal76.prototype.speak = function () { return `${this.name} говорит`; };
const a76 = new Animal76("Кот");
console.log(a76.speak()); // "Кот говорит"

// #077
// this.method = fn — метод копируется в каждый экземпляр (больше памяти)
// Constructor.prototype.method = fn — метод один для всех экземпляров (эффективнее)

// #078
console.log(u69 instanceof User69); // true
console.log([] instanceof Array);   // true

// #079
function Stack79() {
  const items = [];
  this.push = val => items.push(val);
  this.pop = () => items.pop();
  this.peek = () => items[items.length - 1];
  this.isEmpty = () => items.length === 0;
}
const s79 = new Stack79();
s79.push(1); s79.push(2);
console.log(s79.peek()); // 2
console.log(s79.pop());  // 2
console.log(s79.isEmpty()); // false

// #080
function Foo80() {}
const f80 = new Foo80();
console.log(f80.constructor === Foo80); // true — берётся из Foo80.prototype

// #081
function myNew(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype);
  const result = Constructor.apply(obj, args);
  return result && typeof result === "object" ? result : obj;
}
function Point(x, y) { this.x = x; this.y = y; }
const p81 = myNew(Point, 3, 4);
console.log(p81.x, p81.y); // 3 4

// #082
function createShape(type, ...args) {
  const shapes = { circle: Circle82, rect: Rect82 };
  const Ctor = shapes[type];
  if (!Ctor) throw new Error(`Неизвестный тип: ${type}`);
  return new Ctor(...args);
}
function Circle82(r) { this.r = r; this.area = () => Math.PI * r ** 2; }
function Rect82(w, h) { this.w = w; this.h = h; this.area = () => w * h; }
console.log(createShape("circle", 5).area().toFixed(2)); // 78.54

// #083
function LinkedList83() {
  let head = null;
  this.append = val => {
    const node = { val, next: null };
    if (!head) { head = node; return; }
    let cur = head;
    while (cur.next) cur = cur.next;
    cur.next = node;
  };
  this.prepend = val => { head = { val, next: head }; };
  this.delete = val => {
    if (!head) return;
    if (head.val === val) { head = head.next; return; }
    let cur = head;
    while (cur.next && cur.next.val !== val) cur = cur.next;
    if (cur.next) cur.next = cur.next.next;
  };
  this.find = val => {
    let cur = head;
    while (cur) { if (cur.val === val) return cur; cur = cur.next; }
    return null;
  };
  this.toArray = () => {
    const res = [];
    let cur = head;
    while (cur) { res.push(cur.val); cur = cur.next; }
    return res;
  };
}
const ll = new LinkedList83();
ll.append(1); ll.append(2); ll.append(3);
ll.prepend(0);
ll.delete(2);
console.log(ll.toArray()); // [0,1,3]

// ============================================================
// ОПЦИОНАЛЬНАЯ ЦЕПОЧКА '?.'
// ============================================================

// #084
// ?. — безопасный доступ к свойствам: если левая часть null/undefined — возвращает undefined.
const city84 = null;
console.log(city84?.name); // undefined, не TypeError

// #085
const u85 = null;
console.log(u85?.address?.city); // undefined — короче и чище цепочки &&

// #086
console.log(null?.property);    // undefined
console.log(undefined?.method()); // undefined

// #087
const obj87 = { greet: () => "Привет" };
console.log(obj87.greet?.());   // "Привет"
console.log(obj87.bye?.());     // undefined — метода нет

// #088
const arr88 = [10, 20, 30];
console.log(arr88?.[1]);    // 20
const nullArr = null;
console.log(nullArr?.[0]); // undefined

// #089
// ?. нельзя использовать слева от присваивания: это SyntaxError.
// Допустимо: obj?.x (чтение)
// Недопустимо: obj?.x = 5 (запись)

// #090
const u90 = null;
const name90 = u90?.profile?.name ?? "Аноним";
console.log(name90); // "Аноним"

// #091
// "Короткое замыкание": если первый элемент null/undefined, остаток цепочки не вычисляется.
let called = false;
const fn91 = () => { called = true; return 1; };
null?.method(fn91());
console.log(called); // false — fn91 не была вызвана

// #092
function getDeep(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}
const data92 = { a: { b: { c: 42 } } };
console.log(getDeep(data92, "a.b.c")); // 42
console.log(getDeep(data92, "a.x.c")); // undefined

// #093
// Опасность: user?.name?.trim()?.toUpperCase() скрывает что name должен быть строкой.
// Лучше явно проверить: typeof user.name === "string" там, где это важно.

// #094
function optChain(obj, ...keys) {
  return keys.reduce((acc, key) => acc == null ? undefined : acc[key], obj);
}
console.log(optChain({ a: { b: { c: 7 } } }, "a", "b", "c")); // 7
console.log(optChain(null, "a", "b"));                         // undefined

// #095
// ?. вызывает ловушку get у Proxy для каждого шага цепочки.
// Если Proxy возвращает null/undefined — дальше цепочка обрывается без ошибки.
const proxy95 = new Proxy({}, {
  get(target, key) { console.log(`get: ${String(key)}`); return target[key]; }
});
proxy95?.foo?.bar; // логирует "get: foo"

// ============================================================
// ТИП ДАННЫХ SYMBOL
// ============================================================

// #096
const sym96 = Symbol("description");
console.log(typeof sym96); // "symbol"

// #097
console.log(Symbol("id") === Symbol("id")); // false — каждый Symbol уникален

// #098
const sym98 = Symbol("mySymbol");
console.log(sym98.description); // "mySymbol"
console.log(sym98.toString());  // "Symbol(mySymbol)"

// #099
const s99a = Symbol.for("shared");
const s99b = Symbol.for("shared");
console.log(s99a === s99b); // true — один и тот же из реестра
console.log(Symbol.keyFor(s99a)); // "shared"

// #100
// Symbol.for("id") — поиск/создание в глобальном реестре, разделяется между модулями.
// Symbol("id") — всегда новый уникальный символ, только локальный.

// #101
const ID = Symbol("id");
const obj101 = { [ID]: 42, name: "Alice" };
console.log(obj101[ID]); // 42

// #102
// Symbol-свойства не перечисляемы в for...in и Object.keys().
// Это удобно для "скрытых" метаданных.
for (const k in obj101) console.log(k); // только "name"
console.log(Object.keys(obj101));       // ["name"]

// #103
console.log(Object.getOwnPropertySymbols(obj101)); // [Symbol(id)]
const allKeys = [...Object.keys(obj101), ...Object.getOwnPropertySymbols(obj101)];
console.log(allKeys);

// #104
// Well-known Symbols:
// Symbol.iterator — итератор
// Symbol.toPrimitive — приведение к примитиву
// Symbol.hasInstance — поведение instanceof
// Symbol.species — используемый конструктор при создании производных объектов
// Symbol.asyncIterator — асинхронный итератор

// #105
const range105 = {
  from: 1, to: 3,
  [Symbol.iterator]() {
    let cur = this.from;
    return { next: () => cur <= this.to ? { value: cur++ } : { done: true } };
  }
};
console.log([...range105]); // [1,2,3]

// #106
const money106 = {
  amount: 100, currency: "USD",
  [Symbol.toPrimitive](hint) {
    if (hint === "number") return this.amount;
    if (hint === "string") return `${this.amount} ${this.currency}`;
    return this.amount;
  }
};
console.log(+money106);       // 100
console.log(`${money106}`);   // "100 USD"

// #107
class Even {
  static [Symbol.hasInstance](n) { return typeof n === "number" && n % 2 === 0; }
}
console.log(2 instanceof Even); // true
console.log(3 instanceof Even); // false

// #108
class MyArray extends Array {
  static get [Symbol.species]() { return Array; } // map/filter вернут Array, не MyArray
}
const ma = new MyArray(1, 2, 3);
console.log(ma.map(x => x * 2) instanceof MyArray); // false
console.log(ma.map(x => x * 2) instanceof Array);   // true

// #109
const _name = Symbol("name");
const _age = Symbol("age");
function Person109(name, age) {
  this[_name] = name;
  this[_age] = age;
  this.getInfo = function () { return `${this[_name]}, ${this[_age]}`; };
}
const p109 = new Person109("Alice", 30);
console.log(p109.getInfo()); // "Alice, 30"
console.log(p109.name);      // undefined — "приватно"

// #110
const asyncIterable = {
  [Symbol.asyncIterator]() {
    let i = 0;
    return {
      async next() {
        if (i >= 3) return { done: true };
        await new Promise(r => setTimeout(r, 10));
        return { value: i++ };
      }
    };
  }
};
(async () => { for await (const v of asyncIterable) console.log(v); })(); // 0 1 2

// ============================================================
// ПРЕОБРАЗОВАНИЕ ОБЪЕКТОВ В ПРИМИТИВЫ
// ============================================================

// #111
// Происходит при: конкатенации (+), арифметике, сравнении с примитивом, alert(), шаблонной строке.

// #112
// hint: "string" — при String(obj), шаблоне
// hint: "number" — при Number(obj), арифметике
// hint: "default" — при + с неизвестным типом, ==

// #113
// toString() вызывается при string-контексте если нет Symbol.toPrimitive.
const obj113 = { toString() { return "я объект"; } };
console.log(`${obj113}`); // "я объект"

// #114
// valueOf() вызывается при number/default-контексте.
const obj114 = { valueOf() { return 42; } };
console.log(obj114 + 1); // 43

// #115
console.log(String({})); // "[object Object]" — вызывается Object.prototype.toString()

// #116
const obj116 = {
  [Symbol.toPrimitive](hint) {
    if (hint === "number") return 42;
    if (hint === "string") return "объект";
    return true;
  }
};
console.log(+obj116);      // 42
console.log(`${obj116}`);  // "объект"

// #117
// Приоритет: Symbol.toPrimitive → valueOf (number/default) → toString (string)

// #118
// obj + "" → hint="default" → Symbol.toPrimitive("default") или valueOf() или toString()
const obj118 = { valueOf() { return 5; }, toString() { return "пять"; } };
console.log(obj118 + ""); // "5" — valueOf() вернул 5, затем конкатенация

// #119
const money119 = {
  amount: 250, currency: "RUB",
  [Symbol.toPrimitive](hint) {
    return hint === "string" ? `${this.amount} ${this.currency}` : this.amount;
  }
};
console.log(money119 * 2);    // 500
console.log(`${money119}`);   // "250 RUB"

// #120
// obj1 + obj2: оба через ToPrimitive(hint="default") → valueOf()/toString()
// Обычно: {} + {} = "[object Object][object Object]"
const o120a = { valueOf() { return 10; } };
const o120b = { valueOf() { return 5; } };
console.log(o120a + o120b); // 15

// #121
function Range121(from, to) {
  this.from = from;
  this.to = to;
  this[Symbol.toPrimitive] = hint => hint === "string" ? `[${from}..${to}]` : to;
}
const r121 = new Range121(1, 10);
console.log(r121 + 5);   // 15 — to + 5
console.log(`${r121}`);  // "[1..10]"

// #122
// Abstract Type Conversion в ECMA-262 — набор внутренних операций:
// ToPrimitive, ToBoolean, ToNumber, ToString, ToObject.
// ToPrimitive вызывает Symbol.toPrimitive или последовательно valueOf/toString.

// ============================================================
// ОБЪЕКТЫ: ПРОДВИНУТЫЕ ТЕМЫ
// ============================================================

// #123
const proto123 = { greet() { return `Привет от ${this.name}`; } };
const obj123 = Object.create(proto123);
obj123.name = "Alice";
console.log(obj123.greet()); // "Привет от Alice"

// #124
// Прототипная цепочка: obj → obj.__proto__ → ... → Object.prototype → null
// При поиске свойства JS идёт по цепочке вверх до нахождения или null.

// #125
console.log(Object.getPrototypeOf([]));         // Array.prototype
console.log(Object.getPrototypeOf(Array.prototype)); // Object.prototype

// #126
const obj126 = Object.create({ inherited: true });
obj126.own = 1;
console.log(obj126.hasOwnProperty("own"));       // true
console.log(obj126.hasOwnProperty("inherited")); // false

// #127
for (const key of Object.keys(obj126)) console.log(key); // только "own"

// #128
const target128 = { name: "Alice", age: 30 };
const proxy128 = new Proxy(target128, {
  get(obj, key) { console.log(`get: ${String(key)}`); return obj[key]; },
  set(obj, key, val) { console.log(`set: ${String(key)} = ${val}`); obj[key] = val; return true; }
});
proxy128.name;
proxy128.age = 25;

// #129
const proxy129 = new Proxy({}, {
  get(obj, key) {
    if (typeof key === "string" && !isNaN(key)) return obj[key] ?? 0;
    return obj[key];
  }
});
proxy129.x = 5;
console.log(proxy129[5]);  // 0 — не существует → 0
console.log(proxy129.x);   // 5

// #130
const proxy130 = new Proxy({}, {
  set(obj, key, val) {
    if (typeof val === "number" && val < 0) throw new RangeError("Отрицательные числа запрещены");
    obj[key] = val;
    return true;
  }
});
proxy130.score = 10;
try { proxy130.score = -1; } catch (e) { console.log(e.message); }

// #131
// Reflect — объект с методами соответствующими ловушкам Proxy.
// Используется для "стандартного" поведения внутри ловушки без рекурсии.
const proxy131 = new Proxy({}, {
  get(target, key, receiver) {
    console.log(`get: ${String(key)}`);
    return Reflect.get(target, key, receiver); // стандартное поведение
  }
});

// #132
const range132 = { min: 1, max: 10 };
const proxy132 = new Proxy(range132, {
  has(target, key) {
    const n = Number(key);
    return !isNaN(n) && n >= target.min && n <= target.max;
  }
});
console.log(5 in proxy132);  // true
console.log(15 in proxy132); // false

// #133
const arr133 = ["a", "b", "c", "d"];
const proxy133 = new Proxy(arr133, {
  get(target, key) {
    const i = Number(key);
    if (!isNaN(i) && i < 0) return target[target.length + i];
    return Reflect.get(target, key);
  }
});
console.log(proxy133[-1]); // "d"
console.log(proxy133[-2]); // "c"

// #134
const obj134 = { get x() { return 42; } };
const descs = Object.getOwnPropertyDescriptors(obj134);
const copy134 = Object.defineProperties({}, descs); // копирует с геттерами/сеттерами
console.log(copy134.x); // 42

// #135
function reactive(obj, callback) {
  return new Proxy(obj, {
    set(target, key, val) {
      const old = target[key];
      target[key] = val;
      if (old !== val) callback(key, val, old);
      return true;
    }
  });
}
const state135 = reactive({ count: 0 }, (k, v, o) => console.log(`${k}: ${o} → ${v}`));
state135.count = 1; // "count: 0 → 1"
state135.count = 5; // "count: 1 → 5"

// #136
// Proxy.revocable() создаёт Proxy который можно отозвать.
// После revoke() любое обращение выбрасывает TypeError.
const { proxy: p136, revoke: r136 } = Proxy.revocable({ data: 42 }, {});
console.log(p136.data); // 42
r136();
try { p136.data; } catch (e) { console.log(e.message); } // TypeError

// #137
const virtual137 = new Proxy({}, {
  get(_, key) {
    return typeof key === "string"
      ? () => console.log(`Вызван метод: ${key}`)
      : undefined;
  }
});
virtual137.foo();   // "Вызван метод: foo"
virtual137.bar();   // "Вызван метод: bar"

// #138
function makeObservable(target) {
  const listeners = new Map();
  const proxy = new Proxy(target, {
    set(obj, key, val) {
      obj[key] = val;
      if (listeners.has(key)) listeners.get(key).forEach(fn => fn(val));
      return true;
    }
  });
  proxy.on = (key, fn) => {
    if (!listeners.has(key)) listeners.set(key, []);
    listeners.get(key).push(fn);
  };
  return proxy;
}
const obs = makeObservable({ name: "" });
obs.on("name", v => console.log(`Имя изменено: ${v}`));
obs.name = "Alice"; // "Имя изменено: Alice"

// #139
function withLazyInit(obj, key, initializer) {
  Object.defineProperty(obj, key, {
    get() {
      const value = initializer();
      Object.defineProperty(this, key, { value, writable: true, configurable: true });
      return value;
    },
    configurable: true,
  });
}
const config139 = {};
withLazyInit(config139, "data", () => { console.log("Инициализация!"); return [1, 2, 3]; });
console.log(config139.data); // "Инициализация!" [1,2,3]
console.log(config139.data); // [1,2,3] — без повторной инициализации

// #140
function memoProxy(obj) {
  const cache = new Map();
  return new Proxy(obj, {
    get(target, key) {
      const val = target[key];
      if (typeof val !== "function") return val;
      if (!cache.has(key)) {
        cache.set(key, function (...args) {
          const cacheKey = JSON.stringify(args);
          if (!cache.has(cacheKey)) cache.set(cacheKey, val.apply(target, args));
          return cache.get(cacheKey);
        });
      }
      return cache.get(key);
    }
  });
}
const calc140 = memoProxy({
  fib(n) { return n <= 1 ? n : this.fib(n - 1) + this.fib(n - 2); }
});
console.log(calc140.fib(10)); // 55

// #141
function createObservable(obj, onChange) {
  function wrap(target, path) {
    return new Proxy(target, {
      get(t, key) {
        const val = t[key];
        if (val && typeof val === "object") return wrap(val, `${path}.${String(key)}`);
        return val;
      },
      set(t, key, val) {
        const fullPath = `${path}.${String(key)}`;
        t[key] = val;
        onChange(fullPath, val);
        return true;
      }
    });
  }
  return wrap(obj, "root");
}
const state141 = createObservable({ user: { name: "Alice" } }, (path, val) => {
  console.log(`Изменение: ${path} = ${val}`);
});
state141.user.name = "Bob"; // "Изменение: root.user.name = Bob"

// #142
function immutableProxy(obj) {
  return new Proxy(obj, {
    get(target, key) {
      const val = target[key];
      return val && typeof val === "object" ? immutableProxy(val) : val;
    },
    set() { throw new TypeError("Объект иммутабелен"); },
    deleteProperty() { throw new TypeError("Удаление запрещено"); },
  });
}
const frozen142 = immutableProxy({ a: { b: 1 } });
try { frozen142.a.b = 99; } catch (e) { console.log(e.message); } // "Объект иммутабелен"
try { delete frozen142.a; } catch (e) { console.log(e.message); } // "Удаление запрещено"
