import React, { useState ,useEffect} from "react";
import songs from "../../assets/audio/audio";
export default function Music({ songProgressRef, currentSong,curruntSongIndex }) {
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(currentSong.currentTime);
    };
    if (currentSong) {
      currentSong.addEventListener("timeupdate", updateCurrentTime);
    }
    return () => {
      if (currentSong) {
        currentSong.removeEventListener("timeupdate", updateCurrentTime);
      }
    };
  }, [currentSong]);

  return (
    <div className="songScreen">
      <div className="songDetails">
        <div className="songBoxContainer">
          {/* {console.warn(currentSong[curruntSongIndex])} */}
          <img src={songs[curruntSongIndex].img} className="" alt="" />
          <div>
            <div>{songs[curruntSongIndex].title}</div>
            <div>{songs[curruntSongIndex].singer}</div>
          </div>
        </div>

        <div className="g">
          <div className="progress-container">
            <div className="progress-bar" ref={songProgressRef}></div>
          </div>
          <div className="song-progress-time">
            <span>{currentTime.toFixed(0)}</span>
            <span>{currentSong.duration ? currentSong.duration.toFixed(0) : 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
