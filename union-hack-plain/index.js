const TESTMODUS = true;
const PHASEDURATION = 100;
let state = {
  phaseNumber: 0,
  gehalt: null,
  geschlecht: null,
  erfahrung: null,
  unternehmen: null,
  branche: null,
  unterbranche: null,
  transitioning: true,
  endphase: false,
};

const BACKENDURL = "http://localhost:3000/contact";

const UNIONS = {
  igbauen: {
    name: "IG Bauen-Agrar-Umwelt",
    description:
      "Die Industriegewerkschaft Bauen-Agrar-Umwelt (IG BAU) ist mit gut 247.000 (181.012 männlich, 66.169 weiblich) Mitgliedern (Stand: 2018)[1] die fünftgrößte Einzelgewerkschaft im Deutschen Gewerkschaftsbund (DGB). Sie hat ihren Sitz in Frankfurt am Main. In Berlin und Brüssel unterhält sie politische Verbindungsbüros. Bundesvorsitzender der IG BAU ist seit 2013 Robert Feiger. Sein Vorgänger war ab November 1995 Klaus Wiesehügel.",
  },
  bergbau: {
    name: "IG Bergbau. Chemie, Energie",
    description:
      "Die IG Bergbau, Chemie, Energie ist sowohl Mitglied im Deutschen Gewerkschaftsbund (DGB) als auch im Netzwerk Europäische Bewegung Deutschland. Sie ist die drittgrößte Einzelgewerkschaft im DGB. 2018 gehörten ihr rund 632.400 (495.398 männlich, 136.991 weiblich) Mitglieder an. Die Gewerkschaft deckt Berufe in den Branchen Bergbau, Chemie, Gas, Glas, Kautschuk, Keramik, Kunststoffe, Leder, Mineralöl, Papier, Pharma, Sanierung/Entsorgung, Steinkohle und Wasserwirtschaft ab.",
  },
  evg: {
    name: "EVG-Eisenbahn",
    description:
      "Die Eisenbahn- und Verkehrsgewerkschaft (EVG) ist eine deutsche Gewerkschaft, die am 30. November 2010 durch die Fusion der Verkehrsgewerkschaft GDBA und Transnet entstand. Wie zuvor Transnet gehört die EVG dem DGB an.[2] Sie ist darüber hinaus Mitglied der Europäischen Transportarbeiter-Föderation und der Internationalen Transportarbeiter-Föderation.",
  },
  gew: {
    name: "Gewerkschaft Erziehung und Wissenschaft",
    description:
      "Die Gewerkschaft Erziehung und Wissenschaft (GEW) ist eine Gewerkschaft im Deutschen Gewerkschaftsbund mit Sitz in Frankfurt am Main und einem „Parlamentarischen Verbindungsbüro“ in Berlin. Die GEW ist föderal organisiert und besteht aus 16 Landesverbänden. Sie ist Mitglied der Bildungsinternationale (BI, englisch EI) und des Europäischen Gewerkschaftskomitees für Bildung und Wissenschaft (EGBW, englisch ETUCE).",
  },
  metall: {
    name: "IG Metall",
    description:
      "Die IG Metall (Industriegewerkschaft Metall, IGM) ist mit 2,26 Millionen Mitgliedern[2] vor der Verdi die größte Einzelgewerkschaft in der Bundesrepublik Deutschland und ebenfalls die weltweit größte organisierte Arbeitnehmervertretung. Nachdem in den 1990er und 2000er Jahren die Mitgliederzahlen rückläufig waren (1990 gehörten der IG Metall noch 2,679 Millionen Mitglieder an), steigen sie seit 2011 wieder leicht an. Rund 500.000 Mitglieder der Massenorganisation sind Senioren.",
  },

  nahrung: {
    name: "Gewerkschaft Nahrung-Genuss-Gaststätten",
    description:
      "Die Gewerkschaft Nahrung-Genuss-Gaststätten (NGG) ist die älteste deutsche Gewerkschaft und eine der acht Einzelgewerkschaften im Deutschen Gewerkschaftsbund (DGB). Eine der Vorläuferorganisationen der 1949 gegründeten NGG ist der 1865 ins Leben gerufene Allgemeine Deutsche Cigarrenarbeiter-Verein. Heute hat die NGG rund 198.026 (115.121 männlich, 82.905 weiblich) Mitglieder.Vorsitzender der NGG ist Guido Zeitler. Stellvertretende Vorsitzende sind Freddy Adjan und Claudia Tiedge.",
  },
  bullen: {
    name: "Gewerkschaft der Polizei",
    description:
      "Die Gewerkschaft der Polizei, kurz GdP, ist eine deutsche Gewerkschaft, die sich für die Belange von Beschäftigten der deutschen Polizei einsetzt und dem Deutschen Gewerkschaftsbund angehört. Die GdP steht allen Polizeibeschäftigten (Polizisten, Verwaltungsbeamten und Tarifbeschäftigten) und Vollzugsbeamten des Zolls zur Mitgliedschaft offen sowie in manchen Landesbezirken auch Feuerwehrangehörigen. Mit 194.926 (144.115 männlich, 50.811 weiblich) Mitgliedern (Stand 2019)[2] ist sie etwa doppelt so stark wie die Deutsche Polizeigewerkschaft mit ca. 94.000 Mitgliedern. Innerhalb der GdP vertreten sogenannte Personengruppen spezifische Interessen von Frauen, Senioren und jungen Polizeibeschäftigten.",
  },
  verdi: {
    name: "Vereinte Dienstleistungsgewerkschaft (Verdi)",
    description:
      "Die Vereinte Dienstleistungsgewerkschaft (kurz Verdi, Eigenschreibweise: ver.di, Aussprache: [ˈvɛʁdiː]) ist eine deutsche Gewerkschaft mit Sitz in Berlin. Sie entstand im Jahr 2001 durch Zusammenschluss von fünf Einzelgewerkschaften und ist Mitglied im Deutschen Gewerkschaftsbund (DGB). Mit etwa zwei Millionen Mitgliedern ist sie nach der IG Metall die zweitgrößte deutsche Gewerkschaft. Die Frauenquote liegt bei 52,40 Prozent – Verdi hat 1.024.444 Frauen und 930.637 Männer organisiert.Die Gewerkschaft beschäftigt bundesweit rund 3000 Mitarbeiter und nimmt durch Beitragszahlungen jährlich etwa 479 Millionen Euro ein. Verdi ist in zehn Landesbezirke und dreizehn, ab 2022 fünf, Fachbereiche untergliedert und wird von einem neunköpfigen Bundesvorstand geleitet. Der erste Vorsitzende war von der Gründung bis 2019 Frank Bsirske, dem Frank Werneke im September 2019 im Amt folgte.",
  },
};

