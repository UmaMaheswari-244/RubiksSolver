let cube = {
  U: Array(9).fill('white'),
  D: Array(9).fill('yellow'),
  F: Array(9).fill('green'),
  B: Array(9).fill('blue'),
  L: Array(9).fill('orange'),
  R: Array(9).fill('red'),
};

const moveHistory = [];

function renderCube() {
  document.querySelectorAll('.face').forEach(face => {
    const faceKey = face.dataset.face;
    face.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const sticker = document.createElement('div');
      sticker.style.backgroundColor = cube[faceKey][i];
      face.appendChild(sticker);
    }
  });
  updateMoveHistory();
}

function rotateFace(faceArr, clockwise = true) {
  return clockwise
    ? [faceArr[6], faceArr[3], faceArr[0], faceArr[7], faceArr[4], faceArr[1], faceArr[8], faceArr[5], faceArr[2]]
    : [faceArr[2], faceArr[5], faceArr[8], faceArr[1], faceArr[4], faceArr[7], faceArr[0], faceArr[3], faceArr[6]];
}

function doMove(move, record = true) {
  const clockwise = !move.endsWith("'");
  const face = move.replace("'", "");

  switch (face) {
    case 'U': rotateUp(clockwise); break;
    case 'D': rotateDown(clockwise); break;
    case 'L': rotateLeft(clockwise); break;
    case 'R': rotateRight(clockwise); break;
    case 'F': rotateFront(clockwise); break;
    case 'B': rotateBack(clockwise); break;
  }

  if (record) moveHistory.push(move);
  renderCube();
}

function getInverseMove(move) {
  return move.endsWith("'") ? move.slice(0, -1) : move + "'";
}

function updateMoveHistory() {
  const moveDisplay = document.getElementById("moveHistory");
  moveDisplay.textContent = moveHistory.length ? moveHistory.join(" ") : "None";
}

function undoMove() {
  if (!moveHistory.length) return;
  const lastMove = moveHistory.pop();
  doMove(getInverseMove(lastMove), false);
}

function scramble() {
  const moves = ['U', "U'", 'D', "D'", 'L', "L'", 'R', "R'", 'F', "F'", 'B', "B'"];
  for (let i = 0; i < 20; i++) {
    const move = moves[Math.floor(Math.random() * moves.length)];
    doMove(move);
  }
}

function resetCube() {
  cube = {
    U: Array(9).fill('white'),
    D: Array(9).fill('yellow'),
    F: Array(9).fill('green'),
    B: Array(9).fill('blue'),
    L: Array(9).fill('orange'),
    R: Array(9).fill('red'),
  };
  moveHistory.length = 0;
  document.getElementById("solutionSteps").textContent = '';
  renderCube();
}

function solveCube() {
  if (!moveHistory.length) {
    document.getElementById("solutionSteps").textContent = 'Cube is already solved.';
    return;
  }

  const reversed = moveHistory.slice().reverse().map(getInverseMove);
  document.getElementById("solutionSteps").textContent = reversed.join(' ');
}

// ---------------- Face Rotations ----------------

function rotateUp(clockwise = true) {
  cube.U = rotateFace(cube.U, clockwise);
  const [F, R, B, L] = [cube.F.slice(), cube.R.slice(), cube.B.slice(), cube.L.slice()];
  if (clockwise) {
    [cube.F[0], cube.F[1], cube.F[2]] = [L[0], L[1], L[2]];
    [cube.R[0], cube.R[1], cube.R[2]] = [F[0], F[1], F[2]];
    [cube.B[0], cube.B[1], cube.B[2]] = [R[0], R[1], R[2]];
    [cube.L[0], cube.L[1], cube.L[2]] = [B[0], B[1], B[2]];
  } else {
    [cube.F[0], cube.F[1], cube.F[2]] = [R[0], R[1], R[2]];
    [cube.L[0], cube.L[1], cube.L[2]] = [F[0], F[1], F[2]];
    [cube.B[0], cube.B[1], cube.B[2]] = [L[0], L[1], L[2]];
    [cube.R[0], cube.R[1], cube.R[2]] = [B[0], B[1], B[2]];
  }
}

function rotateDown(clockwise = true) {
  cube.D = rotateFace(cube.D, clockwise);
  const [F, R, B, L] = [cube.F.slice(), cube.R.slice(), cube.B.slice(), cube.L.slice()];
  if (clockwise) {
    [cube.F[6], cube.F[7], cube.F[8]] = [L[6], L[7], L[8]];
    [cube.R[6], cube.R[7], cube.R[8]] = [F[6], F[7], F[8]];
    [cube.B[6], cube.B[7], cube.B[8]] = [R[6], R[7], R[8]];
    [cube.L[6], cube.L[7], cube.L[8]] = [B[6], B[7], B[8]];
  } else {
    [cube.F[6], cube.F[7], cube.F[8]] = [R[6], R[7], R[8]];
    [cube.L[6], cube.L[7], cube.L[8]] = [F[6], F[7], F[8]];
    [cube.B[6], cube.B[7], cube.B[8]] = [L[6], L[7], L[8]];
    [cube.R[6], cube.R[7], cube.R[8]] = [B[6], B[7], B[8]];
  }
}

