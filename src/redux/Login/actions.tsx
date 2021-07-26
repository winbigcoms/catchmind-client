import { AxiosError, AxiosResponse } from "axios"
import { History } from "history"
import { ActionType, createAsyncAction, createReducer } from "typesafe-actions"


export interface loginType{
  pid:number,
  name:string,
  age:number,
  image:string,
  title:string,
  team:string,
  err:string
}
const initState:loginType = {
  pid:0,
  name:"",
  age:0,
  image:"",
  title:"",
  team:"",
  err:""
}
interface loginInput {
  name:string,
  history:History
}
const prefix = "login/"
const START_SET_LOGIN = `${prefix}startSetLogin` as const
const SUCCESS_SET_LOGIN = `${prefix}successSetLogin` as const
const FAIL_SET_LOGIN = `${prefix}failSetLogin` as const

export const loginAsyc = createAsyncAction(START_SET_LOGIN,SUCCESS_SET_LOGIN,FAIL_SET_LOGIN)<loginInput,AxiosResponse<loginType>,AxiosError>();

export type LoginActions = ActionType<typeof loginAsyc>

export const loginReducer = createReducer<loginType,LoginActions>(initState)
  .handleAction(loginAsyc.request,()=>(
    initState
  ))
  .handleAction(loginAsyc.success,(state,action)=>(
    {
      pid:action.payload.data.pid,
      age:action.payload.data.age,
      name:action.payload.data.name,
      image:action.payload.data.image,
      title:action.payload.data.title,
      team:action.payload.data.team,
      err:""
    }
  ))
  .handleAction(loginAsyc.failure,(state,action)=>(
    {
      ...initState,
      err:action.payload.message
    }
  ))

  