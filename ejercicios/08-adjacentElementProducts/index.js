function solution(inputArray) {
    let numbers = inputArray[0] * inputArray[1];
    for (let i = 1; i < inputArray.length - 1; i++) {
        let multi = inputArray[i] * inputArray[i + 1];
        if (numbers < multi) {
            numbers = multi;
        }
    }
    return numbers;
}

var inputArray = [3, 6, -2, -5, 7, 3];
console.log(solution(inputArray)); // Output: 21


function solution2(inputArray) {
    return Math.max(...inputArray.slice(1).map((num, index) => num * inputArray[index]));
}

var inputArray = [3, 6, -2, -5, 7, 3];
console.log(solution2(inputArray)); // Output: 21

function solution3(inputArray) {
    return inputArray.slice(1).reduce((maxProduct, currentNumber, index) => {
        const product = currentNumber * inputArray[index];
        return product > maxProduct ? product : maxProduct;
    }, inputArray[0] * inputArray[1]);
}

var inputArray = [3, 6, -2, -5, 7, 3];
console.log(solution3(inputArray)); // Output: 21
