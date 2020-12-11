export const reverseSort = (array) => {
  const animations = [];
  reverseSortHelper(array, 0, array.length - 1, animations);
  return animations;
};

function reverseSortHelper(array, start, end, animations) {
  if (end < start) return;
  var pivot = findPivot(array, start, end, animations);
  reverseSortHelper(array, start, pivot - 1, animations);
  reverseSortHelper(array, pivot + 1, end, animations);
}

function findPivot(array, start, end, animations) {
  var l = array[start];
  var m = start;
  for (var i = start + 1; i <= end; i++) {
    if (array[i] > l) {
      var temp = array[i];
      array[i] = array[++m];
      array[m] = temp;
      animations.push([start, i, m]);
    }
  }
  temp = array[start];
  array[start] = array[m];
  array[m] = temp;
  animations.push([start, m]);
  return m;
}
