import { createContext, useEffect, useReducer, useState } from "react";
export const store = createContext();

const initialstate = {
    Todolist:(localStorage.getItem('Todolist') != null )?JSON.parse(localStorage.getItem('Todolist')):[]
}
        

export function StoreProvider(props)
{
    
    function reducer(state,action) {
        switch(action.type){
            case 'Add-Item':
                return {...state , Todolist:action.payload};
            case 'Update-task-complete':
                return {...state , Todolist:action.payload};
            case 'Delete-task':
                return {...state , Todolist:action.payload};
        }
    }   

    const [ state , dispatch ] = useReducer(reducer,initialstate) ;
    const value = {state,dispatch}
    


    return <store.Provider value={value} >{props.children}</store.Provider>

}