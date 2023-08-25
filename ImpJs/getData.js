console.log("Welcome to Programiz!");
/*
function main() {
    let a = 5
    setTimeout(() => {
        a = 10
    }, 1000)
    return a
}
let res = main()
console.log(res)//5 output is not expected it can be fixed using callback
console.log(res+50)//55
*/
function main(cb) {
    let a = 5
    setTimeout(() => {
        a = 10
        cb(a)
    }, 1000)
    // return a
}
//let correctRes
//going to call main function with a call back function , the callback will be called and exicuted by main function fron inside settimeout
main((res) => {// i called main function and main function called inner function
    console.log(res)//10
    console.log(res + 50)//60
    correctRes = res
})

//console.log(correctRes)//still undefined
// note seem problem will occure when you will read a file inside a function and return file content then that also can be fixed via callback