import { useState, useEffect } from 'react'
import { CountIcon } from "./CountIcon"
import { ArchiveList } from './ArchiveList'
import { IdeaInput } from './IdeaInput'
import { noteValues } from '../Notes'

function loadArchive() {
  let archive = JSON.parse(localStorage.getItem("archiveIdeas"))
  if (archive) {
    return archive
  } else {
    return []
  }
}



export function IdeasList() {
  const [topic, setTopic] = useState("");
  const [topicSet, setTopicSet] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [archiveIdeas, setArchiveIdeas] = useState(loadArchive());
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode"));
  const [isMuted, setIsMuted] = useState(localStorage.getItem("isMuted"));
  const [isFinished, setIsFinished] = useState(false);
  const blankIdea = { idea: "", favorite: false, topic: topic, date: new Date(), id: crypto.randomUUID() };

  const hintTexts = [
    "Pick a topic \u2193 \u2193",
    `Next an idea for "${topic}" \u2193 \u2193`,
    "Now a second idea \u2193 \u2193",
    "Now think of idea number 3 \u2193 \u2193",
    "...and 4 \u2193 \u2193",
    "and so on... \u2193 \u2193",
    "keep going! \u2193 \u2193",
    "a seventh idea \u2193 \u2193",
    "7 down 3 to go! \u2193 \u2193",
    "Number 9, \u2193 \u2193",
    "Last one, number 10! \u2193 \u2193"
  ];

  const ideaSoundScale = [
    ["G3", "B3", "D3", "F3"],
    ["C3", "C4"],
    ["D3", "D4"],
    ["E3", "E4"],
    ["F3", "F4"],
    ["G3", "G4"],
    ["A3", "A4"],
    ["B3", "B4"],
    ["F4", "B4", "D4", "B3"],
    ["G4", "B4", "D4", "F4", "G3", "B3", "F3"],
    ["C5", "C4", "C3", "G4", "E4"]
  ]

  localStorage.setItem("darkMode", darkMode);
  localStorage.setItem("isMuted", isMuted);
  let mainContainerStyle = "mainContainer";
  let listHeadingStyle = "listHeading";
  let inputStyle = "inputStyle";
  let itemContainerStyle = "itemContainer itemAnim";
  let headingAnimStyle = " headingAnim";
  if (darkMode) {
    mainContainerStyle += " mainContainerDark";
    listHeadingStyle += " listHeadingDark"
    inputStyle += " inputStyleDark";
    itemContainerStyle += " itemContainerDark";
    headingAnimStyle = " headingAnimDark";
  }


  function updateIdeas(value) {
    let newIdeas = [...ideas];
    newIdeas[ideas.length - 1].idea = value.target.value;
    setIdeas(newIdeas);
  }
  function addIdea() {
    let count = ideas.length;
    if (count < 10 && ideas[count - 1].idea) {
      let newIdeas = [...ideas, blankIdea,];
      blankIdea.id = crypto.randomUUID();
      setIdeas(newIdeas);
      playSound(count);
      return;
    }
    if (count === 10 && ideas[count - 1].idea) {
      playSound(count);
      setIsFinished(true);
      setTimeout(() => {
        let newArchive = [...ideas];
        if (archiveIdeas) { newArchive.push(...archiveIdeas) }
        saveArchive(newArchive);
        setIdeas([]);
        setTopic("");
        setTopicSet(false);
        setIsFinished(false);
      }, 1500);
    }
  }

  function playSound(index) {
    if (!isMuted) {
      const audioContext = new AudioContext();

      ideaSoundScale[index].forEach(note => {
        const duration = 1;

        const gain = audioContext.createGain();
        gain.connect(audioContext.destination);
        let oscillator = audioContext.createOscillator();
        oscillator.connect(gain);
        oscillator.frequency.value = noteValues[note];
        oscillator.start();
        oscillator.stop(duration);
        gain.gain.exponentialRampToValueAtTime(.00001, audioContext.currentTime + duration);
      })
    }

  }

  function saveArchive(archive) {
    localStorage.setItem("archiveIdeas", JSON.stringify(archive));
    setArchiveIdeas(archive);
  }

  function saveTopic() {
    if (topic) {
      blankIdea.date = new Date();
      setIdeas([blankIdea]);
      setTopicSet(true);
      playSound(0);
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      saveTopic();
    }
  }

  function handleDarkMode() {
    if (darkMode) {
      setDarkMode("");

    } else setDarkMode("true");

  }

  function handleIsMuted() {
    if (isMuted) {
      setIsMuted("");
    }
    else setIsMuted("true");
  }

  function toggleFavorite(toggledidea) {
    let index = archiveIdeas.findIndex(idea => idea === toggledidea);
    toggledidea.favorite = !toggledidea.favorite;
    let newArchive = [...archiveIdeas.slice(0, index), toggledidea, ...archiveIdeas.slice(index + 1)];
    saveArchive(newArchive);
  }

  function clearArchive() {
    if (confirm("Erase the archive?")) {
      localStorage.setItem("archiveIdeas", "[]");
      setArchiveIdeas([]);
    }
  }

  const handleHelp = () =>
    alert('An idea tracker by waynebeam.net. Write TEN ideas a day EVERY day to exercise your possibility muscle. Inspired by the book "Skip the Line" by James Altucher');

  return (
    <div className={mainContainerStyle}>

      <h1 className={topicSet ? listHeadingStyle + headingAnimStyle : listHeadingStyle}><span className={"ten"}>Ten</span> {(topicSet ? topic : "Ideas a Day")}
        <button
          onClick={() => handleHelp()}
          style={{ float: "right" }}>❓</button>
        <button
          onClick={handleDarkMode}
          style={{ float: "right" }}>🌙</button>
        <button
          onClick={handleIsMuted}
          style={{ float: "right" }}>
          {isMuted ? "🔇" : "🔉"}
        </button>
      </h1>

      {
        (ideas.length === 0 &&
          <div className={"ideaInput"}>
            {
              !archiveIdeas.length &&
              <p
                className={darkMode ? "hintAnim hintText hintTextDark"
                  : "hintAnim hintTextTopic"}>{hintTexts[0]}</p>
            }
            <div>
              <input
                className={inputStyle}
                placeholder="Today's Topic: 10..."
                onChange={(e) => setTopic(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus />
              <button onClick={() => saveTopic()}>Begin!</button>
            </div>
            <CountIcon index={0} darkMode={darkMode}></CountIcon>
          </div>)
      }
      <div className={"ideaEntryFields"}>
        {
          ideas.map((idea, i) => {
            return (
              i === ideas.length - 1 ?
                <div key={idea.id}
                  className={"ideaInput"}>
                  <IdeaInput
                    darkMode={darkMode}
                    inputStyle={inputStyle}
                    onChange={(v) => updateIdeas(v)}
                    value={idea.idea}
                    addIdea={() => addIdea()}
                    latest={i === ideas.length - 1}
                    index={i}
                    hintText={archiveIdeas.length ? null : hintTexts[i + 1]}
                  />
                </div>
                :
                <div className={itemContainerStyle}
                  key={idea.id}>
                  <p>{idea.idea}</p>
                  <CountIcon index={i + 1} darkMode={darkMode}></CountIcon>
                </div>
              
            )
          })
        }
        {
          isFinished && 
        <div className={"isFinished"}>
          <h1><span className={"ten"}>Ten</span> ideas saved! Nicely Done!</h1>
        </div>
        }
      </div>

      <ArchiveList
        darkMode={darkMode}
        inputStyle={inputStyle}
        archiveIdeas={archiveIdeas ? archiveIdeas : []}
        toggleFavorite={toggleFavorite}
        clearArchive={clearArchive}
        saveArchive={(archive) => saveArchive(archive)} />
    </div>
  )
}




