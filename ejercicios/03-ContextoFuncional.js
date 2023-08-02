function funcion1() {
  //la variable a  existe para todo lo que este dentro de la funcion
  //pero no por fuera de esta
  var a = 2;

  function funcion3() {
    var b = 5;
    function funcion5() {
      console.log(a, b);
    }
    return funcion5();
  }
  return funcion3();
}

function funcion2() {
  var a = 7;
  function funcion4() {}
}

funcion1();
funcion2();
