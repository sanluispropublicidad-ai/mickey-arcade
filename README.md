# 🕹️ RETRO ARCADE // STEAM PRIVADO (Javier Edition)

> Plataforma WebAssembly privada de videojuegos retro (Mickey Mouse, Mario, Sonic y Carreras), diseñada específicamente para iPadOS, pantallas táctiles y mandos Bluetooth.

---

## 🎮 Catálogo de Juegos Incluidos

| # | Título | Consola | Core Web | Características |
|---|---|---|---|---|
| 1 | **Disney's Magical Quest 1** | Game Boy Advance | `gba` | Capcom (2002). Mickey y Minnie cambian de trajes mágicos. 2 botones (A/B), ideal pantalla táctil. |
| 2 | **The Great Circus Mystery (MQ 2)** | Game Boy Advance | `gba` | Capcom (2003). Aventura en el circo embrujado con trajes de vaquero y trepador. |
| 3 | **Magical Quest 3** | Game Boy Advance | `gba` | Capcom (2004). Cooperativo con el Pato Donald, armaduras medievales. |
| 4 | **Super Mario World (SMA 2)** | Game Boy Advance | `gba` | Nintendo (2001). El clásico rey de plataformas de Mario y Yoshi adaptado a GBA. |
| 5 | **Sonic Advance** | Game Boy Advance | `gba` | Sega / Dimps (2001). Plataformas a toda velocidad con Sonic, Tails, Knuckles y Amy. |
| 6 | **Mario Kart: Super Circuit** | Game Boy Advance | `gba` | Nintendo (2001). Grand Prix clásico de karts, caparazones y 40 circuitos. |
| 7 | **Need for Speed: Most Wanted** | Game Boy Advance | `gba` | EA Games (2005). Carreras urbanas en 3D, persecuciones policiales y tuning. |
| 8 | **Castle of Illusion** | Sega Genesis | `segaMD` | Sega (1990). La legendaria aventura en el castillo de la bruja Mizrabel. 3 botones. |
| 9 | **World of Illusion** | Sega Genesis | `segaMD` | Sega (1992). Magia cooperativa con Mickey y Donald. |
| 10 | **Mickey Mania: The Timeless Adventures** | Super Nintendo | `snes` | Traveller's Tales (1994). Viaje interactivo por las caricaturas desde 1928 a color. |

---

## 🛠️ Arquitectura Técnica

- **Frontend:** HTML5 Semántico + CSS3 Vanilla Grid/Flexbox + JavaScript ES6+.
- **Motor de Emulación:** [EmulatorJS](https://github.com/EmulatorJS/EmulatorJS) (v4.0.9+) compilado a WebAssembly (Wasm) ejecutado 100% en el cliente (navegador).
- **Audio:** Sintetizador WebAudio API nativo para el intro cinemático "Ta-Dum" estilo Netflix y desbloqueo de audio seguro para iOS Safari.
- **PWA:** `manifest.json` y metatags de Apple Web App para ejecución a pantalla completa sin barra de navegación de Safari.
- **Persistencia:** Partidas guardadas (*Save States* e *in-game saves*) almacenadas automáticamente en `IndexedDB` / `localStorage` del iPad.

---

## 📱 Cómo Instalar en iPad / iPhone

1. Abre el enlace en **Safari**.
2. En la pantalla inicial de perfiles de Netflix, toca sobre el avatar de **JAVIER**.
3. Toca el botón de **Compartir** de Safari (el ícono del cuadro con la flecha hacia arriba).
4. Selecciona **"Añadir a pantalla de inicio"** (Add to Home Screen).
5. Se creará el ícono **Mickey Arcade** en tu pantalla. Al abrirlo, arrancará como una app nativa en pantalla completa a 60 FPS.

---

## 🕹️ Controles

### Táctil (iPad / Celular)
- **Cruceta (D-Pad):** Mover al personaje.
- **Botones A y B:** Saltar, interactuar, disparar magia o habilidades.
- **Gatillos L y R:** Habilidades secundarias / cambio de trajes.
- **Start / Select:** Pausa y selección de menú.

### Mando Físico por Bluetooth (Xbox / PlayStation / Nintendo Switch)
- Empareja el mando al iPad por Bluetooth en Ajustes.
- El juego detecta automáticamente el control mediante la **HTML5 Gamepad API** y oculta los botones táctiles en pantalla.
