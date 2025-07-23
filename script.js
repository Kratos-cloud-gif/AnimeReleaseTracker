const animeData = [
  {
    name: "Dandadan",
    episode: "Ep 16",
    releaseDate: "2025-07-24T21:30:00",
    day: "Thursday",
    image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/4303d95c719242ab6e459d477b0a8c08.jpg"
  },
  {
    name: "Sakamoto Days",
    episode: "Ep 14",
    releaseDate: "2025-07-28T21:00:00",
    day: "Monday",
    image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/16938f0dfd1d36cab6a0c604ab4669d5.jpg"
  },
  {
    name: "The Fragrent Flower Blooms With Dignity",
    episode: "Ep 4",
    releaseDate: "2025-07-27T24:00:00",
    day: "Sunday",
    image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f0b91bbbd75c16315c767bf3a9c8a3fc.jpg"
  },
  {
    name: "Tougen Anki",
    episode: "Ep 3",
    releaseDate: "2025-07-25T21:00:00",
    day: "Friday",
    image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/e5e326f8234a54e407d7e3c86f9d68e2.jpg"
  },
  {
    name: "Lord of the Mysteries",
    episode: "Ep 6",
    releaseDate: "2025-07-26T19:30:00",
    day: "Saturday",
    image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/38c5a71674d8fc4af6ee57ffeb7b2617.jpg"
  },
  {
    name: "A Bouquet for an Ugly Girl",
    episode: "Ep 4",
    releaseDate: "2025-07-25T20:00:00",
    day: "Friday",
    image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/e6e5447f50616963c3225364896c8be4.jpg"
  },
  {
    name: "Gachiakuta",
    episode: "Ep 3",
    releaseDate: "2025-07-27T20:30:00",
    day: "Sunday",
    image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/acad8581f1a2eafa8c9d68b899bb1b21.jpg"
  }
];

const container = document.getElementById("anime-container");

function updateCountdown(date) {
  const now = new Date().getTime();
  const releaseTime = new Date(date).getTime();
  const distance = releaseTime - now;

  if (distance < 0) return "Released";

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function renderAnimeCards() {
  container.innerHTML = "";
  animeData.forEach(anime => {
    const card = document.createElement("div");
    card.className = "anime-card";
    card.innerHTML = `
      <img class="anime-image" src="${anime.image}" alt="${anime.name}">
      <h2>${anime.name}</h2>
      <p>${anime.episode}</p>
      <p>Releases on: ${anime.day}</p>
      <p id="countdown-${anime.name.replace(/\s/g, "")}">Loading...</p>
    `;
    container.appendChild(card);
  });
}

function startCountdown() {
  renderAnimeCards();
  setInterval(() => {
    animeData.forEach(anime => {
      const countdown = updateCountdown(anime.releaseDate);
      const el = document.getElementById("countdown-" + anime.name.replace(/\s/g, ""));
      if (el) el.textContent = countdown;
    });
  }, 1000);
}

window.onload = () => {
  const rain = document.getElementById("rain-sound");
  const lofi = document.getElementById("lofi-sound");
  const toggleSound = document.getElementById("toggle-sound");
  const playSound = document.getElementById("play-sound");
  const toggleTheme = document.getElementById("toggle-theme");

  rain.volume = 0.5;
  lofi.volume = 0.5;

  let isMuted = false;

  // Play button fixes autoplay block
  playSound.addEventListener("click", () => {
    rain.play();
    lofi.play();
    playSound.style.display = "none"; // Hide after play
  });

  toggleSound.addEventListener("click", () => {
    isMuted = !isMuted;
    rain.muted = isMuted;
    lofi.muted = isMuted;
    toggleSound.textContent = isMuted ? "🔊 Unmute" : "🔇 Mute";
  });

  toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
  });

  startCountdown();
};
