# 🃏 Blackjack en JavaScript

Proyecto realizado por Lucas Pardo Parra para la asignatura de Desarrollo Web en Entorno Cliente del segundo año de DAW. El objetivo es crear un Blackjack jugable, fluido y visualmente agradable, implementado desde cero con JavaScript, HTML y CSS.

## 🎯 Objetivo del Proyecto

Este proyecto implementa una versión simplificada del Blackjack:

- El jugador recibe dos cartas al iniciar.
- La banca recibe una carta visible.
- El jugador puede pedir carta o plantarse.
- La banca juega automáticamente según las reglas clásicas:
  - Roba cartas mientras tenga menos de 17 puntos
  - Se planta con 17 o más

El resultado final se muestra de forma clara en pantalla.

## 📁 Estructura del Proyecto

- /code: carpeta con los tres archivos de código:
  - index.html: Estructura principal del juego.
  - script.js: Corazón del Blackjack (lógica, turnos, cálculo de puntos, reparto…).
  - style.css: Estilos visuales diseñados sin flexbox y usando solo px/% como restricciones marcadas.
- /img: Todas las cartas una baraja de póker típica en formato PNG.

## 🔍 Características Técnicas

### ✔ Lógica del blackjack:

- Baraja simulada como array de 53 posiciones (0–52), usando null para marcar cartas usadas.
- Turno del jugador con botones "Pedir" y "Plantarse".
- Turno de la banca automatizado y con delays.
- Comprobación de estado tras cada carta para gestión de turnos.

### ✔ Efectos visuales:

- Retraso programado con setTimeout para que las cartas aparezcan de una en una.
- Diferenciación clara entre cartas del jugador y banca.
- Mensaje de final de juego.

### ✔ Estilo:

- Fondo verde estilo tapete de casino.
- Cartas bonitas :D
- Botones personalizados con colores agradables.

### 🧠 Lógica de puntuación

- As → 1, para simpificar
- 2–10 → su valor numérico
- J, Q, K → 10

## 🔁 Flujo normal del juego

- El jugador introduce su nombre.
- Se procede al reparto (carta al jugador, carta a la banca, carta al jugador).
- Cuando acaban de aparecer las tres cartas, los botones se activan.
- Cada vez que aparece una nueva carta sobre la mesa:
  - Se añade la imagen con delay
  - Se actualizan puntos donde corresponde
  - Se comprueba el estado de la partida
- Si el jugador se planta, turno totalmente automatizado de la banca.
- Al final, se hace una comparación y se determina el ganador.

### 🎉 ¡Disfruta!
