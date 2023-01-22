import { ArchiveCard } from "./ArchiveCard";
import { useState } from 'react';

export const ArchiveList = ({archiveIdeas, toggleFavorite, clearArchive, saveArchive, darkMode, inputStyle}) => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [actionSheetIndex, setActionSheetIndex] = useState(null);
  const [showRandomIdea, setShowRandomIdea] = useState(false);

let headingStyle = "archiveHeading listHeading";
  let spanStyle = "spanStyle";
  if(darkMode){
    headingStyle += " archiveHeadingDark listHeadingDark";
    spanStyle += " spanStyleDark";
  }
  
  const archiveCards = () => {
    let listOfCards = [];
    let listOfIdeas = [];
    let prevIdea = { topic: "" };
    let ideasToSort = archiveIdeas;
    if(showRandomIdea){
      let idea = ideasToSort[Math.floor(Math.random() * ideasToSort.length)];
      listOfIdeas.push(idea);
      listOfCards.push(listOfIdeas);
      return listOfCards;
    }
    if (showFavorites) {
      ideasToSort = ideasToSort.filter(idea => idea.favorite)
    }
    if(filterText){
      ideasToSort = ideasToSort.filter(idea => idea.idea.toLowerCase().search(filterText.toLowerCase()) !== -1 
                                      || idea.topic.toLowerCase().search(filterText.toLowerCase()) !== -1);
    }
  
    ideasToSort.forEach((idea) => {
      if (idea.topic !== prevIdea.topic) {
        if (listOfIdeas.length) { listOfCards.push(listOfIdeas) }
        listOfIdeas = [];
      }
      listOfIdeas.push(idea);
      prevIdea = idea;
    })
    listOfCards.push(listOfIdeas);
    return listOfCards;
  }

  const deleteCard = (topic) => {
    if(confirm("Delete these ideas?")){
    let newArchive = archiveIdeas.filter(idea => idea.topic !== topic);
    saveArchive(newArchive);
    }
  }

  const toggleActionSheet = (index) => {
    if(showRandomIdea){
      return;
    }
    setActionSheetIndex(actionSheetIndex===index? null : index);
  }

  const calculateStreak = () => {
    let streak = 0;
    let todayDone = false;
    if(archiveIdeas.length){
    let currDate = new Date();
    let currMonth = currDate.getMonth();
    let currDay = currDate.getDate();
    let currTime = currDate.getTime();
    let currWeekday = currDate.getDay();
    currWeekday = currWeekday === 0 ? 7 : currWeekday;    
    for(let i = 0; i<archiveIdeas.length; i++) {
      let idea = archiveIdeas[i];
      let date = new Date(idea.date);
      let day = date.getDate();
      let month = date.getMonth();
      
      if (day === currDay && month === currMonth) {
        if (streak === 0) {
          todayDone = true;
          streak = 1;
        }
        continue;
      }
      if ((currTime - date.getTime()) > (3600 * 48 * 1000)) {
         break; 
      }
      if(currWeekday - date.getDay() !== 1){
        break;
      }

        streak += 1;
        currDate = date;
        currMonth = month;
        currDay = day;
        currTime = date.getTime();
        currWeekday = date.getDay();
        currWeekday = currWeekday === 0 ? 7 : currWeekday;
      
    }
    }

    if (streak === 0) {
      return( 
        
        <span className={spanStyle}>Write <span className={"number"}>10</span> ideas to start a streak</span>)
    }
    if(todayDone){
      return(
        <span className={spanStyle}>On a <span className={"number"}>{streak}</span> day streak!</span>  
      )
    }
    return(
      <span className={spanStyle}>Write <span className={"number"}>10</span> ideas today to continue your <span className={"number"}>{streak}</span> day streak!</span>  
      )
  }

  function randomDesign(){
    let text = [];
    let word = "Random Idea ↺";
    
    for(let i in word){
      let chooser = Math.random() < 0.5;
      text.push(<span style={{color: chooser ? "darkgoldenrod" : ""}}>{word[i]}</span>)
    }
    return text;
  }

  return (
    <div>
      {archiveIdeas.length > 0 && <h2 className={headingStyle}>Idea Archive:</h2>}

      <div className={spanStyle}>{calculateStreak()} | <span className={"number"}>{archiveIdeas.length}</span> ideas saved!</div>

      {
        archiveIdeas.length > 0 ?
          <div>
            {
              !showRandomIdea &&
              <div>
            <input 
              className={inputStyle}
             
              placeholder="Search Ideas"
              onChange={(e) => setFilterText(e.target.value)}
              value={filterText}
              />
                {
              filterText && !showRandomIdea &&
            <button style={{display: "inline-block"}}
              onClick={() => setFilterText("")}>❌</button>
            }
            <button
              onClick={() => {
                setShowFavorites(!showFavorites)}}
              style={{display: 'block', margin: '10px auto'}}>
              {showFavorites ? <span>Viewing: <span style={{color: "darkgoldenrod"}}>Favorites</span></span> : "Viewing: All"}</button>
              </div>
                }
            {
            
              showRandomIdea ? 
              <div className={"randomButtons"}>
              <button onClick={()=>{
                setShowRandomIdea(true)
              setFilterText(crypto.randomUUID())}
              }>↺</button>
              <button onClick={()=>{
                setShowRandomIdea(false)
                setFilterText("");
              }
              }>❌</button>
              </div>
              :
            !showFavorites && <button
              onClick={() => {
                setFilterText("");
                setShowRandomIdea(true);
                setActionSheetIndex(null);
              }}
              >{
                randomDesign()
              }</button>
            }
            
          </div>
          :
          <p className={spanStyle + " descriptionText"}>
            Choose a topic, and write <span className={"number"}>10</span> ideas related to it. Each group of <span className={"number"}>10</span> ideas is saved here in the archive. Try to come up with at least <span className={"number"}>10</span> ideas a day, every day. Consecutive days count toward a streak. No judgment. Any idea will do.  
          </p>
      }
    <div className={"container"}>
      {
        archiveCards().map((ideas, i) => <ArchiveCard key={i}
          archiveIdeas={ideas}
          darkMode={darkMode}
          colorSwap={i % 2 === 0 ? true : false}
          toggleFavorite={toggleFavorite}
          deleteCard={(topic)=> deleteCard(topic)}
          actionSheetIndex={actionSheetIndex}  
          index={i}
          toggleActionSheet={()=>toggleActionSheet(i)}
        />)
      }
    </div>
      {
        archiveIdeas.length && !showRandomIdea && !showFavorites ?
          <button className={"clearArchive"} onClick={() => clearArchive()}>Clear archive</button>
          :
          null
      }
    </div>
  )
}