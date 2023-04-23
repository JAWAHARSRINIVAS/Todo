import { useContext, useState } from "react";
import { store } from "../store";
import '../css/TodoList.css'
import CreateElement from "./CreateElement";

function Todolist() {

    const {state ,dispatch} = useContext(store);
    const{Todolist} = state
    const [isupdate,setIsupdate] = useState(0)

    const addTask = (data)=>{
        setIsupdate(data)
    }

    const complete = (task)=>{
        try {
            Todolist.map( (tsk)=>{
                if(tsk.id === task.id){
                    tsk.completed = !tsk.completed;
                }
            })
            localStorage.setItem("Todolist",JSON.stringify(Todolist))
            dispatch({type:'Update-task-complete',payload:Todolist})
            
        } catch (error) {
            console.log("error "+error);
        }
    }
    const delete_Handler = (task)=>{
        try {
            const updatedList = Todolist.filter((tsk)=>{
                return tsk.id != task.id
            })
            localStorage.setItem("Todolist",JSON.stringify(updatedList))
            dispatch({type:'Delete-task',payload:updatedList})

        } catch (error) {
            console.log("error "+error);
        }
    }
    // const updateHandler = ()=>{
    //     try {
    //         setIsupdate(true);
    //     } catch (error) {
    //         console.log("error "+error)
    //     }
    // }

    function TodoElement(props)
    {
        return(
            <div className={!props.taskobj.completed ?"todo-element":"todo-element completed-element" } >
                <div className="menu" >
                    <i onClick={()=>complete(props.taskobj)} className="fa-solid fa-square-check"></i>
                    <i onClick={()=> {
                        setIsupdate(props.taskobj.id)
                    }} className="fa-regular fa-pen-to-square"></i>
                    <i onClick={()=>delete_Handler} className="fa-solid fa-trash"></i>
                </div>
                <div className="task-detail">{props.taskobj.task}</div>
            </div>
        );
    }

    return (
        <div className="todo-list">
        { state.Todolist.map((stask)=>(
            <div key={stask.id}>
                <TodoElement key={stask.id} taskobj = {stask}></TodoElement>
                {isupdate == stask.id && <CreateElement addTask={addTask} type="edit" task={stask} ></CreateElement>}
            </div>
        )) } 


        </div>
    );    
}

export default Todolist;