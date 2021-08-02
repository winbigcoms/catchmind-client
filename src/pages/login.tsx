import React, { ChangeEvent } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginAsyc } from '../redux/Login/actions';
import Snows from '../components/snow';

const LoginBox = styled.div`
  position:absolute;
  top:20%;
  left:50%;
  z-index:3;
  transform:translate(-50%,20%);
  display:flex;
  border:1px solid blue;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  width:400px;
  height:500px;
  background-color:#fff;
  label{
    margin-top:50px;
  }
  div{
    display:flex;
    justify-content:space-between;
    margin:100px auto 0;
    width:300px;
    button{s
      width:120px;
      height:60px;
      cursor:pointer;
      background-color:#fff;
      a {
        color: #000; 
        text-decoration: none; 
        outline: none
      }
      a:hover, a:active {
        text-decoration: none; 
        color:#000; 
      }
    }
  }
` 
const theme = [
  {
    bg:"linear-gradient(#010181, 10%, #8695bf)",
    fl:"pink"
  },
  {
    bg:"black",
    fl:"#fff"
  },
  {
    bg:"linear-gradient(#b8b8e8, 80%, #577de8)",
    fl:"#fff"
  },
  {
    bg:"linear-gradient(#181819, 60%, #577de8)",
    fl:"#fff"
  }
]
const LoginPage:React.FC = ()=>{
  const history = useHistory();
  const dispatch = useDispatch();
  const [id,setId]=useState("");
  const [bgTheme,setBgTheme] = useState({
    bg:"black",
    fl:"#fff"
  });
  const changeTheme = (idx:number)=>{
    setBgTheme(()=>theme[idx])
  }
  const changeIdInput = (e:ChangeEvent<HTMLInputElement>):void=>{
    setId(()=>e.target.value);
  };
  const loginClick = ()=>{
    if(!id) return;
    dispatch(loginAsyc.request({name:id,history}));
  }
  return (
    <div style={{
      position:"relative",
      overflow:"hidden",
      height:"100vh",
      background:`${bgTheme.bg}`
    }}>
      <h2 style={{marginLeft:"15px",color:"#fff"}}><span>캐치</span>마인드</h2>
      <LoginBox>
        <h3>아이엠폼 캐치마인드(ver0.1)</h3>
        <label>
          로그인
          <input type="text" value={id} onChange={changeIdInput} placeholder="아이디는 이름입니다~"/>
        </label>
        <div>
          <button onClick={loginClick}>로그인버튼</button>
          <button>
            <Link to="/signUp">회원가입</Link>
          </button>
        </div>
      </LoginBox>
      <Snows color={bgTheme.fl}/>
    </div>
  )
};
export default LoginPage