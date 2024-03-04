import { actions } from "../actions/Index"

const initialState = {
    posts:[],
    loading:false,
    error:null
}

const postReducer = (state, action) =>{
   switch(action.type) {
    case actions.post.DATA_FETCHING:{
        return {
            ...state,
            loading:true
        }
    }
    case actions.post.DATA_FETCHED:{
        return {
            ...state,
            loading:false,
            posts:actions.data
        }
    }
    case actions.post.DATA_FETCH_ERROR:{
        return {
            ...state,
            loading:false,
            error:actions.error
        }
    }
    case actions.post.DATA_CREATED:{
        return {
            ...state,
            loading:false,
            post:[...state.posts, action.data]
        }
    }
    case actions.post.DATA_EDITED:{
        return {
            ...state,
            loading:false,
           user:action.data;
        }
    }
    case actions.post.POST_DELETED:{
        return {
            ...state,
            loading:false,
            post:state.posts.filter((item) =>item.id !== action.data)
        }
    }
    default :{
        return state
    }
   }
} 

export { initialState, postReducer }

