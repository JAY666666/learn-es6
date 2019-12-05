//1 数组的解构赋值 只要等号两边的模式相同,左边的变量就会被赋予相应的值
let [a, b, c] = [1, 2, 3];
console.log(c); //3

let [d, e] = [1, 2, 3];
console.log(e); //2 不完全结构,也能成功

let [f, g, h, i] = [1, 2, 3];
console.log(i); // undefined 解构不成功,变量的值为undefined

let [foo, [
    [bar], baz
]] = [1, [
    [2], 3
]];
console.log(bar) //2

//2 默认值
let [x = 1] = [undefined];
console.log(x); //1

let [y = 1] = [null];
console.log(y); //null ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。

//3 默认值为函数时,当取值变量右侧为空时,才会执行函数,否则不会执行,所有默认值为函数时,采用惰性求值
function fun1() {
    return j = 3;
}
let [z = fun1()] = [2];
console.log(z); //2 因为z能取到值,所有fun1()函数不会执行,又称惰性求值

let [j = fun1()] = [];
console.log(j); //3 因为j取不到值,所有执行fun1函数

//4 对象的解构赋值
let {
    test2,
    test1
} = {
    test1: 'haha',
    test2: 'heihei'
};
console.log(test1); //与数组的解构赋值不同,对象的和顺序没有关系,只需找到对应的属性名即可,否则为undefined

const {
    log
} = console;
log('hello'); //hello 常用示例,解构对象的某个方法,属性

let {
    test3: value
} = {
    test3: 'haha'
}
console.log(value); //haha 所有对象的实际解构原理就是如下

let {
    test4: value1,
    test5: value2
} = {
    test5: '1',
    test4: '2'
};
console.log(value2); //1 对象的解构赋值就是找到同名属性,真正被赋值的是后面的属性值变量

//5 对象的默认值
let {
    test6 = 3
} = {};
console.log(test6); //3

let {
    test7 = 3
} = {
    undefined
};
console.log(test7); //3

//6 字符串的解构赋值
const [test8] = 'hello';
console.log(test8);//h

let {length : len} = 'hahaha';
console.log(len); //6 还可打印其解构赋值字符串的长度

//7 数值和布尔值的解构赋值 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
let {toString: s} = 123;
s === Number.prototype.toString // true

//8 函数参数的解构赋值
function fun2([x,y]) {
   return x + y;
}
console.log(fun2([1,2])); //3 fun2([x,y])相当于fun2(x,y)

function fun3({test9=0,test10=1} = {}){
    return test9 + test10
}
console.log(fun3()); //1 函数参数也可以有默认值

