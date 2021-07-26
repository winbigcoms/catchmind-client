import { ActionType } from "typesafe-actions";
import { loginAsyc } from "./actions";
import {call, put, takeEvery} from 'redux-saga/effects'
import { LoginAxios } from "../../axios";
import { AxiosResponse } from "axios";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* loginStartSaga(action:ActionType<typeof loginAsyc.request>){
  const {name,history} = action.payload;
  try{
    const loginRes:AxiosResponse =  yield call(LoginAxios.post,{name});
    yield put(loginAsyc.success(loginRes));
    yield history.push('/game')
  }catch(e){
    yield put(loginAsyc.failure(e))
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* loginSaga(){
  yield takeEvery(loginAsyc.request,loginStartSaga)
}