import { useState } from 'react'
import './Estilo.css'
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
       
     if(this.state.temporizador){//si es verdadero pasa a falso
     this.setState({ temporizador:false});
       clearInterval(tiempo);
       }
    else {
       this.setState({temporizador:true}); //si es falso pasa a verdadero
        if(this.state.seconds==0){
       this.setState((state) => ({
        seconds: 59,
        session: state.session-1
      }));
      tiempo = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds === 0 ? 59 : prevState.seconds - 1,
        //session: prevState.seconds === 0 ? prevState.session - 1 : prevState.session
      }));
    }, 1000);
  }
      }
}
      
  componentDidMount() {
  if(this.state.temporizador ){  
  tiempo = setInterval(() => {
    this.setState((prevState) => ({ 
    seconds: prevState.seconds === 0 ? 59 : prevState.seconds - 1,
    //session: prevState.seconds === 0 ? prevState.session - 1 : prevState.session  
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
   <div id="time-left"> {this.state.session}:{this.state.seconds}</div> 
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