"use client";

import { useState } from "react";

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

function Icon({ name }) {
  const icons = {
    play: <path d="M8 5v14l11-7z" />,
    home: (
      <>
        <path d="M3 11l9-8 9 8" />
        <path d="M5 10v10h14V10" />
      </>
    ),
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
      </>
    ),
    heart: <path d="M12 21s-7-4.6-9.2-9A5.4 5.4 0 0 1 12 5a5.4 5.4 0 0 1 9.2 7C19 16.4 12 21 12 21z" />,
    message: <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />,
    tv: (
      <>
        <path d="M4 4h16v12H5.2L4 17.2V4z" />
        <path d="M8 20h8" />
        <path d="M12 16v4" />
      </>
    ),
    link: (
      <>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </>
    ),
    more: (
      <>
        <path d="M12 5v.01" />
        <path d="M12 12v.01" />
        <path d="M12 19v.01" />
      </>
    )
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

function openExternal(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function Home() {
  const [view, setView] = useState("home");
  const [selectedStation, setSelectedStation] = useState(appConfig.stations[0]);
  const [donationUrl, setDonationUrl] = useState(appConfig.donationUrl);
  const [stationUrlDraft, setStationUrlDraft] = useState(appConfig.stations[0].youtubeUrl);
  const [donationUrlDraft, setDonationUrlDraft] = useState(appConfig.donationUrl);
  const [selectedDonationAmount, setSelectedDonationAmount] = useState(25);
  const [showEditor, setShowEditor] = useState(false);

  function openDonation() {
    let url;
    try {
      url = new URL(donationUrl);
    } catch {
      url = new URL(appConfig.donationUrl);
    }
    url.searchParams.set("amount", selectedDonationAmount);
    openExternal(url.toString());
  }

  return (
    <main className="phone-shell" aria-label="Adventist World Radio 89.1 FM mobile app">
      <section className="app-screen">
        <header className="hero">
          <img src="/radio-hero.png" alt="" className="hero-image" />
          <div className="hero-shade" />
          <div className="status-bar" aria-hidden="true">
            <span>10:30</span>
            <span className="status-icons">5G 100%</span>
          </div>
          <div className="hero-content">
            <div className="station-mark">89.1</div>
            <div>
              <p className="eyebrow">Adventist World Radio</p>
              <h1>89.1 FM</h1>
              <p className="subline">Hope, worship, Bible study, and live radio in one app.</p>
            </div>
          </div>
          <div className="player-card">
            <div>
              <p className="label">Now selected</p>
              <h2>{selectedStation.name}</h2>
            </div>
            <button className="round-button primary" type="button" aria-label="Play selected station" onClick={() => openExternal(selectedStation.youtubeUrl)}>
              <Icon name="play" />
            </button>
          </div>
        </header>

        {view === "home" && (
          <section className="content">
            <div className="section-head">
              <h2>Radio Stations</h2>
              <button className="text-button" type="button" onClick={() => setShowEditor(true)}>Edit links</button>
            </div>
            <div className="station-list">
              {appConfig.stations.map((station) => (
                <article className="station-card" key={station.name}>
                  <div>
                    <h3>{station.name}</h3>
                    <p>{station.location}</p>
                  </div>
                  <div className="mini-actions">
                    <button className="mini-button" type="button" aria-label={`Select ${station.name}`} onClick={() => setSelectedStation(station)}>
                      <Icon name="play" />
                    </button>
                    <button className="mini-button" type="button" aria-label={`Open ${station.name} on YouTube`} onClick={() => openExternal(station.youtubeUrl)}>
                      <Icon name="link" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="feature-grid">
              <button className="feature-tile" type="button" onClick={() => setView("bible")}><Icon name="book" /><span>Audio Bible</span></button>
              <button className="feature-tile" type="button" onClick={() => setView("donate")}><Icon name="heart" /><span>Donate</span></button>
              <button className="feature-tile" type="button" onClick={() => setView("more")}><Icon name="message" /><span>Prayer</span></button>
              <button className="feature-tile" type="button" onClick={() => setView("more")}><Icon name="tv" /><span>Programs</span></button>
            </div>
          </section>
        )}

        {view === "bible" && (
          <section className="content">
            <div className="section-head">
              <h2>Audio Bible</h2>
              <span className="pill">Playlist ready</span>
            </div>
            <div className="bible-card">
              <p className="label">Daily listening</p>
              <h3>{appConfig.bibleAudio[0].title}</h3>
              <p>Connect audio Bible chapters, devotional readings, or YouTube playlists.</p>
              <div className="progress"><span /></div>
              <button className="wide-button" type="button" onClick={() => openExternal(appConfig.bibleAudio[0].url)}>Open Bible Audio</button>
            </div>
            <CompactList items={appConfig.bibleAudio} />
          </section>
        )}

        {view === "donate" && (
          <section className="content">
            <div className="donate-panel">
              <p className="eyebrow">Support the ministry</p>
              <h2>Keep hope on the air.</h2>
              <p>Your donation link can point to your church giving page, PayPal, bank form, or official AWR donation page.</p>
              <div className="amount-grid">
                {[10, 25, 50].map((amount) => (
                  <button className={selectedDonationAmount === amount ? "active" : ""} key={amount} type="button" onClick={() => setSelectedDonationAmount(amount)}>
                    ${amount}
                  </button>
                ))}
              </div>
              <button className="wide-button donate" type="button" onClick={openDonation}>Donate Now</button>
            </div>
            <div className="info-row">
              <span>Donation URL</span>
              <strong>{donationUrl || "Not configured"}</strong>
            </div>
          </section>
        )}

        {view === "more" && (
          <section className="content">
            <div className="section-head">
              <h2>Ministry Hub</h2>
              <span className="pill">More</span>
            </div>
            <CompactList items={appConfig.moreLinks} />
          </section>
        )}

        <nav className="tab-bar" aria-label="Main navigation">
          <Tab active={view === "home"} icon="home" label="Home" onClick={() => setView("home")} />
          <Tab active={view === "bible"} icon="book" label="Bible" onClick={() => setView("bible")} />
          <Tab active={view === "donate"} icon="heart" label="Donate" onClick={() => setView("donate")} />
          <Tab active={view === "more"} icon="more" label="More" onClick={() => setView("more")} />
        </nav>
      </section>

      {showEditor && (
        <div className="dialog-backdrop" role="presentation">
          <section className="link-dialog" role="dialog" aria-modal="true" aria-labelledby="links-title">
            <div className="section-head">
              <h2 id="links-title">Update Links</h2>
              <button className="icon-button" type="button" aria-label="Close dialog" onClick={() => setShowEditor(false)}>x</button>
            </div>
            <label>
              Station YouTube URL
              <input type="url" value={stationUrlDraft} onChange={(event) => setStationUrlDraft(event.target.value)} />
            </label>
            <label>
              Donation URL
              <input type="url" value={donationUrlDraft} onChange={(event) => setDonationUrlDraft(event.target.value)} />
            </label>
            <button
              className="wide-button"
              type="button"
              onClick={() => {
                setSelectedStation({ ...selectedStation, youtubeUrl: stationUrlDraft });
                setDonationUrl(donationUrlDraft);
                setShowEditor(false);
              }}
            >
              Save Demo Links
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

function CompactList({ items }) {
  return (
    <div className="compact-list">
      {items.map((item) => (
        <article className="compact-item" key={item.title} onClick={() => openExternal(item.url)}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  );
}

function Tab({ active, icon, label, onClick }) {
  return (
    <button className={`tab ${active ? "active" : ""}`} type="button" onClick={onClick}>
      <Icon name={icon} />
      <span>{label}</span>
    </button>
  );
}
