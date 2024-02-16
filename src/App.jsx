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
    name:'Session'
    name:'Session',
    //activo:true
    }
     this.handleClick = this.handleClick.bind(this);
     this.incrementBreak = this.incrementBreak.bind(this)
@@ -23,136 +28,152 @@ class Reloj extends React.Component{
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
   }else if(this.state.session<=0){
   }else if(this.state.break<1){
    ;
     }
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
      clearInterval(tiempo);//detiene el tiempo
      clearInterval(this.tiempo);//detiene el tiempo
     this.audioRef.current.pause();
    this.audioRef.current.currentTime = 0;
     //trabajo=this.state.session;
     //this.state.wea=this.state.session;

  }
  incrementSession() {
    //if(this.state.activo){
    if(this.state.session<60){
    this.setState((state) =>({
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
    this.setState((state) =>({
    this.setState(state =>({
       session:state.session-1
    }));
   }else if(this.state.session<=0){
   }else if(this.state.session<1){
    ;
   }  
  // }  
  }
   }
  startstop() {
    this.state.activo=false;
    //this.state.wea=this.state.session;
  if(this.state.temporizador){

    this.pauseTimer(); //pausa
  } else {
    this.resumeTimer();//reanuda
  }

  this.setState(prev => ({
    temporizador: !prev.temporizador
  }));
  this.setState({temporizador: !this.state.temporizador})
}

pauseTimer() {
   this.state.activo=true;
  clearInterval(tiempo);
  clearInterval(this.tiempo);
}

resumeTimer() {
  if(this.state.seconds === 0) {
    this.resetCount();
  }
if(this.state.session>=0){
//if(this.state.session>=0 || this.state.break>=0){
// Llamar método de inicio
    this.startTimer();
}
}

startTimer() {
  tiempo = setInterval(() => {
    if(this.state.session===0 && this.state.seconds===0) {
       this.audioRef.current.play();
      this.setState((state) =>({
       name:'Break' ,
        seconds: state.seconds === 0 ? 0 : state.seconds - 1,
        session: state.break // 00:00 - (05:00) - 04:59
    }));
    } else{
       this.setState(prevState => ({
      seconds: prevState.seconds === 0 ? 59 : prevState.seconds - 1,
      session: prevState.seconds === 0 ? prevState.session - 1 : prevState.session
    }));
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

resetCount() {
   if (this.state.name === 'Session') {
    if (this.state.session >= 0) {
      this.setState({
        seconds: 59,
        session: this.state.session - 1,
      });
    }
    if (this.state.session === 0) {
      this.setState({
        name: 'Break',
        seconds: 0,
      });
    }
  } else if (this.state.name === 'Break') {
    if (this.state.seconds === 59) {
      this.setState({
        break: this.state.break - 1,
      });
    }
    this.setState({
      seconds: this.state.seconds === 0 ? 59 : this.state.seconds - 1,
    });
    if (this.state.seconds === 0) {
      this.setState({
        break: this.state.break - 1,
      });
    }
  }
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
@@ -161,7 +182,7 @@ resetCount() {
     tiempo = setInterval(() => {
 this.setState((prevState) => ({
  seconds: prevState.seconds === 0 ? 59 : prevState.seconds - 1,
 session: prevState.seconds === 0 ? prevState.break-1 : prevState.break
 break: state.seconds === 0 ? state.break-1 : state.break
  }))        
}, 1000);
 }  
@@ -184,31 +205,31 @@ componentWillUnmount() {
        <div className="contenedor"><p>25 + 5 Clock</p>
   <div id="break-label">Break Length
     <div className="flechas">
     <div  id="break-decrement" onClick={this.decrementBreak}><i class="fa fa-arrow-down fa-sm"></i></div>
     <div  id="break-decrement" onClick={this.decrementBreak}><i className="fa fa-arrow-down fa-sm"></i></div>
     <div id="break-length">{this.state.break}</div>
     <div  id="break-increment" onClick={this.incrementBreak}><i class="fa fa-arrow-up fa-sm"></i></div>
     <div  id="break-increment" onClick={this.incrementBreak}><i className="fa fa-arrow-up fa-sm"></i></div>
     </div>
     </div>  

<div  id="session-label">Session Length
  <div className="flechas">
  <div  id="session-decrement" onClick={this.decrementSession}><i class="fa fa-arrow-down fa-sm"></i></div>
  <div  id="session-decrement" onClick={this.decrementSession}><i className="fa fa-arrow-down fa-sm"></i></div>
  <div  id="session-length">{this.state.session}</div>
   <div id="session-increment" onClick={this.incrementSession}><i class="fa fa-arrow-up fa-sm"></i></div>
   <div id="session-increment" onClick={this.incrementSession}><i className="fa fa-arrow-up fa-sm"></i></div>
</div>          
</div>
 <div className="marco">
  <div  id="timer-label">{this.state.name}</div>
   <div id="time-left">
  {`${String(this.state.session).padStart(2, '0')}:${String(this.state.seconds).padStart(2, '0')}`}
  {`${String(this.state.wea).padStart(2, '0')}:${String(this.state.seconds).padStart(2, '0')}`}
</div>
    </div>
     <audio src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" id="beep" ref={this.audioRef}></audio>
  <span id="start_stop" onClick={this.startstop}>
    <i class="fa fa-play fa-sm"></i>      
      <i class="fa fa-pause fa-sm"></i>
    <i className="fa fa-play fa-sm"></i>      
      <i className="fa fa-pause fa-sm"></i>
  </span>
  <span id="reset" onClick={this.reset}><i class="fa fa-refresh fa-sm"></i></span>
  <span id="reset" onClick={this.reset}><i className="fa fa-refresh fa-sm"></i></span>
        </div>
        </>
    )
