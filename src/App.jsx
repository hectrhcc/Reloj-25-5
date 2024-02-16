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

  startStopTimer() { //se activa cuando hacemos clic
    if (this.state.timerOn === true) { //si esta corriendo el clic pausa el tiempo
      this.setState({ timerOn: false});//el estado pasa a falso
      clearInterval(this.timer);//se detiene el tiempo
    } else if (this.state.timerOn === false) {//si esta en pausa el clic reanuda 
      this.setState({ timerOn: true });
      if (this.state.timer > 0) {
        this.timer = setInterval(() => {
          let currTimer = this.state.timer;
          let breakStatus = this.state.break;
          if (currTimer > 0) {
            currTimer -= 1; 
            //los minutos y segundos se trabajan juntos currTimer 00:00
          } else if (currTimer === 0 && breakStatus === false) {//primer cambio
            currTimer = this.state.breakTime * 60;//aqui pasa de session a break
            breakStatus = true; //estatus de break esta activo
          } else if (currTimer === 0 && breakStatus === true) { //cambio otra vez
            currTimer = this.state.sessionTime * 60;//aqui pasa de break a session
            breakStatus = false;//para volver a pasar  de session a break
          }
          this.setState({//actualiza el estado
            timer: currTimer,
            break: breakStatus
          });
        }, 1000);
      };
    };
  };

  increment(e, timerType) {
    if (this.state.timerOn === true) {//si el tiempo esta activo no hace nada
      return;
    }

    switch (timerType) {
      case 'session':
        if (this.state.sessionTime < 60) {//si cumple que no pasa mayor a 60
          let newSession = this.state.sessionTime + 1;//incrementa y guarda
          this.setState({//actualiza el estado
            sessionTime: newSession, //sessiontime+1
            timer: newSession * 60 //timer con 1 minuto+
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
    if (this.state.timerOn === true) {
      return;
    }
    switch (timerType) {
      case 'session':
        if (this.state.sessionTime > 1) {//si  cumple que no es menor que 1
          let newSession = this.state.sessionTime - 1;
          this.setState({
            sessionTime: newSession,// sessionTime--
            timer: newSession * 60 //timer con 1 min -
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
      <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
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