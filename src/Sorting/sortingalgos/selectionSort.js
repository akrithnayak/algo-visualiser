export const selectionSort = (array) => {
  const animations = [];
  selectionSortHelper(array, animations);
  return animations;
};

function selectionSortHelper(array, animations) {
  var n = array.length;

  for (var i = 0; i < n - 1; i++) {
    var min_idx = i;
    animations.push([1, i]);
    for (var j = i + 1; j < n; j++) {
      animations.push([2, j]);
      animations.push([3, j]);
      if (array[j] < array[min_idx]) {
        if (min_idx !== i) animations.push([4, min_idx]);
        animations.push([5, j]);
        min_idx = j;
      }
    }

    var temp = array[min_idx];
    array[min_idx] = array[i];
    array[i] = temp;
    animations.push([1, min_idx, i]);
    animations.push([2, min_idx, i]);
  }
}
