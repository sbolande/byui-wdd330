let size = 8;
let row = "";
let space = [ ' ', '#' ];
let current = 0;
for (let x = 0; x < size; x++) {
  for (let y = 0; y < size; y++) {
    row += space[current++ % space.length];
  }
  console.log(row);
  row = "";
}