import { applyMiddleware, createStore, Store } from "redux";
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducer, { sagas } from "./reducer";

const sagaMiddleWare = createSagaMiddleware();
const store =():Store=>{ 
  
  const store = createStore(
    reducer(),
    {},
    composeWithDevTools((applyMiddleware(sagaMiddleWare))),
  );
  sagaMiddleWare.run(sagas)
  return store;
}

export default store