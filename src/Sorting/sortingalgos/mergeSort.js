export const mergeSort = (array) => {
  if (array.length === 1) return array;
  const animations = [];
  mergeSortHelper(array, 0, array.length - 1, animations);
  return animations;
};

function mergeSortHelper(mainarray, start, end, animations) {
  if (start === end) return;
  const mid = Math.floor((start + end) / 2);
  mergeSortHelper(mainarray, start, mid, animations);
  mergeSortHelper(mainarray, mid + 1, end, animations);
  merge(mainarray, start, mid, end, animations);
}

function merge(mainarray, start, mid, end, animations) {
  var k = start;
  var i = start;
  var j = mid + 1;
  var temp = [];
  while (i <= mid && j <= end) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (mainarray[i] <= mainarray[j]) {
      animations.push([k++, mainarray[i]]);
      temp.push(mainarray[i++]);
    } else {
      animations.push([k++, mainarray[j]]);
      temp.push(mainarray[j++]);
    }
  }

  while (i <= mid) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k++, mainarray[i]]);
    temp.push(mainarray[i++]);
  }
  while (j <= end) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k++, mainarray[j]]);
    temp.push(mainarray[j++]);
  }
  k = start;

  for (var l = 0; l < temp.length; l++) mainarray[k++] = temp[l];
}
