// Estado inicial de la partida
let puntosJugador = 0;
let puntosBanca = 0;
let juegoTerminado = false;

// Nodos del DOM
const spanNombreJugador = document.querySelector("#nombre-jugador");

const spanPuntosBanca = document.querySelector("#puntos-banca");
const spanPuntosJugador = document.querySelector("#puntos-jugador");

const divCartasBanca = document.querySelector("#cartas-banca");
const divCartasJugador = document.querySelector("#cartas-jugador");

const btnPedir = document.querySelector("#btn-pedir-carta");
const btnPlantarse = document.querySelector("#btn-plantarse");

const msgFinal = document.querySelector("#msg-final");

// Baraja de cartas; añadimos un valor 0 que va a estar en desuso
let baraja = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
];

// Empieza el juego
window.onload = iniciarJuego;

function iniciarJuego() {
  let nombreJugador = "";
  // Pedimos el nombre del jugador hasta que introduzca uno válido
  while (true) {
    nombreJugador = prompt("¡Bienvenido! ¿Cómo te llamas?");
    // Comprobamos que no esté vacío ni sea solo espacios, y si los hay, los eliminamos con trim()
    if (nombreJugador && nombreJugador.trim() !== "") {
      spanNombreJugador.textContent = nombreJugador.trim() + ": ";
      break;
    } else {
      alert("Por favor, introduce un nombre");
    }
  }

  // Al iniciar el juego, los botones de pedir y plantarse están desactivados
  // para evitar que el jugador pueda interactuar antes de tiempo
  btnPedir.disabled = true;
  btnPlantarse.disabled = true;

  repartoInicial();
}

function repartoInicial() {
  // Repartimos las cartas iniciales según el orden típico del blackjack
  darCarta(divCartasJugador, 500);
  darCarta(divCartasBanca, 1500);
  darCarta(divCartasJugador, 2500);

  // Una vez se han repartido las cartas, llamamos a turnoJugador
  // Le ponemos un delay para que los botones se mantengan desactivados durante el reparto
  setTimeout(() => {
    turnoJugador();
  }, 2500);
}

function turnoJugador() {
  // Al terminar el reparto inicial se activan los botones y el jugador puede empezar a jugar
  btnPedir.disabled = false;
  btnPlantarse.disabled = false;

  btnPedir.addEventListener("click", pedirCartaJugador);
  btnPlantarse.addEventListener("click", plantarseJugador);
}

// Damos carta al jugador si pulsa el botón, a no ser que el juego se haya acabado ya
function pedirCartaJugador() {
  if (juegoTerminado) return;
  darCarta(divCartasJugador, 0);
}

function plantarseJugador() {
  if (juegoTerminado) return;
  // El jugador ya no puede hacer nada más así que se desactivan los botones
  btnPedir.disabled = true;
  btnPlantarse.disabled = true;

  turnoBanca();
}

function turnoBanca() {
  if (juegoTerminado) return;

  btnPedir.disabled = true;
  btnPlantarse.disabled = true;

  // Si la banca ya tiene 17 o más, dejamos de darle cartas
  if (puntosBanca >= 17) {
    comprobarDerrota("banca");
    return;
  }

  // Si la banca tiene menos de 17, roba carta
  darCarta(divCartasBanca, 500);

  // Volvemos a llamar a turnoBanca después de un pequeño retraso,
  // para dejar que darCarta termine y actualice puntosBanca
  setTimeout(() => {
    turnoBanca();
  }, 1000);
}

function finalizarJuego(ganador) {
  btnPedir.disabled = true;
  btnPlantarse.disabled = true;
  juegoTerminado = true;

  let mensaje = "";

  switch (ganador) {
    case "banca":
      mensaje = "Ha ganado la banca. ¡Qué pena!";
      break;
    case "jugador":
      mensaje = "¡Has ganado! Enhorabuena.";
      break;
    case "empate":
      mensaje = "Empate. La banca y tú habéis conseguido los mismos puntos.";
      break;
    case "banca21":
      mensaje = "La banca ha conseguido 21 puntos. Has perdido ¡Qué pena!";
      break;
    case "jugador21":
      mensaje = "Has llegado a 21. ¡Enhorabuena, has ganado!";
      break;
    case "empate21":
      mensaje =
        "Empate a 21. La banca y tú habéis conseguido los mismos puntos.";
      break;
    default:
      mensaje = "Ha ocurrido un error.";
      break;
  }

  msgFinal.textContent = mensaje;
}

