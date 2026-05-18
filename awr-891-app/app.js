const appConfig = {
  donationUrl: "https://awr.org/give",
  stations: [
    {
      name: "AWR 89.1 FM Live",
      location: "Main broadcast",
      youtubeUrl: "https://www.youtube.com/@AdventistWorldRadio/streams"
    },
    {
      name: "Worship and Music",
      location: "YouTube playlist",
      youtubeUrl: "https://www.youtube.com/@AdventistWorldRadio/playlists"
    },
    {
      name: "Sermons and Testimonies",
      location: "Programs channel",
      youtubeUrl: "https://www.youtube.com/@AdventistWorldRadio/videos"
    }
  ],
  bibleAudio: [
    {
      title: "John Chapter 3",
      description: "Replace this with your preferred Bible audio chapter or playlist.",
      url: "https://www.youtube.com/results?search_query=audio+bible+john+3"
    },
    {
      title: "Psalms for Prayer",
      description: "A quiet playlist slot for Sabbath, devotionals, and prayer meetings.",
      url: "https://www.youtube.com/results?search_query=audio+bible+psalms"
    },
    {
      title: "Bible Study Series",
      description: "Connect a YouTube study playlist or hosted MP3 library.",
      url: "https://www.youtube.com/results?search_query=adventist+bible+study+audio"
    }
  ],
  moreLinks: [
    {
      title: "Prayer Requests",
      description: "Connect this to a form where listeners can send prayer requests.",
      url: "mailto:prayer@example.com"
    },
    {
      title: "Program Schedule",
      description: "Add weekly broadcast schedules, hosts, and ministry programs.",
      url: "https://www.youtube.com/@AdventistWorldRadio"
    },
    {
      title: "Contact the Station",
      description: "Use email, Messenger, WhatsApp, or your station website.",
      url: "mailto:station@example.com"
    }
  ]
};

const state = {
  selectedStation: appConfig.stations[0],
  selectedDonationAmount: 25
};

const stationList = document.querySelector("#stationList");
const bibleList = document.querySelector("#bibleList");
const moreList = document.querySelector("#moreList");
const nowTitle = document.querySelector("#nowTitle");
const bibleTitle = document.querySelector("#bibleTitle");
const donationUrlLabel = document.querySelector("#donationUrlLabel");
const amountGrid = document.querySelector("#amountGrid");
const linkDialog = document.querySelector("#linkDialog");
const stationUrlInput = document.querySelector("#stationUrlInput");
const donationUrlInput = document.querySelector("#donationUrlInput");

function openExternal(url) {
  if (!url) return;
  window.open(url, "_blank", "noopener,noreferrer");
}

function safeUrl(url, fallback) {
  try {
    return new URL(url);
  } catch {
    return new URL(fallback);
  }
}

function setView(viewName) {
  document.querySelectorAll("[data-view]").forEach((view) => {
    view.classList.toggle("hidden", view.dataset.view !== viewName);
  });

  document.querySelectorAll("[data-tab]").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === viewName);
  });
}

function stationTemplate(station, index) {
  const card = document.createElement("article");
  card.className = "station-card";
  card.innerHTML = `
    <div>
      <h3>${station.name}</h3>
      <p>${station.location}</p>
    </div>
    <div class="mini-actions">
      <button class="mini-button" type="button" aria-label="Select ${station.name}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg>
      </button>
      <button class="mini-button" type="button" aria-label="Open ${station.name} on YouTube">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
      </button>
    </div>
  `;

  const [selectButton, linkButton] = card.querySelectorAll("button");
  selectButton.addEventListener("click", () => {
    state.selectedStation = appConfig.stations[index];
    nowTitle.textContent = state.selectedStation.name;
  });
  linkButton.addEventListener("click", () => openExternal(station.youtubeUrl));
  return card;
}

function compactItemTemplate(item) {
  const card = document.createElement("article");
  card.className = "compact-item";
  card.innerHTML = `
    <h3>${item.title}</h3>
    <p>${item.description}</p>
  `;
  card.addEventListener("click", () => openExternal(item.url));
  return card;
}

function renderStations() {
  stationList.replaceChildren(...appConfig.stations.map(stationTemplate));
  nowTitle.textContent = state.selectedStation.name;
}

function renderBible() {
  bibleTitle.textContent = appConfig.bibleAudio[0].title;
  bibleList.replaceChildren(...appConfig.bibleAudio.map(compactItemTemplate));
}

function renderMore() {
  moreList.replaceChildren(...appConfig.moreLinks.map(compactItemTemplate));
}

function renderAmounts() {
  const amounts = [10, 25, 50];
  const buttons = amounts.map((amount) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `$${amount}`;
    button.className = state.selectedDonationAmount === amount ? "active" : "";
    button.addEventListener("click", () => {
      state.selectedDonationAmount = amount;
      renderAmounts();
    });
    return button;
  });
  amountGrid.replaceChildren(...buttons);
}

function syncDonationLabel() {
  donationUrlLabel.textContent = appConfig.donationUrl || "Not configured";
}

document.querySelectorAll("[data-tab]").forEach((tab) => {
  tab.addEventListener("click", () => setView(tab.dataset.tab));
});

document.querySelectorAll("[data-tab-target]").forEach((tile) => {
  tile.addEventListener("click", () => setView(tile.dataset.tabTarget));
});

document.querySelector("#playButton").addEventListener("click", () => {
  openExternal(state.selectedStation.youtubeUrl);
});

document.querySelector("#biblePlayButton").addEventListener("click", () => {
  openExternal(appConfig.bibleAudio[0].url);
});

document.querySelector("#donateButton").addEventListener("click", () => {
  const url = safeUrl(appConfig.donationUrl, "https://awr.org/give");
  url.searchParams.set("amount", state.selectedDonationAmount);
  openExternal(url.toString());
});

document.querySelector("#editLinksButton").addEventListener("click", () => {
  stationUrlInput.value = state.selectedStation.youtubeUrl;
  donationUrlInput.value = appConfig.donationUrl;
  linkDialog.showModal();
});

document.querySelector("#saveLinksButton").addEventListener("click", () => {
  if (stationUrlInput.value) {
    state.selectedStation.youtubeUrl = stationUrlInput.value;
  }
  if (donationUrlInput.value) {
    appConfig.donationUrl = donationUrlInput.value;
    syncDonationLabel();
  }
  linkDialog.close();
});

renderStations();
renderBible();
renderMore();
renderAmounts();
syncDonationLabel();
