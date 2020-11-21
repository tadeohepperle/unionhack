// https://www.igmetall.de/ueber-uns/igmetall-vor-ort/geschaeftsstellensuche?searchTerm=38112
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

async function getHTMLFromURL(url) {
  let res = await axios.get(url);
  if (res.status != 200) console.log(`Response Error Status ${res.status}`);
  return res.data;
}

function getDataFromHTML(html, plz) {
  const contactDataTableStructure = [
    "street",
    "plzort",
    "telefon",
    "fax",
    "email",
    "homepage",
  ];

  let rObject = { originalplz: plz };
  let $ = cheerio.load(html);
  $("table.dn-sm.dn-xs > tbody  > tr").each((i, tr) => {
    // let name = tr.firstChild();
    // let wert = tr.lastChild();
    let tr$ = cheerio.load(tr);
    let title = "";
    let value = "";
    tr$("td").each((j, e) => {
      let tdContent = tr$(e).text();
      if (j == 0) title = tdContent;
      if (j == 1) value = tdContent;
    });
    rObject[contactDataTableStructure[i]] = value;
  });

  if (rObject["plzort"]) {
    let plzort = rObject["plzort"].split(" ");
    rObject["plz"] = plzort[0];
    rObject["ort"] = plzort[1];
    delete rObject["plzort"];
  }

  return rObject;
  // console.log(table.html());
}

async function getDataFromURL(url, plz) {
  let html = await getHTMLFromURL(url);
  let data = getDataFromHTML(html, plz);
  return data;
}

async function appendDataToFile(filename, rObject) {
  let {
    street,
    plz,
    ort,
    telefon,
    fax,
    email,
    homepage,
    name,
    originalplz,
  } = rObject;
  let str = `${originalplz}|${plz}|${ort}|${street}|${telefon}|${email}|${fax}|${homepage}|${
    name || ""
  }\n`;
  await appendLineToFile(filename, str);
}

async function getIGMDataforPLZAndAppendToFile(filename, plz) {
  let url = `https://www.igmetall.de/ueber-uns/igmetall-vor-ort/geschaeftsstellensuche?searchTerm=${plz}`;
  let data = await getDataFromURL(url, plz);
  console.log(data);
  await appendDataToFile(filename, data);
}

async function appendLineToFile(filename, line) {
  await fs.promises.appendFile(filename, line);
}

async function waitPromise(s) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, s * 1000);
  });
}

function randomRange(a, b) {
  return a + Math.random() * (b - a);
}

async function readLinesAgain(filename) {
  let file = await fs.promises.readFile(filename);
  let arr = String(file).split("\n");
  arr = arr.map((el) => el.split("|"));
  //.map((el) => el.split("|"));
  return arr;
}

async function run() {
  // let alleplz = String(fs.readFileSync("alleplzde.txt")).split("\n");

  let alleplz = ["56826"];

  for (let i = 0; i < alleplz.length; i++) {
    const plz = alleplz[i];
    await waitPromise(randomRange(0.1, 0.3));
    console.log(`scraping for plz: ${plz}`);
    await getIGMDataforPLZAndAppendToFile("igm.csv", plz);
  }

  //let d = await getDataFromURL(testurl);

  // let d = await getDataFromURL(testurl);
  // console.log(d);
  // getIGMDataforPLZAndAppendToFile("igm.csv", 18249);
}

async function run2() {
  let filenamehere = "igmcopy.csv";
  alreadygood = [];
  todo = [];
  let arr = await readLinesAgain(filenamehere);
  console.log(arr);
  arr.forEach((row) => {
    if (row[1] == "undefined") todo.push(row);
    else alreadygood.push(row);
  });

  console.log(todo);
  //console.log(alreadygood);

  // write alreadygood back to file:

  let goodstr = alreadygood.map((el) => el.join("|")).join("\n");
  console.log(`todo: ${todo.length} lines to go...`);
  await fs.promises.writeFile("igmcopy2.csv", goodstr);

  for (let i = 0; i < todo.length; i++) {
    const todorn = todo[i];
    plz = todorn[0];
    await waitPromise(randomRange(0.1, 0.3));
    console.log(`scraping for plz: ${plz}`);
    await getIGMDataforPLZAndAppendToFile("igmcopy2.csv", plz);
  }
}

run2();
