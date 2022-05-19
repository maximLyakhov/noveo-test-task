import { Drawable } from "./drawable";
import { Expected } from "./expected";

const canvas = new Drawable(document.querySelector("#canvas-1 canvas"));
const expected = new Expected(document.querySelector("#expected img"));

// function example() {
//   canvas.clear();
//   expected.show(0);
//   canvas.drawAt(0, 0);
//   canvas.drawAt(0, 1, "rgb(0, 0, 255)");
//   canvas.drawAt(1, 0, "red");
//   canvas.drawAt(canvas.width - 1, 0, "green");
// }
// example();

// 1. Draw a horizontal line

function task1() {
  canvas.clear();
  for (let i = 0; i < 15; i++) {
    canvas.drawAt(i, 5, "rgb(0, 0, 255)");
  }
  expected.show(1);
}
// task1();

// 2. Draw a vertical line

function task2() {
  canvas.clear();
  for (let i = 0; i < 15; i++) {
    canvas.drawAt(7, i, "red");
  }
  expected.show(2);
}
// task2();

// 3. Draw a diagonal line

function task3() {
  canvas.clear();
  let horiz = 0;
  for (let i = 0; i < 15; i++) {
    canvas.drawAt(i, horiz++, "green");
  }
  expected.show(3);
}
// task3();

// 4. Draw a triangle

const constraints = new Array(15).fill([...Array(15).keys()]);

function task4() {
  canvas.clear();

  for (let i = 0; i < 15; i++) {
    canvas.drawAt(i, 7, "green");
  }

  let left = Math.round(constraints.length / 2);
  let right = Math.round(constraints.length / 2);

  constraints.forEach((_, index) => {
    canvas.drawAt(canvas.width - left, index, "green");
    canvas.drawAt(canvas.width - right, index, "green");

    right--;
    left++;
  });

  expected.show(4);
}
// task4();

// 5. FizzBuzz
// The playground is a 15 by 15 grid.
// Assign a number to each cell of this grid like so:
//   1   2   3 ...  15
//  16  17  18 ...  30
// ...
// 211 212 213 ... 225
//
// Call the assigned number "the index of the cell".
// The goal of this exercice is to color each cell with rgb(0, i, 0), i being its index.
// A few exceptions are:
// 1. when the index is a multiple of 4 choose rgb(0, 0, 255) as the cell's color
// 2. when it's a multiple of 7 choose rgb(255, 0, 0)
// 3. when it's a multplie of both 4 and 7 choose rgb(255, 0, 255)

function task5() {
  canvas.clear();

  let curr = 0;
  const newMap = constraints.map((horizontal) =>
    horizontal.map(() => {
      curr++;
      return curr;
    })
  );

  newMap.forEach((vertical, i) => {
    vertical.forEach((cellIndex, k) => {
      canvas.drawAt(k, i, `rgb(0, ${cellIndex}, 0)`);

      const remainder4 = Math.ceil(cellIndex % 4);
      const remainder7 = Math.ceil(cellIndex % 7);

      if ((remainder4 === 0 && remainder7) === 0) {
        canvas.drawAt(k, i, "rgb(255, 0, 255)");
      } else if (remainder4 === 0) {
        canvas.drawAt(k, i, "rgb(255, 0, 0");
      } else if (remainder7 === 0) {
        canvas.drawAt(k, i, "rgb(0, 0, 255)");
      }
    });
  });
  expected.show(5);
}
// task5();

// 6. Style the display:
// - captions should be: centered, in bold and in all caps (full capital letters)
// - display the playground and the expected image next to each other

// -> index.css

// 7. Change between tasks via an html input
const taskMap = {
  1: task1,
  2: task2,
  3: task3,
  4: task4,
  5: task5
};

document.querySelector("input").addEventListener("input", (ev) => {
  const picked = ev.target.value;
  expected.show(ev.target.value);
  taskMap[picked]();
});

// 8. Only reveal the expected image when the mouse passes over the playground. Add some fancy animations.

const plgrnd = document.querySelector("#canvas-1");
const expctd = document.querySelector("#expected");

plgrnd.addEventListener("mouseover", () => {
  expctd.classList.add("shown");
});
plgrnd.addEventListener("mouseleave", () => {
  expctd.classList.remove("shown");
});