// A partir de aquí encontramos métodos comunes que son llamados más de una vez
// en el juego.

// Damos una carta a un contenedor de cartas, la imprimimos por pantalla y actualizamos los puntos
function darCarta(contenedorCartas, delay) {
  setTimeout(() => {
    while (true) {
      const indiceAleatorio = Math.floor(Math.random() * baraja.length);
      const numFoto = baraja[indiceAleatorio];

      if (numFoto === 0 || numFoto === null) continue;

      carta = numFoto;
      baraja[indiceAleatorio] = null;
      break;
    }

    // Pintar carta
    const imgCarta = document.createElement("img");
    imgCarta.src = `../img/${carta}.png`;
    contenedorCartas.appendChild(imgCarta);

    // Calcular valor de la carta
    const valorCarta = calcularPuntos(carta);

    // Comprobamos a quién hay que sumar los puntos de la carta sacada
    if (contenedorCartas === divCartasJugador) {
      puntosJugador += valorCarta;
      spanPuntosJugador.textContent = puntosJugador;

      comprobarDerrota("jugador");
    } else if (contenedorCartas === divCartasBanca) {
      puntosBanca += valorCarta;
      spanPuntosBanca.textContent = puntosBanca;

      comprobarDerrota("banca");
    }
  }, delay);
}

// Comprobamos si el jugador o la banca ha perdido tras dar cada carta
function comprobarDerrota(quienHaJugado) {
  if (quienHaJugado === "jugador") {
    // Si el jugador consigue 21, se planta automáticamente y juega la banca
    if (puntosJugador === 21) {
      turnoBanca();
      return true;
    }

    // Si el jugador se pasa, gana la banca
    if (puntosJugador > 21) {
      finalizarJuego("banca");
      return true;
    }
  } else if (quienHaJugado === "banca") {
    // Si la banca se pasa de 21, gana el jugador
    if (puntosBanca > 21) {
      finalizarJuego("jugador");
      return true;
    }

    // Si la banca tiene menos de 17, todavía no decide nada
    if (puntosBanca < 17) {
      return false;
    }

    // A partir de aquí, la banca tiene 17 o más, así que ya puede decidirse el resultado

    // Si ambos tienen los mismos puntos
    if (puntosBanca === puntosJugador) {
      if (puntosBanca === 21 && puntosJugador === 21) {
        // Si además ambos tienen 21, es un empate especial
        finalizarJuego("empate21");
      } else {
        // Si no, es un empate normal
        finalizarJuego("empate");
      }
      return true;
    }

    // Si la banca tiene más puntos que el jugador
    if (puntosBanca > puntosJugador) {
      if (puntosBanca === 21) {
        // Si además la banca tiene 21, gana la banca de manera especial
        finalizarJuego("banca21");
      } else {
        // Si no, gana la banca normal
        finalizarJuego("banca");
      }
      return true;
    }

    // Si la banca tiene menos puntos que el jugador
    if (puntosBanca < puntosJugador) {
      if (puntosJugador === 21) {
        // Si además el jugador tiene 21, gana el jugador de manera especial
        finalizarJuego("jugador21");
      } else {
        // Si no, gana el jugador normal
        finalizarJuego("jugador");
      }
      return true;
    }
  }

  return false; // Si nada de esto sucede, la partida sigue
}

// Función para calcular los puntos de una carta según su número de imagen
// Dentro de cada palo: A=1, 2-10, J=10, Q=10, K=10
function calcularPuntos(numFoto) {
  const num = ((numFoto - 1) % 13) + 1;

  if (num === 1) return 1; // As
  if (num >= 2 && num <= 10) return num; // 2-10
  return 10; // J, Q, K
}
