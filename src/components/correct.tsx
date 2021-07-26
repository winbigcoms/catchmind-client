import React from 'react';
import styled from "styled-components"
import "../scss/fireWork.scss";

const ModalConatiner = styled.div`
  position:absolute;
  top:0;
  left:0;
  height:100vh;
  width:100%;
  background-color:rgba(0,0,0,0.6);
`
const ModalBox = styled.div`
  position:absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
  width:500px;
  height:500px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  p{
    color:#fff;
    text-align:center;
  }
  img{
    width:100%;
  }
`
const Correct = ({click,name}:{click:()=>void,name:string})=>{
  return (
    <ModalConatiner className="pyro">
      <div className="before"></div>
      <div className="after"></div>
      <ModalBox>
        <p>
          {name}<br/>
          골---든 
          정답입니다!
        </p>
        <img src="./img/12.png" alt="" />
        <button onClick={click}>닫기</button>
      </ModalBox>
    </ModalConatiner>
  )
}

export default Correct;