import { useState } from 'react'
import './Estilo.css'

class Reloj extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
     this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    
  }
  
  render(){
    return(
    <>
        <div className="contenedor"><span >25 + 5 Clock</span>
   <div id="break-label">Break Length
     <div className="flechas">
     <div  id="break-decrement"><i class="fa fa-arrow-down fa-sm"></i></div>
     <div id="break-length">c</div>
     <div  id="break-increment"><i class="fa fa-arrow-up fa-sm"></i></div>
     </div>
     </div>  

<div  id="session-label">Session Length
  <div className="flechas">
  <div  id="session-decrement"><i class="fa fa-arrow-down fa-sm"></i></div>
  <div  id="session-length">c</div>
   <div id="session-increment"><i class="fa fa-arrow-up fa-sm"></i>  </div>
</div>          
</div>
 <div className="marco">
  <div  id="timer-label">Session</div>
 MM:SS   
</div>
  <div id="time-left">
  <div id="start_stop">
    <i class="fa fa-play fa-2x"></i>      
      <i class="fa fa-pause fa-2x"></i>
  </div>
  <div id="reset"><i class="fa fa-refresh fa-2x"></i></div>
    </div>
        </div>
        </>
    
    )
  }
  
}

ReactDOM.render(<Reloj />,document.getElementById('root'));