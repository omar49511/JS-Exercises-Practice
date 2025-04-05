// let array = [];
// let compleat = true;
// while (compleat) {
//   let numbers = Math.random() * 8;
//   array.push(Math.round(numbers));
//   const uniqueNumbers = new Set(array);
//   let newarray = [...uniqueNumbers];
//   if (newarray.length <= 8) {
//     compleat = true;
//   } else {
//     compleat = false;
//   }
// }
// const uniqueNumbers = new Set(array);
// let newarray = [...uniqueNumbers];

// for (let index = 0; index <= 8; index++) {
//   let elementos = document.getElementById(`element${index}`);
//   if (newarray[index] !== 0) {
//     elementos.innerHTML = newarray[index];
//   }
// }

// function pressKey(e) {
//   switch (e.key) {
//     case "ArrowUp":
//       Coordenates();
//       console.log("arriba");
//       break;
//     case "ArrowDown":
//       console.log("abajo");
//       break;
//     case "ArrowLeft":
//       console.log("izquierda");
//       break;
//     case "ArrowRight":
//       console.log("derecha");
//       break;
//   }
// }

// document.addEventListener("keydown", pressKey);

// const board = [
//   [7, 3, 0],
//   [2, 1, 6],
//   [5, 8, 4],
// ];

// function dondeEstaElCero() {
//   //obtener las coordenadas del 0
// }

// function Coordenates() {
//   for (let fila = 0; fila < board.length; fila++) {
//     for (let columna = 0; columna < board.length; columna++) {
//       const element = board[fila][columna];
//       if (element === 0) {
//         if (fila < 1) {
//           //no se puede subir
//           if (columna < 1) {
//             //no se puede ir a la izquierda
//             let abajo = board[fila + 1][columna];
//             let derecha = board[fila][columna + 1];
//             console.log(abajo);
//             console.log(derecha);
//           }
//           if (columna === board.length - 1) {
//             //no se puede ir a la derecha
//             let abajo = board[fila + 1][columna];
//             let izquierda = board[fila][columna - 1];
//             console.log(abajo);
//             console.log(izquierda);
//           }
//         }
//         if (fila === board.length - 1) {
//           //no se puede bajar
//           if (columna < 1) {
//             //no se puede ir a la izquierda
//             let arriba = board[fila - 1][columna];
//             let derecha = board[fila][columna + 1];
//             console.log(arriba);
//             console.log(derecha);
//           }
//           if (columna === board.length - 1) {
//             let arriba = board[fila - 1][columna];
//             let izquierda = board[fila][columna - 1];
//             //no se puede ir a la derecha
//             console.log("estoy aqqui" + arriba);
//             console.log("estoy aqqui" + izquierda);
//           }
//         }
//         if (fila > 0 && fila < board.length - 1) {
//           if (columna > 0 && columna < board.length - 1) {
//             let arriba = board[fila - 1][columna];
//             let abajo = board[fila + 1][columna];
//             let izquierda = board[fila][columna - 1];
//             let derecha = board[fila][columna + 1];

//             console.log(arriba);
//             console.log(derecha);
//             console.log(abajo);
//             console.log(izquierda);
//           }
//         }
//       }
//     }
//   }
// }

// function DrawBoard() {
//   const elemento = document.querySelector("section");

//   for (let fila = 0; fila < board.length; fila++) {
//     let row = document.createElement("div");
//     row.setAttribute("class", "row");
//     elemento.appendChild(row);
//     for (let columna = 0; columna < board.length; columna++) {
//       let tile = document.createElement("div");
//       tile.setAttribute("class", "column");
//       row.appendChild(tile);
//       const element = board[fila][columna];
//       tile.innerText = element;
//       console.log(element);
//     }
//   }
// }

//pintar numeros aleatorios del 1 al 8 sin que se repitan en la grid
//poder seleccionar cada grid
// poder deslizar cada grid vertical y horizontal
// bloquear el desplazamiento si hay un numero adyacente
//cambiar de posicion el elemento con numero y el elemento sin numero
//poder usar las tecas para deslizar.

let numbers = shuffleArray([...Array(9).keys()]); // Genera números aleatorios del 0 al 8
let board = document.getElementById("board");

// Mezcla aleatoria
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Renderiza el tablero
function renderGrid() {
  board.innerHTML = "";
  numbers.forEach((num, index) => {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    if (num === 0) {
      cell.classList.add("empty");
    } else {
      cell.textContent = num;
      cell.addEventListener("click", () => moveTile(index));
    }
    board.appendChild(cell);
  });

  if (isSolved()) {
    setTimeout(() => alert("¡Felicidades! Has ordenado los números 🎉"), 200);
  }
}

// Mueve el número
function moveTile(index) {
  let emptyIndex = numbers.indexOf(0);
  let validMoves = [
    emptyIndex - 1,
    emptyIndex + 1,
    emptyIndex - 3,
    emptyIndex + 3,
  ];

  if (validMoves.includes(index)) {
    // Aplicar el efecto de deslizamiento elástico
    const cells = board.children;
    cells[index].classList.add("animated");
    cells[emptyIndex].classList.add("animated");

    // Intercambia las posiciones
    [numbers[emptyIndex], numbers[index]] = [
      numbers[index],
      numbers[emptyIndex],
    ];
    renderGrid();
  }
}

// Verifica si el juego está resuelto
function isSolved() {
  let solvedArray = [1, 2, 3, 4, 5, 6, 7, 8, 0]; // Orden correcto
  return numbers.every((num, index) => num === solvedArray[index]);
}

// Control por teclado
document.addEventListener("keydown", (e) => {
  const emptyIndex = numbers.indexOf(0);
  let targetIndex;

  if (e.key === "ArrowUp" && emptyIndex >= 3) {
    targetIndex = emptyIndex - 3;
  } else if (e.key === "ArrowDown" && emptyIndex <= 5) {
    targetIndex = emptyIndex + 3;
  } else if (e.key === "ArrowLeft" && emptyIndex % 3 !== 0) {
    targetIndex = emptyIndex - 1;
  } else if (e.key === "ArrowRight" && emptyIndex % 3 !== 2) {
    targetIndex = emptyIndex + 1;
  }

  if (targetIndex !== undefined) {
    moveTile(targetIndex);
  }
});

renderGrid();
