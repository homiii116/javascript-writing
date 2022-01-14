let a = 3;
let b = 5;

a = a + 1; // 加算演算子で1を足す
b = b - 1; // 減算演算子で1を引く

// a → 4
// b → 4


let a = 3;
let b = 5;

a = ++a // インクリメント演算子で1を足す
b = --b // デクリメント演算子で1を引く

// a → 4
// b → 4

let a = 3;

++a; // 前置インクリメント
a++; // 後置インクリメント

--a; // 前置デクリメント
a++; // 後置デクリメント

// 前置演算の場合
let a = 3;
let b = ++a;

console.log(a); // 4
console.log(b); // 4

// 後置演算の場合
let a = 3;
let b = a++;

console.log(a); // 4
console.log(b); // 3

// 前置演算の場合
let a = 3;
let b;

a = a + 1;
b = a;

console.log(a); // 4
console.log(b); // 4

// 後置演算の場合
let a = 3;
let b;

b = a;
a = a + 1;

console.log(a); // 4
console.log(b); // 3

// 前置演算の場合
for (let i = 0; i <= 5; ++i) {
	let a;
  a = ++i;
	
	console.log("i = " + i);
	console.log("a = " + a);
}
// "i = 1"
// "a = 1"
// "i = 3"
// "a = 3"
// "i = 5"
// "a = 5"

// 後置演算の場合
for (let i = 0; i <= 5; i++) {
  let a;
	a = i++;

	console.log("i = " + i);
	console.log("a = " + a);
}
// "i = 1"
// "a = 0"
// "i = 3"
// "a = 2"
// "i = 5"
// "a = 4"

const hi = 'Hello, World!';

function sayHi() {
	document.write(hi);
}

sayHi();








