const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
const fs = require("fs");

function getContact(plz, branche) {
  console.log(plz);
  let str = String(fs.readFileSync("plzdata.csv"));
  let arr = str.split("\n");
  let correctrow = null;
  for (let i = 0; i < arr.length; i++) {
    const row = arr[i];
    let unterteiledrow = row.split("|");
    if (unterteiledrow[0] == plz) {
      correctrow = unterteiledrow;
      break;
    }
  }

  let rObject = {
    originalplz: correctrow[0],
    street: correctrow[3],
    plz: correctrow[1],
    ort: correctrow[2],
    telefon: correctrow[4],
    fax: correctrow[6],
    email: correctrow[5],
    homepage: correctrow[7],
  };

  console.log(rObject);

  return rObject;
}

app.post("/contact", (req, res) => {
  if (req.body) {
    const { plz, branche } = req.body;
    let contact = getContact(plz, branche);
    res.json(contact);
  } else res.status(400).send("Fehler du Hurensohn.");
});

app.post("/test", (req, res) => {
  res.json({ test: true });
});

const port = 3000;
app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
