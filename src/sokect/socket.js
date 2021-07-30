import { io } from "socket.io-client";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const openSocket =()=>{
  const socket = io(process.env.REACT_APP_URL);
  return socket;
} 
export default openSocket;