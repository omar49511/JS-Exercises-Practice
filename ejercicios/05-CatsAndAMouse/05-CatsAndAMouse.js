function catAndMouse(x, y, z) {
  if (Math.abs(x - z) < Math.abs(y - z)) {
    return "Cat A";
  } else if (Math.abs(x - z) > Math.abs(y - z)) {
    return "Cat B";
  } else if (Math.abs(x - z) == Math.abs(y - z)) {
    return "Mouse C";
  }
}

console.log(catAndMouse(1, 2, 3));
console.log(catAndMouse(1, 3, 2));
