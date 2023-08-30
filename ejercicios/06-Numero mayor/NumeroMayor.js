/* Problema: Encontrar el Número Mayor

Escribe un programa que reciba una lista de números como entrada y determine el número mayor en la lista. 
Puedes suponer que la lista siempre tendrá al menos un número. 

*/

function encontrarNumeroMayorOrdenado(lista) {
  const listaOrdenada = lista.sort((a, b) => a - b);
  return listaOrdenada[listaOrdenada.length - 1];
}

function encontrarNumeroMayorBusqueda(lista) {
  let mayor = lista[0];

  for (const numero of lista) {
    if (numero > mayor) {
      mayor = numero;
    }
  }

  return mayor;
}

function encontrarNumeroMayorMathMax(lista) {
  return Math.max(...lista);
}

function encontrarNumeroMayorReduce(lista) {
  return lista.reduce(
    (mayor, numero) => (numero > mayor ? numero : mayor),
    lista[0]
  );
}

const listaEjemplo = [23, 8, 42, 15, 6, 29, 11, 37];

console.time("ordenado");
console.log(encontrarNumeroMayorOrdenado(listaEjemplo));
console.timeEnd("ordenado");

console.time("búsqueda");
console.log(encontrarNumeroMayorBusqueda(listaEjemplo));
console.timeEnd("búsqueda");

console.time("mathMax");
console.log(encontrarNumeroMayorMathMax(listaEjemplo));
console.timeEnd("mathMax");

console.time("reduce");
console.log(encontrarNumeroMayorReduce(listaEjemplo));
console.timeEnd("reduce");
