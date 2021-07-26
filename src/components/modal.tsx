import React from 'react';
import Correct from "./correct"
import ReactDOM from 'react-dom';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Modal= ({click,name}:{click:()=>void,name:string})=>{
  return ReactDOM.createPortal(<Correct name={name} click={click}/>,document.getElementById('modal') as HTMLElement)
}

export default Modal;