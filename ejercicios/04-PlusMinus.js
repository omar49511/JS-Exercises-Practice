"use strict";

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

function plusMinus(arr) {
  const numerador = arr.length;
  let val = 0;
  let val2 = 0;
  let val3 = 0;
  arr.map((x) => {
    // Asegurarse de que x esté dentro del rango [-100, 100]
    if (x > 100) {
      x = 100;
    } else if (x < -100) {
      x = -100;
    }
    // Incrementar las variables en función de x
    if (x > 0) {
      val++;
    } else if (x < 0) {
      val2++;
    } else {
      val3++;
    }
  });

  let result1 = (val / numerador).toFixed(6);
  let result2 = (val2 / numerador).toFixed(6);
  let result3 = (val3 / numerador).toFixed(6);

  console.log(`${result1} ${result2} ${result3}`);
}

const n = parseInt(readLine().trim(), 10);

const arr = readLine()
  .replace(/\s+$/g, "")
  .split(" ")
  .map((arrTemp) => parseInt(arrTemp, 10));

plusMinus(arr);
