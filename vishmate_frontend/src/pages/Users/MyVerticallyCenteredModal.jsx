import { Button, Modal } from "react-bootstrap";
import Tick from './tick.gif';
import "@fontsource/lora";
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{borderRadius:'20px'}}
    >  
    
      <Modal.Header style={{background: 'linear-gradient(180deg, #0F0C29 0%, #302B63 48.5%, #24243E 100%)', color:'white'}} closeButton>
       
        <Modal.Title id="contained-modal-title-vcenter" style={{width:"100%"}}>     
        
          <div className="d-flex justify-content-center" style={{fontFamily:"Lora"}}>
          Successfull  
          </div>
         
         
        </Modal.Title>
       
       
      </Modal.Header>
      
      <Modal.Body>
       <center>
        <img src={Tick} style={{width:'40%',height:'40%' }} />
        <h4 style={{fontFamily:"Lora"}}>{props.title}</h4>
       </center> 
        
      </Modal.Body>
    
    </Modal>
  );
}
export default MyVerticallyCenteredModal;