const HEADINGSFORFRAGEN = [
  "",
  "Aus welcher Branche kommst du?",
  "Aus welchem Unternehmen kommst du?",
  "Wie viel Berufserfahrung hast du?",
  "Wo bewegt sich dein Gehalt?",
  "Welchen Geschlechts bist du?",
  "Postleitzahl Name und Email",
];

const PHASENBUTTONS = [
  null,
  [
    "Bauen-Agrar-Umwelt",
    "Bergbau, Chemie, Energie",
    "Eisenbahn und Verkehr",
    "Erziehung und Wissenschaft",
    "Metall",
    "Nahrung-Genuss-Gaststätten",
    "Polizei",
  ],
  null,
  ["Berufeinsteiger", "Berufserfahren", "Berufsexperte"],
  [
    "< 800 Euro/Monat",
    "800 - 1400 Euro/Monat",
    "1400- 2000 Euro / Monat",
    "2000 - 3000 Euro / Monat",
    "3000 - 4000 Euro / Monat",
    "> 4000 Euro / Monat",
  ],
  ["Weiblich", "Männlich", "Divers"],
  null,
];

const PHASENTOSTATE = [
  null,
  "branche",
  "unternehmen",
  "erfahrung",
  "gehalt",
  "geschlecht",
  null,
];

const ANZAHLPHASEN = 6;

//////////////////////////////////////////////////////////////

let p1input = document.getElementById("p1input");
let p2input = document.getElementById("p2input");
let p3input = document.getElementById("p3input");
let p4input = document.getElementById("p4input");
let p5input = document.getElementById("p5input");
let p6input = document.getElementById("p6input");
let fragekarte = document.getElementById("fragekarte");
let progressbar = document.getElementById("progressbar");
let frageheading = document.getElementById("frageheading");
let weiterButton = document.getElementById("weiterButton");
let h1intheend = document.getElementById("h1intheend");
let unionlogo = document.getElementById("unionlogo");
let endsection = document.getElementById("endsection");
let gewerkschaftinfo = document.getElementById("gewerkschaftinfo");
// event listeners:
initializePhasenButtons();
weiterButton.addEventListener("click", weiterButtonClick);
p2input.addEventListener("change", (e) => {
  state.unternehmen = e.target.value;
});

document.getElementById("p6input1").addEventListener("change", (e) => {
  state.plz = e.target.value;
});
document.getElementById("p6input2").addEventListener("change", (e) => {
  state.name = e.target.value;
});
document.getElementById("p6input3").addEventListener("change", (e) => {
  state.email = e.target.value;
});

// document ready
$(document).ready(async () => {
  $("#fragekarte").hide();
  $(endsection).hide();
  $("#igmetallspecial").hide();
  state.phaseNumber = 1;
  //hide all phases
  for (let i = 1; i <= ANZAHLPHASEN; i++) {
    $(`#phase${i}`).hide();
  }
  //
  startPhase(state.phaseNumber);
  //startEndPhase();
});

