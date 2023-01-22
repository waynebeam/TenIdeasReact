import {CountIcon} from './CountIcon'

export function IdeaInput(props) {
  let itemContainerStyle = "itemContainer";
  let inputStyle = props.inputStyle;
    if(props.darkMode){ 
      itemContainerStyle += " itemContainerDark";
      inputStyle += " inputStyleDark";
    }
  
  function handleKeyPress(e) {
    if(e.key === "Enter"){
      props.addIdea();
    }
  }
  
  return (
    <div
      className={itemContainerStyle}>
      { 
        props.hintText &&
        <p className={props.darkMode? "hintText hintTextDark hintAnim" 
        : "hintText hintAnim"}>{props.hintText}</p>
      }
      <input
        className={inputStyle}
        placeholder={"Here's an idea..."}
        value={props.value}
        onChange={props.onChange}
        autoFocus={true}
        onKeyPress={handleKeyPress}
      />
      {(props.latest && <button onClick={props.addIdea}>Enter</button>)}
      <CountIcon index={props.index+1} darkMode={props.darkMode}></CountIcon>
    </div>
  )
}


