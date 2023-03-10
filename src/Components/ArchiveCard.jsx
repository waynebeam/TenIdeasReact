import {CountIcon} from './CountIcon'

export const ArchiveCard = ({archiveIdeas, colorSwap, toggleFavorite, deleteCard, actionSheetIndex, index, toggleActionSheet, darkMode, showRandomIdea}) => {
  

  let spanStyle = "spanStyle";
  let favoriteButtonStyle = "favoriteButton";
  let headingStyle = "archiveCardHeading";
  if(colorSwap) {
  headingStyle += " archiveCardHeadingTwo";
  }

  let cardStyle = "archiveCard";
  if(colorSwap) {
    cardStyle += " archiveCardTwo";
  }
  if(darkMode) {
    favoriteButtonStyle += " favoriteButtonDark";
    spanStyle += " spanStyleDark";
    if(colorSwap){ 
      cardStyle += " archiveCardTwoDark";
      headingStyle += " archiveCardHeadingTwoDark";
    }
    else {
      cardStyle += " archiveCardDark";
      headingStyle += " archiveCardHeadingDark";
         }
  }

let date;
  if (archiveIdeas.length !== 0) {
    
    let idea = new Date(archiveIdeas[0].date);
    date = idea.getMonth()+1 +"/" + idea.getDate() + "/" + idea.getFullYear();
  
  
  return (
    <div className={"entireArchiveCard"}>
    <div onClick={toggleActionSheet}>
      <h2 className={headingStyle} 
        
        >{archiveIdeas[0].topic} <br /> {date}</h2>
    </div>
      {
        actionSheetIndex === index &&
        <div className={"actionSheet"}>
      <button
        onClick={()=>deleteCard(archiveIdeas[0].topic)}
        >Delete Card</button>
        </div>
      }
      <div className={cardStyle} >
        {
          archiveIdeas.map((idea, i) => {
            return <div className={'archiveCardSection'} key={i}>
              <h3 className={"archiveCardItem"} >{idea.idea}</h3>
              <input
                className={favoriteButtonStyle}
                type="checkbox"
                onTransitionEnd={() => toggleFavorite(idea)}
                defaultChecked={idea.favorite}
                
              />
              {!showRandomIdea && <CountIcon index={i+1} darkMode={darkMode} isAnimated={false} />}
              <hr />
             
            </div>
          })
        }
      </div>
    </div>
  )
}
}