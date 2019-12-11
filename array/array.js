// 扩展运算符 主要用于函数调用
console.log(...[1, 2, 3]);
console.log(1, ...[2, 3, 4], 5) //将数组装换成用逗号分隔的参数序列

function add(x, y) {
    console.log(x + y)
}
add(...[1, 2, 3]); //3

const a1 = [1, 2];
const a2 = a1;
a2[0] = 2;
console.log(a1); //[2,2] a1发生变化 常规复制数组 复制的是数组的指针，不是克隆，两个数组改变值会影响到另一个

const a3 = [1, 2];
const a4 = [...a3];
a4[0] = 2;
console.log(a3); //[1,2] a1未变化，属于克隆了一个新的数组

const a5 = ['a', 'b'];
const a6 = ['c', 'd'];
const a7 = a5.concat(a6);
console.log(a7); //['a','b','c','d']  合并数组,es5的做法
console.log([...a5,...a6]); //['a','b','c','d'] es6的做法  扩展运算符用于数组赋值，只能放在参数的最后一位


