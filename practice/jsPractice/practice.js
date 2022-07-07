const a = [1, 2, 3, 4];
const b = [5, 6];
console.log(a.concat(b));
console.log(a.concat(10));
const [p, q, r, ...s] = a;
console.log(p, q, r, s);
