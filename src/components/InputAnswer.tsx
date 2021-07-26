import React, { KeyboardEvent } from 'react';
import styled from 'styled-components';


const InputBox = styled.div`
  width:50%;
  margin:auto;
  display:flex;
  justify-content:center;
  padding-top:20px;
`

const Input = styled.input`
  width:300px;
  margin-left:15px;
`

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const InputAnswer  = ({sendAnswer}:{sendAnswer: (e:KeyboardEvent<HTMLInputElement>)=>void})=>{
  return (
  <InputBox>
    정답: 
    <Input type="text" onKeyPress={e=>sendAnswer(e)}/>
  </InputBox>
  )
}
export default InputAnswer