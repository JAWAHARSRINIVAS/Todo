import { useContext, useEffect, useState } from 'react';
import '../css/CreateElement.css';
import { store } from '../store';
import axios from 'axios';

const CreateElement= (props)=>{
    const {addTask , type} = props;
    const {state , dispatch} = useContext(store)
    const {Todolist} = state
    const[inputTask,setTask] = useState("");

    const createTask = async()=>{
        try{
            if(inputTask == ""){console.log("empty")}
            const new_task = await axios.post("http://localhost:5000/Todo/create",{
                task : inputTask
            })
            console.log(new_task)
            Todolist.push(new_task.data.tasks)
            dispatch({type:'Add-Item' , payload:Todolist})
            localStorage.setItem("Todolist",JSON.stringify(Todolist) );
            addTask(false);

        }catch(error){
            console.log("error "+error)
        }
        
    }
    const editTask = ()=>{
        try {
            Todolist.map( async(tsk)=>{
                if(tsk._id === props.task._id){
                        tsk.task = inputTask; 
                        const updated_task = await axios.put("http://localhost:5000/Todo/update",{
                            _id : props.task._id,
                            task: props.task.task,
                            completed:props.task.completed
                        })          
                                
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