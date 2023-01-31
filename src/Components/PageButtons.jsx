
export function PageButtons(props) {

  return (
    <div className="pageButtonsContainer">
      <button onClick={props.firstPage}>{"<<"}</button>
      <button onClick={props.prevPage}>{"<"}</button>
      <button onClick={props.nextPage}>{">"}</button>
      <button onClick={props.lastPage}>{">>"}</button>
    </div>
  )
}