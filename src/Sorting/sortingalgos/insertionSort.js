export const insertionSort = (array) => {
  const animations = [];
  insertionSortHelper(array, animations);
  return animations;
};

function insertionSortHelper(array, animations) {
  var n = array.length;
  for (var i = 1; i < n; i++) {
    var key = array[i];
    var j = i - 1;
    animations.push([0, i]);
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      animations.push([1, j, j + 1]);
      animations.push([2, j, j + 1]);
      j--;
    }
    array[j + 1] = key;
    animations.push([3, i, j + 1]);
    animations.push([4, j + 1, key]);
  }
}
