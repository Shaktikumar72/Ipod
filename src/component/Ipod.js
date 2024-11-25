import React, { Component } from "react";
import zingtouch from "zingtouch";
import Display from "./Display";
import Controller from "./Controller";
import { screenIndexMapping } from "../constants";
import songs from '../assets/audio/audio';
export default class Ipod extends Component{
    constructor(){
        super();
        this.state = {
          curruntScreenIndex : 1,
          menuActiveIndex : 0,
          dormantScreenIndex : 1,
          curruntSongIndex:0,
          curruntSong : new Audio(songs[0].audio),
          isSongPlaying: false,
        }
        this.controllerRef = React.createRef();
        this.songProgressRef = React.createRef();
        // this.tempMenuIndexStore = React.createRef();
    }
    componentDidMount(){
      const temp = this.controllerRef.current;
      // console.log(this.state.curruntSong);
      this.controllerRingElem = new zingtouch.Region(temp);
      this.state.curruntSong.addEventListener("timeupdate", this.updateSongProgress)
    }
    rotate = () => {
      // this.tempMenuIndexStore = this.state.menuActiveIndex;
      this.controllerRingElem.bind(
          this.controllerRef.current, 
          'rotate',
          (e) => {
              e.stopPropagation();
              if(this.state.curruntScreenIndex !== 1){
                return;
              }
              // console.log('happening in rotate')
              // console.log(e)
              const rotationAmount = e.detail.angle;
              let menuActiveIndex = 0;
              if(rotationAmount >= 0 && rotationAmount <= 45){
                  menuActiveIndex = 0;
              }
              if(rotationAmount > 45 && rotationAmount <= 135){
                  menuActiveIndex = 1;
              }
              else if(rotationAmount > 135 && rotationAmount <= 225){
                  menuActiveIndex = 2;
              }
              else if(rotationAmount > 225 && rotationAmount <= 360){
                  menuActiveIndex = 3;
              }
              else if(rotationAmount > -90 && rotationAmount < 0){
                  menuActiveIndex = 3;
              }
              else if(rotationAmount >-180  && rotationAmount <= -90){
                  menuActiveIndex = 2;
              }
              else if(rotationAmount > -270 && rotationAmount <= -180){
                  menuActiveIndex = 1;
              }
              else if(rotationAmount > -360 && rotationAmount <= -270){
                  menuActiveIndex = 0;
              }
              this.setState({menuActiveIndex: menuActiveIndex})
              
              // if(rotationAmount >= 0 )
          }
      )
    }

    centreTap =()=>{
      if(this.state.curruntScreenIndex === 1){
        this.setState({curruntScreenIndex:this.state.menuActiveIndex + 2 })
      }
    }
    handleMenuControllerClick = () => {
      if(this.state.curruntScreenIndex !== screenIndexMapping.coreMenu) {
        this.setState({
          dormantScreenIndex : this.state.curruntScreenIndex,
          curruntScreenIndex : screenIndexMapping.coreMenu
        })
      }
      else {
        this.setState({
          curruntScreenIndex : this.state.dormantScreenIndex
        })
      }
    }
    handlePlayPause = () => {
      if(this.state.isSongPlaying){
        this.state.curruntSong.pause();
        this.setState({isSongPlaying: false})
      }
      else {
        this.state.curruntSong.play();
        this.setState({isSongPlaying:true});
      }
    }
    handlePlayPauseIcon =()=>{
      if(this.state.isSongPlaying) return true;
      else return false;
    }
    updateSongProgress = () => {
      if(this.state.curruntScreenIndex === screenIndexMapping.music){
        let duration = this.state.curruntSong.duration;
        let currentTime = this.state.curruntSong.currentTime;
        // console.log("currunt" + currentTime + "duration" + duration)
        const progressPercent = (currentTime/duration) * 100
        console.log(`${(currentTime/duration) * 100}%`);
        this.songProgressRef.current.style.width = progressPercent + "%"
      }
      else{
        return;
      }
    }
    handleNextSong = () => {
      // Remove timeupdate listener from the current song
      this.state.curruntSong.removeEventListener("timeupdate", this.updateSongProgress);
      if(this.state.isSongPlaying){
        this.setState({isSongPlaying:false})
        this.state.curruntSong.pause();
      }
      // Move to the next song
      const temp = (this.state.curruntSongIndex + 1) % Object.keys(songs).length;
      const newSong = new Audio(songs[temp].audio);
    
      // Set the new song and add timeupdate listener
      this.setState({ curruntSongIndex: temp, curruntSong: newSong }, () => {
        this.state.curruntSong.addEventListener("timeupdate", this.updateSongProgress);
      });
      if(this.state.isSongPlaying){
        this.setState({isSongPlaying:false})
      }
    }
    
    handlePrevSong = () => {
      // Remove timeupdate listener from the current song
      this.state.curruntSong.removeEventListener("timeupdate", this.updateSongProgress);
      let temp;
      if(this.state.isSongPlaying){
        this.setState({isSongPlaying:false})
        this.state.curruntSong.pause();
      }
      if (this.state.curruntSongIndex === 0) {
        temp = Object.keys(songs).length - 1;
      } else {
        temp = (this.state.curruntSongIndex - 1) % Object.keys(songs).length;
      }
      const newSong = new Audio(songs[temp].audio);
    
      // Set the new song and add timeupdate listener
      this.setState({ curruntSongIndex: temp, curruntSong: newSong }, () => {
        this.state.curruntSong.addEventListener("timeupdate", this.updateSongProgress);
      });
      
    }
    render(){
      // console.log(this.state.curruntSongIndex)
        return(
           <div className="Ipod">
              <div className="Ipod-top">
                <Display 
                  curruntScreenIndex = {this.state.curruntScreenIndex}
                  menuActiveIndex = {this.state.menuActiveIndex}
                  songProgressRef = {this.songProgressRef}
                  curruntSong = {this.state.curruntSong}
                  curruntSongIndex = {this.state.curruntSongIndex}
                  isSongPlaying = {this.handlePlayPauseIcon}
                />
              </div>
              <div className="Ipod-bottom">
                <Controller
                  controllerRef={this.controllerRef} 
                  rotate = {this.rotate}
                  centreTap = {this.centreTap}
                  handleMenuControllerClick = {this.handleMenuControllerClick}
                  handlePlayPause = {this.handlePlayPause}
                  isSongPlaying = {this.handlePlayPauseIcon}
                  handleNextSong ={this.handleNextSong}
                  handlePrevSong = {this.handlePrevSong}
                />
              </div>
           </div>
        )
    }
}