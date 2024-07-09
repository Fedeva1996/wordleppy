const INPUT = document.getElementById("guess-input");
const BUTTON = document.getElementById("guess-button");
const GRID = document.getElementById("grid");
const RESTART = document.getElementById("restart-button");
let intentos = 5;
let PALABRA;
let palabraIngresada;

BUTTON.disable = true;
RESTART.disabled = true;

traerPalabra();

INPUT.addEventListener("input", () => {
  const inputLength = INPUT.value.length;
  console.log(inputLength);

  if (
    inputLength < PALABRA.length ||
    inputLength > PALABRA.length ||
    inputLength === 0
  ) {
    BUTTON.disabled = true;
  } else if (intentos === 0) {
    INPUT.disabled = true;
    BUTTON.disabled = false;
  } else {
    BUTTON.disabled = false;
  }
});

BUTTON.addEventListener("click", intentar);

function intentar() {
  palabraIngresada = INPUT.value;
  palabraIngresada = palabraIngresada.toUpperCase();

  console.log(palabraIngresada);

  if (intentos > 0) {
    intentarPalabra(palabraIngresada);
    verificarPalabra(palabraIngresada);
  } else {
    BUTTON.disabled = true;
  }
}

function intentarPalabra(palabra) {
  const ROW = document.createElement("div");
  ROW.classList.add("row");
  GRID.appendChild(ROW);
  for (let i = 0; i < palabra.length; i++) {
    const LETRA = document.createElement("span");
    LETRA.classList.add("letter");
    LETRA.setAttribute("style", `--i ${i}`);
    LETRA.textContent = palabra[i];
    if (palabra[i] === PALABRA[i]) {
      LETRA.classList.add("correct");
    } else if (PALABRA.includes(palabra[i])) {
      LETRA.classList.add("exist");
    } else {
      LETRA.classList.add("incorrect");
    }
    ROW.appendChild(LETRA);
    INPUT.value = "";
    BUTTON.disabled = true;
  }
  intentos--;
}

function verificarPalabra(palabra) {
  if (palabra === PALABRA) {
    const GANASTE = document.createElement("h1");
    GANASTE.textContent = "¡Ganaste!";
    GRID.appendChild(GANASTE);
    intentos = 0;
    INPUT.disabled = true;
    RESTART.disabled = false;
  } else if (intentos === 0) {
    const PERDISTE = document.createElement("h1");
    PERDISTE.textContent = "Perdiste...";
    GRID.appendChild(PERDISTE);
    INPUT.disabled = true;
    RESTART.disabled = false;

    console.log(PALABRA);
  }
}

RESTART.addEventListener("click", reiniciar);

function reiniciar() {
  GRID.innerHTML = "";
  intentos = 5;
  INPUT.disabled = false;
  BUTTON.disabled = false;
  RESTART.disabled = true;
}

function traerPalabra() {
  fetch("https://random-word-api.herokuapp.com/word?lang=es&length=5")
    .then((respuesta) => respuesta.json())
    .then((palabra) => setPalabra(palabra));
}

function setPalabra(palabra) {
  PALABRA = palabra[0].toUpperCase();
  INPUT.setAttribute(
    "placeholder",
    `Ingresa tu palabra de ${PALABRA.length} letras`
  );
}
