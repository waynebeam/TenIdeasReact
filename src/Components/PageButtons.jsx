
export function PageButtons(props) {

  return (
    <div className="pageButtonsContainer">
      <button onClick={props.firstPage}>First</button>
      <button onClick={props.prevPage}>Prev</button>
      <button onClick={props.nextPage}>Next</button>
      <button onClick={props.lastPage}>Last</button>
    </div>
  )
}