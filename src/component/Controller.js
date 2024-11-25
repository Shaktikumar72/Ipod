import React,{ Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';

export default class Controller extends Component{
   handlePlayPauseIcon =()=>{
     if(this.props.isSongPlaying()){
        return <i className=" fa fa-light fa-pause" />
     }
     else {
        return <i className=" fa fa-light fa-play" />
     }
   }
   render(){
    return(
        <div 
           className='controller'
           ref={this.props.controllerRef}
           onMouseDown={(e)=>{
            e.stopPropagation();
            this.props.rotate();
            return;
           }}
        >
            <div
              className='controller-menu hover'
              onClick={this.props.handleMenuControllerClick}> Menu
            </div>
            <div 
              className='forward hover' onClick={this.props.handleNextSong}>  
              <i className="fa fa-forward" /> 
            </div>
            <div
               className='backward hover' onClick={this.props.handlePrevSong}>
                  <i className="fa fa-backward" />
               </div>
            <div
             className='play-pause hover'
             onClick={this.props.handlePlayPause}
            >
                {this.handlePlayPauseIcon()}
            </div>
            <div className='controller-centre hover' onClick={()=>this.props.centreTap()}></div>
        </div>
    )
   }
}