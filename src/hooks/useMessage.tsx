import { useCallback, useState } from 'react';

const useMessage = ():[string[],(data:string)=>void,()=>void]=>{
  const [messages,setMessage]= useState<string[]>([]);
  const receiveMsg = useCallback((data:string)=>{
    setMessage(msg=>([...msg,data]))
  },[])
  const cutMsg = useCallback(()=>{
    setMessage(msgs=>(msgs.splice(1)));
  },[])
  
  const cutMsgInterval = useCallback(()=>{
    const interval = setInterval(()=>{
      if(messages.length===0){
        clearInterval(interval)
      }
      cutMsg();
    },3000)
  },[])


  return [messages,receiveMsg,cutMsgInterval]
};
export default useMessage;