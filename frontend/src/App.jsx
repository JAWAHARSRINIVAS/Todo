import { useState } from 'react'
import './App.css'
import CreateElement from './components/CreateElement'
import DateElement from './components/DateElement';
import Todolist from './components/TodoList';

function App() {
  
  const [options,setOptions] = useState({
    isadd:false
  });

  const addTask = (data)=>{
    console.log(data);
    setOptions(options => ({
        ...options,
        ...{isadd:data  }
       }));
      
    }
  
  return (
    <div className='App'>
      <div className='date-element'>
        <DateElement></DateElement>
      </div>
      { options.isadd &&  <CreateElement addTask={addTask} type="create" ></CreateElement>}
      
      {!options.isadd && <div className='add-task' >
                          <i onClick={()=>{addTask(true)}} className="fa-regular fa-plus"></i>
                        </div>
      }
      <Todolist></Todolist>
    </div>
  )
}

export default App