function createChoiceButtonInParentDiv(parentid, title, id, phase) {
  let col = document.createElement("div");
  col.className = "col-md-4 col-sm-6 col-xs-12 px-2 py-2";
  let btn = document.createElement("button");
  btn.className = "btn btn btn-outline-danger btn-lg";
  btn.style = "width: 100%";
  btn.innerText = title;
  btn.id = id;

  let attributenameofstate = PHASENTOSTATE[phase];
  console.log(attributenameofstate, title);
  btn.addEventListener("click", () => {
    state[attributenameofstate] = title;
    console.log(title);
    weiterButtonClick();
  });
  col.appendChild(btn);
  document.getElementById(parentid).appendChild(col);
}

function initializePhasenButtons() {
  PHASENBUTTONS.forEach((titles, i) => {
    if (titles) {
      let rowid = `rowp${i}`;
      titles.forEach((t, j) => {
        createChoiceButtonInParentDiv(rowid, t, rowid + j, i);
      });
    }
  });
}

//////////////////////////////////////////////////////////////

// phase 0: none
// phase 1: branche
// phase 2:

async function waitPromise(s) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, s);
  });
}

async function endPhase(phaseNumber) {
  let newpercent = Math.round((phaseNumber / ANZAHLPHASEN) * 100);
  console.log(newpercent);
  progressbar.style = `width: ${newpercent}%`;
  progressbar.setAttribute("aria-valuenow", newpercent.toString());
  state.transitioning = true;
  console.log(`ending phase ${phaseNumber}`);
  $(fragekarte).fadeOut(PHASEDURATION);
  await waitPromise(PHASEDURATION);
  $(`#phase${phaseNumber}`).hide();
  console.log(state);
  if (state.phaseNumber == ANZAHLPHASEN) {
    startEndPhase();
  }
}

async function startPhase(phaseNumber) {
  if (state.endphase) return;
  console.log(`starting phase ${phaseNumber}`);
  $("#frageheading").html(HEADINGSFORFRAGEN[phaseNumber]);
  $(`#phase${phaseNumber}`).hide(phaseNumber);
  $(`#phase${phaseNumber}`).fadeIn(PHASEDURATION);
  $("#fragekarte").fadeIn(PHASEDURATION);
  await waitPromise(PHASEDURATION);
  state.transitioning = false;
}
async function transitionEndOfPhase(oldPhaseNumber) {
  await endPhase(oldPhaseNumber);
  await startPhase(oldPhaseNumber);
}

async function weiterButtonClick() {
  if (!TESTMODUS) {
    if (state.phaseNumber == 1 && !state.branche) return;
    if (state.phaseNumber == 2 && !state.unternehmen) return;
    if (state.phaseNumber == 3 && !state.erfahrung) return;
    if (state.phaseNumber == 4 && !state.gehalt) return;
    if (state.phaseNumber == 5 && !state.geschlecht) return;
    if (state.phaseNumber == 6 && (!state.plz || !state.name || !state.email))
      return;
  }
  if (!state.transitioning) {
    await endPhase(state.phaseNumber);
    state.phaseNumber += 1;
    await startPhase(state.phaseNumber);
  }
}

async function startEndPhase() {
  state.endphase = true;

  // TODO api call:   state ---> api

  let slugname = stateToSlugname(state);

  $("#h3intheend").html(`Hey ${state.name}, hier ist deine Gewerkschaft:`);
  // change ui:
  $(endsection).fadeIn(PHASEDURATION);
  $(h1intheend).html(`${UNIONS[slugname].name}!`);
  unionlogo.setAttribute("src", `./public/logos/${slugname}.png`);
  $(gewerkschaftinfo).html(UNIONS[slugname].description);
  if (slugname == "metall") {
    $("#igmetallspecial").fadeIn();
    //
    let contactData = await stateToContactData(state);
    if (contactData) {
      const fields = ["telefon", "email", "street", "homepage", "ort"];
      fields.forEach((f) => {
        $(`#contact${f}`).html(contactData[f]);
      });
    }
  }
}

function stateToSlugname(state) {
  const branchetoslugname = {
    "Bauen-Agrar-Umwelt": "igbauen",
    "Bergbau, Chemie, Energie": "bergbau",
    "Eisenbahn und Verkehr": "evg",
    "Erziehung und Wissenschaft": "gew",
    Metall: "metall",
    "Nahrung-Genuss-Gaststätten": "nahrung",
    Polizei: "bullen",
    //"Dienstleistungen": "verdi"
  };

  if (
    state.unternehmen &&
    (state.unternehmen.search("GmbH") >= 0 ||
      state.unternehmen.search(" AG") >= 0)
  )
    return "verdi";

  return branchetoslugname[state.branche];
}

async function stateToContactData(state) {
  if (state.plz) {
    const response = await fetch(BACKENDURL, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        plz: state.plz,
      }), // body data type must match "Content-Type" header
    });
    return response.json();
  }
  return null;
}

async function anliegenformsubmit(e) {
  await waitPromise(600);
  $("#anliegendiv").html(
    "Vielen Dank für deine Nachricht. Dein Ansprechpartner wird sich innerhalb von 24 Stunden bei dir melden."
  );
}
