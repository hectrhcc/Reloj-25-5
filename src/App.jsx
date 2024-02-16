import { useState } from 'react'
import './Estilo.css'
/*(template literals) de ES6 en combinación con el método padStart() para formatear los valores de this.state.session y this.state.seconds.
El método padStart() se aplica a las cadenas de texto convertidas usando String() para asegurar que tengan una longitud mínima de 2 caracteres, añadiendo ceros a la izquierda */
//let trabajo=25; no sirve porque una variable se desfasa en segundos
let tiempo=0;
let currentState;
class Reloj extends React.Component{
  constructor(props){
    super(props);
    this.audioRef = React.createRef();
    this.tiempo = null;
    this.state = {
    clicked: false,
    break:5,
    session:25,
    wea:25,
    seconds:0,
    temporizador:false,
    name:'Session',
    //activo:true
    }
     this.handleClick = this.handleClick.bind(this);
     this.incrementBreak = this.incrementBreak.bind(this)
     this.decrementBreak = this.decrementBreak.bind(this)
    this.incrementSession = this.incrementSession.bind(this)
     this.decrementSession = this.decrementSession.bind(this)
    this.reset = this.reset.bind(this)
    this.startstop = this.startstop.bind(this)
  }
  
   incrementBreak() {
     //if(this.state.activo){
     if (this.state.break < 60){
    this.setState((state) =>({
       break: state.break+1 
    }));
   }else if(this.state.break > 60){
     ;
   }
  //}
  }
   decrementBreak() {
    // if(this.state.activo){
     if (this.state.break>1){
    this.setState((state) =>({
       break:state.break-1 
    }));
   }else if(this.state.break<1){
    ;
   }  
     //}
  }
   reset() {
    this.setState({
       break: 5,
       session:25,
       seconds:0,
      name:'Session',
      wea:25
    });
      clearInterval(this.tiempo);//detiene el tiempo
     this.audioRef.current.pause();
    this.audioRef.current.currentTime = 0;
     //trabajo=this.state.session;
     //this.state.wea=this.state.session;
     
  }
  incrementSession() {
    //if(this.state.activo){
    if(this.state.session<60){
    this.setState(state =>({
       session:state.session+1
    }));
  }else if(this.state.break > 60){
     ;
  }
  //}
  }
   decrementSession() {
    // if(this.state.activo){
     if(this.state.session>1){
    this.setState(state =>({
       session:state.session-1
    }));
   }else if(this.state.session<1){
    ;
  // }  
  }
   }
  startstop() {
    //this.state.wea=this.state.session;
  if(this.state.temporizador){
    
    this.pauseTimer(); //pausa
  } else {
    this.resumeTimer();//reanuda
  }
  this.setState({temporizador: !this.state.temporizador})
}

pauseTimer() {
  clearInterval(this.tiempo);
}

resumeTimer() {
//if(this.state.session>=0 || this.state.break>=0){
// Llamar método de inicio
    this.startTimer();
}

startTimer() {
  // Estado local
currentState = {
  seconds: this.state.seconds,
  wea: this.state.wea,
  session: this.state.session,
  name:this.state.name,
  break:this.state.break
}
   this.tiempo  = setInterval(() => {

    // Actualizar estado local
    currentState.seconds = currentState.seconds === 0 ? 59 : currentState.seconds - 1;

    if(currentState.seconds === 59) {

      currentState.wea = currentState.wea >= 0 ? currentState.wea - 1 : 0;
      if(currentState.name==='Session'){
      currentState.session = currentState.wea;
      }
    }

    // Validar y actualizar
    this.validateSessionChange();

    // Renderizar usando estado de React
  }, 1000);

}

validateSessionChange() {

  if(currentState.session === -1 && currentState.seconds === 59) {      
    // Reproducir audio
      this.audioRef.current.play();
      currentState.session = 1;
      currentState.wea = this.state.break;
      currentState.name='Break';
      currentState.seconds=0;
  //  if(currentState.session === 0 && currentState.seconds === 59) {
        // hacer cambio a break
    
//}
    
  }else if ( currentState.wea === -1 &&  currentState.seconds===59) {
            this.audioRef.current.play();
      currentState.break = 1;
      currentState.wea = this.state.session;
      currentState.name='Session';
      currentState.seconds=0;
        }

  // Actualizar estado de React
  this.setState(currentState);

}

  componentDidMount() {

    if(this.state.name=='Session'){
  if(this.state.temporizador ){  
  tiempo = setInterval(() => {
    this.setState((prevState) => ({ 
    seconds: prevState.seconds === 0 ? 59 : prevState.seconds - 1,
    session: state.seconds === 0 ? state.session-1 : state.session  
    }))  
  }, 1000);
 }
 }
  else if(this.state.name=="Break"){
     tiempo = setInterval(() => {
 this.setState((prevState) => ({
  seconds: prevState.seconds === 0 ? 59 : prevState.seconds - 1,
 break: state.seconds === 0 ? state.break-1 : state.break
  }))        
}, 1000);
 }  
}
componentWillUnmount() {
  if(this.state.temporizador){
  clearInterval(tiempo);
    }
}

  handleClick(){
    this.setState(prevState => ({
    clicked: true
    })
);   
  }
  render(){
    return(
    <>
        <div className="contenedor"><p>25 + 5 Clock</p>
   <div id="break-label">Break Length
     <div className="flechas">
     <div  id="break-decrement" onClick={this.decrementBreak}><i className="fa fa-arrow-down fa-sm"></i></div>
     <div id="break-length">{this.state.break}</div>
     <div  id="break-increment" onClick={this.incrementBreak}><i className="fa fa-arrow-up fa-sm"></i></div>
     </div>
     </div>  

<div  id="session-label">Session Length
  <div className="flechas">
  <div  id="session-decrement" onClick={this.decrementSession}><i className="fa fa-arrow-down fa-sm"></i></div>
  <div  id="session-length">{this.state.session}</div>
   <div id="session-increment" onClick={this.incrementSession}><i className="fa fa-arrow-up fa-sm"></i></div>
</div>          
</div>
 <div className="marco">
  <div  id="timer-label">{this.state.name}</div>
   <div id="time-left">
  {`${String(this.state.wea).padStart(2, '0')}:${String(this.state.seconds).padStart(2, '0')}`}
</div>
    </div>
     <audio src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" id="beep" ref={this.audioRef}></audio>
  <span id="start_stop" onClick={this.startstop}>
    <i className="fa fa-play fa-sm"></i>      
      <i className="fa fa-pause fa-sm"></i>
  </span>
  <span id="reset" onClick={this.reset}><i className="fa fa-refresh fa-sm"></i></span>
        </div>
        </>
    )
  }
}
ReactDOM.render(<Reloj />,document.getElementById('root'));