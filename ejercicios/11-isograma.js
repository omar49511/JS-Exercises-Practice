function esIsograma(palabra) {
  if (palabra === "") return true; // ✅ Caso de cadena vacía

  const cadenaNormalizada = palabra.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // ✅ Elimina acentos
    .toLowerCase();

  if (cadenaNormalizada.includes(" ")) return false; // ✅ Rechaza múltiples palabras

  let vistos = new Set();
  for (let letra of cadenaNormalizada) {
    if (vistos.has(letra)) return false; // ✅ Detecta repetidos inmediatamente
    vistos.add(letra);
  }
  
  return true; // ✅ Si no hay repetidos, es un isograma
}

// **Pruebas**
console.log(esIsograma("")); // ✅ true
console.log(esIsograma("Perro")); // ❌ false
console.log(esIsograma("Casa")); // ✅ true
console.log(esIsograma("Palo")); // ✅ true
console.log(esIsograma("Palo loco")); // ❌ false
