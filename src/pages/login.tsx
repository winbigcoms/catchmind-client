import React, { ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginAsyc } from '../redux/Login/actions';
import Snows from '../components/snow';


interface color{
  bg:string;
  fl:string
}

const LoginBox = styled.div`
  position:absolute;
  top:10%;
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
    input{
      margin-left:15px;
      height: 25px
    }
  }
  div{
    display:flex;
    justify-content:space-between;
    margin:100px auto 0;
    width:300px;
    button{
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

const SetThemeBtn = styled.button`
  position:absolute;
  bottom:20px;
  left:20px;
  background-color:#fff;
  color:#000;
  width:50px;
  height:50px;
  border:0;
  cursor:pointer;
  transition:all 0.3s;
  &:hover{
    background-color:rgba(255,255,255,0.5);
  }
`
const BoxShow = keyframes`
  0%{
    opacity:0;
  } 
  100%{
    opacity:1;
  }
`
const ThemeBox = styled.div`
  position:absolute;
  bottom:80px;
  left:20px;
  border:1px solid pink;
  background-color:#fff;
  padding:15px 10px;
  opacity:0;
  box-sizing:border-box;
  width:150px;
  animation: ${BoxShow} 1s 1 both;
  &>div{
    display:flex;
    flex-wrap:wrap;
    p{
      margin:0;
      width:100%;
    }
  }

`
const ExampleBox = styled.div<color>`
  position:relative;
  width:50px;
  height:50px;
  background:${props=>props.bg};
  margin:5px;
  span{
    position:absolute;
    width:50px;
    height:50px;
    text-align:center;
    padding-top:17px;
    display:inline-block;
    font-size:16px;
    color:${props=>props.fl};
    cursor:pointer;
    user-select:none;
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
  },
  {
    bg:"linear-gradient(pink, 60%, #fff)",
    fl:"yellow"
  }
];  
const LoginPage:React.FC = ()=>{
  const history = useHistory();
  const dispatch = useDispatch();
  const [id,setId]=useState("");
  const [bgTheme,setBgTheme] = useState({
    bg:"black",
    fl:"#fff"
  });
  const [showThemeBox,setShowThemeBoxState] = useState(false);
  const changeTheme = (idx:number)=>{
    setBgTheme(()=>theme[idx])
  }
  const changeShowThemeBox = ()=>{
    setShowThemeBoxState(state=>!state);
  }
  const changeIdInput = (e:ChangeEvent<HTMLInputElement>):void=>{
    setId(()=>e.target.value);
  };
  const loginClick = ()=>{
    if(!id) return;
    dispatch(loginAsyc.request({name:id,history}));
  };
  const goSignIn = ()=>{
    history.push("/signUp")
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
        <h3>캐치마인드(ver0.1)</h3>
        <label>
          로그인
          <input type="text" value={id} onChange={changeIdInput} placeholder="아이디는 이름입니다~"/>
        </label>
        <div>
          <button onClick={loginClick}>로그인버튼</button>
          <button onClick={goSignIn}>회원가입</button>
        </div>
      </LoginBox>
      {showThemeBox&&<ThemeBox>
        <div>
          {theme.map((colors,idx)=>(
            <ExampleBox key={idx} bg={colors.bg} fl = {colors.fl}>
              <span onClick={()=>changeTheme(idx)}>*</span>
            </ExampleBox>)
          )}
        </div>
        </ThemeBox>}
      <SetThemeBtn onClick={changeShowThemeBox}>테마 변경</SetThemeBtn>
      <Snows color={bgTheme.fl}/>
    </div>
  )
};
export default LoginPage