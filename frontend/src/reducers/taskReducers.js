import {
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_FAIL,
  TASK_CREATE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_LIST_FAIL,
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  EXPLORE_LIST_FAIL,
  EXPLORE_LIST_REQUEST,
  EXPLORE_LIST_SUCCESS,
} from "../constants/taskConstants";

export const taskListReducer = (state = { task: [] }, action) => {
  switch (action.type) {
    case TASK_LIST_REQUEST:
      return { loading: true };
    case TASK_LIST_SUCCESS:
      return { loading: false, TASK: action.payload };
    case TASK_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const taskExploreReducer = (state = { task: [] }, action) => {
  switch (action.type) {
    case EXPLORE_LIST_REQUEST:
      return { loading: true };
    case EXPLORE_LIST_SUCCESS:
      return { loading: false, TASK: action.payload };
    case EXPLORE_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const taskCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_CREATE_REQUEST:
      return { loading: true };
    case TASK_CREATE_SUCCESS:
      return { loading: false, success: true };
    case TASK_CREATE_FAIL:
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

export const taskDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_DELETE_REQUEST:
      return { loading: true };
    case TASK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TASK_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const taskUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_UPDATE_REQUEST:
      return { loading: true };
    case TASK_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case TASK_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
