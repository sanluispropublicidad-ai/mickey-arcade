/**
 * MICKEY RETRO ARCADE // STEAM PRIVADO
 * Motor de UI, síntesis de audio cinematográfico y orquestación WebAssembly
 */

// 1. Catálogo canónico de juegos
const GAMES_CATALOG = [
  {
    id: "mq1",
    title: "Disney's Magical Quest 1",
    subtitle: "Starring Mickey & Minnie",
    console: "gba",
    core: "gba",
    rom: "roms/magical_quest_1.gba",
    cover: "assets/covers/magical_quest_1.png",
    details: "Capcom · 2002 · 2 Botones (A/B) · Óptimo iPad",
    tag: "Recomendado Táctil"
  },
  {
    id: "mq2",
    title: "The Great Circus Mystery",
    subtitle: "Magical Quest 2",
    console: "gba",
    core: "gba",
    rom: "roms/magical_quest_2.gba",
    cover: "assets/covers/magical_quest_2.png",
    details: "Capcom · 2003 · Mickey & Minnie · Aventura",
    tag: "Aventura Épica"
  },
  {
    id: "mq3",
    title: "Magical Quest 3",
    subtitle: "Starring Mickey & Donald",
    console: "gba",
    core: "gba",
    rom: "roms/magical_quest_3.gba",
    cover: "assets/covers/magical_quest_3.png",
    details: "Capcom · 2004 · Mickey & Donald · Armaduras",
    tag: "Coop con Donald"
  },
  {
    id: "castle",
    title: "Castle of Illusion",
    subtitle: "Starring Mickey Mouse",
    console: "genesis",
    core: "segaMD",
    rom: "roms/castle_of_illusion.zip",
    cover: "assets/covers/castle_of_illusion.png",
    details: "Sega · 1990 · 3 Botones · Clásico 16-Bit",
    tag: "Joya Histórica"
  },
  {
    id: "world",
    title: "World of Illusion",
    subtitle: "Starring Mickey & Donald",
    console: "genesis",
    core: "segaMD",
    rom: "roms/world_of_illusion.zip",
    cover: "assets/covers/world_of_illusion.png",
    details: "Sega · 1992 · Trucos Mágicos · 2 Jugadores",
    tag: "Cooperativo"
  },
  {
    id: "mania",
    title: "Mickey Mania",
    subtitle: "The Timeless Adventures",
    console: "snes",
    core: "snes",
    rom: "roms/mickey_mania.zip",
    cover: "assets/covers/mickey_mania.png",
    details: "Traveller's Tales · 1994 · Animación Clásica",
    tag: "1928 a 1994"
  }
];

// 2. Estado de la aplicación
const state = {
  currentProfile: "Javier",
  activeFilter: "all",
  activeGame: null,
  audioContext: null,
  gamepadConnected: false
};

// 3. Sintetizador WebAudio de impacto cinematográfico "Ta-Dum" estilo Netflix
function playCinematicTaDum() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!state.audioContext) {
      state.audioContext = new AudioContextClass();
    }
    if (state.audioContext.state === "suspended") {
      state.audioContext.resume();
    }

    const ctx = state.audioContext;
    const now = ctx.currentTime;

    // Sub-bajo cinematográfico profundo (Drop de 85Hz a 42Hz)
    const oscBass = ctx.createOscillator();
    const gainBass = ctx.createGain();
    oscBass.type = "sawtooth";
    oscBass.frequency.setValueAtTime(88, now);
    oscBass.frequency.exponentialRampToValueAtTime(42, now + 1.2);

    gainBass.gain.setValueAtTime(0.01, now);
    gainBass.gain.linearRampToValueAtTime(0.6, now + 0.08);
    gainBass.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

    // Filtro pasa-bajas para calor análogo
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(160, now);
    filter.frequency.exponentialRampToValueAtTime(80, now + 1.4);

    oscBass.connect(filter);
    filter.connect(gainBass);
    gainBass.connect(ctx.destination);

    oscBass.start(now);
    oscBass.stop(now + 1.7);

    // Campanada retro-armónica superior (segundo golpe "dum")
    const oscChime = ctx.createOscillator();
    const gainChime = ctx.createGain();
    oscChime.type = "sine";
    oscChime.frequency.setValueAtTime(440, now + 0.12);
    oscChime.frequency.exponentialRampToValueAtTime(220, now + 0.9);

    gainChime.gain.setValueAtTime(0.001, now);
    gainChime.gain.setValueAtTime(0.2, now + 0.12);
    gainChime.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    oscChime.connect(gainChime);
    gainChime.connect(ctx.destination);

    oscChime.start(now + 0.12);
    oscChime.stop(now + 1.3);

    // Actualizar indicador de audio
    const audioStatus = document.getElementById("audio-status-text");
    if (audioStatus) audioStatus.textContent = "Audio: Desbloqueado";
  } catch (err) {
    console.warn("AudioContext no disponible o bloqueado:", err);
  }
}

// 4. Sonido de confirmación arcade retro
function playArcadeClick() {
  if (!state.audioContext) return;
  try {
    const ctx = state.audioContext;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.12); // G5

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch (e) {}
}

