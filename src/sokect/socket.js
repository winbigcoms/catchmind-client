import { io } from "socket.io-client";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const openSocket =()=>{
  const socket = io("http://localhost:8000");
  return socket;
} 
export default openSocket;