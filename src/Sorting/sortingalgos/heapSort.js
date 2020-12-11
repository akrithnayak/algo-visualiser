export const heapSort = (array) => {
  const animations = [];
  heapSortHelper(array, animations);
  return animations;
};

function heapSortHelper(array, animations) {
  var n = array.length;

  for (var j = Math.ceil(n / 2 - 1); j >= 0; j--) {
    heapify(array, n, j, animations);
  }

  for (var i = n - 1; i >= 0; i--) {
    var temp = array[0];
    array[0] = array[i];
    array[i] = temp;
    animations.push([1, 0, i]);
    animations.push([2, 0, i]);
    heapify(array, i, 0, animations);
  }
}

function heapify(array, n, i, animations) {
  var largest = i;
  var l = 2 * i + 1;
  var r = 2 * i + 2;

  animations.push([1, largest]);
  if (l < n) {
    animations.push([2, l]);
    animations.push([3, l]);
  }
  if (l < n && array[l] > array[largest]) {
    animations.push([0, largest]);
    largest = l;
    animations.push([1, largest]);
  }
  if (r < n) {
    animations.push([2, r]);
    animations.push([3, r]);
  }
  if (r < n && array[r] > array[largest]) {
    animations.push([0, largest]);
    largest = r;
    animations.push([1, largest]);
  }

  if (largest !== i) {
    var temp = array[i];
    array[i] = array[largest];
    array[largest] = temp;
    animations.push([1, i, largest]);
    animations.push([2, i, largest]);
    animations.push([0, largest]);
    heapify(array, n, largest, animations);
  }
  animations.push([0, largest]);
}
