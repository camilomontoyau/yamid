let array1 = [
  'r',
  { a: 1, b: 2 },
  1,
  3,
  function cualquierCosa() {
    return 'hola';
  }
];

let array2 = [...array1];

array2[2] = 5;

console.log('array1', array1);
console.log('array2', array2);

let obj1 = {
  a: 1,
  b: 2,
  c: 3,
  d: function r() {
    return 'r';
  }
};
let obj2 = { ...obj1 };

let { d, ...rest } = obj1;

obj2.a = 10000;

console.log('d', d());
console.log('rest', rest);

console.log('obj1', obj1);
console.log('obj2', obj2);
