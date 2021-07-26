import axios from 'axios';
const url = "http://localhost:8000";
interface teamsTites{
  data:{
    teams:[string],
    titles:[string]
  }
}
interface loginParams{
  name:string
}
const defaultAxios = axios.create({
  baseURL:url,
  timeout:10000
})
const signupAxios = axios.create({
  baseURL:url+"/signUp",
  timeout:10000,
  headers:{"Content-type":"multipart/formdata"}
})

export class signUpAxios{
  static async get():Promise<teamsTites>{
    return defaultAxios.get(url+"/signUp");
  }
  static async post(params:FormData):Promise<teamsTites>{
    const result = await signupAxios.post("/",params);
    return result
  }
}

export class LoginAxios{
  static post(params:loginParams):Promise<loginParams>{
    return defaultAxios.post("/login",params)
    .then(res=>{
      return res
    })
    .catch(err=>{
      return err
    });
  }
}