function rotateLeft(clockwise = true) {
  cube.L = rotateFace(cube.L, clockwise);
  const [U, F, D, B] = [cube.U.slice(), cube.F.slice(), cube.D.slice(), cube.B.slice()];
  if (clockwise) {
    [cube.F[0], cube.F[3], cube.F[6]] = [U[0], U[3], U[6]];
    [cube.D[0], cube.D[3], cube.D[6]] = [F[0], F[3], F[6]];
    [cube.B[8], cube.B[5], cube.B[2]] = [D[0], D[3], D[6]];
    [cube.U[0], cube.U[3], cube.U[6]] = [B[8], B[5], B[2]];
  } else {
    [cube.F[0], cube.F[3], cube.F[6]] = [D[0], D[3], D[6]];
    [cube.D[0], cube.D[3], cube.D[6]] = [B[8], B[5], B[2]];
    [cube.B[8], cube.B[5], cube.B[2]] = [U[0], U[3], U[6]];
    [cube.U[0], cube.U[3], cube.U[6]] = [F[0], F[3], F[6]];
  }
}

function rotateRight(clockwise = true) {
  cube.R = rotateFace(cube.R, clockwise);
  const [U, F, D, B] = [cube.U.slice(), cube.F.slice(), cube.D.slice(), cube.B.slice()];
  if (clockwise) {
    [cube.F[2], cube.F[5], cube.F[8]] = [U[2], U[5], U[8]];
    [cube.D[2], cube.D[5], cube.D[8]] = [F[2], F[5], F[8]];
    [cube.B[6], cube.B[3], cube.B[0]] = [D[2], D[5], D[8]];
    [cube.U[2], cube.U[5], cube.U[8]] = [B[6], B[3], B[0]];
  } else {
    [cube.F[2], cube.F[5], cube.F[8]] = [D[2], D[5], D[8]];
    [cube.D[2], cube.D[5], cube.D[8]] = [B[6], B[3], B[0]];
    [cube.B[6], cube.B[3], cube.B[0]] = [U[2], U[5], U[8]];
    [cube.U[2], cube.U[5], cube.U[8]] = [F[2], F[5], F[8]];
  }
}

function rotateFront(clockwise = true) {
  cube.F = rotateFace(cube.F, clockwise);
  const [U, R, D, L] = [cube.U.slice(), cube.R.slice(), cube.D.slice(), cube.L.slice()];
  if (clockwise) {
    [cube.U[6], cube.U[7], cube.U[8]] = [L[8], L[5], L[2]];
    [cube.R[0], cube.R[3], cube.R[6]] = [U[6], U[7], U[8]];
    [cube.D[2], cube.D[1], cube.D[0]] = [R[0], R[3], R[6]];
    [cube.L[8], cube.L[5], cube.L[2]] = [D[2], D[1], D[0]];
  } else {
    [cube.U[6], cube.U[7], cube.U[8]] = [R[0], R[3], R[6]];
    [cube.L[8], cube.L[5], cube.L[2]] = [U[6], U[7], U[8]];
    [cube.D[2], cube.D[1], cube.D[0]] = [L[8], L[5], L[2]];
    [cube.R[0], cube.R[3], cube.R[6]] = [D[2], D[1], D[0]];
  }
}

function rotateBack(clockwise = true) {
  cube.B = rotateFace(cube.B, clockwise);
  const [U, R, D, L] = [cube.U.slice(), cube.R.slice(), cube.D.slice(), cube.L.slice()];
  if (clockwise) {
    [cube.U[0], cube.U[1], cube.U[2]] = [L[6], L[3], L[0]];
    [cube.R[2], cube.R[5], cube.R[8]] = [U[0], U[1], U[2]];
    [cube.D[8], cube.D[7], cube.D[6]] = [R[2], R[5], R[8]];
    [cube.L[6], cube.L[3], cube.L[0]] = [D[8], D[7], D[6]];
  } else {
    [cube.U[0], cube.U[1], cube.U[2]] = [R[2], R[5], R[8]];
    [cube.L[6], cube.L[3], cube.L[0]] = [U[0], U[1], U[2]];
    [cube.D[8], cube.D[7], cube.D[6]] = [L[6], L[3], L[0]];
    [cube.R[2], cube.R[5], cube.R[8]] = [D[8], D[7], D[6]];
  }
}

// Make functions globally available for onclick
window.doMove = doMove;
window.scramble = scramble;
window.undoMove = undoMove;
window.resetCube = resetCube;
window.solveCube = solveCube;

window.onload = () => {
  renderCube();
  document.getElementById('solveBtn')?.addEventListener('click', solveCube);
};
