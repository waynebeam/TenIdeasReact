 {
            
              showRandomIdea ? 
              <div className={"randomButtons"}>
              <button onClick={()=>{
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
              className="archiveButton"
              onClick={() => {
                setFilterText("");
                setShowRandomIdea(true);
                setActionSheetIndex(null);
              }}
              >{
                randomDesign()
              }</button>
            }