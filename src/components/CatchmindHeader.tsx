import React from "react";
import styled from "styled-components";

const Header = styled.header`
  // height:50px;
  padding: 25px;
  border-bottom:1px solid #ccc;
  margin-bottom:30px
`

const CatchmindHeader = ()=>{
  return <Header>캐치마인드</Header>
}

export default React.memo(CatchmindHeader);