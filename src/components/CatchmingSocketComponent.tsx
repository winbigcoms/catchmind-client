import React,{ ReactChild, useEffect } from "react";
import openSocket from "../sokect/socket";
import CatchmindGameComponent from "./CatchmindGameComponent";
import CatchmindHeader from "./CatchmindHeader";


const CatchmingSocketComponent:React.FC = ()=>{
  const socket = openSocket();
  useEffect(()=>{
    return ()=>{
      socket.disconnect();
    }
  })
  return (
    <div>
      <CatchmindHeader/>
      <CatchmindGameComponent socket={socket}/>
    </div>
  )
}

export default CatchmingSocketComponent