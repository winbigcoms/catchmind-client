import React,{ ChangeEvent }  from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {signUpAxios} from '../../src/axios'
import {RouteComponentProps} from 'react-router-dom'
import H from 'history';
import styled from 'styled-components';
import Snows from '../components/snow';

interface SignUp{
  history:H.History
}

interface teamsTitles{
  teams:[string],
  titles:[string]
} 
interface inputs{
  name:string,
  age:number
}
interface selecteds{
  team:string,
  title:string
}
const SignUpConatiner = styled.div`
  box-sizing:border-box;
  width:500px;
  margin:auto;
  display:flex;
  position:relative;
  z-index:2;
  flex-direction:column;
  padding:30px 15px 15px;
  background-color:#fff;
  h2{
    text-align:center;
    margin-bottom:3rem;
  }
  &>div{
    margin-bottom:20px;
    span{
      margin-right:15px;
    }
  }
  &>div>select,&>div>input{
    margin-right:15px;
    width:150px;
  }
  &>input{
    margin-bottom:15px
  }
  img{
    width:500px
  }
`
const ButtonBox = styled.div`
  display:flex;
  justify-content:space-between;
  button{
    cursor:pointer;
    width:150px;
    height:50px;
    background-color:skyblue;
    color:#fff;
    border:none;
    border-radius:5px;
    margin-top:15px;
  }
`
const SignUp :React.FC<RouteComponentProps> = ({history}:SignUp) =>{
  
  const [teamsTitles,setTeamsTItles] = useState<teamsTitles>({teams:[""],titles:[""]});
  const [inputs,setInputs] = useState<inputs>({name:"",age:20});
  const [selecteds,setselecteds] = useState<selecteds>({team:"서비스팀",title:"사원"});
  const [img,setImage]= useState<File>();
  const [preview,setPreview] = useState("");
  const [err,setErr] = useState("");
  useEffect(()=>{
    (async ()=>{
      signUpAxios.get().then(res=>{
        setTeamsTItles(() => {
          return{
            teams:res.data.teams,
            titles:res.data.titles
          }
        })
      }).catch(e=>{
        console.log(e);
      })
    })();
  },[]);
  const makeBase64 = (image:File):Promise<typeof image>=>new Promise(()=>{
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = function(event){
      const target = event.target as FileReader;
      setPreview(()=>target.result as string)
      return target.result
    }; // data url!
  })
  const changeValue =( e:ChangeEvent<HTMLInputElement>):void=>{
    const id = e.target.id;
    const value = e.target.value;
    setInputs(state=>({...state,[id]:value}))
  }
  const changeSelectValue =( e:ChangeEvent<HTMLSelectElement>):void=>{
    const id = e.target.id;
    const value = e.target.value;
    setselecteds(state=>({...state,[id]:value}))
  }
  const goLoginPage = ()=>{
    history.push("/")
  }
  const singUpClick = ()=>{
    if(!inputs.name){
      alert("이름을 입력해주세요")
      return
    }
    if(!inputs.age){
      alert("나이를 선택해주세요");
      return
    }
    if(!img){
      alert("프로필 사진을 넣어줘요");
      return
    }
    const sendData = new FormData();
    sendData.append('name',inputs.name);
    sendData.append('age',inputs.age+"");
    sendData.append('title',selecteds.title);
    sendData.append('team',selecteds.team);
    sendData.append('image',img);
    (async ()=>{
      signUpAxios.post(sendData)
      .then(res=>{
        console.log(res);
        history.push("/")
      })
      .catch(err=>{
        console.log(err);
        setErr(()=>"에러발생");
      })
    })();
  }
  const uploadImg = (e:ChangeEvent<HTMLInputElement>)=>{
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    setImage(()=>files[0]);
    makeBase64(files[0]).then(res=>console.log(res));
  };

  return (
  <div style={{height:"100vh",background:"black",paddingTop:"100px"}}>
    <SignUpConatiner>
      <h2>회원가입</h2>
      <div>
        <span>팀명:</span>
        <select value={selecteds.team} id="team" onChange={changeSelectValue}>
          {teamsTitles.teams.map((item)=>(<option value={item} key={item}>{item}</option>))}
        </select>
      </div>
      <div>
        <span>직책:</span>
        <select value={selecteds.title} id="title" onChange={changeSelectValue}>
          {teamsTitles.titles.map((item)=>(<option value={item} key={item}>{item}</option>))}
        </select>
      </div>
      <div>
        <span>이름:</span>
        <input type="text" value={inputs.name} onChange={changeValue} placeholder="이름을 입력하세용" id="name"/>
      </div>
      <div>
        <span>나이:</span>
        <input type="number" value={inputs.age} onChange={changeValue} id="age"/>
      </div>
      <input type="file" accept="image/*" onChange={uploadImg}/>
      {preview&&<img src={preview}/>}
      <ButtonBox>
        <button onClick={singUpClick} >회원가입!</button>
        <button onClick={goLoginPage} >뒤로 가기</button>
      </ButtonBox>
      {err&&{err}}
    </SignUpConatiner>
    <Snows color="pink"/>
  </div>
  )
}

export default SignUp;