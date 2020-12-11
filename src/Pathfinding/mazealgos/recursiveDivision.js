export const recursiveDivision = (
  grid,
  x_st,
  y_st,
  x_end,
  y_end,
  orientation
) => {
  const wallsOrder = [];
  var i;
  for (i = 0; i < grid[0].length; i++) {
    grid[0][i].isWall = true;
    wallsOrder.push(grid[0][i]);
  }
  for (i = 0; i < grid.length; i++) {
    grid[i][grid[0].length - 1].isWall = true;
    wallsOrder.push(grid[i][grid[0].length - 1]);
  }
  for (i = 0; i < grid.length; i++) {
    grid[i][0].isWall = true;
    wallsOrder.push(grid[i][0]);
  }
  for (i = 0; i < grid[0].length; i++) {
    grid[grid.length - 1][i].isWall = true;
    wallsOrder.push(grid[grid.length - 1][i]);
  }
  console.log(orientation);
  if (orientation === undefined)
    divide(grid, x_st + 1, y_st + 1, x_end - 1, y_end - 1, wallsOrder);
  else
    divideDir(
      grid,
      x_st + 1,
      y_st + 1,
      x_end - 1,
      y_end - 1,
      wallsOrder,
      orientation
    );
  return wallsOrder;
};

function divide(grid, x_st, y_st, x_end, y_end, wallsOrder) {
  var orientation = 0;
  if (x_end - x_st < 1 || y_end - y_st < 1) return;

  if (x_end - x_st > y_end - y_st) orientation = 0;
  else orientation = 1;

  const wx =
    x_st +
    (orientation === 0 ? Math.floor(Math.random() * (x_end - x_st + 1)) : 0);
  const wy =
    y_st +
    (orientation === 0 ? 0 : Math.floor(Math.random() * (y_end - y_st + 1)));
  const px =
    wx + (orientation === 0 ? 0 : Math.floor(Math.random() * (x_end - x_st)));
  const py =
    wy + (orientation === 0 ? Math.floor(Math.random() * (y_end - y_st)) : 0);

  var i;
  if (orientation === 0) {
    for (i = wy; i <= y_end; i++) {
      if (px === wx && py === i) continue;
      grid[wx][i].isWall = true;
      wallsOrder.push(grid[wx][i]);
    }
    divide(grid, x_st, y_st, wx - 2, y_end, wallsOrder);
    divide(grid, wx + 2, wy, x_end, y_end, wallsOrder);
    return;
  }
  for (i = wx; i <= x_end; i++) {
    if (px === i && py === wy) {
      continue;
    }
    grid[i][wy].isWall = true;
    wallsOrder.push(grid[i][wy]);
  }
  divide(grid, x_st, y_st, x_end, wy - 2, wallsOrder);
  divide(grid, wx, wy + 2, x_end, y_end, wallsOrder);
}

function divideDir(grid, x_st, y_st, x_end, y_end, wallsOrder, orientation) {
  if (x_end - x_st < 1 || y_end - y_st < 1) return;

  const wx =
    x_st +
    (orientation === 0 ? Math.floor(Math.random() * (x_end - x_st + 1)) : 0);
  const wy =
    y_st +
    (orientation === 0 ? 0 : Math.floor(Math.random() * (y_end - y_st + 1)));
  const px =
    wx + (orientation === 0 ? 0 : Math.floor(Math.random() * (x_end - x_st)));
  const py =
    wy + (orientation === 0 ? Math.floor(Math.random() * (y_end - y_st)) : 0);

  var i;
  if (orientation === 0) {
    for (i = wy; i <= y_end; i++) {
      if (px === wx && py === i) continue;
      grid[wx][i].isWall = true;
      wallsOrder.push(grid[wx][i]);
    }
    divideDir(grid, x_st, y_st, wx - 2, y_end, wallsOrder, orientation);
    divideDir(grid, wx + 2, wy, x_end, y_end, wallsOrder, orientation);
    return;
  }
  for (i = wx; i <= x_end; i++) {
    if (px === i && py === wy) {
      continue;
    }
    grid[i][wy].isWall = true;
    wallsOrder.push(grid[i][wy]);
  }
  divideDir(grid, x_st, y_st, x_end, wy - 2, wallsOrder, orientation);
  divideDir(grid, wx, wy + 2, x_end, y_end, wallsOrder, orientation);
}
