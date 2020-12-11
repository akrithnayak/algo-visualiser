export const bubbleSort = (array) => {
  const animations = [];
  bubbleSortHelper(array, animations);
  return animations;
};

function swap(array, i, j) {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function bubbleSortHelper(array, animations) {
  var swapped;
  var n = array.length;
  for (var i = 0; i < n - 1; i++) {
    swapped = false;
    for (var j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        animations.push([1, j, j + 1]);
        animations.push([2, j, j + 1]);
        swapped = true;
      }
    }
    if (!swapped) break;
  }
}
