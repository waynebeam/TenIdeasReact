import React from "react";
import { useState, useEffect } from "react";


export const CountIcon = ({ index, darkMode, isAnimated=true }) => {
  const [currIndex, setCurrIndex] = useState(isAnimated ? 0 : index);
  useEffect(()=>{
    setTimeout(()=>{
      if(currIndex<index){
        setCurrIndex(currIndex+1);
      }
    },200)
  },[currIndex]) 
    
  let colorTwo = darkMode? "gray" : "white";
  let counter = new Array(10);
  counter.fill(0);
  return (
    <div>
      {
        counter.map((icon, i) => {
          return(
      <div
        key={i}
        style={{display: "inline-block",
               width: "10px",
               height: "10px",
               backgroundColor: i<currIndex ? "black" : colorTwo,
               borderRadius: "50%",
               borderWidth: "2px",
               borderStyle: "solid",
               borderColor: i===index-1 ? "darkgoldenrod" : "lightgray",
               margin: "3px 2px 0px 0px"
               }}
        
        ></div>
            )
        })
      }
                    
      
    </div>
    )
}