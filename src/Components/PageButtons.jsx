
export function PageButtons(props) {

  function changePage(navFunc) {
    navFunc();
    if(props.scrollTo)
    props.scrollTo();
  }
  return (
    <div className="pageButtonsContainer">
      <button onClick={()=>changePage(props.firstPage)}>{"<<"}</button>
      <button onClick={()=>changePage(props.prevPage)}>{"<"}</button>
      <button onClick={()=>changePage(props.nextPage)}>{">"}</button>
      <button onClick={()=>changePage(props.lastPage)}>{">>"}</button>
    </div>
  )
}