export function indexWhere<T>(array: T[], predicate: (t: T) => boolean): number {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      return i;
    }
  }

  return -1;
}

export function replace<T>(array: T[], index: number, element: T): T[] {
  return [
    ...array.slice(0, index),
    element,
    ...array.slice(index + 1)
  ];
}