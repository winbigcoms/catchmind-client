import React,{ ChangeEvent }  from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {signUpAxios} from '../../src/axios'
import {RouteComponentProps} from 'react-router-dom'
import H from 'history';
import styled from 'styled-components';

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
  width:840px;
  margin:auto;
  display:flex;
  flex-direction:column;
  &>div{
    margin-bottom:20px;
  }
  &>div>select,&>div>input{
    margin-right:15px;
  }
  input{
    margin-bottom:30px;
  }
  img{
    width:500px
  }
  button{
    width:150px;
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
  const makeBase64 = (image:File):Promise<typeof image>=>new Promise((res,rej)=>{
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
  const singUpClick = ()=>{
    if(!inputs.name){
      alert("이름을 입력해")
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
    // console.log(base64);
  };

  return (
    <SignUpConatiner>
      <h2>회원가입</h2>
        <div>
          <select value={selecteds.team} id="team" onChange={changeSelectValue}>
            {teamsTitles.teams.map((item)=>(<option value={item} key={item}>{item}</option>))}
          </select>
          <select  value={selecteds.title} id="title" onChange={changeSelectValue}>
            {teamsTitles.titles.map((item)=>(<option value={item} key={item}>{item}</option>))}
          </select>
        </div>
        <div>
          <input type="text" value={inputs.name} onChange={changeValue} placeholder="이름을 입력하세용" id="name"/>
          <input type="number" value={inputs.age} onChange={changeValue} placeholder="(원하는)나이를입력하세요" id="age"/>
        </div>
        {preview&&<img src={preview}/>}
        <input type="file" accept="image/*" onChange={uploadImg}/>
        <button onClick={singUpClick} >회원가입!</button>
        {err&&{err}}
    </SignUpConatiner>
  )
}

export default SignUp;