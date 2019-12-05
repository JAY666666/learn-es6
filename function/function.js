//1 函数参数的扩展
function func1(x, y) {
    y = y || 'world';
    console.log(x, y)
} //传统的函数参数默认值
func1('hello'); //hello world
func1('hello', 'hangzhou'); //hello world
func1('hello', ''); //hello world 传统的参数默认值方法 弊端:当赋值为''时,任然使用了默认值 事实上只有当y===undefined时,会触发使用默认值 


function func2(x, y = 'world') {
    console.log(x, y)
} //es6改进后的函数参数
func2('hello'); //hello world 
func2('hello', 'hangzhou'); //hello hangzhou
func2('hello', ''); //hello 此值应为比较合理的
func2('hello', undefined); //hello world undefined触发参数默认值
func2('', undefined); //world
func2('hello', null); //hello null

// function func3(x, x, y=3) {
//     console.log(x, x, y)
// }
// func3(1, 2, 3); 报错 当使用函数参数默认值时,不允许出现参数重复的情况


//2 与解构赋值默认值结合使用
function func4({
    x,
    y = 2
}) {
    console.log(x, y)
}
func4({}); //undefined 2
func4({
    x: 1,
    y: 2
}); //1 2
func4({
    x: 1
}); //1 2
// func4(); TypeError: cannot read property 'x' of undefined 函数func4的参数是个对象,只有当参数为对象时,才能进行解构赋值,否则会报错

function func5({
    x,
    y = 2
} = {}) {
    console.log(x, y)
}
func5(); //undefined 2 函数参数对象默认值为空对象

//3 rest参数 rest是个数组
function func6(...arrs) {
    let sum = 0;
    for (var val of arrs) {
        sum += val;
    }
    console.log(sum)
}
func6(1, 2, 3); //6

function func7(a, b, ...rest) {
    console.log(rest)
}
func7(1, 2, 3, 4, 5); //[3,4,5] rest参数只能放在最后

console.log((function (a, ...b) {}).length); //函数参数的length 不包括rest参数

let f = function () {};
console.log(f.name); //f 函数name属性

//4 箭头函数
var d = () => 1; //相当于 var d = function () {retrun 5}

var sum = (sum1, sum2) => sum1 + sum2;
console.log(sum(1, 2)); //3

var add = (sum1, sum2, sum3) => {
    return console.log(sum1 + sum2 + sum3)
}
add(3, 4, 5); //12 多行语句时,加大括号,用retrun返回

[1, 2, 3].map(x => x * x);

const full = ({
    first,
    last
}) => first + '' + last; //与变量结构结合使用

const numbers = (...nums) => console.log(nums);
numbers(1, 2, 3, 4, 5) //[1,2,3,4,5]与rest参数结合使用

//箭头函数使用注意点 
// function Timer() {
//     this.s1 = 0;
//     this.s2 = 0;
//     setInterval(() => this.s1++, 1000);
//     setInterval(function () {
//         this.s2++
//     }, 1000)
// }
// var timer = new Timer();
// setInterval(() => console.log('s1:', timer.s1), 3100); //s1: 3 箭头函数的this总是指向定义时的作用域,箭头函数没有this,所有此处的s1=0
// setInterval(() => console.log('s2:', timer.s2), 3100); //s2: 0 普通函数的this指向运行时的作用域(全局对象)

//箭头函数this问题  头函数默认不会使用自己的this，而是会和外层的this保持一致，最外层的this就是window对象。
function func8() {
    console.log(this)
}
func8(); //window

const func9 = {
    a: function () {
        console.log(this)
    }
};
func9.a(); //object对象

const func10 = {
    b: () => console.log(this)
};
func10.b(); //window

//vue中 
//注意，不应该使用箭头函数来定义 method 函数 (例如 plus: () => this.a++)。
//理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.a 将是 undefined。