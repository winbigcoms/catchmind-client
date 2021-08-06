import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

const openSocket =():Socket<DefaultEventsMap, DefaultEventsMap>=>{
  const url:string = process.env.REACT_APP_UURL || "";
  const socket = io(url);
  return socket;
} 
export default openSocket;