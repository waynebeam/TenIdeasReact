
export function PageButtons(props) {

  let totalPages = Math.ceil(props.totalCards / props.cardsPerPage);
  let currentPage = Math.ceil(props.archiveStartingIndex / props.cardsPerPage) + 1;
  
  function changePage(navFunc) {
    let doScroll = navFunc();
    if(props.scrollTo && doScroll)
    props.scrollTo();
  }
  return (
    <div className="pageButtonsContainer">
      <button onClick={()=>changePage(props.firstPage)}>{"<<"}</button>
      <button onClick={()=>changePage(props.prevPage)}>{"<"}</button>
      <p className="pageNumbers">{currentPage}/{totalPages}</p>
      <button onClick={()=>changePage(props.nextPage)}>{">"}</button>
      <button onClick={()=>changePage(props.lastPage)}>{">>"}</button>
    </div>
  )
}