import React from 'react';
import Correct from "./correct"
import ReactDOM from 'react-dom';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Modal= ({name}:{name:string})=>{
  return ReactDOM.createPortal(<Correct name={name} />,document.getElementById('modal') as HTMLElement)
}

export default Modal;