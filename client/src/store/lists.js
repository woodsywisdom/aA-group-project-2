import Cookies from 'js-cookie'

const SET_USER_LISTS = "/entities/lists/SET_USER_LISTS"
const CREATE_LIST = "/entities/lists/CREATE_LIST"

export const setUserLists = (lists) => {
    return {
        type: SET_USER_LISTS,
        lists
    }
}

export const createNewList = (newList) => async dispatch => {
    const jsonList = JSON.stringify(newList)
    const csrfToken = Cookies.get("XSRF-TOKEN");
    const response = await fetch(`/api/lists/create`, {
    method: "post",
    headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
        },
    body: jsonList
    })
    const list = await response.json();
    console.log("this is the new list: ",list)
    dispatch(addList(list))
}

export const addList = (list) => {
    return {
        type: CREATE_LIST,
        list
    }
}

export default function lists(state={},action){
    const newState = Object.assign({},state)
    const userLists = Object.assign({},state.userLists)
    switch (action.type){
        case SET_USER_LISTS:
            newState.userLists = userLists
            Object.values(action.lists).forEach(list=>{
                newState.userLists[list.id] = list
            })
            return newState;
        case CREATE_LIST:
            newState.userLists = userLists;
            newState.userLists[action.list.id] = action.list
            return newState
        default: 
            return state;
    }
}