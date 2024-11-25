import React from "react";
//  import IpodScreens from '../constants';
 import CoreMenu from "./screens/CoreMenu";
import Games from "./screens/Games";
import Settings from "./screens/Settings";
import { screenIndexMapping } from "../constants";
import CoverFlow from "./screens/CoverFlow";
import Music from "./screens/Music";
export default function Display(props) {
   const {
      curruntScreenIndex,
      menuActiveIndex,
      songProgressRef ,
      curruntSong,
      curruntSongIndex,
   } = props;
   if(curruntScreenIndex === screenIndexMapping.coreMenu) {
    return <CoreMenu menuActiveIndex= {menuActiveIndex} />;
   }
   if(curruntScreenIndex === screenIndexMapping.music){
      return( <Music 
            songProgressRef={songProgressRef} 
            currentSong={curruntSong} 
            curruntSongIndex ={curruntSongIndex}
            />)
   }
   if(curruntScreenIndex === screenIndexMapping.games){
      return <Games />
   }
   if(curruntScreenIndex === screenIndexMapping.coverFlow){
    return <CoverFlow />
   }
   if(curruntScreenIndex === screenIndexMapping.settings){
    return <Settings />
   }
   else{
      return <div>No Screen</div>
    }
} 