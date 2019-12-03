//var定义的变量在全局范围内都有效,let定义的变量只在局部范围内有限
//1 常规var定义变量
var x = y,
    y = 'A';
console.log(x + y); //undefinedA

var z = 'B',
    c = z;
console.log(z + c); //BB

//2 for 语句的执行顺序(学习过程中的额外问题) 这两个for语句效果相同,下面一个为了方便了解for语句的真实执行顺序
for (var h = 0; h < 10; h++) {
    console.log(h)
}
//(1)初始化变量(2)判断条件是否为true(3)true:执行代码块内的语句;false:跳出循环(4)最后的finaly-expression在判断条件之前执行
var k = 0;
for (;;) {
    if (k > 9) break;
    console.log(k);
    k++
}

//3 对比,在for语句中var和let的对比
var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i)
    }
}
a[6](); //10
a[7](); //10 在全局范围内都有效，所以全局只有一个变量i。每一次循环，变量i的值都会发生改变，而循环内被赋给数组a的函数内部的console.log(i)，里面的i指向的就是全局的i。也就是说，所有数组a的成员里面的i，指向的都是同一个i，导致运行时输出的是最后一轮的i的值，也就是 10

var b = [];
for (let o = 0; o < 10; o++) {
    b[o] = function () {
        console.log(o)
    }
}
b[6](); //6  变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6
b[7](); //7

//4 变量提升
console.log(foo);
var foo = 1;
//undefined var存在变量提升,相当于把var foo = undefined 提升到最前面,值不带过去

console.log(bar);
let bar = 1;
//referenceError bar is not defined  let不存在变量提升,所以bar is not defined

//5 暂时性死区
var tmp = 123;
if (true) {
    console.log(tmp)
    let tmp;
} //undefined 因为let有暂时性死区,所以在if代码块中,tmp锁定了这个区域,所以外层定义的tmp不在此区域产生作用

if (true) {
    console.log(ggg); //referenceError
    let ggg;
    ggg = 1;
    console.log(ggg); // 1
}

//6 不允许重复声明  不能在函数内部重新声明参数
function fun1(add) {
    //let add;  add can not repeat declare
    let a = 1;
    //var a = 2; 'a' has already been
    console.log(a);
}
fun1();

//7 (1)es5块级作用域  为什么需要块级作用域

var tmp2 = new Date();

function fun2() {
    console.log(tmp2)
    if (false) {
        var tmp2 = 'hello world';
    }
}
fun2(); //undefined 函数内部的tmp2变量提升.覆盖到外部的变量

var tmp3 = 'hello';
for (var i = 0; i < tmp3.length; i++) {
    console.log(tmp3[i]) // h e l l o
}
console.log(i) //5 变量i原本只是用来控制循环,但是循环结束之后,它并没有消失,泄露成了全部变量

//7 (2)es6块级作用域

function fun3() {
    let n = 5;
    if (true) {
        n = 10;
    }
    console.log(5)
}
fun3(); // 5

//8 const 声明一个只读的常量,一旦声明,无法改变,所以const声明时必须赋值,也不存在变量提升.不允许重复声明,存在暂存性死区

const tmp4 = 3;
console.log(tmp4);
// tmp4 = 4;
// console.log(tmp4); Error tmp4 is read-only

// const tmp5; 
// console.log(tmp5); SyntaxError: Missing initializer in const declaration

// const本质,变量指向的那个内存地址不可变,但如对象,数组时,其对应地址中的数据结构就可以改变
const tmp6 = [];
tmp6.prop = 123;
console.log(tmp6); // [prop:123] 可添加数据结构
// tmp6 = [123]; Error: tmp6 is read-only