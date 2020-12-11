export const quickSort = (array) => {
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
};

function quickSortHelper(array, start, end, animations) {
  if (end < start) return;
  var pivot = findPivot(array, start, end, animations);
  quickSortHelper(array, start, pivot - 1, animations);
  quickSortHelper(array, pivot + 1, end, animations);
}

function findPivot(array, start, end, animations) {
  var l = array[start];
  var m = start;
  for (var i = start + 1; i <= end; i++) {
    if (array[i] <= l) {
      var temp = array[i];
      array[i] = array[++m];
      array[m] = temp;
      animations.push([1, start, i, m]);
      animations.push([2, start, i, m]);
    }
  }
  temp = array[start];
  array[start] = array[m];
  array[m] = temp;
  animations.push([1, start, m]);
  animations.push([2, start, m]);
  return m;
}
