// Testing and recalling things I previous learned about javascript literals
// Name-value pairs inside of curly braces. Can be properties or functions.
var arr = [];
arr.push({ x: 2, y: 3 });
arr[0].x = 4;
console.log(arr[0].x);
console.log(arr[0].y);