// 5. Inicialización de la UI
document.addEventListener("DOMContentLoaded", () => {
  const screenProfile = document.getElementById("screen-profile");
  const screenLauncher = document.getElementById("screen-launcher");
  const screenGame = document.getElementById("screen-game");
  const profileCard = document.getElementById("profile-javier");
  const btnSwitchProfile = document.getElementById("btn-switch-profile");
  const btnExitGame = document.getElementById("btn-exit-game");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // A) Selección de perfil Javier (Estilo Netflix)
  profileCard.addEventListener("click", () => {
    playCinematicTaDum();
    screenProfile.classList.add("hidden");
    screenLauncher.classList.add("active");
  });

  // B) Botón cambiar perfil
  btnSwitchProfile.addEventListener("click", () => {
    playArcadeClick();
    screenLauncher.classList.remove("active");
    screenProfile.classList.remove("hidden");
  });

  // C) Filtros de consola
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      playArcadeClick();
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.activeFilter = btn.dataset.filter;
      renderGamesGrid();
    });
  });

  // D) Botón salir del juego (Volver al catálogo)
  btnExitGame.addEventListener("click", () => {
    playArcadeClick();
    exitCurrentGame();
  });

  // E) Escucha de Mandos de Juego (Gamepad API)
  window.addEventListener("gamepadconnected", (e) => {
    state.gamepadConnected = true;
    updateGamepadUI(e.gamepad.id);
  });

  window.addEventListener("gamepaddisconnected", () => {
    state.gamepadConnected = false;
    updateGamepadUI(null);
  });

  // Render inicial de juegos
  renderGamesGrid();
});

// 6. Renderizar Grid de Juegos
function renderGamesGrid() {
  const grid = document.getElementById("games-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const filtered = GAMES_CATALOG.filter(game => {
    if (state.activeFilter === "all") return true;
    return game.console === state.activeFilter;
  });

  filtered.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <div class="card-media">
        <img src="${game.cover}" alt="${game.title}" loading="lazy">
        <span class="badge-console ${game.console}">${game.console.toUpperCase()}</span>
      </div>
      <div class="card-body">
        <div>
          <h3 class="card-title">${game.title}</h3>
          <p class="card-details"><span>●</span> ${game.details}</p>
        </div>
        <button class="card-btn-play" type="button">
          <span>▶</span> JUGAR AHORA
        </button>
      </div>
    `;

    card.addEventListener("click", () => {
      playArcadeClick();
      launchGame(game);
    });

    grid.appendChild(card);
  });
}

// 7. Lanzador de Juego en WebAssembly (EmulatorJS)
function launchGame(game) {
  state.activeGame = game;
  const screenLauncher = document.getElementById("screen-launcher");
  const screenGame = document.getElementById("screen-game");
  const titleDisplay = document.getElementById("current-game-title");
  const playerContainer = document.getElementById("emulator-container");

  if (titleDisplay) {
    titleDisplay.textContent = `${game.title} [${game.console.toUpperCase()}]`;
  }

  // Ocultar catálogo y activar pantalla de juego
  screenLauncher.classList.remove("active");
  screenGame.classList.add("active");

  // Limpiar contenedor previo
  playerContainer.innerHTML = '<div id="game-player"></div>';

  // Configurar variables globales de EmulatorJS
  window.EJS_player = '#game-player';
  window.EJS_core = game.core;
  window.EJS_gameUrl = game.rom;
  window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
  window.EJS_gameName = game.title;
  window.EJS_color = '#ef4444';
  window.EJS_startOnLoaded = true;
  window.EJS_virtualGamepad = true;
  window.EJS_defaultControls = true;
  window.EJS_fullscreenOnLoad = false;

  // Cargar el script del loader de EmulatorJS
  const loaderScript = document.createElement("script");
  loaderScript.src = "https://cdn.emulatorjs.org/stable/data/loader.js";
  loaderScript.id = "ejs-loader-script";
  document.body.appendChild(loaderScript);
}

// 8. Salir del juego actual
function exitCurrentGame() {
  const screenLauncher = document.getElementById("screen-launcher");
  const screenGame = document.getElementById("screen-game");
  const playerContainer = document.getElementById("emulator-container");

  // Quitar script del loader si existe
  const oldScript = document.getElementById("ejs-loader-script");
  if (oldScript) oldScript.remove();

  // Limpiar HTML y canvas de EmulatorJS
  if (playerContainer) {
    playerContainer.innerHTML = '';
  }

  // Regresar a la vista del launcher
  screenGame.classList.remove("active");
  screenLauncher.classList.add("active");
  state.activeGame = null;
}

// 9. Actualizar estado del mando Bluetooth en la UI
function updateGamepadUI(gamepadName) {
  const indicator = document.getElementById("gamepad-status-text");
  if (!indicator) return;

  if (gamepadName) {
    indicator.textContent = `Mando: Conectado (${gamepadName.substring(0, 16)}...)`;
    indicator.style.color = "#10b981";
  } else {
    indicator.textContent = "Mando: Táctil Activo";
    indicator.style.color = "#a1a1aa";
  }
}
