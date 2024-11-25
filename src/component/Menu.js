import React from "react";

export default function Menu({mainMenuOptions,title , menuActiveIndex}) {
  const activeMenuIndex =(index)=>{

    if(menuActiveIndex === index){
      return {backgroundColor: 'rgb(42, 133, 225)',color:"white",borderRadius:"5px",};
    }
  }
    return(
        <div className="menu">
            <h3 className="menuTitle">{title}</h3>
            {
              mainMenuOptions.map((options , index)=>{
                return <div key={index} style={activeMenuIndex(index) }> {options} </div>
              })
            }
        </div>
    )
}