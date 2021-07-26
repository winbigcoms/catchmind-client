import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import { loginReducer, loginType } from "./Login/actions";
import loginSaga from "./Login/saga";

export interface StoreState {
  loginState: loginType
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* sagas(){
  yield all([
    loginSaga()
  ])
} 
const reducer = ()=>{
  return combineReducers<StoreState>({
    loginState:loginReducer
  })
};

export default reducer;