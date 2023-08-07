Dos gatos y un ratón están en varias posiciones en una línea. Se le darán sus posiciones iniciales. Tu tarea es determinar qué gato llegará primero al ratón, suponiendo que el ratón no se mueva y que los gatos viajen a la misma velocidad. Si los gatos llegan al mismo tiempo, el ratón podrá moverse y escapará mientras luchan.

te dan q consultas en forma de x, y, z representando las posiciones respectivas para los gatos A y B, y para ratón C. Completa la función `catAndMouse()` para devolver la respuesta adecuada a cada consulta, que se imprimirá en una nueva línea.

si gato A atrapa el mouse primero, imprime Cat A.
si gato B atrapa el mouse primero, imprime Cat B.
Si ambos gatos alcanzan al ratón al mismo tiempo, imprima Mouse C mientras los dos gatos pelean y el ratón escapa.

Ejemplo

```
x= 2
y= 5
z= 4
```

Los gatos están en posiciones.2(Gato A) y 5(Cat B), y el mouse está en la posición 4. Cat B, en la posición 5 llegará primero ya que es sólo 1 unidad de distancia mientras que la otra está 2 unidades de distancia. Devuelve 'Gato B'.

### Función descriptiva

Complete la función catAndMouse en el editor a continuación.

catAndMouse tiene los siguientes parámetros:

- int x : gato A posición de
- int y : gato B posición de
- int z : Ratón C posición de

### Devoluciones

- cadena: 'Gato A', 'Gato B' o 'Ratón C'

### Formato de entrada

La primera línea contiene un solo entero,, que indica el número de consultas.
Cada una de laslas líneas subsiguientes contienen tres enteros separados por espacios que describen los valores respectivos de(gatoubicación de ),(gatola ubicación de ), y(ratónubicación).

Restricciones

Entrada de muestra 0

```

2
1 2 3
1 3 2

```

Salida de muestra 0

```

Gato B
Ratón C
Explicación 0

```

Consulta 0: Las posiciones de los gatos y el ratón se muestran a continuación:

![Alt text](https://s3.amazonaws.com/hr-challenge-images/0/1480434557-601bef86ba-cat1.png)
Gatoatrapará el mouse primero, por lo que imprimiremos Cat Ben una nueva línea.

Consulta 1 : en esta consulta, los gatosyllegar al ratónexactamente al mismo tiempo:
![Alt text](image-1.png)

Debido a que el mouse se escapa, imprimimos Mouse Cen una nueva línea.
