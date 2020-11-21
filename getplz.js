const fs = require("fs");

let all = fs.readFileSync("data/plz.txt");
let str = String(all);

let arr = [];
for (el of str.matchAll(/\d{5}/g)) {
  console.log(el[0]);
  arr.push(el[0]);
}

let s = new Set(arr);
let arr2 = Array.from(s);

let f = arr2.join("\n");

fs.writeFileSync("alleplzde.txt", f);

// let arr = [..." 234 234 1222 12232 765 ".matchAll(/\d{5}/g)];
// str.matchAll(regex).forEach((el) => {
//   console.log(el);
// });

//console.log(arr);
