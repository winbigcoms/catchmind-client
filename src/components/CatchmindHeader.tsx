import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const Header = styled.header`
  padding: 25px;
  border-bottom:1px solid #ccc;
  margin-bottom:30px;
  display:flex;
  justify-content:space-between;
  h2{
    margin:0;
    font-size:1rem
  }
`

const CatchmindHeader = ()=>{
  const history = useHistory();
  return (
    <Header>
      <h2>캐치마인드</h2>
      <button onClick={()=>history.push('/')}>나가기</button>
    </Header>
  )
}

export default React.memo(CatchmindHeader);