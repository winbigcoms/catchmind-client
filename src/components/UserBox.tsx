import React, { FC, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import styled from 'styled-components';
import useMessage from '../hooks/useMessage';
import { loginType } from '../redux/Login/actions';

const UserSit = styled.div`
  border:1px solid #aaa;
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:space-between;
  height:200px;
  img{
    height:165px;
  }
  p{
    height:30px;
    margin:0;
    display:flex;
    justify-content: center;
    align-items:center;
    border:1px;
  }
  &:not(:last-child){
    margin-bottom:50px
  } 
`
const MessageBox = styled.div<{position:string}>`
  position:absolute;
  ${props=>props.position==="left"?"right: -110px;":"left: -110px;"}
  top:25px;
  border:1px solid #ccc;
  width:100px;
  height:100px;
`
type user = {
  user : loginType,
  socket:Socket<DefaultEventsMap, DefaultEventsMap>,
  position:string
};

const UserBox:FC<user> = ({user,position,socket}:user)=>{
  const [messages,receiveMsg,cutMsgInterval]= useMessage()
  useEffect(()=>{
    socket.on('chatting',data=>{
      if(data.user!==(user&&user.pid))return;
      receiveMsg(data.value);
      cutMsgInterval();
    });
  },[user.pid]);

  return (
    <UserSit>
      <img src={user?"data:image/jpeg;base64,"+user.image:""} alt="" />
      <p>{user?user.team+" "+ user.name +" " +user.title:"빈 자리"}</p>
      {(messages[0]&&user.name)&&(
        <MessageBox position={position}>
          {messages.map((msg,key)=>(<p key={key}>{msg}</p>))}
        </MessageBox>
      )}
    </UserSit>
  )
}

export default React.memo(UserBox)