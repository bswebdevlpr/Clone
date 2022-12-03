/*
    각기 다른 State에 의해 나눠진 reducer를 combine 하여 Root Reducer 하나로 처리할 수 있도록 함
*/
import { combineReducers } from "redux";
import user from './user_reducer';


const rootReducer = combineReducers({
    user
});

export default rootReducer;