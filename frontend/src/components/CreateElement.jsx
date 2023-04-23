import { useContext, useEffect, useState } from 'react';
import '../css/CreateElement.css';
import { store } from '../store';

const CreateElement= (props)=>{
    const {addTask , type} = props;
    const {state , dispatch} = useContext(store)
    const {Todolist} = state
    const[inputTask,setTask] = useState("");

    const createTask = ()=>{
        try{
            if(inputTask == ""){console.log("empty")}
            const newtask = {
                id:4,
                task:inputTask,
                completed:false
            }
            console.log(newtask)
            Todolist.push(newtask)
            dispatch({type:'Add-Item' , payload:Todolist})
            localStorage.setItem("Todolist",JSON.stringify(Todolist) );
            addTask(false);

        }catch(error){
            console.log("error "+error)
        }
        
    }
    const editTask = ()=>{
        try {
            Todolist.map( (tsk)=>{
                if(tsk.id === props.task.id){
                        tsk.task = inputTask;                   
                }
            });
            localStorage.setItem("Todolist",JSON.stringify(Todolist));
            dispatch({type:'Update-task-complete',payload:Todolist});
            addTask(false);
        } catch (error) {
            console.log("error "+error)
            
        }
    }
    useEffect(()=>{
        setTask(type=="edit"? props.task.task : "");
    },[])
    const saveTask = ()=>{
        if(type=="edit"){
            editTask();
        }else createTask();
    }
    return (
        <>
            <div className="CreateElement">
                <i onClick={()=>{
                    addTask(false);
                 }} className="fa-solid fa-circle-xmark"></i>
                <span className="NewTaskHeading" >New Task</span>
                <div id='TaskDetail' className="InputDiv" >
                    <input type="text" placeholder={type=="edit"? props.task.task:'  Add New Task..'} 
                            value={inputTask} onChange={(e)=>{setTask(e.target.value)}} >
                    </input>
                </div>
                <div className="Options" >
                    <button onClick={saveTask} className="Save" >Save</button>
                    <button onClick={()=>setTask("")} className="Clear" >Clear</button>
                </div>
            </div>
        </>
    )
}
export default CreateElement;