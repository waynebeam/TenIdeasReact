import { useState, useEffect } from 'react'
import {CountIcon} from "./CountIcon"
import {ArchiveList} from './ArchiveList'
import {IdeaInput} from './IdeaInput'

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
  const blankIdea = {idea: "", favorite: false, topic: topic, date: new Date(), id: crypto.randomUUID() };

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
  localStorage.setItem("darkMode",darkMode);
  let mainContainerStyle = "mainContainer";
  let listHeadingStyle = "listHeading";
  let inputStyle = "inputStyle";
  let itemContainerStyle = "itemContainer";
    if(darkMode){ 
      mainContainerStyle += " mainContainerDark";
      listHeadingStyle += " listHeadingDark"
      inputStyle += " inputStyleDark";
      itemContainerStyle += " itemContainerDark";
    }

  
  function updateIdeas(value){
    let newIdeas = [...ideas];
    newIdeas[ideas.length-1].idea = value.target.value;
    setIdeas(newIdeas);
  }
  function addIdea (){
    let count = ideas.length;
    if (count < 10 && ideas[count - 1].idea) {
      let newIdeas = [...ideas, blankIdea,];
      setIdeas(newIdeas);
      return;
    }
    if (count === 10 && ideas[count - 1].idea) {
      
      let newArchive = [...ideas];
      if (archiveIdeas) { newArchive.push(...archiveIdeas) }
      saveArchive(newArchive);
      setIdeas([]);
      setTopic("");
      setTopicSet(false);
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
    }
  }

  function handleKeyPress(e) {
    if(e.key === "Enter"){
      saveTopic();
    }
  }

  function handleDarkMode() {
    if(darkMode) {
      setDarkMode("");
      
    } else setDarkMode("true");

  }
  
  function toggleFavorite(toggledidea) {
    let index = archiveIdeas.findIndex(idea => idea === toggledidea);
    toggledidea.favorite = !toggledidea.favorite;
    let newArchive = [...archiveIdeas.slice(0, index), toggledidea, ...archiveIdeas.slice(index + 1)];
    saveArchive(newArchive);  
  }

  function clearArchive() {
    if(confirm("Erase the archive?")) {
      localStorage.setItem("archiveIdeas", "[]");
      setArchiveIdeas([]);
    }
  }
  
  const handleHelp = () => 
    alert('An idea tracker by waynebeam.net. Write TEN ideas a day EVERY day to exercise your possibility muscle. Inspired by the book "Skip the Line" by James Altucher');

  return (
    <div className={mainContainerStyle}>
      <h1 className={listHeadingStyle}><span className={"ten"}>Ten</span> {(topicSet ? topic : "Ideas a Day")}
      <button onClick={() => handleHelp()}>(?)</button>
      <button 
        onClick={handleDarkMode}
        style={{float: "right"}}>🌙</button>
      </h1>

      {
        (ideas.length === 0 &&
          <div className={"ideaInput"}>
            { 
              !archiveIdeas.length &&
            <p
              className={darkMode? "hintAnim hintText hintTextDark" 
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
            <div className={"ideaInput"}>
              <IdeaInput
                darkMode={darkMode}
                inputStyle={inputStyle}
                key={idea.id}
                onChange={(v) => updateIdeas(v)}
                value={idea.idea}
                addIdea={() => addIdea()}
                latest={i === ideas.length - 1}
                index={i}
                hintText={archiveIdeas.length? null : hintTexts[i+1]}
              />
            </div>
              :
            <div  className={itemContainerStyle}
              key={i}>             
              <p>{idea.idea}</p>
              <CountIcon index={i+1} darkMode={darkMode}></CountIcon>
              </div>
          )
        })
      }
        </div>
      
      <ArchiveList
        darkMode={darkMode}
        inputStyle={inputStyle}
        archiveIdeas={archiveIdeas ? archiveIdeas : []}
        toggleFavorite={toggleFavorite}
        clearArchive={clearArchive}
        saveArchive={(archive)=>saveArchive(archive)}/>
    </div>
  )
}




