function intercambiarPares(head) {
  if (!head || !head.next) {
    // La lista está vacía o tiene solo un nodo, no hay nada que intercambiar
    return head;
  }

  let prev = null;
  let current = head;
  let next = null;

  while (current && current.next) {
    next = current.next;
    current.next = next.next;
    next.next = current;

    if (prev) {
      prev.next = next;
    } else {
      // Si no hay un nodo previo, actualiza la cabeza de la lista
      head = next;
    }

    prev = current;
    current = current.next;
  }

  return head;
}

/* crear una lista enlazada */
