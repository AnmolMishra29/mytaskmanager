import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  taskCreateReducer,
  taskDeleteReducer,
  taskListReducer,
  taskUpdateReducer,
  taskExploreReducer,
} from "./reducers/taskReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
  taskList: taskListReducer,
  taskExplore: taskExploreReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  taskCreate: taskCreateReducer,
  taskDelete: taskDeleteReducer,
  taskUpdate: taskUpdateReducer,
  userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
