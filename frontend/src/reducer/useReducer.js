export const intialState=false;

export const reducer=(state,action)=>{
    if(action.type=="USER"){
        localStorage.setItem('myState', JSON.stringify(action.payload));
        return action.payload;
    }
  return state;
}