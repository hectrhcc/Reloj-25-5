import { useState } from 'react'
import './Estilo.css'


class Reloj extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
      break: false,
      timer: 1500, //25 minutos en segundos
      breakTime: 5, //
      sessionTime: 25, //
    };
    this.reset = this.reset.bind(this);
    this.startStopTimer = this.startStopTimer.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    
  };

  reset() {
    this.setState({
      timerOn: false,
      break: false,
      timer: 1500,
      breakTime: 5,
      sessionTime: 25,
    });
    clearInterval(this.timer);
    let beep = document.getElementById('beep');
    beep.pause();
    beep.currentTime = 0;
  };

  startStopTimer() {
    if (this.state.timerOn === true) {
      this.setState({ timerOn: false});
      clearInterval(this.timer);
    } else if (this.state.timerOn === false) {
      this.setState({ timerOn: true });
      if (this.state.timer > 0) {
        this.timer = setInterval(() => {
          let currTimer = this.state.timer;
          let breakStatus = this.state.break;
          if (currTimer > 0) {
            currTimer -= 1;
          } else if (currTimer === 0 && breakStatus === false) {
            currTimer = this.state.breakTime * 60;
            breakStatus = true;
          } else if (currTimer === 0 && breakStatus === true) {
            currTimer = this.state.sessionTime * 60;
            breakStatus = false;
          }
          this.setState({
            timer: currTimer,
            break: breakStatus
          });
        }, 1000);
      };
    };
  };

  increment(e, timerType) {
    /* Adds one minute to a timer.  Can reach but not go above 60.
    */
    //if timer is running then no time can be added
    if (this.state.timerOn === true) {
      return;
    }

    switch (timerType) {
      case 'session':
        if (this.state.sessionTime < 60) {
          let newSession = this.state.sessionTime + 1;
          this.setState({
            sessionTime: newSession,
            timer: newSession * 60
          });
        };
        break;
      case 'break':
        if (this.state.breakTime < 60) {
          this.setState({ breakTime: this.state.breakTime + 1 });
        };
        break;
    };
  };

  decrement(e, timerType){
    //Removes one minute from a timer.  Timer cannot equal zero.
    if (this.state.timerOn === true) {
      return;
    }
    switch (timerType) {
      case 'session':
        if (this.state.sessionTime > 1) {
          let newSession = this.state.sessionTime - 1;
          this.setState({
            sessionTime: newSession,
            timer: newSession * 60
          });
        };
        break;
      case 'break':
        if (this.state.breakTime > 1) {
          this.setState({ breakTime: this.state.breakTime - 1});
        };
        break;
    };
  };

  render() {
    return(
      <div >
        < TimerDisplay timerOn ={this.state.timerOn} timer={this.state.timer} startStop={this.startStopTimer} reset={this.reset} break={this.state.break} />
        < TimerSetting breakTime={this.state.breakTime} sessionTime={this.state.sessionTime} increment={this.increment} decrement={this.decrement} />
      </div>
    );
  };

};

const TimerDisplay = (props) => {

  let currMin = Math.floor(props.timer / 60);
  let currSec = Math.floor(props.timer % 60);
  if (currMin < 10) {
    currMin = '0'.concat(currMin.toString());
  } else {
    currMin = currMin.toString();
  };
  if (currSec < 10) {
    currSec = '0'.concat(currSec.toString());
  } else {
    currSec = currSec.toString();
  };

  let currTime = currMin.concat(':').concat(currSec);

  let beep = document.getElementById('beep');
  if (props.timer === 0) {
    beep.play();
  }


  return(
    <>
        <div className="marco">
      <div id="timer-label">
        {props.break ? "Break" : "Session"}
      </div>
       
      <div  id="time-left">
        {currTime}
      </div>
      </div>
      <div >
     <span id="start_stop" onClick={props.startStop}>{props.timerOn? 'stop' : 'play'} <i className="fa fa-play fa-sm"></i>      
      <i className="fa fa-pause fa-sm"></i></span>
        <span  id="reset" onClick={props.reset}><i className="fa fa-refresh fa-sm"/></span>
      </div>
 <audio src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" id="beep" ref={this.audioRef}></audio>
    </>
  );
};

const TimerSetting = (props) => {
  return(
    <>
     <div className="contenedor"><p>25 + 5 Clock</p>
      
        <div id="break-label">Break Length
     <div className="flechas">
     <div  id="break-decrement" onClick={(e) => {props.decrement(e, "break")}}><i className="fa fa-arrow-down fa-sm"></i></div>
     <div id="break-length">{props.breakTime}</div>
     <div  id="break-increment" onClick={(e) => {props.increment(e, "break")}}><i className="fa fa-arrow-up fa-sm"></i></div>
     </div>
     </div>  
       
       <div  id="session-label">Session Length
  <div className="flechas">
  <div  id="session-decrement" onClick={(e) => {props.decrement(e, "session")}}><i className="fa fa-arrow-down fa-sm"></i></div>
  <div  id="session-length">{props.sessionTime}</div>
   <div id="session-increment"  onClick={(e) => {props.increment(e, "session")}}><i className="fa fa-arrow-up fa-sm"></i></div>
</div>          
</div>
      </div>     
  </>
  );
};

ReactDOM.render(<Reloj />,document.getElementById('root'));