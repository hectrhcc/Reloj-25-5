import { useState } from 'react'
import './Estilo.css'
/*(template literals) de ES6 en combinación con el método padStart() para formatear los valores de this.state.session y this.state.seconds.
El método padStart() se aplica a las cadenas de texto convertidas usando String() para asegurar que tengan una longitud mínima de 2 caracteres, añadiendo ceros a la izquierda */
let tiempo=0;
class Reloj extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    clicked: false,
    break:5,
    session:25,
    seconds:0,
    temporizador:false,
    name:'Session'
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
     if (this.state.break < 60){
    this.setState(state =>({
       break: state.break+1 
    }));
   }
  }
   decrementBreak() {
     if (this.state.break>1){
    this.setState(state =>({
       break:state.break-1 
    }));
   }
  }
   reset() {
    this.setState({
       break: 5,
       session:25,
       seconds:0,
      name:'Session'
    });
      clearInterval(tiempo);//detiene el tiempo
  }
  incrementSession() {
    if(this.state.session<60){
    this.setState(state =>({
       session:state.session+1
    }));
  }
  }
   decrementSession() {
     if(this.state.session>1){
    this.setState(state =>({
       session:state.session-1
    }));
   }else if(this.state.session<0){
    ;
   }  
  }
  startstop() {
  if(this.state.temporizador){
    this.pauseTimer(); //pausa
  } else {
    this.resumeTimer();//reanuda
  }

  this.setState(prev => ({
    temporizador: !prev.temporizador
  }));
}

pauseTimer() {
  clearInterval(tiempo);
}

resumeTimer() {
  if(this.state.seconds === 0) {
    this.resetCount();
  }
if(this.state.session>=0){
// Llamar método de inicio
    this.startTimer();
}
}

startTimer() {

  tiempo = setInterval(() => {

    // Lógica de decremento

    if(this.state.session=== 0 && this.state.seconds===0) {
      clearInterval(tiempo);
    } else{
       this.setState(prevState => ({
      seconds: prevState.seconds === 0 ? 59 : prevState.seconds - 1,
      session: prevState.seconds === 0 ? prevState.session - 1 : prevState.session
    }));
    }

  }, 1000);

}  

resetCount() {
  if(this.state.session>=0){
  this.setState({
    seconds: 59,
    session: this.state.seconds === 0 ? this.state.session - 1 : this.state.session
  });  
}    
}
  componentDidMount() {
  if(this.state.temporizador ){  
  tiempo = setInterval(() => {
    this.setState((prevState) => ({ 
    seconds: prevState.seconds === 0 ? 59 : prevState.seconds - 1,
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
     <div  id="break-decrement" onClick={this.decrementBreak}><i class="fa fa-arrow-down fa-sm"></i></div>
     <div id="break-length">{this.state.break}</div>
     <div  id="break-increment" onClick={this.incrementBreak}><i class="fa fa-arrow-up fa-sm"></i></div>
     </div>
     </div>  

<div  id="session-label">Session Length
  <div className="flechas">
  <div  id="session-decrement" onClick={this.decrementSession}><i class="fa fa-arrow-down fa-sm"></i></div>
  <div  id="session-length">{this.state.session}</div>
   <div id="session-increment" onClick={this.incrementSession}><i class="fa fa-arrow-up fa-sm"></i></div>
</div>          
</div>
 <div className="marco">
  <div  id="timer-label">{this.state.name}</div>
   <div id="time-left">
  {`${String(this.state.session).padStart(2, '0')}:${String(this.state.seconds).padStart(2, '0')}`}
</div>
    </div>
   
  <span id="start_stop" onClick={this.startstop}>
    <i class="fa fa-play fa-sm"></i>      
      <i class="fa fa-pause fa-sm"></i>
  </span>
  <span id="reset" onClick={this.reset}><i class="fa fa-refresh fa-sm"></i></span>
        </div>
        </>
    )
  }
}

ReactDOM.render(<Reloj />,document.getElementById('root'));