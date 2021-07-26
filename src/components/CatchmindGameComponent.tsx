import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import styled from 'styled-components';
import { StoreState } from '../redux/reducer';
import CanvasLayer from './canvas';
import InputAnswer from './InputAnswer';
import Modal from './modal';
import UserBox from './UserBox';

interface user {
  age:number,
  err:string,
  image:string,
  name:string,
  pid:number,
  team:string,
  title:string
}
const initUser = {
  age:0,
  err:"",
  image:"",
  name:"",
  pid:0,
  team:"",
  title:"",
}
const GameContainer = styled.div`
  display:flex;
  justify-content:space-between;
  min-width:1440px;
  width:1440px;
  margin:auto;
`
const UserRow = styled.div`
  width:200px;
`
interface props {
  socket:Socket<DefaultEventsMap, DefaultEventsMap>
}
const CatchmindGameComponent = ({socket}:props)=>{
  const user = useSelector((state:StoreState)=>state.loginState);
  const [users,setUsers] = useState<user[]>([]);
  const [goldenCorrect,setGoldenCorrect] = useState({state:false,name:""});
  const sendAnswer = useCallback((e:KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==='Enter'){
      const value = (e.target as HTMLInputElement).value;
      socket.emit('chatting',{value,user:user.pid});
      (e.target as HTMLInputElement).value ="";
    }
  },[])
  const onCorrect = useCallback((data)=>{
    setGoldenCorrect(()=>({state:true,name:data}));
  },[]);

  const closeCorrect = useCallback(()=>{
    setGoldenCorrect(()=>({state:false,name:""}));
  },[]);

  useEffect(()=>{
    socket.emit('users',user);
    socket.on('recivedUsers',data=>{
      setUsers(()=>data);
    });
    socket.on('goldenCorrect',(data)=>{
      console.log(data);
      onCorrect(data);
      const timeOut = setTimeout(()=>{
        closeCorrect();
        clearTimeout(timeOut);
      },4000)
    });

  },[]);
  return (
    <>
      <GameContainer>
        <UserRow>
          <UserBox user={users[0]?users[0]:initUser} socket={socket} position={"left"}/>
          <UserBox user={users[1]?users[1]:initUser} socket={socket} position={"left"}/>
          <UserBox user={users[2]?users[2]:initUser} socket={socket} position={"left"}/>
        </UserRow>
        <CanvasLayer socket={socket} width={700} height={700}/>
        <UserRow>
          <UserBox user={users[3]?users[3]:initUser} socket={socket} position={"right"}/>
          <UserBox user={users[4]?users[4]:initUser} socket={socket} position={"right"}/>
          <UserBox user={users[5]?users[5]:initUser} socket={socket} position={"right"}/>
        </UserRow>
      </GameContainer>
      <InputAnswer sendAnswer={sendAnswer} />
      {goldenCorrect.state&& <Modal click={closeCorrect} name={goldenCorrect.name}/>}
    </>
  )
}
export default React.memo(CatchmindGameComponent);