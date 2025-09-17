// Chapter 5 Practice set
// Practice Problem 1
// let arr = [1,2,3,4,5,6,7,8,9]
// let a = prompt("Enter a number")
// a = Number.parseInt(a)
// arr.push(a)
// console.log(arr)

// //practice problem 2
// let arr2 = [1,2,3,4,5,6,7,8,9]
// let a2;
// do{
//     a2 = prompt("Enter a number")
//     a2 = Number.parseInt(a)
//     arr.push(a2)
// } while (a2!=0);
// console.log(arr2)

// //practice problem 3
// let arr3 = [1,20,3,4,50,6,70,8,9]
// let n = arr3.filter((x)=>{
//     return x%10 == 0
// })
// console.log(n)

// // practice problem 4
// let arr4 = [1,20,3,4,50,6,70,8,9]
// let m = arr4.map((x)=>{
//     return x*x
// })
// console.log(m)

// practice problem 5
let arr4 = [1,2,3,4,5,6,7,8,9]
let m = arr4.reduce((x1,x2)=>{
    return x1*x2
})
console.log(m)
